const apn = require("apn");
const config = require("../config/config")

//key: Authentication Token that you can grab from apple Member Center website.
//key-id: the XXXXXXXXXX part of the Authentication Token filename.
//teamId: your apple team id

var options = {
    token: {
      key: "./utils/AuthKey_4Q63WPVPAJ.p8",
      keyId: config.keyId,
      teamId: config.teamId
    },
    production: true
};
  
var apnProvider = new apn.Provider(options);

//generar notificacion
function crearNotificacionEmergencia(emergencia, usuario){
  var note = new apn.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 1;
  note.sound = "ping.aiff";
  note.alert = {
      title: "Alerta de emergencia",
      body: `Emergencia de tipo ${emergencia.tipo}`
  };
  note.payload = {
    'idEmergencia': emergencia.idEmergencia, 
    'tipo': emergencia.tipo,
    'descripcion': emergencia.descripcion,
    'idEmisor': emergencia.idEmisor,
    'longitud': emergencia.longitud,
    'latitud': emergencia.latitud,
    'emisor': usuario.nombre 
  };
  note.topic = "com.itesm.TECuidoDES";
  return note;
}


module.exports = {apnProvider, crearNotificacionEmergencia}