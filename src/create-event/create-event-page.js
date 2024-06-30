import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './createevent.css';
import { API_ROUTES } from '../app modules/apiRoutes';
import dashboardImg from '../images/dashboard.png';
import createEventImg from '../images/create-event.png';
import myeventsImg from '../images/myEvents.png';
import registrationsImg from '../images/registrations.png';
import joinedEventImg from '../images/joinedEvents.png';
import settingsImg from '../images/settings.png';
import premiumIcon from '../images/premium.png';

const CreateEventPage = () => {
  const [user, setUser] = useState({});
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [registrationLimit, setRegistrationLimit] = useState('');
  const [unlimitedRegistration, setUnlimitedRegistration] = useState(false);
  const [onlineEvent, setOnlineEvent] = useState(false);
  const [location, setLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventBanner, setEventBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('/');
  const pathActive = useLocation();
  // Function to handle navigation and update active link
  useEffect(() => {
    setActiveLink(pathActive.pathname);
  }, [pathActive.pathname]);

  // Function to handle navigation and update active link
  const handleNavigation = (path) => {
    navigate(path);
    setActiveLink(path);
  };

  const nav = useNavigate();

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

  const handleRegistrationLimitChange = (e) => {
    const { value } = e.target;
    setRegistrationLimit(value);
  };

  const handleUnlimitedRegistrationChange = () => {
    setUnlimitedRegistration(prevState => !prevState);
    if (unlimitedRegistration) {
      setRegistrationLimit('');
    }
  };

  const handleOnlineEventChange = () => {
    setOnlineEvent(prevState => !prevState);
    if (!onlineEvent) {
      setLocation('');
    }
  };

  const handleBannerChange = (e) => {
    setEventBanner(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('startTime', startTime);
    formData.append('registrationLimit', registrationLimit);
    formData.append('unlimitedRegistration', unlimitedRegistration);
    formData.append('onlineEvent', onlineEvent);
    formData.append('location', location);
    formData.append('eventDescription', eventDescription);
    formData.append('eventCategory', eventCategory);
    formData.append('eventBanner', eventBanner);
    formData.append('token', localStorage.getItem('token')); // Include token here

    try {
      const response = await fetch('http://localhost:8080/create-event', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 403) {
        setShowModal(true);
      } else {
        const data = await response.json();
        console.log('Event created:', data);
        nav(`/event/details/${data.id}`);
        // Reset form fields if needed
        setEventName('');
        setStartTime('');
        setRegistrationLimit('');
        setUnlimitedRegistration(false);
        setOnlineEvent(false);
        setLocation('');
        setEventDescription('');
        setEventCategory('');
        setEventBanner(null);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log('Redirecting to subscription page...');
    setShowModal(false); // Close modal after redirect
    nav('/premium')
  };

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
    <div className="create-event-form">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Unlimited Registration:</label>
          <div className="switch">
            <input
              type="checkbox"
              id="unlimitedRegistration"
              checked={unlimitedRegistration}
              onChange={handleUnlimitedRegistrationChange}
            />
            <label htmlFor="unlimitedRegistration" className="slider round"></label>
          </div>
        </div>
        <div className="form-row">
          <label>Online Event:</label>
          <div className="switch">
            <input
              type="checkbox"
              id="onlineEvent"
              checked={onlineEvent}
              onChange={handleOnlineEventChange}
            />
            <label htmlFor="onlineEvent" className="slider round"></label>
          </div>
        </div>
        <div className="form-row">
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            placeholder='Event Name'
            style={{ backgroundColor: '#121212', color: '#fff' }}
          />
        </div>
        <div className="form-row">
          <label>Time and Date:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            placeholder='Time and Date'
            style={{ backgroundColor: '#121212', color: '#fff' }}
          />
        </div>
        <div className="form-row">
          <label>Registration Limit:</label>
          <input
            type="number"
            value={registrationLimit}
            onChange={handleRegistrationLimitChange}
            disabled={unlimitedRegistration}
            placeholder='Registration Limit'
            style={{ backgroundColor: '#121212', color: '#fff' }}
          />
        </div>
        <div className="form-row">
          <label>Event Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Location'
            style={{ backgroundColor: '#121212', color: '#fff' }}
          />
        </div>
        <div className="form-row">
          <label>Event Description:</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder='Event Description'
            rows="4"
            style={{ backgroundColor: '#121212', color: '#fff' }}
          ></textarea>
        </div>
        <div className="form-row">
          <label>Event Category:</label>
          <select
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            style={{ backgroundColor: '#121212', color: '#fff' }}
          >
            <option value="">Select Category</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Festival">Festival</option>
            <option value='office party'>Office Party</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <div className="form-row">
          <label>Event Banner:</label>
          <input
            type="file"
            onChange={(e) => setEventBanner(e.target.files[0])}
            accept="image/*"
            style={{ backgroundColor: '#121212', color: '#fff' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#4CAF50' }}>Create Event</button>
      </form>
    </div>
  </div>

  {showModal && (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleModalClose}>&times;</span>
        <img src={premiumIcon} alt="Premium Icon" className="premium-icon" />
        <p className="modal-text" style={{ color: '#fff' }}>You need a premium subscription to create events.</p>
        <div className="modal-buttons">
          <button onClick={handleSubscribe} style={{ backgroundColor: '#007bff' }}>Subscribe</button>
          <button onClick={handleModalClose} style={{ backgroundColor: '#007bff' }}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default CreateEventPage;