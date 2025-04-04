import React, { useState } from 'react';
import Header from '../Components/Header';
import EcommerceBanner from '../Components/Home/Banner';
import CategoryNav from '../Components/Home/Category';
import DealsSlider from '../Components/Home/DealsCarousal';
import NewArrivals from '../Components/Home/NewArrivals';
import OurProducts from '../Components/Home/OurProducts';
import DealOfTheDay from '../Components/Home/DealOfTheDay';
import Footer from '../Components/Footer';
import BannerSection2 from '../Components/Home/Banner2';
import { FaWhatsapp, FaTimes, FaComment } from 'react-icons/fa';
import './Home.css'; // Create this CSS file for styling

// ChatPopup component for the consult feature
const ChatPopup = ({ onClose }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to WhatsApp with the message
    const whatsappUrl = `https://wa.me/+919778466748?text=${encodeURIComponent(message || 'Hello, I have a question about your products')}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="chat-popup">
      <div className="chat-header">
        <h3>Consult With Us</h3>
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>
      <div className="chat-body">
        <p>Our team is here to help! Send us a message and we'll respond as soon as possible.</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows="4"
          />
          <button type="submit" className="send-btn">
            <FaWhatsapp /> Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="home-container">
      <Header />
      <div><EcommerceBanner /></div>
      <div><CategoryNav /></div>
      <div><DealsSlider /></div>
      <div><NewArrivals /></div>
      {/* <div><BannerSection2 /></div> */}
      <div><OurProducts /></div>
      <div><DealOfTheDay /></div>
      <Footer />
      
      {/* Floating chat button */}
      <div 
        className={`floating-chat-btn ${showChat ? 'active' : ''}`}
        onClick={() => setShowChat(!showChat)}
      >
        {showChat ? <FaTimes /> : <FaComment />}
      </div>
      
      {/* Chat popup */}
      {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
    </div>
  );
}

export default Home;