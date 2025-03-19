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

app.use(express.static("public"));

// setting the view engine
app.set("view engine", "ejs")

// routes

const booksRoute = require('./routes/books')
app.use('/books', booksRoute)

const onlineBookstoresRoute = require("./routes/onlineBookstores")
app.use("/onlineBookstores", onlineBookstoresRoute)

const readersRoute = require('./routes/readers')
app.use('/readers', readersRoute)


app.get("/", (req, res) => {
    res.send("This is working")
    // res.render("index", {title: "Home"})
})

// 1 query parameter for data filtering

// app.get --> get all books (opt. filter by genre)
app.get("/books", (req, res) => {
    const { genre } = req.query; // Query parameter for filtering
    if (genre) {
        const filteredBooks = books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
        return res.json(filteredBooks);
    }
    res.json(books);
});

// app.post -- adding a new book
app.post("/books", (req, res) => {
    const newBook = { id: books.length + 1, ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
});

// app.patch -- updating book availability
app.patch("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.available = req.body.available !== undefined ? req.body.available : book.available;
    res.json(book);
});

// app.delete --> remove a book by ID
app.delete("/books/:id", (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Book not found" });

    books.splice(index, 1);
    res.json({ message: "Book deleted successfully" });
});


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})