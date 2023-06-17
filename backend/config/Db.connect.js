const mongoose = require("mongoose")
mongoose.set("strictQuery", false);
const ConnectDb = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.log({ message: "Unable to connect !", error: err.meesage });
        });
}
module.exports = ConnectDb