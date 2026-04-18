const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ') [1];


    if(!token) {
        return res.status(401).json({
            success: false,
            error : ' Access token required'
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({
                success: false,
                error: 'Invalid or expired token'
            });
        }
        req.user = user;
        next();
    });
};
const authorizeAdmin = (req, res, next )=> {
    if(req.user.user_type != 'admin') {
        return res.status(403).json({
            success: false,
            error: ' Admin access required'
        });
    }
    next();
};
const authorizeVendororAdmin = (req, res, next) => {
    if(req.user.user_type !== 'vendor' && req.user.user_type !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Vendor or admin access required'
        });
    }
    next();
};
module.exports = {authenticateToken, authorizeAdmin, authorizeVendororAdmin};