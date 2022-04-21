import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AuthContextProvider from "./context/AuthContextProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import PrivateRoute from "./privateRoutes/PrivateRoute";
axios.defaults.withCredentials = true;

function App() {
    return (
        <AuthContextProvider>
            <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
        </AuthContextProvider>
    );
}

export default App;
