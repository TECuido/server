const ContactoServices = require("../services/contacto.js");
const UsuarioServices = require("../services/usuario.js");
const UsuarioDetallesServices = require("../services/usuariodetalles.js");


const service = new ContactoServices();
const usuarioService = new UsuarioServices();
const usuariodetallesService = new UsuarioDetallesServices();
/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado contacto y  eliminar determinado contacto.
 */
class ContactoController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los contactos
   */
  async getAllContactos(req, res) {
    try {
      const contactos = await service.getAllContactos();
      return res.status(200).json({ data: contactos });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los contactos. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los contactos de un usuario
   */
  async getAllContactosUsuario(req, res) {
    try {
      const id = req.params.id;

      if (!Number.isInteger(parseInt(id))) {
        return res.status(500).json({ message: "El Id necesita ser entero" });
      }

      const contactos = await service.getContactosDeUsuario(id);
      return res.status(200).json({ data: contactos });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los contactos. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da determinado contacto por id
   */
  async getContacto(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const contacto = await service.getContacto(id);
      if (contacto) {
        return res.status(200).json({ data: contacto });
      } else {
        return res.status(404).json({ message: "No se encontró el contacto" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener el contacto. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza y Bernardo de la Sierra 
   * @version 2.0.1
   * @license Gp
   * @params {int} - idContacto Identificador del Contacto a eliminar
   * @description Funcion eliminar el contacto
   */
  async deleteContacto(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }

    try {
      const contacto = await service.getContacto(id);
      if (!contacto) {
        return res.status(404).json({ message: "No se encontró el contacto" });
      }
      const usuarioDetalles = await usuariodetallesService.getContactoPorIdContacto(contacto.idContacto);
      if (usuarioDetalles) {
        return res.status(404).json({ message: "No se puede eliminar un contacto de emergencia" });
      }
      await service.deleteContacto(contacto.idContacto);
      return res
        .status(200)
        .json({ message: "Se ha eliminado el contacto correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los contactos. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 2.0.1
   * @license Gp
   * @params {int} - idUsuarioActual Identificador del usuario que esta registrando el contacto
   * @params {string?} - correo del contacto
   * @params {string} - telefono del contacto
   * @description  Agregar un contacto, se debe ingresa al menos uno de los siguientes: correo, teléfono
   */
  async addContacto(req, res) {
    const idUsuarioActual = req.params.id;
    const { telefono, esContactoEmergencia } = req.body;
    
    try {


      //Si el usuario que agrega el contacto no está registrado lanzar error
      const usuarioActual = await usuarioService.getUsuario(idUsuarioActual);

      if(!usuarioActual){
      return res
        .status(400)
        .json({ message: "El usuario no se encuentra registrado" });
      }

      //buscar que no se haya registrado ya el contacto
      const contacto = await service.getContactoPorTelefono(idUsuarioActual, telefono);

      if (contacto) {
        return res
          .status(400)
          .json({ message: "Ya se ha registrado un contacto con este número"});
      }

      //buscar si el usuario que se desea añadir como contacto existe
      //la verificación se hace por el número de teléfono
      const usuarioTelefono = await usuarioService.getUsuarioPorTelefono(telefono)

      if(usuarioTelefono){
        //si el usuario que se agrega como contacto es el mismo usuario lanzar un error
        if (usuarioTelefono.idUsuario == idUsuarioActual) {
          return res
            .stauts(400)
            .json({ message: "No se puede agregar el mismo usuario" });
        }
      }
   
      //crear el contacto
      const contactoCreado = await service.addContacto(
        idUsuarioActual,
        req.body,
        usuarioTelefono?.idUsuario ?? null
      );
        
      const response = {
        contacto: contactoCreado
      }

      //si es contacto de emergencia agrega el contacto en el perfil
      if (esContactoEmergencia){
        const usuarioDetalles = await usuariodetallesService.addUsuarioDetalle({
          idUsuario: Number(idUsuarioActual),
          numPoliza: "Sin información",
          tipoSangre: "Sin informacion",
          idContactoEmergencia: Number(contactoCreado.idContacto),
          transfusionSanguinea: "Sin información",
          donacionOrganos: "Sin información",
          direccion: "Sin información",
          edad: "Sin información",
          medicoTratante: "Sin información"
        });

        response.usuarioDetalles = usuarioDetalles;
      } 
      
      return res.status(200).json(response);  
     
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


   /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @params {string} - telefono Telefono del usuario
   * @params {string} - nombre Nombre del usuario
   * @params {string} - correo Unico del usuario
   * @description Funcion para actualizar un determinado usuario
   */
   async updateContacto(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const contacto = await service.updateContactoo(id, req.body);
      return res.status(200).json({ data: contacto});
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los contactos. Err: ${err}` });
    }
  }

}

module.exports = ContactoController;
