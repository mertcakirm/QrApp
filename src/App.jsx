import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MenuContents from "./pages/MenuContents.jsx";
import Menus from "./pages/Menus.jsx";
import MenuContentsList from "./pages/MenuContentsList.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/menu-content" element={<MenuContents />}></Route>
                <Route path="/menu-content-list" element={<MenuContentsList />}></Route>
                <Route path="/menus/:name" element={<Menus />}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
