const User = require("../model/user.model");
const bcrypt = require('bcrypt')
const jwtProvider = require('../config/jwtProvider.js')

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        const isEmailExist = await User.findOne({ email });

        if (isEmailExist) {
           return
        }

        password = await bcrypt.hash(password, 10);

        const user = await User.create({ firstName, lastName, email, password, })



        return user;
    } catch (error) {
        throw new Error(error)
    }
}


const findUserbyId = async (userId) => {
    try {

        const user = await User.findById(userId)
        // .populate('address');

        if (!user) {
            throw new Error('user not found with id : ', userId)
        }

        return user;

    } catch (error) {
        throw new Error(error)
    }
}

const findUserbyEmail = async (email) => {
    try {

        const user = await User.findOne({ email });

        if (!user) {
            return 
        }

        return user;

    } catch (error) {
        throw new Error(error)
    }
}

const getUserProfileByToken = async (token) => {
    try {

        const userId = jwtProvider.getUserIdFromToken(token)

        const user = await findUserbyId(userId)

        if (!user) {
            throw new Error('user not found with id : ', userId)
        }

        return user;

    } catch (error) {
        throw new Error(error)
    }
}

const getAllUsers = async () => {
    try {
        const users = await User.find();

        return users;
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = { createUser, findUserbyId, findUserbyEmail, getUserProfileByToken, getAllUsers }