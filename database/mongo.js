const mongoose = require("mongoose");
const config = require("../config");

const mongoConnect = async () => {
    try {

        console.log("conectando ao mongoDB ... ");
        await mongoose.connect(config.MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB conectado com sucesso");

    } catch (error) {
        console.log(`Erro conexão com o mongoDB ${error}`);
    }
}

module.exports = mongoConnect;