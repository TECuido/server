function validatorHandler(schema, property){
    //callback de middleware

    return(req, res, next) => {
        //Capturar datos dinamicamente
        const data = req[property];
        //validar esquema
        const { error } = schema.validate(data, {abortEarly: false})
        if(error){
            return res.status(400).json({ message: "El formato de los datos es incorrecto" });
        } else {
            return next()
        }
    }
}


module.exports = validatorHandler;