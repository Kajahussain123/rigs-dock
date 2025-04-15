import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography, Slider, Chip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";

const FilterCategory = ({ onFilterChange, products = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [priceRange, setPriceRange] = useState([500, 1500]);
  const [rating, setRating] = useState(3);
  const [activeFilters, setActiveFilters] = useState({});

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
    const newBrand = brand === selectedBrand ? null : brand;
    setSelectedBrand(newBrand);
    applyFilters({ brand: newBrand });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  
  const applyPriceFilter = () => {
    applyFilters({ priceRange });
  };
  
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };
  
  const applyRatingFilter = () => {
    applyFilters({ rating });
  };

  const applyFilters = (newFilters) => {
    const updatedFilters = { ...activeFilters, ...newFilters };
    
    // Remove filters with null/undefined values
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key] === null || updatedFilters[key] === undefined) {
        delete updatedFilters[key];
      }
    });

    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters);
    handleClose();
  };

  const removeFilter = (filterType) => {
    let updatedFilters = { ...activeFilters };
    delete updatedFilters[filterType];
    
    // Reset the corresponding state
    if (filterType === 'brand') setSelectedBrand(null);
    if (filterType === 'priceRange') setPriceRange([500, 1500]);
    if (filterType === 'rating') setRating(3);
    
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const removeAllFilters = () => {
    setSelectedBrand(null);
    setPriceRange([500, 1500]);
    setRating(3);
    setActiveFilters({});
    onFilterChange({});
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 5, mt: -5 }}>
      {/* Active Filters Display */}
      {Object.keys(activeFilters).length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Typography variant="body2" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
            Active Filters:
          </Typography>
          {activeFilters.brand && (
            <Chip
              label={`Brand: ${activeFilters.brand}`}
              onDelete={() => removeFilter('brand')}
              deleteIcon={<ClearIcon />}
              sx={{ fontFamily: `"Montserrat", sans-serif` }}
            />
          )}
          {activeFilters.priceRange && (
            <Chip
              label={`Price: ₹${activeFilters.priceRange[0]} - ₹${activeFilters.priceRange[1]}`}
              onDelete={() => removeFilter('priceRange')}
              deleteIcon={<ClearIcon />}
              sx={{ fontFamily: `"Montserrat", sans-serif` }}
            />
          )}
          {activeFilters.rating && (
            <Chip
              label={`Rating: ${activeFilters.rating} ⭐`}
              onDelete={() => removeFilter('rating')}
              deleteIcon={<ClearIcon />}
              sx={{ fontFamily: `"Montserrat", sans-serif` }}
            />
          )}
          <Button
            size="small"
            onClick={removeAllFilters}
            sx={{ 
              textTransform: "none",
              fontFamily: `"Montserrat", sans-serif`,
              color: "darkred",
              fontWeight: "bold"
            }}
          >
            Clear All
          </Button>
        </Box>
      )}

      {/* Filter Buttons */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: 2, 
        flexWrap: "wrap" 
      }}>
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
              backgroundColor: selectedBrand ? "#e0e0e0" : "inherit",
            }}
          >
            {selectedBrand ? `Brand: ${selectedBrand}` : "Filter by Brand"}
          </Button>

          <Menu 
            anchorEl={anchorEl} 
            open={selectedFilter === "Filter by Brand"} 
            onClose={handleClose}
            sx={{ fontFamily: `"Montserrat", sans-serif` }}
          >
            <MenuItem 
              onClick={() => handleBrandSelect(null)}
              sx={{ 
                fontFamily: `"Montserrat", sans-serif`,
                fontWeight: !selectedBrand ? "bold" : "normal",
                color: !selectedBrand ? "darkred" : "inherit"
              }}
            >
              View All Brands
            </MenuItem>
            {brands.map((brand) => (
              <MenuItem 
                key={brand} 
                onClick={() => handleBrandSelect(brand)}
                sx={{ 
                  fontFamily: `"Montserrat", sans-serif`,
                  fontWeight: selectedBrand === brand ? "bold" : "normal",
                  color: selectedBrand === brand ? "darkred" : "inherit"
                }}
              >
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
              backgroundColor: activeFilters.priceRange ? "#e0e0e0" : "inherit",
            }}
          >
            {activeFilters.priceRange 
              ? `Price: ₹${activeFilters.priceRange[0]}-${activeFilters.priceRange[1]}` 
              : "Filter by Price"}
          </Button>

          <Menu anchorEl={anchorEl} open={selectedFilter === "Filter by Price"} onClose={handleClose}>
            <Box sx={{ textAlign: "center", width: "300px", p: 2 }}> 
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold" }}>
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={500}
                max={3000}
                sx={{ width: "90%", color: "blue" }}
              />
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                Selected: ₹{priceRange[0]} - ₹{priceRange[1]}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 1 }}>
                <Button
                  variant="outlined"
                  sx={{ 
                    fontFamily: `"Montserrat", sans-serif`,
                    color: "black",
                    fontWeight: "bold",
                    borderColor: "black"
                  }}
                  onClick={() => {
                    setPriceRange([500, 1500]);
                    removeFilter('priceRange');
                    handleClose();
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  sx={{ 
                    fontFamily: `"Montserrat", sans-serif`,
                    backgroundColor: "darkred", 
                    color: "white", 
                    fontWeight: "bold" 
                  }}
                  onClick={applyPriceFilter}
                >
                  Apply
                </Button>
              </Box>
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
              backgroundColor: activeFilters.rating ? "#e0e0e0" : "inherit",
            }}
          >
            {activeFilters.rating 
              ? `Rating: ${activeFilters.rating}⭐` 
              : "Filter by Rating"}
          </Button>

          <Menu anchorEl={anchorEl} open={selectedFilter === "Filter by Rating"} onClose={handleClose}>
            <Box sx={{ textAlign: "center", width: "300px", p: 2 }}> 
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold" }}>
                Select Minimum Rating
              </Typography>
              <Slider
                value={rating}
                onChange={handleRatingChange}
                valueLabelDisplay="auto"
                min={1}
                max={5}
                step={0.5}
                sx={{ width: "90%", color: "blue" }}
              />
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                Selected: {rating} ⭐
              </Typography>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 1 }}>
                <Button
                  variant="outlined"
                  sx={{ 
                    fontFamily: `"Montserrat", sans-serif`,
                    color: "black",
                    fontWeight: "bold",
                    borderColor: "black"
                  }}
                  onClick={() => {
                    setRating(3);
                    removeFilter('rating');
                    handleClose();
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  sx={{ 
                    fontFamily: `"Montserrat", sans-serif`,
                    backgroundColor: "darkred", 
                    color: "white", 
                    fontWeight: "bold" 
                  }}
                  onClick={applyRatingFilter}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterCategory;