import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Habits from "../pages/Habits";
import Analytics from "../pages/Analytics";
import AIInsights from "../pages/AIInsights";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";

import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Landing />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/habits"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Habits />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Analytics />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/insights"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <AIInsights />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Notifications />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}