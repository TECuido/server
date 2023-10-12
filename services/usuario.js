// Esto es la schema de usuario favor de agregar el dato tipo
// Realizado por: Bernardo de la Sierra Rábago el dia 12/10/2023

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado user, el login, crear el usuario que mas adelante se va a modificar, actualizar el usuario y eliminar determinado usuario
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
    const posts = await prisma.post.findMany();
    return posts;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @description Funcion que te da todos los usuarios
   */
  async getUsuario(id) {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    return post;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - correo Unico del usuario
   * @params {string} - password Contraseña unica del usuario
   * @description  Funcion para inciar sesion por parte de los usuarios
   */
  async loginUser(correo, password) {
    try {
      // Checamos si el usuario existe en verdad
      const user = await prisma.user.findUnique({
        where: {
          correo: correo,
        },
      });

      // No existe es nulo el valor
      if (!user) {
        return null;
      }

      // Checamos que la password exista sino es nuela
      if (user.password === password) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error durante la carga de Inico de Sesión: ", error);
      throw error;
    }
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
    const result = await prisma.post.create({
      data: {
        nombre,
        correo,
        password,
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
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { nombre, correo, password },
    });
    return post;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @description Funcion eliminar el usuario
   */
  async deleteUsuario(id) {
    await prisma.post.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = UsuarioService;
