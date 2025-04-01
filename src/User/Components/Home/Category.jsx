import React, { useState, useEffect } from "react";
import { Box, Container, Menu, MenuItem, CircularProgress, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { viewCategories, viewMainCategories, viewSubCategories } from "../../../Services/allApi";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CategoryNav = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState({});
  const [anchorEls, setAnchorEls] = useState({});
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeMainCategory, setActiveMainCategory] = useState(null);

  const BASE_URL = "https://rigsdock.com/uploads/";

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const data = await viewMainCategories();
        setMainCategories(data.mainCategories);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch main categories", error);
        setLoading(false);
      }
    };
    fetchMainCategories();
  }, []);

  const handleClick = async (event, mainCatId) => {
    setAnchorEls({ ...anchorEls, [mainCatId]: event.currentTarget });
    if (!categories[mainCatId]) {
      try {
        const data = await viewCategories(mainCatId);
        setCategories((prev) => ({ ...prev, [mainCatId]: data }));
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
  };

  const handleClose = (mainCatId) => {
    setAnchorEls({ ...anchorEls, [mainCatId]: null });
    setSubmenuAnchorEl(null);
  };

  const handleSubmenuOpen = async (event, mainCatId, catId) => {
    setSubmenuAnchorEl(event.currentTarget);
    setActiveMainCategory(mainCatId);

    if (!subCategories[catId]) {
      try {
        const data = await viewSubCategories(mainCatId, catId);
        setSubCategories((prev) => ({ ...prev, [catId]: data }));
        setSubmenuItems(data);
      } catch (error) {
        console.error("Failed to fetch subcategories", error);
      }
    } else {
      setSubmenuItems(subCategories[catId]);
    }
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  const handleSubcategoryClick = (catId, subCatId) => {
    if (!activeMainCategory) {
      console.error("Main category ID is missing!");
      return;
    }
    navigate(`/products/${activeMainCategory}/${catId}/${subCatId}`);
  };

  return (
    <Container maxWidth="lg">
      {/* Heading: Our Categories */}
     <Typography variant="h5" component="h2" sx={{ fontFamily: `"Montserrat", sans-serif`,mt:2 }}>
               <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif`, }}>Our</Box> Categoires
             </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        py={3}
        px={2}
        bgcolor="white"
        borderRadius={2}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          mainCategories.map((mainCategory) => (
            <Box key={mainCategory._id}>
              <Box
                onClick={(e) => handleClick(e, mainCategory._id)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {/* Display Main Category Image */}
                <Box
                  component="img"
                  src={`${BASE_URL}${mainCategory.image}`}
                  alt={mainCategory.name}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    objectFit: "cover",
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: "text.primary",
                    fontFamily: `"Montserrat", sans-serif`,
                  }}
                >
                  {mainCategory.name} <ArrowDropDownIcon/>
                </Typography>
              </Box>

              {/* Main Category Dropdown */}
              <Menu
                anchorEl={anchorEls[mainCategory._id]}
                open={Boolean(anchorEls[mainCategory._id])}
                onClose={() => handleClose(mainCategory._id)}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  },
                }}
              >
                {(categories[mainCategory._id] || []).map((category) => (
                  <MenuItem
                    key={category._id}
                    onMouseEnter={(e) => handleSubmenuOpen(e, mainCategory._id, category._id)}
                    sx={{
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        fontFamily: `"Montserrat", sans-serif`,
                      }}
                    >
                      {category.name} <ArrowRightIcon/>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>

              {/* Subcategory Dropdown */}
              <Menu
                anchorEl={submenuAnchorEl}
                open={Boolean(submenuAnchorEl)}
                onClose={handleSubmenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  },
                }}
              >
                {submenuItems.map((subItem) => (
                  <MenuItem
                    key={subItem._id}
                    onClick={() => handleSubcategoryClick(subItem.category._id, subItem._id)}
                    sx={{
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        fontFamily: `"Montserrat", sans-serif`,
                      }}
                    >
                      {subItem.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ))
        )}
      </Box>
    </Container>
  );

};

export default CategoryNav;