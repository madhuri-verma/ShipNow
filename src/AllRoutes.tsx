//pages
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Error from "./pages/error"; 
import User from "./pages/user";
//home-pages
import { LetterSelectionGuest } from "./pages/home/letterSelectionGuest";
import { PackageSelectionGuest } from "./pages/home/packageSelectionGuest";
//user-pages
import Quote from "./pages/user/quote";
import SavedQuote from "./pages/user/saved-quote";
import Shipment from "./pages/user/shipment";
import Setting from "./pages/user/accountSetting";
import Letter from "./pages/user/quote/letter";
import CheckoutPage from "./pages/user/saved-quote/checkOut/CheckOut";
import Package from "./pages/user/quote/package";
//admin-pages
import Admin from "./pages/admin";
import AdminSavedQuote from "./pages/admin/savedQuotes";
import Verification from "./pages/signup/verification";
import Auth from "./Auth";
import { ForgotPassword } from "./pages/login/forgetPassword";
import ResetPassword from "./pages/login/resetPassword";
import AllUsers from "./pages/admin/user";
import Reports from "./pages/admin/reports";
import AllShipment from "./pages/admin/shipment";
import DeleteUser from "./pages/user/accountSetting/deleteUser";
import VerifyDeletingUser from "./pages/user/accountSetting/deleteUser/verification";
import ChangePassword from "./pages/user/accountSetting/changePassword";
import { Route, Routes } from "react-router-dom";
import { RouteConstant } from "./constants/routes";
import UpdateUser from "./pages/admin/user/updateUser";
import ShipmentDetail from "./pages/admin/shipment/shipmentDetail/shipment";

export const AllRoutes = () => (
  <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path={RouteConstant.HOME} element={<Home />} />
    <Route path="/home" element={<Home />}>
      <Route path="/home/letter-selection" element={<LetterSelectionGuest />} />
      <Route
        path="/home/package-selection"
        element={<PackageSelectionGuest />}
      />
    </Route>

    <Route path="/mail/account-verification-mail" element={<Verification />} />
    <Route
      path="/user"
      element={
        <Auth>
          <User />
        </Auth>
      }
    >
      <Route path="/user/quote" element={<Quote />}>
        <Route path="/user/quote/letter" element={<Letter />} />
        <Route path="/user/quote/package" element={<Package />} />
      </Route>
      <Route path="/user/saved-quotes" element={<SavedQuote />} />
      <Route path="/user/shipment" element={<Shipment />} />
      <Route path="/user/setting" element={<Setting />} />
      <Route
        path="/user/setting/change-password"
        element={<ChangePassword />}
      />
      <Route
        path="/user/setting/delete-verification"
        element={<VerifyDeletingUser />}
      />
    </Route>
    <Route path="/mail/delete-verification-mail" element={<DeleteUser />} />
    <Route path="/user/quote/checkout" element={<CheckoutPage />} />

    <Route
      path="/admin"
      element={
        <Auth>
          <Admin />
        </Auth>
      }
    >
      <Route path="/admin/saved-quotes" element={<AdminSavedQuote />} />
      <Route path="/admin/all-users" element={<AllUsers />} />
      <Route path="/admin/all-users/update/:id" element={<UpdateUser />} />
      <Route path="/admin/report" element={<Reports />} />
      <Route path="/admin/all-shipment" element={<AllShipment />} />
      <Route
        path="/admin/all-shipment/details/:id"
        element={<ShipmentDetail />}
      />
    </Route>
    <Route
      path="/login/reset-password-verification"
      element={<ResetPassword />}
    />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="*" element={<Error />} />
  </Routes>
);
