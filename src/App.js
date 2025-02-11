import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './User/Pages/Home';
import ProductView from './User/Pages/ProductView';
import Products from './User/Pages/Products';
import Profile from './User/Pages/Profile';
import WishlistPage from './User/Components/Profile/MyWishlist';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/single' element={<ProductView></ProductView>}></Route>
        <Route path='/products' element={<Products></Products>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>


      </Routes>
    </div>
  );
}

export default App;
