import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// user login
export const login = async (reqBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/login`, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
};

export const sendOTP = async (mobileNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/send-otp`, { mobileNumber });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

// Verify OTP
// Correctly format the verifyOTP function
export const verifyOTP = async (mobileNumber, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/verify-otp`, { 
      mobileNumber, 
      otp,
      sessionId: localStorage.getItem('sessionId') // Include this if your API requires it
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

// Register with Mobile
export const registerWithMobile = async (name, email, mobileNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/auth/register-with-mobile`, { name, email, mobileNumber });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// view main categories
export const viewMainCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/maincategory/get`, {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register', error);
    throw error;
  }
};

// view categories
export const viewCategories = async (mainCatId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/category/view/${mainCatId}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register', error);
    throw error;
  }
};

// view sub categories
export const viewSubCategories = async (mainCatId, catId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/subcategory/view/${mainCatId}/${catId}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register', error);
    throw error;
  }
};

// view products
export const viewProducts = async (mainCatId, catId, subCatId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/product/get/${mainCatId}/${catId}/${subCatId}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register', error);
    throw error;
  }
};

// view products by id
export const viewProductsById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/product/get/${productId}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to register', error);
    throw error;
  }
};

// add to cart
export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/cart/add`, {
      userId,
      productId,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add to cart", error);
    throw error;
  }
};

export const removeCart = async (userId, productId) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/cart/remove`, {
      userId,
      productId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add to cart", error);
    throw error;
  }
};

// view cart
export const viewCart = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/cart/${userId}`, {
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get cart", error);
    throw error;
  }
};

// add to cart
export const applyCoupon = async (userId, couponCode) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/cart/apply-coupon`, {
      userId,
      couponCode,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to apply coupon", error);
    throw error;
  }
};

export const removeCoupon = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/cart/remove-coupon`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to apply coupon", error);
    throw error;
  }
};

// add to wishlist 
export const addToWishlist = async (userId, productId) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/wishlist/add`, {
      userId,
      productId
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add to wishlist", error);
    throw error;
  }
};

export const getWishlist = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/wishlist/${userId}`, {
    });
    return response.data.products;
    } catch (error) {
    console.error("Failed to get cart", error);
    throw error;
  }
};

export const removeWishlist = async (userId, productId) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/wishlist/remove`, {
      userId,
      productId
    });
    return response.data;
  } catch (error) {
    console.error("Failed to remove item from wishlist", error);
    throw error;
  }
};

export const getLatestProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/product/get`);
    const sortedProducts = response.data.products
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest
      .slice(0, 6); // Get latest 6 products
    return sortedProducts;
  } catch (error) {
    console.error("Failed to fetch latest products", error);
    throw error;
  }
};

export const dealOfTheDay = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/dealoftheday/get`, {
    });
    return response.data;
    } catch (error) {
    console.error("Failed to get cart", error);
    throw error;
  }
};

export const checkout = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/checkout/create/`, {
      userId,
      
    });
    return response.data;
  } catch (error) {
    console.error("Failed to remove item from wishlist", error);
    throw error;
  }
};

export const viewCheckout = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/checkout/view/${userId}`, {
    });
    return response.data;
  } catch (error) {
    console.error("Failed to remove item from wishlist", error);
    throw error;
  }
};

export const userAddressView = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/address/${userId}`, {
    });
    return response.data;
  } catch (error) {
    console.error("Failed to remove item from wishlist", error);
    throw error;
  }
};

export const confirmOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/order/place-order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Failed to place order", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/product/get`, {
    });
    return response.data.products;
  } catch (error) {
    console.error("Failed to get products", error);
    throw error;
  }
};

export const getProfile = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/auth/profile/${id}`, {
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get products", error);
    throw error;
  }
};

export const addAddress = async(reqBody)=>{
  try{
    const response=await axios.post(`${BASE_URL}/user/address/add`, reqBody,{
    });
    return response.data;
  } catch (error){
    console.error("Failed to add address",error);
    throw error;
  }
}

export const deleteAddress = async(addressId)=>{
  try{
    const response=await axios.delete(`${BASE_URL}/user/address/delete/${addressId}`,{
    });
    return response.data;
  } catch (error){
    console.error("Failed to delete address",error);
    throw error;
  }
}

export const userOrders = async(id)=>{
  try{
    const response=await axios.get(`${BASE_URL}/user/order/user/${id}`,{
    });
    return response.data;
  } catch (error){
    console.error("Failed to delete address",error);
    throw error;
  }
}

export const orderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/order/${orderId}`);
    console.log("Fetched Order Data:", response.data); // ✅ Debugging log
    return response.data;
  } catch (error) {
    console.error("Failed to fetch order details", error);
    throw error;
  }
};

export const addReviews = async(formData) => {
  try {
    // Log the form data to debug
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    
    // Make sure productId is properly set in formData
    // This is critical since the error shows it's undefined
    if (!formData.has('productId') || !formData.get('productId')) {
      throw new Error('Product ID is missing');
    }
    
    const response = await axios.post(`${BASE_URL}/user/reviews/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add review", error);
    throw error;
  }
}

export const returnOrder = async(formData) => {
  try {
    // Log the form data to debug
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    
    // Make sure productId is properly set in formData
    // This is critical since the error shows it's undefined
    if (!formData.has('productId') || !formData.get('productId')) {
      throw new Error('Product ID is missing');
    }
    
    const response = await axios.post(`${BASE_URL}/user/complaint/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add review", error);
    throw error;
  }
}

export const getUserReviews = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/reviews/user/${userId}`, {
    });
    return response.data.reviews;
  } catch (error) {
    console.error('Failed to get reviews', error);
    throw error;
  }
};

export const getSimilarProducts = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/product/get/similar/${productId}`);
    return response.data.similarProducts; // Return the similar products array
  } catch (error) {
    console.error("Failed to fetch similar products", error);
    return []; // Return an empty array in case of error
  }
};

export const vendorRegister = async (reqBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/vendor/register`, reqBody, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to login', error);
    throw error;
  }
};

// search products
export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/product/search/${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// 🎯 Filter Products by Brand
export const filterProductsByBrand = async (brand) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/product/filter-by-brand?brand=${brand}`);
    return response.data;
  } catch (error) {
    console.error("Error filtering by brand:", error);
    throw error;
  }
};

// 💰 Filter Products by Price Range
export const filterProductsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/product/filter-by-price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    return response.data;
  } catch (error) {
    console.error("Error filtering by price range:", error);
    throw error;
  }
};

// ⭐ Filter Products by Rating
export const filterProductsByRating = async (minRating) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/product/filter-by-rating?minRating=${minRating}`);
    return response.data;
  } catch (error) {
    console.error("Error filtering by rating:", error);
    throw error;
  }
};

export const updateCartQuantity = async (userId, productId, action) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/cart/update-quantity`, {
      userId,
      productId,
      action, // "increase" or "decrease"
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error.response?.data || error.message);
    throw error;
  }
};

export const cartCount = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/cart/count/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error filtering by rating:", error);
    throw error;
  }
};

export const verifyBank = async (accountNumber, ifscCode) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/vendor/verify-bank`, {
      accountNumber,
      ifscCode
    });
    
    return response.data;
  } catch (error) {
    console.error("Error verifying bank details:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Bank verification failed"
    };
  }
};