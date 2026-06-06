import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Treatments from "@/pages/Treatments";
import Stories from "@/pages/Stories";
import Book from "@/pages/Book";
import ScrollToTop from "@/components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/book" element={<Book />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
