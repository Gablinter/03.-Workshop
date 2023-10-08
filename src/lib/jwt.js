let jsonwebtoken = require('jsonwebtoken');
const { promisify } = require("util");

let jwt = {
    sign: promisify(jsonwebtoken.sign),
    verify: promisify(jsonwebtoken.verify)
}

module.exports = jwt;