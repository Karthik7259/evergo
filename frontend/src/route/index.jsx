import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";

import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Otpverfication from "../pages/Otpverfication";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import Categorypage from "../pages/Categorypage";
import SubCategorypage from "../pages/SubCategorypage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermission from "../layouts/AdminPermission";



const router= createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
            path: "",
            element:<Home/>
            },
            {
                path:"search",
                element:<SearchPage/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
          },
          {
            path:"forgot-password",
            element:<ForgotPassword/>
          },
          {
            path:"verifcation-otp",
            element: <Otpverfication/>
          },{
            path:"reset-password",
            element: <ResetPassword/>
          },{
          path:"user",
          element:<UserMenuMobile/>
          },
          {
            path:"dashboard",
            element:<Dashboard/>,
            children : [
              {
                path:"profile",
                element:<Profile/>
              },{
                 path:"myorders",
                element:<MyOrders/>

              },
              {
                 path:"address",
                element:<Address/>

              },{
                path:'category',
                element: <AdminPermission> <Categorypage/> </AdminPermission>
              },{
                path:'subcategory',
                element:<AdminPermission> <SubCategorypage/> </AdminPermission>
              },{
                path:'upload-product',
                element:<AdminPermission> <UploadProduct/> </AdminPermission>
              },{
                path:'product',
                element:<AdminPermission> <ProductAdmin/> </AdminPermission>
              }
            ]
          }

          
        ]

    }
])

export default router;