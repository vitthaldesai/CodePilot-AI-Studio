import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Review from "../pages/Review";
import History from "../pages/History";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ReviewDetails from "../pages/ReviewDetails";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/review"
                    element={
                        <ProtectedRoute>
                            <Review />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/review/:id"
                    element={<ReviewDetails />}
                />

                <Route
                    path="/history/:id"
                    element={<ReviewDetails />}
                />

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}