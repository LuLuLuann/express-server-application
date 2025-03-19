const express = require("express")
const app = express()
const PORT = 4000
const bodyParser = require("body-parser")
const morgan = require("morgan")

// imported routes

// 3 different data categories (ex: users, posts, comments)

// middleware (replaces body parser)
// need 2 pieces of custom middleware
// error-handling middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(morgan("dev"))

// setting the view engine
app.use("view engine", "ejs")

// makes files stagnant and public to everyone
// app.use(express.static("images"))


app.get("/", (req, res) => {
    // res.send("This is working")
    res.render("index", {title: "Home"})
})

// 1 query parameter for data filtering

// app.get
// app.post
// app.patch
// app.delete
//

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})