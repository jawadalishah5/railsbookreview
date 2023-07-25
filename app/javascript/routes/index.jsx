import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "../components/Books";
import Book from "../components/Book";
import ReviewForm from "../components/ReviewForm";



export default (
  <Router>
    <Routes>
      <Route path="/" element={<Books/>} />
      {/* <Route path="/books" element={<Books />} /> */}
      <Route path="/book/:id" element={<Book />} />
      <Route path="/new" element={<ReviewForm />} />
    </Routes>
  </Router>
);