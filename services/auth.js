const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de login y registro
 */
class AuthService {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - correo Unico del usuario
   * @params {string} - password Contraseña unica del usuario
   * @description  Funcion para inciar sesion por parte de los usuarios
   */
  async loginUsuario(correo, password) {
    
    // Obtener el usuario
    const usuario = await prisma.usuario.findUnique({
    where: {
        correo: correo,
    },
    });

    // Checamos que la contraseña coincida
    if (usuario.password === password) {
        return usuario;
    } else {
        return null;
    }

  }
  
}

module.exports = AuthService;
