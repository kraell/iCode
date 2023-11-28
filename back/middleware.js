const JWT_SECRET = "secret";
var jwt = require('jsonwebtoken');


module.exports = {
    auth: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        console.log('auth header:', authHeader);
        if (!authHeader) {
            return res.status(403).json({
                msg: "Missing auth header"
            });
        }

        let decoded = null;
        try {
            decoded = jwt.verify(authHeader, JWT_SECRET);
            console.log('decoded auth header:', decoded);
        }
        catch (e) {
            console.error('Error verifying JWT:', e);
            return res.status(403).json({
                msg: "Bad token"
            });
        }

        if (decoded && decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
        else {
            return res.status(403).json({
                msg: "Incorrect token"
            });
        }
    }
}