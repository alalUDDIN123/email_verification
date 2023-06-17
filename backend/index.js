
// neccessery modules 👍👍👍
const dotenv = require("dotenv")
dotenv.config();
const express = require("express")
const app = express()
const cors = require("cors")



// requiring file path 👍👍👍
const ConnectDb = require("./config/Db.connect")
const UserRouter = require("./routes/users.routes");


// neccessary middleware 👍👍👍
app.use(express.json())

// cors origin for all browser 👍👍👍
app.use(cors({
    origin: "*",
}))



// home route 👍👍👍

app.get('/', function (req, res) {
    res.send("<h1>Welcome backend Home </h1>")
});


// All Routes 👍👍👍
app.use("/api/users", UserRouter)





const PORT = process.env.PORT || 8085;
app.listen(PORT, async () => {
    await ConnectDb()
    console.log(`Server running on http://localhost:${PORT}`)
})