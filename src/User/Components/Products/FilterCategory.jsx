import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography, Slider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const FilterCategory = ({ onFilterChange, products = [] }) => { // Default to empty array
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [priceRange, setPriceRange] = useState([500, 1500]);
  const [rating, setRating] = useState(3);

  // Extract unique brands from products
  const brands = [...new Set(products.map(product => product.brand))];

  const handleClick = (event, filterName) => {
    setSelectedFilter(filterName);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFilter("");
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    applyFilters(brand, undefined, undefined);
  };
  
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  
  const applyPriceFilter = () => {
    applyFilters(undefined, priceRange, undefined);
  };
  
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };
  
  const applyRatingFilter = () => {
    applyFilters(undefined, undefined, rating);
  };
  

  const applyFilters = (brand, price, minRating) => {
    let filters = {};
  
    if (brand !== undefined) filters.brand = brand;
    if (price !== undefined) filters.priceRange = price;
    if (minRating !== undefined) filters.rating = minRating;
  
    onFilterChange(filters);
    handleClose();
  };
  

  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: 2, 
        flexWrap: "wrap", 
        mb:5,
        mt:-5
      }}
    >
      {/* Brand Dropdown */}
      <Box>
        <Button
          onClick={(e) => handleClick(e, "Filter by Brand")}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            textTransform: "none",
            border: "1px solid black",
            borderRadius: "25px",
            color: "black",
            fontWeight: "bold",
            px: 2,
            py: 1,
            fontFamily: `"Montserrat", sans-serif`,
          }}
        >
          {selectedBrand ? `Brand: ${selectedBrand}` : "Filter by Brand"}
        </Button>

        <Menu anchorEl={anchorEl} open={selectedFilter === "Filter by Brand"} onClose={handleClose}>
          {brands.map((brand) => (
            <MenuItem sx={{fontFamily: `"Montserrat", sans-serif`,}} key={brand} onClick={() => handleBrandSelect(brand)}>
              {brand}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Price Filter Dropdown */}
      <Box>
        <Button
          onClick={(e) => handleClick(e, "Filter by Price")}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            textTransform: "none",
            border: "1px solid black",
            borderRadius: "25px",
            color: "black",
            fontWeight: "bold",
            px: 2,
            py: 1,
            fontFamily: `"Montserrat", sans-serif`,
          }}
        >
          Filter by Price
        </Button>

        <Menu anchorEl={anchorEl} open={selectedFilter === "Filter by Price"} onClose={handleClose} sx={{fontFamily: `"Montserrat", sans-serif`, mt: 1 }}>
          <Box sx={{ textAlign: "center", width: "300px", p: 2 }}> 
            <Typography sx={{fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold" }}>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={500}
              max={3000}
              sx={{ width: "90%", color: "blue" }}
            />
            <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}}>Selected: ₹{priceRange[0]} - ₹{priceRange[1]}</Typography>
            <Button
              variant="contained"
              sx={{fontFamily: `"Montserrat", sans-serif`, mt: 1, backgroundColor: "darkred", color: "white", fontWeight: "bold" }}
              onClick={applyPriceFilter}
            >
              Apply
            </Button>
          </Box>
        </Menu>
      </Box>

      {/* Rating Filter Dropdown */}
      <Box>
        <Button
          onClick={(e) => handleClick(e, "Filter by Rating")}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            textTransform: "none",
            border: "1px solid black",
            borderRadius: "25px",
            color: "black",
            fontWeight: "bold",
            px: 2,
            py: 1,
            fontFamily: `"Montserrat", sans-serif`,
          }}
        >
          Filter by Rating
        </Button>

        <Menu anchorEl={anchorEl} open={selectedFilter === "Filter by Rating"} onClose={handleClose} sx={{fontFamily: `"Montserrat", sans-serif`, mt: 1 }}>
          <Box sx={{ textAlign: "center", width: "300px", p: 2 }}> 
            <Typography sx={{fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold" }}>Select Minimum Rating</Typography>
            <Slider
              value={rating}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              min={1}
              max={5}
              step={0.5}
              sx={{ width: "90%", color: "blue" }}
            />
            <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}}>Selected: {rating} ⭐</Typography>
            <Button
              variant="contained"
              sx={{fontFamily: `"Montserrat", sans-serif`, mt: 1, backgroundColor: "darkred", color: "white", fontWeight: "bold" }}
              onClick={applyRatingFilter}
            >
              Apply
            </Button>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};

export default FilterCategory;