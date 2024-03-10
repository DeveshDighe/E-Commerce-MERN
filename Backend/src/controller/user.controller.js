
const userService = require('../services/user.service.js')


// Bearer , tpken =>  after Split = [Bearer ,token] => I want just token so [1] 
const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(' ')[1];


        if (!jwt) {
            return res.status(404).send({errr: 'token not found'})
        }

        const user = await userService.getUserProfileByToken(jwt)

        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllUsers = async(req,res) => {
    try {
        const users = await userService.getAllUsers();

        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {getAllUsers, getUserProfile}