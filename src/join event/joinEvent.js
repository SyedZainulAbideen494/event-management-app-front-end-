import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaClock, FaInfoCircle } from 'react-icons/fa';
import './joinEvent.css';
import { useParams } from 'react-router-dom';
import { API_ROUTES } from '../app modules/apiRoutes';

const JoinEvent = () => {
  const [event, setEvent] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
  });
  const [success, setSuccess] = useState(false);
  const [attendeeId, setAttendeeId] = useState(null);
  const [pdfPath, setPdfPath] = useState(null);
  const [error, setError] = useState('');

  const params = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await axios.get(`http://localhost:8080/api/events/${params.event_id}`);
      setEvent(response.data);
    };
    fetchEvent();
  }, [params.event_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/join', { ...formData, eventId: params.event_id });
      setSuccess(true);
      setAttendeeId(response.data.attendeeId);
      setPdfPath(response.data.pdfPath);
      setError('');
    } catch (err) {
      setError(err.response.data);
    }
  };

  const formatTime = (timeString) => {
    const eventTime = new Date(timeString);
    return eventTime.toLocaleString(); // Adjust locale and options as needed
  };

  return (
    <div className="event-container-join">
      <img src={`${API_ROUTES.bannersDisplay}/${event.eventBanner}`} alt="Event Banner" className="event-banner-join" />
      <div className="event-details-join">
        <h1>{event.eventName}</h1>
        <p><FaInfoCircle /> {event.eventDescription}</p>
        <p><FaClock />  {formatTime(event.startTime)}</p>
        <p><FaMapMarkerAlt /> {event.location}</p>
      </div>
      {success ? (
        <div className="success-message-join">
          <p>Thank you for joining the event! Your Attendee ID is {attendeeId}.</p>
          <a href='https://mail.google.com/mail/u/0/#inbox'>
            <button>PDF has been sent to your email!</button>
            </a>
        </div>
      ) : (
        <form className="join-form-join" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <button type="submit">Join</button>
        </form>
      )}
    </div>
  );
};

export default JoinEvent;