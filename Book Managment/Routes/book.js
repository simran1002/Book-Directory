const express = require("express");

const router = express.Router();

const Book_controller = require("../Controllers/Book");
const auth_middleWare = require("../Middlewares/Auth");

router.post(
  "/books",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Book_controller.postBook
);

router.get(
  "/books",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Book_controller.getAllBooks
);

router.get(
  "/books/:id",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Book_controller.getBook
);

router.put(
  "/books/:id",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Book_controller.updateBook
);

router.delete(
  "/books/:id",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Book_controller.deleteBook
);

module.exports = router;
