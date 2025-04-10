import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
    const navigate = useNavigate();
    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("Verifying your payment...");
    const [orderDetails, setOrderDetails] = useState(null);

    const BASE_URL='https://rigsdock.com'

    useEffect(() => {
        // Check if we have a pending order in localStorage
        const pendingOrder = localStorage.getItem('pendingPhonePeOrder');
        if (pendingOrder) {
            const orderData = JSON.parse(pendingOrder);
            setOrderDetails(orderData);
            
            // If we have an order_id in URL, verify payment
            if (orderId) {
                verifyPayment(orderId);
            } else {
                // If no order_id but we have pending order, check status
                checkOrderStatus(orderData.mainOrderId);
            }
        } else if (orderId) {
            // If we have order_id but no localStorage entry, still try to verify
            verifyPayment(orderId);
        } else {
            // No order information at all
            setStatus("error");
            setMessage("No order information found. Redirecting to home...");
            setTimeout(() => navigate("/"), 3000);
        }
    }, [orderId, navigate]);

    const checkOrderStatus = async (mainOrderId) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/user/order/payment-status/${mainOrderId}`);
            
            if (response.data.paymentStatus === "Completed") {
                setStatus("success");
                setMessage("Payment successful! Redirecting to order confirmation...");
                clearPendingOrder();
                setTimeout(() => {
                    navigate('/order-confirmation', { state: { orderId: mainOrderId } });
                }, 3000);
            } else if (response.data.paymentStatus === "Processing") {
                setStatus("pending");
                setMessage("Payment is still processing. We'll notify you when complete.");
                setTimeout(() => checkOrderStatus(mainOrderId), 5000); // Check again after 5 seconds
            } else {
                setStatus("error");
                setMessage("Payment failed. Redirecting to checkout...");
                clearPendingOrder();
                setTimeout(() => {
                    navigate(`/checkout?retry_order=${mainOrderId}`);
                }, 3000);
            }
        } catch (error) {
            console.error("Error checking order status:", error);
            setStatus("error");
            setMessage("Error verifying payment status. Redirecting to home...");
            clearPendingOrder();
            setTimeout(() => navigate("/"), 3000);
        }
    };

    const verifyPayment = async (transactionId) => {
        try {
            setStatus("verifying");
            setMessage("Verifying your payment...");
    
            // First check if we have the main order ID
            let mainOrderId;
            if (orderDetails) {
                mainOrderId = orderDetails.mainOrderId;
            } else {
                // Extract from transaction ID (MT_ prefix)
                mainOrderId = transactionId.replace('MT_', '');
            }
            
            // Verify the payment status with backend
            const response = await axios.get(`${BASE_URL}/api/user/order/payment-status/${mainOrderId}`);
            
            if (response.data.paymentStatus === "Completed") {
                setStatus("success");
                setMessage("Payment successful! Redirecting to order confirmation...");
                clearPendingOrder();
                setTimeout(() => {
                    navigate('/order-confirmation', { state: { orderId: mainOrderId } });
                }, 3000);
            } else if (response.data.paymentStatus === "Processing") {
                // If still processing, check PhonePe status directly
                if (response.data.phonepeStatus) {
                    handlePhonePeStatus(response.data.phonepeStatus, mainOrderId);
                } else {
                    setStatus("pending");
                    setMessage("Payment is still processing. We'll notify you when complete.");
                    setTimeout(() => verifyPayment(transactionId), 5000); // Check again after 5 seconds
                }
            } else {
                setStatus("error");
                setMessage("Payment failed. Redirecting to checkout...");
                clearPendingOrder();
                setTimeout(() => {
                    navigate(`/checkout?retry_order=${mainOrderId}`);
                }, 3000);
            }
        } catch (error) {
            console.error("Payment verification error:", error);
            setStatus("error");
            setMessage("Verification failed. Redirecting to home...");
            clearPendingOrder();
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    };

    const handlePhonePeStatus = (phonepeStatus, mainOrderId) => {
        switch(phonepeStatus) {
            case 'checkout.order.completed':
                setStatus("success");
                setMessage("Payment successful! Redirecting to order confirmation...");
                clearPendingOrder();
                setTimeout(() => {
                    navigate('/order-confirmation', { state: { orderId: mainOrderId } });
                }, 3000);
                break;
            case 'checkout.order.failed':
            case 'checkout.transaction.attempt.failed':
                setStatus("error");
                setMessage("Payment failed. Redirecting to checkout...");
                clearPendingOrder();
                setTimeout(() => {
                    navigate(`/checkout?retry_order=${mainOrderId}`);
                }, 3000);
                break;
            default:
                setStatus("pending");
                setMessage("Payment is still processing. We'll notify you when complete.");
                setTimeout(() => verifyPayment(`MT_${mainOrderId}`), 5000);
        }
    };

    const clearPendingOrder = () => {
        localStorage.removeItem('pendingPhonePeOrder');
    };
    const StatusIcon = () => {
        const baseIconStyle = {
            width: '80px',
            height: '80px',
            margin: '0 auto',
            position: 'relative',
            borderRadius: '50%',
            boxSizing: 'content-box'
        };

        const lineStyle = {
            height: '5px',
            display: 'block',
            borderRadius: '2px',
            position: 'absolute',
            zIndex: 10
        };

        if (status === "success") {
            return (
                <div style={{
                    ...baseIconStyle,
                    border: '4px solid #28a745',
                    animation: 'scaleIn 0.5s ease-out'
                }}>
                    <span style={{
                        ...lineStyle,
                        backgroundColor: '#28a745',
                        width: '25px',
                        left: '14px',
                        top: '46px',
                        transform: 'rotate(45deg)',
                        animation: 'iconLineTip 0.75s'
                    }}></span>
                    <span style={{
                        ...lineStyle,
                        backgroundColor: '#28a745',
                        width: '47px',
                        right: '8px',
                        top: '38px',
                        transform: 'rotate(-45deg)',
                        animation: 'iconLineLong 0.75s'
                    }}></span>
                </div>
            );
        } else if (status === "error") {
            return (
                <div style={{
                    ...baseIconStyle,
                    border: '4px solid #dc3545',
                    animation: 'scaleIn 0.5s ease-out'
                }}>
                    <span style={{
                        ...lineStyle,
                        backgroundColor: '#dc3545',
                        width: '40px',
                        left: '20px',
                        top: '37px',
                        transform: 'rotate(45deg)',
                        animation: 'iconLineTip 0.75s'
                    }}></span>
                    <span style={{
                        ...lineStyle,
                        backgroundColor: '#dc3545',
                        width: '40px',
                        right: '20px',
                        top: '37px',
                        transform: 'rotate(-45deg)',
                        animation: 'iconLineLong 0.75s'
                    }}></span>
                </div>
            );
        } else {
            return (
                <div style={{
                    width: '60px',
                    height: '60px',
                    border: '5px solid #f3f3f3',
                    borderTop: '5px solid #17a2b8',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                }}></div>
            );
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case "success": return '#28a745';
            case "error": return '#dc3545';
            case "pending": return '#ffc107';
            default: return '#17a2b8';
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            opacity: 1,
            transition: 'opacity 0.3s ease'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                padding: '40px',
                textAlign: 'center',
                maxWidth: '500px',
                width: '100%'
            }}>
                <div style={{
                    margin: '0 auto 30px',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <StatusIcon />
                </div>
                
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginBottom: '15px',
                    color: getStatusColor(),
                    transform: 'translateY(0)',
                    opacity: 1,
                    transition: 'all 0.3s ease 0.2s'
                }}>
                    {status === "success" && "Payment Successful!"}
                    {status === "error" && "Payment Failed"}
                    {status === "pending" && "Processing Payment"}
                    {status === "verifying" && "Verifying Payment"}
                </h2>
                
                <p style={{
                    color: '#6c757d',
                    fontSize: '16px',
                    marginBottom: '25px',
                    transform: 'translateY(0)',
                    opacity: 1,
                    transition: 'all 0.3s ease 0.3s'
                }}>
                    {message}
                </p>
                
                {status === "verifying" && (
                    <div style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '3px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#17a2b8',
                            animation: 'progressAnimation 3s linear forwards'
                        }}></div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes iconLineTip {
                    0% { width: 0; left: 1px; top: 19px; }
                    54% { width: 0; left: 1px; top: 19px; }
                    70% { width: 50px; left: -8px; top: 37px; }
                    84% { width: 17px; left: 21px; top: 48px; }
                    100% { width: 25px; left: 14px; top: 46px; }
                }
                
                @keyframes iconLineLong {
                    0% { width: 0; right: 46px; top: 54px; }
                    65% { width: 0; right: 46px; top: 54px; }
                    84% { width: 55px; right: 0px; top: 35px; }
                    100% { width: 47px; right: 8px; top: 38px; }
                }
                
                @keyframes progressAnimation {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0); }
                }
                
                @keyframes scaleIn {
                    0% { transform: scale(0); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default PaymentStatus;