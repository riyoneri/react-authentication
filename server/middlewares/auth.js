const jwt = require('jsonwebtoken')

exports.isAuth = (req, res, next) => {
    const token = req.get('Authorization').split(" ")[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        err.message = "Login first"
        err.statusCode = 401;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error("Login first")
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId
    next();
}