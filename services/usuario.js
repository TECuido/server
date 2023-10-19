// Esto es la schema de usuario favor de agregar el dato tipo
// Realizado por: Bernardo de la Sierra Rábago el dia 12/10/2023
// para migrarlo npx prisma migrate dev --name init
/*
 CHECA COMO SE LLAMA EL ID DE LA COLUMNA PORQUE
 SINO LO LLEGAS A PONER DE FORMA CORRECTA DE VA A
 DAR UN ERROR EN EL POSTMAN  Y HAY DOS TIPOS DE FIND:
 FINDUNIQUE QUE ES PARA DATOS UNICOS Y FINDFIRST SI 
 SON DATOS QUE SE PUEDEN REPETIR
*/

const bcrypt = require("bcrypt");
const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado usuario, el login, crear el usuario que mas adelante se va a modificar, actualizar el usuario y eliminar determinado usuario. Se añadio la relacion entre contactos
 */
class UsuarioService {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los usuarios
   */
  async getAllUsuarios() {
    const usuarios = await db.usuario.findMany();
    return usuarios;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @description Funcion que da el usuario de un id
   */
  async getUsuario(id) {
    const usuario = await db.usuario.findUnique({
      where: {
        idUsuario: Number(id),
      },
    });
    return usuario;
  }

  /**
   * @author Julio Emmanuel Meza Rangel
   * @version 1.0.1
   * @license Gp
   * @params {string} - correo correo del usuario
   * @description Funcion que regresa el usuario que tiene un determinado correo
   */
  async getUsuarioPorCorreo(correo) {
    const usuario = await db.usuario.findUnique({
      where: {
        correo: correo,
      },
    });
    return usuario;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - password Contraseña unica del usuario
   * @params {string} - nombre Nombre del usuario
   * @params {string} - correo Unico del usuario
   * @description Funcion para darle registro a determinado usuario
   */
  async createUsuario({ nombre, correo, password }) {
    const result = await db.usuario.create({
      data: {
        nombre: nombre,
        correo: correo,
        password: bcrypt.hashSync(password, 12),
      },
    });
    return result;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @params {string} - password Contraseña unica del usuario
   * @params {string} - nombre Nombre del usuario
   * @params {string} - correo Unico del usuario
   * @description Funcion para actualizar un determinado usuario
   */
  async updateUsuario(id, { nombre, correo, password }) {
    const usuario = await db.usuario.update({
      where: { idUsuario: Number(id) },
      data: { nombre, correo, password },
    });
    return usuario;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @description Funcion eliminar el usuario
   */
  async deleteUsuario(id) {
    await db.usuario.delete({
      where: { idUsuario: Number(id) },
    });
  }
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuarioActual Identificador unico del usuario actual
   * @params {int} - usuario2 Identificador del usuario que vamos a mandar
   * @description Funcion que crea las relaciones de contactos
   */
  async addContacto(idUsuarioActual, usuario2) {
    // Creamos el contacto
    return await db.contacto.create({
      data: {
        idUsuario1: idUsuarioActual,
        idUsuario2: usuario2.idUsuario,
      },
    });
  }
}

module.exports = UsuarioService;
