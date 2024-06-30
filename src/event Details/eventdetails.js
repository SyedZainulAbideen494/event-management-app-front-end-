import React, { useState, useEffect } from 'react';
import './eventdetails.css'; // Import your CSS file for styling
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { API_ROUTES } from '../app modules/apiRoutes';
import dashboardImg from '../images/dashboard.png';
import settingsImg from '../images/settings.png';
import joinedEventImg from '../images/joinedEvents.png';
import myeventsImg from '../images/myEvents.png';
import createEventImg from '../images/create-event.png';
import registrationsImg from '../images/registrations.png';
import notificationImg from '../images/notifications.png';
import premiumIcon from '../images/premium.png';
import { Line } from 'react-chartjs-2';
import { FiClock, FiMapPin, FiInfo } from 'react-icons/fi'; // Example icons from react-icons library
import QRCode from 'qrcode.react';
import axios from 'axios';

const EventDetailsAdmin = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('/');
  const pathActive = useLocation();
  const [eventDetails, setEventDetails] = useState(null); // State to hold event details
  const [loading, setLoading] = useState(true);
  const [qrModalOpen, setQrModalOpen] = useState(false); // State to control modal visibility
  const [registrationData, setRegistrationData] = useState([]);
  const params = useParams();
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchRegistrationData();
    fetchEventDetails();
    fetchAttendees();
  }, [params.event_id]);

  const fetchRegistrationData = async () => {
    try {
      // Fetch registration counts per month for the event
      const response = await axios.get(`http://localhost:8080/api/eventRegistrationCounts/${params.event_id}`);
      setRegistrationData(response.data);
    } catch (error) {
      console.error('Error fetching registration counts:', error);
    }
  };

  const fetchEventDetails = async () => {
    try {
      // Fetch event details based on event_id
      const response = await axios.get(`http://localhost:8080/api/events/${params.event_id}`);
      setEventDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const fetchAttendees = async () => {
    try {
      // Fetch attendees for the event
      const response = await axios.get(`http://localhost:8080/api/eventAttendees/${params.event_id}`);
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  // Function to get month name from month index (0 to 11)
  const getMonthName = (monthIndex) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthIndex];
  };

  // Prepare labels and data for the line graph
  const lineGraphData = {
    labels: Array.from({ length: 12 }, (_, index) => getMonthName(index)), // Labels from 'Jan' to 'Dec'
    datasets: [
      {
        label: 'Registrations',
        data: Array.from({ length: 12 }, () => 0), // Initial data array, replace with actual counts
        fill: false,
        borderColor: '#2196f3',
      },
    ],
  };

  // Update data with actual registration counts
  registrationData.forEach(entry => {
    const monthIndex = entry.month - 1; // Month index (1 to 12) converted to (0 to 11)
    lineGraphData.datasets[0].data[monthIndex] = entry.count;
  });

  const lineGraphOptions = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Months',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Number of Registrations',
          },
        },
      ],
    },
  };

  // Function to handle navigation and update active link
  const handleNavigation = (path) => {
    navigate(path);
    setActiveLink(path);
  };

  const handleViewEventclick = () => {
    navigate(`/event/join/${params.event_id}`)
  };

  // Function to handle quick share feature
  const handleQuickShare = async () => {
    const siteURL = `http://localhost:3000/event/join/${params.event_id}`; // URL of dropment.online
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out Dropment!',
          text: `Discover cool motivational clips and download them for free to grow your Instagram page at Dropment.`,
          url: siteURL
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Check out Dropment: Discover cool motivational clips and download them for free to grow your Instagram page at ${siteURL}`;
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      window.location.href = shareURL;
    }
  };

  const formatTime = (timeString) => {
    const eventTime = new Date(timeString);
    return eventTime.toLocaleString(); // Adjust locale and options as needed
  };

  const toggleQrModal = () => {
    setQrModalOpen(!qrModalOpen);
  };

  return (
    <div className="homepage-container">
      {/* Left Navigation */}
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
              <img src={premiumIcon} alt="Premium" className="nav-icon" />
            </button>
          </div>
        </div>

        {/* Event Details Section */}
        <div className="event-details">
          {eventDetails && (
            <>
              <div className="event-banner">
                <img src={`${API_ROUTES.bannersDisplay}/${eventDetails.eventBanner}`} alt="Event Banner" />
              </div>
              <div className="event-info">
                <h2>{eventDetails.eventName}</h2>
                <p>
                  <FiClock /> <strong>Start Time:</strong> {formatTime(eventDetails.startTime)}
                </p>
                <p>
                  <FiInfo /> <strong>Description:</strong> {eventDetails.eventDescription}
                </p>
                <p>
                  <FiMapPin /> <strong>Location:</strong> {eventDetails.location}
                </p>
                <p>
                  <strong>Category:</strong> {eventDetails.eventCategory}
                </p>
                <div className="action-buttons">
                  <button className="deactivate-btn">Deactivate Event</button>
                  <button className="share-btn" onClick={handleQuickShare}>
                    Share
                  </button>
                  <button className="share-btn" onClick={handleViewEventclick}>View Event</button>
                  <button className="share-btn" onClick={toggleQrModal}>
                    QR Code
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Line Graph Section */}
        <div className="line-graph-container">
          <h3>Registrations Over Time</h3>
          <div style={{ height: '400px', width: '600px' }}>
            <Line data={lineGraphData} options={lineGraphOptions} />
          </div>
        </div>

        {/* Display Names of Registered Users */}
        <div className="registered-users-container">
  <h3 className="registered-users-title">Registered Users</h3>
  <div className="registered-users">
    {attendees.map(attendee => (
      <div key={attendee.id} className="user-item">
        <p className="user-item-label">Name:</p>
        <p className="user-item-info">{attendee.name}</p>
        <p className="user-item-label">Email:</p>
        <p className="user-item-info">{attendee.email}</p>
        <p className="user-item-label">Phone Number:</p>
        <p className="user-item-info">{attendee.phoneNumber}</p>
        <p className="user-item-label">Registered At:</p>
        <p className="user-item-info">{new Date(attendee.created_at).toLocaleDateString()}</p>
      </div>
    ))}
  </div>
</div>
      </div>

      {/* QR Code Modal */}
      {qrModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Event QR Code</h2>
            <span className="close" onClick={toggleQrModal}>&times;</span>
            {/* Generate QR code with event join link */}
            <QRCode value={`http://localhost:3000/event/join/${params.event_id}`} style={{ marginBottom: '' }} /><br />
            {/* Button to print QR code */}
            <button onClick={() => window.print()}>Print QR Code</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsAdmin;