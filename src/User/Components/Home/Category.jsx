import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Menu, 
  MenuItem, 
  CircularProgress, 
  Typography,
  useMediaQuery,
  useTheme,
  Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { viewCategories, viewMainCategories, viewSubCategories } from "../../../Services/allApi";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CategoryNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState({});
  const [anchorEls, setAnchorEls] = useState({});
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeMainCategory, setActiveMainCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const BASE_URL = "https://rigsdock.com/uploads/";

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const data = await viewMainCategories();
        // Store all categories and mark last two as coming soon
        const categoriesWithStatus = data.mainCategories.map((cat, index, arr) => ({
          ...cat,
          isComingSoon: index >= arr.length - 2 // Last two categories
        }));
        setMainCategories(categoriesWithStatus);
        
        // Pre-load categories only for non-coming soon main categories
        await Promise.all(categoriesWithStatus
          .filter(cat => !cat.isComingSoon)
          .map(async (mainCat) => {
            const catData = await viewCategories(mainCat._id);
            setCategories(prev => ({ ...prev, [mainCat._id]: catData }));
            
            // Pre-load subcategories
            await Promise.all(catData.map(async (category) => {
              const subCatData = await viewSubCategories(mainCat._id, category._id);
              setSubCategories(prev => ({ ...prev, [category._id]: subCatData }));
            }));
          }));
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setLoading(false);
      }
    };
    fetchMainCategories();
  }, []);

  const handleClick = (event, mainCatId) => {
    setAnchorEls({ ...anchorEls, [mainCatId]: event.currentTarget });
  };

  const handleClose = (mainCatId) => {
    setAnchorEls({ ...anchorEls, [mainCatId]: null });
    setSubmenuAnchorEl(null);
  };

  const handleCategoryClick = (event, mainCatId, catId) => {
    event.stopPropagation();
    setActiveMainCategory(mainCatId);
    setActiveCategory(catId);
    
    if (subCategories[catId]?.length > 0) {
      setSubmenuItems(subCategories[catId]);
      setSubmenuAnchorEl(event.currentTarget);
    } else {
      navigate(`/products/${mainCatId}/${catId}/null`);
    }
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  const handleSubcategoryClick = (subCatId) => {
    if (!activeMainCategory || !activeCategory) return;
    navigate(`/products/${activeMainCategory}/${activeCategory}/${subCatId}`);
    handleSubmenuClose();
  };

  return (
    <Container maxWidth="lg" sx={{ px: isMobile ? 1 : 2 }}>
      <Typography variant="h5" component="h2" sx={{ 
        fontFamily: `"Montserrat", sans-serif`, 
        mt: 2,
        textAlign: 'center'
      }}>
        <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif` }}>
          Our
        </Box> Categories
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={isMobile ? 2 : 3}
        py={3}
        px={isMobile ? 1 : 2}
        bgcolor="white"
        borderRadius={2}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" width="100%">
            <CircularProgress />
          </Box>
        ) : (
          mainCategories.map((mainCategory, index) => (
            <Box key={mainCategory._id} sx={{ 
              width: isMobile ? '45%' : 'auto',
              minWidth: isMobile ? '120px' : 'auto',
              position: 'relative',
              opacity: mainCategory.isComingSoon ? 0.6 : 1
            }}>
              {mainCategory.isComingSoon && (
                <Chip 
                  label="Coming Soon" 
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: 5,
                    zIndex: 1,
                    backgroundColor: theme.palette.grey[300],
                    color: theme.palette.text.secondary
                  }}
                />
              )}
              
              <Box
                onClick={(e) => !mainCategory.isComingSoon && handleClick(e, mainCategory._id)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: mainCategory.isComingSoon ? 'default' : 'pointer',
                }}
              >
                <Box
                  component="img"
                  src={`${BASE_URL}${mainCategory.image}`}
                  alt={mainCategory.name}
                  sx={{
                    width: isMobile ? 70 : 80,
                    height: isMobile ? 70 : 80,
                    borderRadius: "4px",
                    objectFit: "cover",
                    mb: 1,
                    border: "1px solid #f0f0f0",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    filter: mainCategory.isComingSoon ? 'grayscale(80%)' : 'none'
                  }}
                />
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  sx={{
                    fontWeight: 500,
                    color: mainCategory.isComingSoon ? 'text.disabled' : 'text.primary',
                    fontFamily: `"Montserrat", sans-serif`,
                    textAlign: 'center'
                  }}
                >
                  {mainCategory.name}
                  {!mainCategory.isComingSoon && <ArrowDropDownIcon fontSize={isMobile ? "small" : "medium"} />}
                </Typography>
              </Box>

              {!mainCategory.isComingSoon && (
                <>
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
                        onClick={(e) => handleCategoryClick(e, mainCategory._id, category._id)}
                        sx={{
                          py: 1.5,
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            fontFamily: `"Montserrat", sans-serif`,
                          }}
                        >
                          {category.name}
                        </Typography>
                        {subCategories[category._id]?.length > 0 && (
                          <ArrowRightIcon fontSize="small" />
                        )}
                      </MenuItem>
                    ))}
                  </Menu>

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
                        onClick={() => handleSubcategoryClick(subItem._id)}
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
                </>
              )}
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
};

export default CategoryNav;