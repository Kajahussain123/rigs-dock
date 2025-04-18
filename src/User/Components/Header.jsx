import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Container, InputGroup } from "react-bootstrap";
import { FaSearch, FaUser, FaHeart, FaStore, FaShoppingCart, FaBars, FaHome } from "react-icons/fa";
import LoginModal from "./LoginModel";
import { useNavigate } from "react-router-dom";
import { cartCount, getAllProducts } from "../../Services/allApi"; // Import getAllProducts
import { ToastContainer } from "react-toastify";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.paddingBottom = "70px";

    return () => {
      document.body.style.paddingBottom = "0";
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const isLoggedIn = () => {
    return localStorage.getItem("userId") !== null;
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const data = await cartCount(userId);
        setCartItemsCount(data.cartCount || 0);
      }
    };

    fetchCartCount();

    // Listen for custom event
    window.addEventListener("cartUpdated", fetchCartCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, []);


  const handleProtectedNavigation = (e, path) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      setShowLoginModal(true);
    } else {
      navigate(path);
    }
  };
  useEffect(() => {
    // Dynamically set padding based on header height
    const header = document.querySelector('.fixed-top');
    if (header) {
      const headerHeight = header.offsetHeight;
      document.body.style.paddingTop = `${headerHeight}px`;
    }
  }, []);

  return (
    <>
      <Navbar expand="lg" className="py-2 shadow-b fixed-top" 
        style={{
          backgroundColor: "#0A5FBF",
          zIndex: 1050,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }}>     
        <Container>
          <Navbar.Brand href="/" className="me-3">
            <img src="https://i.postimg.cc/MKZkQfTh/logo.png" alt="Logo" height="40" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav">
            <FaSearch color="white" size={24} />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav" className="justify-content-between">
            <Form className="d-flex flex-grow-1 mx-lg-3 mt-2 mt-lg-0" style={{ maxWidth: "600px", position: "relative" }} onSubmit={handleSearch}>
              <InputGroup style={{ width: "100%" }}>
                <FormControl
                  type="text"
                  placeholder="Search for products"
                  className="border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="light" className="d-flex align-items-center" type="submit">
                  <FaSearch />
                </Button>
              </InputGroup>
              {filteredProducts.length > 0 && (
                <div
                  className="position-absolute bg-white shadow-lg mt-1"
                  style={{
                    width: "100%", // Match the width of the search bar
                    zIndex: 1000,
                    top: "100%",
                    left: 0,
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {filteredProducts.map(product => (
                    <div
                      key={product._id}
                      className="p-2 hover-bg-light cursor-pointer"
                      onClick={() => {
                        setSearchQuery(product.name);
                        setFilteredProducts([]);
                      }}
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
            </Form>

            <Nav className="d-none d-lg-flex align-items-center" style={{ gap: "15px" }}>
              <Nav.Link
                href="#"
                className="text-white d-flex align-items-center"
                onClick={(e) => handleProtectedNavigation(e, "/wishlist")}
              >
                <FaHeart size={20} />
              </Nav.Link>
              <Nav.Link
                href="#"
                className="text-white d-flex align-items-center"
                onClick={(e) => handleProtectedNavigation(e, "/seller")}
              >
                <FaStore size={20} />
                <span style={{ fontFamily: `"Montserrat", sans-serif` }} className="d-none d-md-inline ms-1">Become a Seller</span>
              </Nav.Link>
              <Nav.Link href="#" className="text-white position-relative d-flex align-items-center" onClick={(e) => handleProtectedNavigation(e, "/cart")}>
                <FaShoppingCart size={20} />
                {isLoggedIn() && cartItemsCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark" style={{ fontSize: "12px" }}>
                    {cartItemsCount}
                  </span>
                )}
              </Nav.Link>
              <Nav.Link
                href="#"
                className="text-white d-flex align-items-center"
                onClick={(e) => handleProtectedNavigation(e, "/profile")}
              >
                <FaUser size={20} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        className="d-flex d-lg-none position-fixed bottom-0 start-0 w-100 bg-white shadow-lg py-2"
        style={{
          zIndex: 1050,
          height: "60px",
          borderTop: "1px solid #eee"
        }}
      >
        <Nav className="w-100 d-flex justify-content-around">
          <Nav.Link href="/" className="text-dark d-flex flex-column align-items-center">
            <FaHome size={22} />
            <small>Home</small>
          </Nav.Link>
          <Nav.Link
            href="#"
            className="text-dark position-relative d-flex flex-column align-items-center"
            onClick={(e) => handleProtectedNavigation(e, "/cart")}
          >
            <FaShoppingCart size={20} />
            <small>Cart</small>
            {isLoggedIn() && cartItemsCount > 0 && (
              <span
                className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-white"
                style={{ fontSize: "10px", right: "5px", top: "2px" }}
              >
                {cartItemsCount}
              </span>
            )}
          </Nav.Link>
          <Nav.Link
            href="#"
            className="text-dark d-flex flex-column align-items-center"
            onClick={(e) => handleProtectedNavigation(e, "/wishlist")}
          >
            <FaHeart size={20} />
            <small>Wishlist</small>
          </Nav.Link>
         
          
          <Nav.Link
            href="#"
            className="text-dark d-flex flex-column align-items-center"
            onClick={(e) => handleProtectedNavigation(e, "/seller")}
          >
            <FaStore size={20} />
            <small>Seller</small>
          </Nav.Link>
          <Nav.Link
            href="#"
            className="text-dark d-flex flex-column align-items-center"
            onClick={(e) => handleProtectedNavigation(e, "/profile")}
          >
            <FaUser size={20} />
            <small>Profile</small>
          </Nav.Link>
        </Nav>
      </div>

      <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
        <ToastContainer></ToastContainer>
    </>
  );
};

export default Header;