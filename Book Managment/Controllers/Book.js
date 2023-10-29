const Book = require("../Models/Book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      success: true,
      books: books,
      length: books.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.postBook = async (req, res) => {
  try {
    const { title, isbn_no, author_name, genre, inventory, publication_year } =
      req.body;

    if (
      !title ||
      !isbn_no ||
      !author_name ||
      !genre ||
      !inventory ||
      !publication_year
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    if (inventory < 0) {
      return res.status(400).json({
        success: false,
        message: "Inventory cannot be negative",
      });
    }

    const bookExist = await Book.findOne({ isbn_no });
    if (bookExist) {
      return res.status(400).json({
        success: false,
        message: "Book already exists",
      });
    }

    const newBook = await Book.create({
      title: title,
      isbn_no: isbn_no,
      author_name: author_name,
      genre: genre,
      inventory: inventory,
      publication_year: publication_year,
    });

    return res.status(200).json({
      success: true,
      message: "Book created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide book id",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      book: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, isbn_no, author_name, genre, inventory, publication_year } =
      req.body;

    if (inventory < 0) {
      return res.status(400).json({
        success: false,
        message: "Inventory cannot be negative",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide book id",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book does not exist",
      });
    }
    const updateFields = {
      title: title,
      isbn_no: isbn_no,
      author_name: author_name,
      genre: genre,
      inventory: inventory,
      publication_year: publication_year,
    };

    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    const updatedBook = await Book.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: updatedBook,
      message: "Book updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide book id",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book does not exist",
      });
    }

    await Book.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
