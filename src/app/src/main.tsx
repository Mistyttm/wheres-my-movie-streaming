import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/home.tsx";
import MoviePage from "./pages/moviePage.tsx";
import TvPage from "./pages/tvPage.tsx";
import Example from "./pages/example.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/movie" element={<MoviePage />} />
            <Route path="/tv" element={<TvPage />} />
            <Route path="/example" element={<Example />} />
        </Routes>
    </BrowserRouter>
);
