const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth']
    if (token) {
        try {
            let decodetToken = await jwt.verify(token, SECRET);
            req.user = decodetToken;
            res.locals.user = decodetToken;
            res.locals.isAuthenticated = true;
        } catch {
            console.log({ error });
            res.clearCookie("auth");
            res.redirect("/users/login");
        }
    }
    next()
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect("/users/login");
    }
    next()
}