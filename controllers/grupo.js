const GrupoServices = require("../services/grupo.js");
const UsuarioService = require("../services/usuario.js");
const ContactoService = require("../services/contacto.js");

const service = new GrupoServices();
const usuarioService = new UsuarioService();
const contactoService = new ContactoService();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui se hace el getAllGrupos,getGrupo, deleteGrupo, getgruposGrupo , addGrupo y addGrupogrupo
 */
class GrupoController {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los grupos
   */
  async getAllGrupos(req, res) {
    try {
      const grupos = await service.getAllGrupos();
      return res.status(200).json({ data: grupos });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los grupos. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del grupo
   * @description Funcion que te da determinado grupo por id
   */
  async getGrupo(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const grupo = await service.getGrupo(id);
      if (grupo) {
        return res.status(200).json({ data: grupo });
      } else {
        return res.status(404).json({ message: "No se encontró el grupo" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los grupos. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - nombre Nombre del grupo
   * @params {int} - idgrupo Unico del grupo
   * @description Funcion para darle registro a determinado grupo
   */
  async addGrupo(req, res) {
    try {
      const grupo = await service.createGrupo(req.body);
      return res.status(200).json({ data: grupo });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el grupo. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del grupo
   * @description Funcion eliminar el grupo
   */
  async deleteGrupo(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const grupo = await service.getGrupo(id);
      if (!grupo) {
        return res.status(404).json({ message: "No se encontró el grupo" });
      }

      await service.deleteGrupo(id);
      return res
        .status(200)
        .json({ message: "Se ha eliminado el grupo correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los grupos. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} -  idUsuarioAgregado Usuario al que se va agregar al grupo
   * @params {int} - idGrupo Unico del grupo
   * @description Funcion para darle registro a determinado grupo
   */
  async addContactoToGrupo(req, res) {
    const { idMiembro, idGrupo } = req.body;

    try {

      //buscar si el usuario está registrado en los contactos
      const contacto = await contactoService.getContacto(idMiembro);
      if (!contacto) {
        return res
          .status(400)
          .json({ message: "El contacto no se encuentra registrado"});
      }

      const miembro = await service.getGrupoMiembro(idMiembro, idGrupo);
      if (miembro) {
        return res
          .status(400)
          .json({ message: "El usuario ya es miembro de este grupo" });
      }

      const grupo = await service.addUsuarioGrupo(idMiembro, idGrupo);
      return res.status(200).json({ data: grupo });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al añadir el usuario al grupo. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del grupo
   * @description Funcion que nos va a permitir ver todos los contactos en un grupo
   */
  async getContactosGrupo(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El id necesita ser entero" });
    }
    try {
      const contactoGrupo = await service.getContactosGrupo(id);
      if (contactoGrupo) {
        return res.status(200).json({ data: contactoGrupo });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró el contactoGrupo" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los contactoGrupo. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador del usuario
   * @description Funcion que nos va a permitir ver todos los grupos que ha creado un usuario
   */
  async getGruposUsuario(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El id necesita ser entero" });
    }
    try {
      const grupos = await service.getGruposUsuario(id);
      if (grupos) {
        return res.status(200).json({ data: grupos });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontraron los grupos" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener grupos. Err: ${err}` });
    }
  }

  /**
   * @author Irving Agramón y Rubén Tandon 
   * @version 1.0.1
   * @license Gp
   * @params {int} -  idGrupo Grupo al que se va a eliminar el miembro
   * @params {int} - idMiembro Identificador Unico del miembro
   * @description Funcion que nos va a permitir eliminar un usuario de un grupo
   */
  async deleteMiembroByGrupo(req, res){
    const {idGrupo, idMiembro} = req.params;
    if (!Number.isInteger(parseInt(idGrupo))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    if (!Number.isInteger(parseInt(idMiembro))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }

    try{
      const miembro = await service.getGrupoMiembro(
        idMiembro,
        idGrupo
      );
      if(!miembro){
        return res.status(404).json({ message: "No se encontró el miembro" });
      }

      await service.deleteMiembro(
        miembro.idContactoGrupo
        );
      return res
        .status(200)
        .json({ message: "Se ha eliminado el miembro correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al eliminar los miembros. Err: ${err}` });
    }
  }

  /**
   * @author Irving Agramón y Rubén Tandon 
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del grupo
   * @params {string} - nombre Nombre unico del grupo
   * @description Funcion que nos va a permitir cambiar el nombre de un grupo
   */

  async updateGrupoName(req, res){
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }

    try{
      const grupo = await service.updateGrupoName(id, req.body);
      return res.status(200).json({ data: grupo });
    } catch (err){
      return res
        .status(500)
        .json({ message: `Error al obtener los grupos. Err: ${err}` });
    }
  }
}




module.exports = GrupoController;


