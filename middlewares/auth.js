const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next){
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({message: "Falta autorización"})
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, proccess.env.JWT_ACCESS_SECRET);
        req.payload = payload;
    } catch(err) {
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({message: "TokenExpiredError"});
        } else {
            return res.status(401).json({message: "No autorizado"});
        }
    }

    return next();
}


module.exports = {
    isAuthenticated
}