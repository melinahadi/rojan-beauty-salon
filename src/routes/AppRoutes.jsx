import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import LoginPage from "../pages/LoginPage";
import RequireAuth from "./RequireAuth";
import RequireAdmin from "./RequireAdmin";
import AdminLayout from "../components/admin/AdminLayout";
import AdminAppointments from "../pages/admin/AdminAppointments";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import MyAppointmentsPage from "../pages/MyAppointmentsPage";
import AdminServices from "../pages/admin/AdminServices";
import AdminStylists from "../pages/admin/AdminStylists";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "booking",
        element: (
          <RequireAuth>
            <BookingPage />
          </RequireAuth>
        ),
      },
      {
        path: "my-appointments",
        element: (
          <RequireAuth>
            <MyAppointmentsPage />
          </RequireAuth>
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "appointments", element: <AdminAppointments /> },
      { path: "services", element: <AdminServices /> },
      { path: "stylists", element: <AdminStylists /> },
    ],
  },
]);

export default router;
