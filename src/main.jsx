import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer} from 'react-toastify';
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from 'react-router';
import Home from './Components/Home/Home.jsx';
import RootLayout from './Layout/RootLayout.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import Login from './Components/LogIn/Login.jsx';
import Register from './Components/Register/Register.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import MyBids from './Components/MyBids/Mybids.jsx';
import PrivateRouter from './Route/PrivateRouter.jsx';
import MyProducts from './Components/MyProducts/MyProducts.jsx';
import AllProducts from './Components/AllProducts/AllProducts.jsx';
import Loading from './Components/Loading/Loading.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    HydrateFallback: Loading,
    children : [
        {
          index: true,
          Component: Home
        },
        {
          path: 'productDetails/:id',
          loader: ({params})=> fetch(`http://localhost:3000/products/${params.id}`),
          element: <PrivateRouter> <ProductDetails/> </PrivateRouter>
          // Component: ProductDetails
        },
        {
          path: 'allProducts',
          Component: AllProducts
        },
        {
          path: 'myProducts',
          element: <PrivateRouter> <MyProducts/> </PrivateRouter>
        },
        {
          path: 'myBids',
          element: <PrivateRouter> <MyBids/> </PrivateRouter>
        },
        {
          path: '/register',
          Component: Register
        },
        {
          path: '/login',
          Component: Login
        }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </StrictMode>,
)
