import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import './payment.css'; // Your CSS file for SuccessPage component

const SuccessPage = () => {
  useEffect(() => {
    // Code to simulate tick mark animation after component mounts
    const tickAnimation = setTimeout(() => {
      const tick = document.querySelector('.tick');
      if (tick) {
        tick.classList.add('tick-animate');
      }
    }, 500);

    return () => clearTimeout(tickAnimation);
  }, []);

  return (
    <div className="SuccessPage dark-theme">
      <h2>Payment Successful!</h2>
      <div className="tick-container">
        <div className="tick">
          <span role="img" aria-label="tick mark">
            ✅
          </span>
        </div>
      </div>
      <p>Thank you for your payment.</p>
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      {/* Link to redirect to dashboard */}
      <Link to="/dashboard" className="dashboard-link">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default SuccessPage;

