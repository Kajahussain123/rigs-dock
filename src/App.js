import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './User/Pages/Home';
import ProductView from './User/Pages/ProductView';
import Products from './User/Pages/Products';
import Profile from './User/Pages/Profile';
import WishlistPage from './User/Components/Profile/MyWishlist';
import Cart from './User/Pages/Cart';
import MyOrders from './User/Pages/MyOrders';
import Checkout from './User/Pages/Checkout';
import Seller from './User/Pages/Seller';
import LoginPage from './User/Pages/Login';
import RegisterPage from './User/Pages/Register';
import Wishlist from './User/Pages/Wishlist';
import OrderDetails from './User/Components/Profile/OrderDetails';
import ProductReview from './User/Components/Profile/AddReviews';
import OrderConfirmed from './User/Pages/OrderConfirmed';
import DealOfTheDay from './User/Pages/DealOfTheDay';
import AllProducts from './User/Pages/AllProducts';
import SearchProducts from './User/Pages/SearchProducts';
import ContactUs from './User/Pages/ContactUs';
import TermsAndConditions from './User/Pages/TermsAndConditions';
import CancellationRefundPolicy from './User/Pages/Cancellations';
import PaymentSuccess from './User/Pages/PaymentSuucess';
import PrivacyPolicy from './User/Pages/Privacy';
import ShippingPolicy from './User/Pages/ShippingPolicy';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/single/:productId' element={<ProductView></ProductView>}></Route>
        <Route path='/products/:mainCatId/:catId/:subCatId' element={<Products></Products>}></Route>
        <Route path="/profile/*" element={<Profile />} /> 
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/myorders' element={<MyOrders></MyOrders>}></Route>
        <Route path='/checkout' element={<Checkout></Checkout>}></Route>
        <Route path='/seller' element={<Seller></Seller>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
        <Route path='/wishlist' element={<Wishlist></Wishlist>}></Route>
        <Route path='/orderDetails' element={<OrderDetails></OrderDetails>}></Route>
        <Route path='/addReview' element={<ProductReview></ProductReview>}></Route>
        <Route path='/order-confirmation' element={<OrderConfirmed></OrderConfirmed>}></Route>
        <Route path='/dealoftheday' element={<DealOfTheDay></DealOfTheDay>}></Route>
        <Route path='/allproducts' element={<AllProducts></AllProducts>}></Route>
        <Route path="/search/:searchQuery" element={<SearchProducts />} />
        <Route path='/contactus' element={<ContactUs></ContactUs>}></Route>
        <Route path='/terms' element={<TermsAndConditions></TermsAndConditions>}></Route>
        <Route path='/cancellation' element={<CancellationRefundPolicy></CancellationRefundPolicy>}></Route>
        <Route path='/payment-status' element={<PaymentSuccess></PaymentSuccess>}></Route>
        <Route path='/privacy' element={<PrivacyPolicy></PrivacyPolicy>}></Route>
        <Route path='/shipping' element={<ShippingPolicy></ShippingPolicy>}></Route>




      </Routes>
    </div>
  );
}

export default App;
