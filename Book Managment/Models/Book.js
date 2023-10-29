const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isbn_no: {
      type: String,
      unique: true,
      validate: {
        validator: function (value) {
          return /^(?:\d{9}[\dXx])$/.test(value);
        },
        message: "Invalid ISBN format",
      },
    },
    author_name: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    inventory: {
      type: Number,
      default: 0,
      min: 0,
    },
    publication_year: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 1800 && value <= new Date().getFullYear();
        },
        message: "Publication year should be a valid year",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
