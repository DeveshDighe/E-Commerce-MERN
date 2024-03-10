const jwtProvider = require('../config/jwtProvider.js')
const userService = require('../services/user.service.js')

const authenticate = async (req, res, next) => {
    // Brarer token......

    try {
        const token =req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(404).send({error: 'token not found...'})
        }

        const userId = await jwtProvider.getUserIdFromToken(token)
        const user = await userService.findUserbyId(userId)
        
        req.user = user;

        next()

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
    
}

module.exports = authenticate