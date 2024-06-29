import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = () => {
  // Dummy data for the line graph
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data Set 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#9d4edd', // Line color for Data Set 1
      },
      {
        label: 'Data Set 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: '#118ab2', // Line color for Data Set 2
      },
    ],
  };

  // Options for the line graph
  const options = {
    scales: {
      x: {
        type: 'category', // Use 'category' for labels like months
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      },
      y: {
        type: 'linear', // Use 'linear' for numerical data
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="line-graph">
      <h2>Registrations</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;