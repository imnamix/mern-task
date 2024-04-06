import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, Login, Logout, Register } from "./pages";
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/logout",
    element: <Logout />,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
    </>
  )
}

export default App;
