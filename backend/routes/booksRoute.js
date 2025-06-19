import express from 'express';
import { Book } from '../models/bookModels.js'; 

const router = express.Router(); 


router.get('/sum/publishYear', async (req, res) => {
    try {
        const result = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalPublishYear: { $sum: "$publishYear" }
                }
            }
        ]);

        const total = result[0]?.totalPublishYear || 0;
        return res.status(200).json({ totalPublishYear: total });
    } catch (error) {
        console.log("Aggregation error",error);
        return res.status(500).send({ message: "Failed to calculate total publish year" });
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear || !req.body.link) {
            return res.status(400).send({ message: "Please provide all required fields" });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            link: req.body.link,
        };
        const book = await Book.create(newBook); 
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

// Route to get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}); // Finding all books in the database
        return res.status(200).json({
            count: books.length, // Returning the count of books
            books: books, // Returning the list of books
        }); // Sending a response with status code 200 and the list of books
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

// Route to get a book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // Finding a book by its ID
        if (!book) {
            return res.status(404).send({ message: "Book not found" }); // Sending a response with status code 404 if the book is not found
        }
        return res.status(200).json(book); // Sending a response with status code 200 and the found book
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

// Route to update a book by ID
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // Finding a book by its ID
        if (!book) {
            return res.status(404).send({ message: "Book not found" }); // Sending a response with status code 404 if the book is not found
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Updating the book with the new data
        return res.status(200).json({ message: `Book updated to ${updatedBook.title} successfully` }); // Sending a response with status code 200 and the updated book
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

// Route to delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id); // Finding a book by its ID and deleting it
        if (!result) {
            return res.status(404).send({ message: "Book not found" }); // Sending a response with status code 404 if the book is not found
        }
        return res.status(200).json({ message: "Book deleted successfully" }); // Sending a response with status code 200 and the deleted book
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});




export default router; // Exporting the router to be used in other parts of the application
