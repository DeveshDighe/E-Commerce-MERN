const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')


// dotenv.config()

const SECRET_KEYY = 'dsfasfkdlkflkslfk';

const generateToken = (userId) => {

    const token = jwt.sign({ userId }, SECRET_KEYY, { expiresIn: '48h' })

    return token;

}


const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, SECRET_KEYY)

    return decodedToken.userId;
}


module.exports = { generateToken, getUserIdFromToken }