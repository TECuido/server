const apn = require("apn")

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