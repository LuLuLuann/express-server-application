const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("This is books route")

    // render is pointing to our views
    // res.render("about", {title: "About Pizza"})
})

module.exports = router