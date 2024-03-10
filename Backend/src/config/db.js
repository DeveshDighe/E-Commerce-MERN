const  mongoose  = require("mongoose");

const mongodbUrl = 'mongodb+srv://deveshEcommerce:ecommerce1@cluster0.cd04gz4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const connectDb = () => {
    return mongoose.connect(mongodbUrl)
}

module.exports = {connectDb}