const apn = require("apn");

//key: Authentication Token that you can grab from apple Member Center website.
//key-id: the XXXXXXXXXX part of the Authentication Token filename.
//teamId: your apple team id

var options = {
    token: {
      key: "./utils/AuthKey_4Q63WPVPAJ.p8",
      keyId: "4Q63WPVPAJ",
      teamId: "7NP8953QA5"
    },
    production: false
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
    'idEmisor': usuario.idEmisor,
    'longitud': emergencia.longitud,
    'latitud': emergencia.latitud,
    'emisor': usuario.nombre 
  };
  note.topic = "com.itesm.TECuidoDES";
  return note;
}


module.exports = {apnProvider, crearNotificacionEmergencia}