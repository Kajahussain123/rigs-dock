import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
    const navigate = useNavigate();
    const [status, setStatus] = useState("verifying");
    const [message, setMessage] = useState("Verifying your payment...");

    useEffect(() => {
        if (orderId) {
            verifyPayment(orderId);
        }
    }, [orderId]);

    // const verifyPayment = async (cfOrderId) => {
    //     try {
    //         setStatus("verifying");
    //         setMessage("Verifying your payment...");

    //         const findOrderResponse = await axios.get(
    //             `http://localhost:3006/user/order/by-cashfree-id/${cfOrderId}`
    //         );
            
    //         const internalOrderId = findOrderResponse.data.orderId;
            
    //         const verifyResponse = await axios.post(
    //             `http://localhost:3006/user/order/payment/verify`,
    //             { order_id: internalOrderId }
    //         );

    //         if (verifyResponse.data.status === "Paid") {
    //             setStatus("success");
    //             setMessage("Payment successful! Redirecting to order confirmation...");
    //             setTimeout(() => {
    //                 navigate('/order-confirmation');
    //             }, 3000);
    //         } else if (verifyResponse.data.status === "Pending") {
    //             setStatus("pending");
    //             setMessage("Payment is still processing. We'll notify you when complete.");
    //             setTimeout(() => {
    //                 navigate(`/orders/${internalOrderId}`);
    //             }, 5000);
    //         } else {
    //             setStatus("error");
    //             setMessage("Payment failed. Redirecting to checkout...");
    //             setTimeout(() => {
    //                 navigate(`/checkout?retry_order=${internalOrderId}`);
    //             }, 3000);
    //         }
    //     } catch (error) {
    //         console.error("Payment verification error:", error);
    //         setStatus("error");
    //         setMessage("Verification failed. Redirecting to home...");
    //         setTimeout(() => {
    //             navigate("/");
    //         }, 3000);
    //     }
    // };
    const verifyPayment = async (transactionId) => {
        try {
            setStatus("verifying");
            setMessage("Verifying your payment...");
    
            // Fetch order by PhonePe transaction ID
            const findOrderResponse = await axios.get(
                `http://localhost:3006/user/order/by-phonepe-id/${transactionId}`
            );
            
            const internalOrderId = findOrderResponse.data.orderId;
            
            // Verify the payment
            const verifyResponse = await axios.post(
                `http://localhost:3006/user/order/payment/verify`,
                { order_id: internalOrderId }
            );
    
            if (verifyResponse.data.status === "Paid") {
                setStatus("success");
                setMessage("Payment successful! Redirecting to order confirmation...");
                setTimeout(() => {
                    navigate('/order-confirmation');
                }, 3000);
            } else if (verifyResponse.data.status === "Pending") {
                setStatus("pending");
                setMessage("Payment is still processing. We'll notify you when complete.");
                setTimeout(() => {
                    navigate(`/orders/${internalOrderId}`);
                }, 5000);
            } else {
                setStatus("error");
                setMessage("Payment failed. Redirecting to checkout...");
                setTimeout(() => {
                    navigate(`/checkout?retry_order=${internalOrderId}`);
                }, 3000);
            }
        } catch (error) {
            console.error("Payment verification error:", error);
            setStatus("error");
            setMessage("Verification failed. Redirecting to home...");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
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