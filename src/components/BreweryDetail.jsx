// components/BreweryDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    // Fetch details of the specific brewery
    fetch(`https://api.openbrewerydb.org/breweries/${id}`)
      .then((response) => response.json())
      .then((data) => setBrewery(data));
  }, [id]);

  if (!brewery) return <p>Loading...</p>;

  return (
    <div>
      <h1>{brewery.name}</h1>
      <p>Type: {brewery.brewery_type}</p>
      <p>City: {brewery.city}</p>
      <p>State: {brewery.state}</p>
      <p>Website: <a href={brewery.website_url}>{brewery.website_url}</a></p>

      <Link to="/">Back to Dashboard</Link>
    </div>
  );
}

export default BreweryDetail;
