const mongoose = require("mongoose");

const mongoConnect = async () => {
    try {

        console.log("conectando ao mongoDB ... ");
        await mongoose.connect("mongodb://localhost:27017/nodestore", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB conectado com sucesso");

    } catch (error) {
        console.log(`Erro conexão com o mongoDB ${error}`);
    }
}

module.exports = mongoConnect;