import mongoose from 'mongoose';
// Define a schema for the book model
const bookSchema =mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        publishYear:{
            type:Number,
            required:true,
        },
        link:{
            type:String,
            required:true,
        },

},{
    timestamps:true, // Automatically add createdAt and updatedAt fields
}
)


export const Book = mongoose.model('Book', bookSchema);// Create a model named 'Cat' using the bookSchema