


export const PORT = process.env.PORT || 5555;

// Use environment variable in production, fallback for development
export const mongoDBURL = process.env.MONGODB_URL || 'mongodb+srv://root:root@bookstore.eq0hudx.mongodb.net/books-collection?retryWrites=true&w=majority&appName=BookStore';