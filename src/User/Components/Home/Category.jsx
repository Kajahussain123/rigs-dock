import React, { useState } from "react";
import { Box, Container, Menu, MenuItem } from "@mui/material";

const CategoryNav = () => {
  const [anchorEls, setAnchorEls] = useState({});

  const handleClick = (event, category) => {
    setAnchorEls({
      ...anchorEls,
      [category]: event.currentTarget,
    });
  };

  const handleClose = (category) => {
    setAnchorEls({
      ...anchorEls,
      [category]: null,
    });
  };

  const categories = [
    {
      title: "Course",
      image:
        "https://i.postimg.cc/QdJzM481/9204a030138c14df63a1a937df0e98a2.png",
      items: ["Web Development", "Mobile Development", "Data Science", "UI/UX Design"],
    },
    {
      title: "Corporate deals",
      image:
        "https://i.postimg.cc/BvZVPTby/79e8db90f322f0d1776fe71d6fa93750.png",
      items: ["Business Solutions", "Enterprise Packages", "Bulk Orders", "Partnerships"],
    },
    {
      title: "Grocery",
      image: "https://i.postimg.cc/R0Pb7Wn0/2e626a93c02697429acae8b5545a3282.png",
      items: ["Fresh Produce", "Dairy", "Beverages", "Snacks"],
    },
    {
      title: "Fashion",
      image:
        "https://i.postimg.cc/HxVvBTQ9/bc94f9eb24bdb3571aab8c8a917e82d6.png",
      items: ["Men", "Women", "Kids", "Accessories"],
    },
    {
      title: "Electronics",
      image:
        "https://i.postimg.cc/wvZfrn28/23765b4f055ec4f7ce4a42688e567b1b.jpg",
      items: ["Laptops", "Smartphones", "Accessories", "Gaming"],
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 3, md: 6 },
          py: { xs: 2, md: 3 },
          px: { xs: 1, md: 2 },
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        {categories.map((category) => (
          <Box key={category.title}>
            <Box
              onClick={(e) => handleClick(e, category.title)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                width: { xs: "80px", sm: "100px", md: "120px" },
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: "60px", sm: "80px", md: "100px" },
                  height: { xs: "50px", sm: "70px", md: "80px" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 0.5,
                }}
              >
                <Box
                  component="img"
                  src={category.image}
                  alt={category.title}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                {category.title} ▼
              </Box>
            </Box>
            <Menu
              anchorEl={anchorEls[category.title]}
              open={Boolean(anchorEls[category.title])}
              onClose={() => handleClose(category.title)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{
                "& .MuiPaper-root": {
                  minWidth: "200px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  mt: 1,
                },
              }}
            >
              {category.items.map((item) => (
                <MenuItem
                  key={item}
                  onClick={() => handleClose(category.title)}
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    py: 1,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CategoryNav;
