const AuthService = require("../services/auth.js");
const UsuarioService = require("../services/usuario.js")

const authService = new AuthService();
const usuarioService = new UsuarioService()

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
        const usuarioCorreo = await usuarioService.getUsuarioPorCorreo(correo)
        if(!usuarioCorreo){
            return res
            .status(404)
            .json({message: "No se encontró al usuario"})
        }
        
        //verificar si correo y contraseña coinciden
        const usuario = await authService.loginUsuario(correo, password)
        if(!usuario){
            return res
            .status(401)
            .json({message: "El usuario y contraseña no coinciden"})
        }

        //Se encontró el usuario
        return res
        .status(200)
        .json({message: "ok", usuario})
    } catch(err){
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
  async Register(req, res){
    
    const { correo } = req.body;

    try {

         //buscar si el correo está registrado para evitar registrar de nuevo
         const usuarioCorreo = await usuarioService.getUsuarioPorCorreo(correo)
         if(usuarioCorreo){
             return res
             .status(401)
             .json({message: "El usuario ya se encuentra registrado"})
         }
         

         //registrar al usuario
        const usuario = await usuarioService.createUsuario(req.body);
        return res.status(200).json({ message: "El usuario se registró exitosamente", usuario });
      } catch (err) {
        return res
          .status(500)
          .json({ message: `Error al crear el usuario. Err: ${err}` });
      }
  }


}


module.exports = AuthController