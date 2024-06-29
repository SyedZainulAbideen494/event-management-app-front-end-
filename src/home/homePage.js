import React, { useState, useEffect } from 'react';
import './home.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import LineGraph from './graph';
import searchIcon from '../images/search.png'; // Adjust the path to your image
import { API_ROUTES } from '../app modules/apiRoutes';
import dashboardImg from '../images/dashboard.png';
import settingsImg from '../images/settings.png';
import joinedEventImg from '../images/joinedEvents.png';
import myeventsImg from '../images/myEvents.png';
import createEventImg from '../images/create-event.png';
import registrationsImg from '../images/registrations.png'
import notificationImg from '../images/notifications.png'

const HomePage = () => {
  const [user, setUser] = useState({});
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Dummy data for registrations
    const dummyRegistrations = [
      { name: 'John Doe', date: '2024-06-30' },
      { name: 'Jane Smith', date: '2024-06-29' },
      { name: 'Mike Johnson', date: '2024-06-28' },
    ];
    setRegistrations(dummyRegistrations);

    // Fetch token from localStorage or from wherever it's stored
    const token = localStorage.getItem('token');

    // Send token to backend API to fetch user data
    fetch(API_ROUTES.fetchUserDetails, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then(response => response.json())
      .then(data => {
        setUser(data); // Assuming the API response contains user data including profilePic
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div className="homepage-container">
      {/* Left Navigation */}
      <div className="left-nav">
        <h1 className="app-name">Amute</h1>
        <div className="user-profile">
          <img src={`${API_ROUTES.profilePic}/${user.profilePic}`} alt="Profile" className="profile-pic" />
          <p className="username">{user.user_name}</p>
        </div>
        <div className="nav-buttons">
          <button className="nav-btn">
            <img src={dashboardImg} alt="Dashboard" className="nav-icon" />
            Dashboard
          </button>
          <Link to='/create-event'>
          <button className="nav-btn">
            <img src={createEventImg} alt="Create Event" className="nav-icon" />
            Create Event
          </button>
          </Link>
          <button className="nav-btn">
            <img src={myeventsImg} alt="My Events" className="nav-icon" />
            My Events
          </button>
          <button className="nav-btn">
            <img src={registrationsImg} alt="Registrations" className="nav-icon" />
            Registrations
          </button>
          <button className="nav-btn">
            <img src={joinedEventImg} alt="Joined Events" className="nav-icon" />
            Joined Events
          </button>
          <button className="nav-btn">
            <img src={settingsImg} alt="Settings" className="nav-icon" />
            Settings
          </button>
          <button className="nav-btn">
            <img src={`${API_ROUTES.profilePic}/${user.profilePic}`} alt="My Profile" className="nav-icon" />
            My Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar with Search and Icons */}
        <div className="top-bar">
          <div className="search-bar">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
          </div>
          <div className="right-icons">
            <button className="icon-btn">
              <img src={notificationImg} alt="Notification" className="nav-icon" />
            </button>
            <button className="icon-btn">
              <img src={settingsImg} alt="Settings" className="nav-icon" />
            </button>
            <button className="icon-btn">
            <img src={`${API_ROUTES.profilePic}/${user.profilePic}`} alt="My Profile" className="nav-icon" />
            </button>
          </div>
        </div>

        {/* Dashboard Panel */}
        <div className="dashboard-panel">
          <h2>Welcome, {user.user_name}!</h2>
          <div className="data-boxes">
            <div className="data-box">
              <h3>Registrations</h3>
              <p>123</p>
            </div>
            <div className="data-box">
              <h3>Revenue</h3>
              <p>456</p>
            </div>
            <div className="data-box">
              <h3>My Events</h3>
              <p>789</p>
            </div>
          </div>

          {/* Line Graph */}
          <div className="line-graph">
            <LineGraph />
          </div>
             {/* Registrations Section */}
             <div className="registrations">
            <h3>Registrations</h3>
            <ul className="registration-list">
              {registrations.map((registration, index) => (
                <li key={index}>
                  <span className="registration-name">{registration.name}</span>
                  <span className="registration-date">{registration.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;