const JWT_SECRET = "secret";
var jwt = require('jsonwebtoken');


module.exports = {
    auth: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        
        if (!authHeader) {
            return res.status(403).json({
                msg: "Missing auth header"
            });
        }

        let decoded = null;
        try {
            decoded = jwt.verify(authHeader, JWT_SECRET);
        }
        catch (e) {
            console.error('Error verifying JWT:', e);
            return res.status(403).json({
                msg: "Bad token"
            });
        }

        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next();
        }
        else {
            return res.status(403).json({
                msg: "Incorrect token"
            });
        }
    }
}