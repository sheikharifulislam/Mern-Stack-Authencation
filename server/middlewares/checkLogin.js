const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;    
    if (cookies) {
        try {
            const token = cookies[process.env.COOKIE_NAME].split(" ")[1];            
            jwt.verify(token, process.env.JWT_SIGNATURE, (err, payload) => {
                if (err) {
                    res.status(404).json({
                        success: false,
                        message: "Failed To Authencation",
                        user: {},
                    });
                }               
                req.user = payload.data;
                next();
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Failed To Authencation",
                user: {},
            });
        }
    }
    else {
        res.status(500).json({
            success: false,
            message: "Failed To Authencation",
            user: {},
        });
    }
};
