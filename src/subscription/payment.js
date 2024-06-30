import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { API_ROUTES } from '../app modules/apiRoutes';
import dashboardImg from '../images/dashboard.png';
import settingsImg from '../images/settings.png';
import joinedEventImg from '../images/joinedEvents.png';
import myeventsImg from '../images/myEvents.png';
import createEventImg from '../images/create-event.png';
import registrationsImg from '../images/registrations.png';
import notificationImg from '../images/notifications.png';
import premiumIcon from '../images/premium.png'
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { FaCheck } from 'react-icons/fa';
import './payment.css';
const stripePromise = loadStripe('pk_test_51LoS3iSGyKMMAZwsaj8KZX4Sqqffth0eo9jyTSElpu9UG8M815kZdSIg1huPtPgke75vqtymOLDXtwosJrEYBWPh001ecyI5aW');



const Payment = () => {
  const [user, setUser] = useState({});
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [registrationLimit, setRegistrationLimit] = useState('');
  const [unlimitedRegistration, setUnlimitedRegistration] = useState(false);
  const [onlineEvent, setOnlineEvent] = useState(false);
  const [eventDescription, setEventDescription] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventBanner, setEventBanner] = useState(null);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('/');
  const pathActive = useLocation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveLink(pathActive.pathname);
  }, [pathActive.pathname]);

  // Function to handle navigation and update active link
  const handleNavigation = (path) => {
    navigate(path);
    setActiveLink(path);
  };
  const handleSubscription = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Create Stripe checkout session
      const sessionResponse = await axios.post(API_ROUTES.createCheckOutSession, { token });
      const sessionId = sessionResponse.data.sessionId;

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
        // Handle error display or logging
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      // Handle general subscription error
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(API_ROUTES.fetchUserDetails, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);



  return (
<div className="homepage-container">
<div className="left-nav">
      <h1 className="app-name">Amute</h1>
      <div className="nav-buttons">
        <button
          className={`nav-btn ${activeLink === '/dashboard' && 'active-nav-btn'}`}
          onClick={() => handleNavigation('/dashboard')}
        >
          <img src={dashboardImg} alt="Dashboard" className="nav-icon" />
          Dashboard
        </button>
        <button
          className={`nav-btn ${activeLink === '/create-event' && 'active-nav-btn'}`}
          onClick={() => handleNavigation('/create-event')}
        >
          <img src={createEventImg} alt="Create Event" className="nav-icon" />
          Create Event
        </button>
        <button
          className={`nav-btn ${activeLink === '/my/events' && 'active-nav-btn'}`}
          onClick={() => handleNavigation('/my/events')}
        >
          <img src={myeventsImg} alt="My Events" className="nav-icon" />
          My Events
        </button>
        <button
          className={`nav-btn ${activeLink === '/registrations' && 'active-nav-btn'}`}
          onClick={() => handleNavigation('/registrations')}
        >
          <img src={registrationsImg} alt="Registrations" className="nav-icon" />
          Registrations
        </button>
        <button
          className={`nav-btn ${activeLink === '/joined/events' && 'active-nav-btn'}`}
          onClick={() => handleNavigation('/joined/events')}
        >
          <img src={joinedEventImg} alt="Joined Events" className="nav-icon" />
          Joined Events
        </button>
        <button
          className={`nav-btn ${activeLink === '/settings' && 'active-nav-btn'}`}
          onClick={() => handleNavigation('/settings')}
        >
          <img src={settingsImg} alt="Settings" className="nav-icon" />
          Settings
        </button>
        <button
          className={`nav-btn ${activeLink === '/premium' && 'active-nav-btn'}`}
          onClick={() => handleNavigation('/premium')}
        >
          <img src={premiumIcon} alt="Premium" className="nav-icon" />
          Premium
        </button>
        <button
          className={`nav-btn ${activeLink === '/my/profile' && 'active-nav-btn'}`}
          onClick={() => handleNavigation('/my/profile')}
        >
          <img src={`${API_ROUTES.profilePic}/${user.profilePic}`} alt="My Profile" className="nav-icon" />
          My Profile
        </button>
      </div>
    </div>
    <div className="main-content">
<div className="SubscriptionPlan dark-theme">
<h2>Premium Subscription</h2>
<h3>₹300 per month</h3>
<p>Upgrade to Premium to unlock advanced features for managing your events effortlessly.</p>
<ul>
  <li><FaCheck /> Manage up to 10 events concurrently</li>
  <li><FaCheck /> Unlimited registrations per event</li>
  <li><FaCheck /> Customizable event details and attendee management</li>
  <li><FaCheck /> Advanced analytics and reporting</li>
  <li><FaCheck /> Priority customer support</li>
  <li><FaCheck /> Access to premium templates and designs</li>
  <li><FaCheck /> Integration with CRM tools</li>
  <li><FaCheck /> Automated email notifications and reminders</li>
</ul>
<div className='subscriptionBtn'>
<button onClick={handleSubscription}>Subscribe Now</button>
</div>
</div>
</div>
</div>
  );
};

export default Payment;