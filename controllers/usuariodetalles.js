const UsuarioService = require("../services/usuario.js");
const ContactoService = require("../services/contacto.js");
const UsuarioDetallesService = require("../services/usuariodetalles");
const AlergiaService = require("../services/alergias.js");
const MedicamentosActualesService = require("../services/medicamentosActuales.js");
const CondicionMedicaService = require("../services/condicionMedica.js");
const { sendMail } = require("../utils/mail.js");
const config = require("../config/config.js");

const service = new UsuarioDetallesService();
const usuarioService = new UsuarioService();
const contactoService = new ContactoService();
const alergiaService = new AlergiaService();
const medicamentosActService = new MedicamentosActualesService();
const condicionMedicaService = new CondicionMedicaService();

/**
 * @author Bernardo de la Sierra Rábago
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos del api de UsuarioDetalles
 */
class UsuarioDetallesController {
  constructor() {}

  /**
   * @author  Bernardo de la Sierra Rábago
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todas la informacion extra
   */
  async getAllUsuarioDetalles(req, res) {
    try {
      const UsuarioDetalles =
        await service.getAllUsuarioDetalles();
      return res.status(200).json({ data: UsuarioDetalles });
    } catch (err) {
      return res.status(500).json({
        message: `Error al obtener la informacion extra. Err: ${err}`,
      });
    }
  }

  /**
   * @author  Bernardo de la Sierra Rábago
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador de la UsuarioDetalles
   * @description Funcion que da una emergencia por id
   */
  async getUsuarioDetalles(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const UsuarioDetalles =
        await service.getUsuarioDetalles(id);
      if (UsuarioDetalles) {
        return res.status(200).json({ data: UsuarioDetalles });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró la UsuarioDetalles" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener UsuarioDetalles. Err: ${err}` });
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
   * @description Actualiza los detalles de los usuarios
   */
  async updateUsuarioDetalles(req, res) {
    const id = req.params.id;
    const {  contactoEmergencia } = req.body;
    const { nombre} = req.body; 
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    const usuarioAgregado = await contactoService.getContactoPorNombre(contactoEmergencia);
    // si no existe el usuario lanzar un error
      if (!usuarioAgregado) {
        return res
          .status(400)
          .json({ message: "El usuario con ese nombre no se encuentra registrado" });
      }

    try {
      const usuario = await service.updateUsuarioDetalle(id, req.body,usuarioAgregado.idUsuario,nombre);
      return res.status(200).json({ data: usuario });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los datos. Err: ${err}` });
    }
  }

  async enviarCorreoDetalles(req, res){
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const datos = await service.getUsuarioDetalles(id);

      if(datos.length === 0){
        return res
          .status(400)
          .json({ message: "No se encontró el perfil del usuario" });
      }

      const perfil = datos[0];

      const alergias = await alergiaService.getAlergiaUsuario(id);
      const medicamentos = await medicamentosActService.getMedicamentosActualesUsuario(id);
      const condicionesMedicas = await condicionMedicaService.getCondicionMedicaUsuario(id);
      
      const correoHTML = `
      <p>Hola, recibes este correo dado que ${perfil.Usuario.nombre} te ha agregado como contacto de emergencia en la aplicación TECuido</p>
      <p>A continuación se incluyen los datos médicos del usuario, para que puedas tenerlos a tu disponibilidad en caso de una emergencia</p>
      <h2>Perfil médico</h2>
      <ul>
        <li>Edad: ${perfil.edad}</li>
        <li>Dirección: ${perfil.direccion}</li>
        <li>Poliza de seguros: ${perfil.numPoliza}</li>
        <li>Médico tratante: ${perfil.medicoTratante}</li>
        <li>Apto para transfusión sanguínea: ${perfil.transfusionSanguinea}</li>
        <li>Donante de órganos: ${perfil.donacionOrganos}</li>
      </ul>
      `
      if(alergias.length > 0){
        correoHTML += `
          <h2>Alergias</h2>
          <ul>
          ${alergias.map(alergia => `<li>${alergia.nombre}</li>`)}
          </ul>
        `
      }

      if(medicamentos.length > 0){
        correoHTML += `
          <h2>Medicamentos</h2>
          <ul>
          ${medicamentos.map(medicamento => `<li>${medicamento.nombre}</li>`)}
          </ul>
        `
      }

      if(condicionesMedicas.length > 0){
        correoHTML += `
          <h2>Condiciones médicas</h2>
          <ul>
          ${condicionesMedicas.map(condicion => `<li>${condicion.nombre}</li>`)}
          </ul>
        `
      }

      const mail = {
        from: `Dilo en señas <${config.mailerEmail}>`,
        to: `${perfil.contactoEmergencia.correo}`,
        subject: "Perfil médico de emergencias",
        html: correoHTML
      }

      await sendMail(mail);
      return res.status(200).json({message: "Se envió el correo"});
    } catch(err){
      console.log(err)
      return res
        .status(500)
        .json({ message: `Error al enviar el correo. Err: ${err}` });
    }
  }

  

}

module.exports = UsuarioDetallesController;
