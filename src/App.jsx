// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import ColumnFilter from "./components/pages/ColumnFilter";
import Sort from "./components/pages/Sort";
import Action from "./components/pages/Action";
import Pagination from "./components/pages/Pagination";

function App() {
  return (
    <Router>
      <Routes>
        {/* Page Example **/}
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/columnfilter" element={<ColumnFilter />} />
        <Route path="/sort" element={<Sort />} />
        <Route path="/action" element={<Action />} />
        <Route path="/pagination" element={<Pagination />} />
        {/* Not Found Page Uses **/}
        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </Router>
  );
}
export default App;