import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button, IconButton, Paper, MenuItem, CardMedia } from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";
import { returnOrder, viewProductsById } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png"

const ReturnProduct = () => {
    const { orderId, productId } = useParams();
    const [reason, setReason] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [product, setProduct] = useState(null);
    const userId = localStorage.getItem("userId");
    const [error, setError] = useState("");
    const [productLoading, setProductLoading] = useState(true);


    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                setError("Product ID is missing. Cannot fetch product details.");
                setProductLoading(false);
                return;
            }

            try {
                console.log("Fetching product with ID:", productId);
                const response = await viewProductsById(productId);
                console.log("Product data:", response.product);
                setProduct(response.product);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Could not load product details");
            } finally {
                setProductLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleSubmit = async () => {
        if (!reason) {
            alert("Please select a reason for return.");
            return;
        }

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("orderId", orderId);
        formData.append("productId", productId);
        formData.append("complaintType", reason);
        formData.append("description", additionalInfo);
        if (imageFile) {
            formData.append("images", imageFile);
        }

        try {
            await returnOrder(formData);
            alert("Return request submitted successfully!");
        } catch (error) {
            console.error("Failed to submit return request", error);
            alert("Error submitting return request.");
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 4,  margin: "auto" }}>
            <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="h5" fontWeight="bold" mb={3}>
                Return Product
            </Typography>

            {product && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <CardMedia
                        component="img"
                        // image={product.image}
                        image={placeholder}
                        alt={product.name}
                        sx={{ width: 100, height: 100, objectFit: "contain", borderRadius: 2, mr: 3 }}
                    />
                    <Box>
                        <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} fontWeight="bold" variant="h6">{product.name}</Typography>
                        <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="body2"><strong>Price:</strong> ₹{product.price}</Typography>
                    </Box>
                </Box>
            )}

            <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="h6" fontWeight="bold" gutterBottom>
                Reason for return:
            </Typography>
            <TextField  select fullWidth value={reason} onChange={(e) => setReason(e.target.value)} sx={{fontFamily: `"Montserrat", sans-serif`, mb: 3 }}>
                <MenuItem value="Damaged Product">Damaged Product</MenuItem>
                <MenuItem value="Wrong item received">Wrong item received</MenuItem>
                <MenuItem value="Changed my mind">Changed my mind</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="h6" fontWeight="bold" gutterBottom>
                Additional Information:
            </Typography>
            <TextField
                placeholder="Optional - max 500 characters"
                multiline
                rows={4}
                fullWidth
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                sx={{ mb: 3 }}
            />

            <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="h6" fontWeight="bold" gutterBottom>
                Upload Image (Optional):
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                {image && (
                    <Box sx={{ position: "relative", width: 100, height: 100 }}>
                        <img src={image} alt="Return" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }} />
                        <IconButton
                            size="small"
                            onClick={() => { setImage(null); setImageFile(null); }}
                            sx={{ position: "absolute", top: -8, right: -8, bgcolor: "error.main", color: "white" }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </Box>
                )}
                <Button sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="outlined" component="label" startIcon={<PhotoCamera />}>
                    Upload Image
                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </Button>
            </Box>

            <Button sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="contained" color="warning" fullWidth onClick={handleSubmit}>
                Submit Return Request
            </Button>
        </Paper>
    );
};

export default ReturnProduct;
