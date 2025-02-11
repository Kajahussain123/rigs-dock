import React from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Container } from "react-bootstrap";
import { FaSearch, FaUser, FaHeart, FaStore, FaShoppingCart, FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar style={{ backgroundColor: "#0A5FBF" }} expand="lg" className="py-2">
      <Container fluid>
        {/* Logo on the left */}
        <Navbar.Brand href="/" className="me-auto">
          <img src="https://i.postimg.cc/MKZkQfTh/logo.png" alt="Logo" height="40" />
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" className="ms-auto">
          <FaBars color="white" size={24} />
        </Navbar.Toggle>

        {/* Collapsible Content */}
        <Navbar.Collapse id="navbar-nav">
          {/* Search Bar */}
          <Form className="d-flex flex-grow-1 mx-3 my-2 my-lg-0" style={{ maxWidth: "600px" }}>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
                All categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#category1">Category 1</Dropdown.Item>
                <Dropdown.Item href="#category2">Category 2</Dropdown.Item>
                <Dropdown.Item href="#category3">Category 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <FormControl type="text" placeholder="Search for products" className="mx-2" />
            <Button variant="light" className="d-flex align-items-center">
              <FaSearch />
            </Button>
          </Form>

          {/* Icons */}
          <Nav className="d-flex align-items-center ms-auto" style={{ gap: "20px" }}>
            <Nav.Link href="#profile" className="text-white">
              <FaUser size={20} />
            </Nav.Link>
            <Nav.Link href="#wishlist" className="text-white">
              <FaHeart size={20} />
            </Nav.Link>
            <Nav.Link href="#seller" className="text-white">
              <FaStore size={20} /> <span className="d-none d-md-inline">Become a Seller</span>
            </Nav.Link>
            <Nav.Link href="#cart" className="text-white position-relative">
              <FaShoppingCart size={20} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark"
                style={{ fontSize: "12px" }}
              >
                4
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;