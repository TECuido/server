const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra Rabago
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description clase de manejo de db de informacion extra */
class UsuarioDetalleService {
  constructor() {}
  /**
   * @author Bernardo de la Sierra Rabago
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todas la informacion extra
   */
  async getAllUsuarioDetalles() {
    const usuariodetalles = await db.usuarioDetalles.findMany();
    return usuariodetalles;
  }

  
/**
 * @author Bernardo de la Sierra Rabago
 * @version 1.0.1
 * @license Gp
 * @params {int} - id Identificador unico del emergencia
 * @description Funcion que da una receta por id
 */
async getUsuarioDetalles(id) {
  const usuariodetalles = await db.usuarioDetalles.findMany({
    where: {
      idUsuario: Number(id),
    },
    include: {
      contactoEmergencia: {
        select: {
          nombre: true,
          correo: true,
          telefono: true
        },
      },
      Usuario: { 
        select: {
          nombre: true,
        },
      },
    },
  });
  return usuariodetalles;
}

  
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuario Identificador unico del usuario
   * @params {int} - numPoliza Numero de poliza del usuario
   * @params {int} - idContactoEmergencia Identificador unico del contacto de emergencia
   * @params {string} - tipoSangre es el tipo de sangre
   * @params {string} - transfusionSanguinea si acepta o no la transfusion sanguinea
   * @params {string} - donacionOrganos  si acepta o no dar o aceptar donacion de organos
   * @params {string} - direccion donde vive 
   * @params {string} - edad que edad tiene
   * @params {string} - medicoTratante que medico nos esta tratando
   * @description Funcion que crea los detalles de los usuarios
   */
  async addUsuarioDetalle(detalleUsuario) {
    try {
      // Creamos el detalle del usuario
      return await db.usuarioDetalles.create({
        data: detalleUsuario,
      });
    } catch (error) {
      throw new Error(`Error al agregar el detalle del usuario: ${error.message}`);
    }
  }
  
    /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuario Identificador unico del usuario
   * @params {int} - numPoliza Numero de poliza del usuario
   * @params {int} - idContactoEmergencia Identificador unico del contacto de emergencia
   * @params {string} - tipoSangre es el tipo de sangre
   * @params {string} - transfusionSanguinea si acepta o no la transfusion sanguinea
   * @params {string} - donacionOrganos  si acepta o no dar o aceptar donacion de organos
   * @params {string} - direccion donde vive 
   * @params {string} - edad que edad tiene
   * @description Funcion que crea los detalles de los usuarios
   */
    async updateUsuarioDetalle(id, { numPoliza, tipoSangre, transfusionSanguinea, donacionOrganos, direccion, edad, medicoTratante }, nuevoId, nombre) {
      const usuario = await db.usuarioDetalles.updateMany({
        where: { idUsuario: Number(id) },
        data: {
          numPoliza,
          idContactoEmergencia: nuevoId,
          tipoSangre,
          transfusionSanguinea,
          donacionOrganos,
          direccion,
          edad,
          medicoTratante
        },
      });
    
       // Actualizar el nombre en la tabla Usuario
      const usuarioUpdate = await db.usuario.update({
        where: { idUsuario: Number(id) },
        data: {
          nombre
        },  
      });
      return { usuario, usuarioUpdate };
    }

     /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idContactoEmergencia del usuario de contacto emergencia
   * @description Funcion que da un contacto a partir de los usuarios involucrados
   */
  async getContactoPorIdContacto(idContactoEmergencia) {
    const usuariodetalles = await db.usuarioDetalles.findFirst({
      where: {
        idContactoEmergencia: Number(idContactoEmergencia),
      },
    });
    return usuariodetalles;
  }
}

module.exports = UsuarioDetalleService;
