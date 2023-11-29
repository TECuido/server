const AuthService = require("../services/auth.js");
const UsuarioService = require("../services/usuario.js");
const { v4: uuidv4 } = require("uuid");
const { generateTokens } = require("../utils/jwt.js");
const { hashToken } = require("../utils/hashToken.js");
const bcrypt = require("bcrypt");
const config = require("../config/config.js");
const jwt = require("jsonwebtoken");

const authService = new AuthService();
const usuarioService = new UsuarioService();

const streamClient = require("../utils/streamClient.js");


/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de login y registro
 */
class AuthController {
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {req} - request
   * @params {res} - response
   * @description  Funcion para inciar sesion por parte de los usuarios
   */
  async Login(req, res) {
    const { correo, password } = req.body;

    try {
      //buscar si el correo está registrado
      const usuario = await usuarioService.getUsuarioPorCorreo(correo);
      if (!usuario) {
        return res.status(404).json({ message: "No se encontró al usuario" });
      }

      //verificar si la contraseña coincide con la contraseña encriptada en la bd
      const validPassword = await bcrypt.compare(password, usuario.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Credenciales inválidas" });
      }

      //Crear token de acceso
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(usuario, jti);
      await authService.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        idUsuario: usuario.idUsuario,
      });

      return res
        .status(200)
        .json({
          message: "Inicio de sesión exitoso",
          id: usuario.idUsuario,
          tipo: usuario.idTipo,
          accessToken,
          refreshToken,
        });
    } catch (err) {
      console.error("Error al iniciar sesion:", err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {req} - request
   * @params {res} - response
   * @description  Funcion para registrar
   */
  async Register(req, res) {
    const { correo } = req.body;

    try {
      //buscar si el correo está registrado para evitar registrar de nuevo
      const usuarioCorreo = await usuarioService.getUsuarioPorCorreo(correo);
      if (usuarioCorreo) {
        return res
          .status(400)
          .json({ message: "El usuario ya se encuentra registrado" });
      }

      //registrar al usuario
      const usuario = await usuarioService.createUsuario(req.body);
      //crear token de acceso
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(usuario, jti);
      await authService.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        idUsuario: usuario.idUsuario,
      });

      return res
        .status(200)
        .json({
          message: "El usuario se registró exitosamente",
          id: usuario.idUsuario,
          tipo: usuario.idTipo,
          accessToken,
          refreshToken,
        });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el usuario. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {req} - request
   * @params {res} - response
   * @description  Funcion para generar refresh tokens
   */
  async RefreshToken(req, res) {
    try {
      //obtener el refresh token anterior
      const { refreshToken } = req.body;

      //si no se envió un refresh token, lanzar un error
      if (!refreshToken) {
        return res.status(400).json({ message: "Falta refresh token" });
      }

      //verificar el token y buscar si está activo en la bd
      const payload = jwt.verify(refreshToken, config.refreshSecret);
      const savedRefreshToken = await authService.findRefreshTokenById(
        payload.jti
      );

      //si no está guardado o fue revocado lanzar error
      if (!savedRefreshToken || savedRefreshToken.revoked === true) {
        return res.status(401).json({ message: "No autorizado" });
      }

      //Obtener el hash del token y compararlo con el guardado
      const hashedToken = hashToken(refreshToken);
      if (hashedToken !== savedRefreshToken.hashedToken) {
        return res.status(401).json({ message: "No autorizado" });
      }

      //Obtener el usuario
      const user = await usuarioService.getUsuario(payload.idUsuario);
      if (!user) {
        return res.status(401).json({ message: "No autorizado" });
      }

      //eliminar el refresh token
      await authService.deleteRefreshToken(savedRefreshToken.idToken);
      //crear un nuevo token
      const jti = uuidv4();
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        user,
        jti
      );
      //añadir el token a la lista de autorizados
      await authService.addRefreshTokenToWhitelist({
        jti,
        refreshToken: newRefreshToken,
        idUsuario: user.idUsuario,
      });

      return res.status(200).json({
        id: user.idUsuario,
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      return res.status(500).json({ message: `Error. Err: ${err}` });
    }
  }
}

module.exports = AuthController;
