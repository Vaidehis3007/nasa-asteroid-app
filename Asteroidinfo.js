// src/components/AsteroidInfo.js
import React from 'react';
import { useAsteroid } from '../hooks/useAsteroid';

export default function AsteroidInfo() {
  const {
    asteroidId,
    asteroidData,
    error,
    updateAsteroidId,
    fetchAsteroidDataById,
    fetchRandomAsteroidData,
  } = useAsteroid();

  const handleInputChange = (e) => {
    updateAsteroidId(e.target.value);
  };

  return (
    <div>
      <h1>Asteroid Information</h1>
      <input
        type="text"
        placeholder="Enter Asteroid ID"
        value={asteroidId}
        onChange={handleInputChange}
      />
      <button disabled={!asteroidId} onClick={fetchAsteroidDataById}>Submit</button>
      <button onClick={fetchRandomAsteroidData}>Random Asteroid</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {asteroidData && (
        <div>
          <h2>{asteroidData.name}</h2>
          <p><strong>NASA JPL URL:</strong> <a href={asteroidData.nasa_jpl_url}>{asteroidData.nasa_jpl_url}</a></p>
          <p><strong>Is Potentially Hazardous:</strong> {asteroidData.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}
