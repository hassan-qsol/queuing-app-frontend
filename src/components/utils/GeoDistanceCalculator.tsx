import { useState, useEffect } from "react";

// Haversine formula to calculate distance between two points
function calculateDistance(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  return distance;
}

// Calculate estimated travel time based on distance and speed (km/h)
function calculateTravelTime(distance: number, speed: number): number {
  if (speed <= 0) return 0; // Prevent division by zero or negative speed
  return distance / speed; // Time in hours
}

type GeoDistanceCalculatorProps = {
  targetLatitude: number;
  targetLongitude: number;
  speed?: number; // Speed in km/h, default is 50 km/h
};

const GeoDistanceCalculator: React.FC<GeoDistanceCalculatorProps> = ({
  targetLatitude,
  targetLongitude,
  speed = 50, // Default speed is 50 km/h
}) => {
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [travelTime, setTravelTime] = useState<number | null>(null);

  // Get current position using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ latitude, longitude });

          // Calculate distance between current position and target location
          const dist = calculateDistance(
            longitude,
            latitude,
            targetLongitude,
            targetLatitude
          );
          setDistance(dist);

          // Calculate estimated travel time based on distance and speed
          const time = calculateTravelTime(dist, speed);
          setTravelTime(time);
        },
        (err) => {
          console.error(err);
          setError("Geolocation is not available or permission denied.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [targetLatitude, targetLongitude, speed]);

  return (
    <div>
      <h2>GeoDistance Calculator</h2>
      {error && <p>{error}</p>}
      {position ? (
        <div>
          <p>Your current position:</p>
          <ul>
            <li>Latitude: {position.latitude}</li>
            <li>Longitude: {position.longitude}</li>
          </ul>
          {distance !== null && (
            <>
              <p>Distance to target location: {distance.toFixed(2)} km</p>
              {travelTime !== null && (
                <p>
                  Estimated travel time at {speed} km/h:{" "}
                  {travelTime.toFixed(2)} hours
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        <p>Fetching your current position...</p>
      )}
    </div>
  );
};

export default GeoDistanceCalculator;
