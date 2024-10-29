// components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [breweries, setBreweries] = useState([]);
  const [breweryTypes, setBreweryTypes] = useState({});

  useEffect(() => {
    // Fetch data from the Open Brewery API
    fetch('https://api.openbrewerydb.org/breweries')
      .then((response) => response.json())
      .then((data) => {
        setBreweries(data);
        summarizeBreweryTypes(data);
      });
  }, []);

  // Create a summary of brewery types for the chart
  const summarizeBreweryTypes = (data) => {
    const types = data.reduce((acc, brewery) => {
      acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
      return acc;
    }, {});
    setBreweryTypes(types);
  };

  // Prepare data for the Pie chart
  const chartData = {
    labels: Object.keys(breweryTypes),
    datasets: [
      {
        label: '# of Breweries',
        data: Object.values(breweryTypes),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div>
      <h1>Brewery Dashboard</h1>
      <Pie data={chartData} />

      <h2>List of Breweries</h2>
      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>
            <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
