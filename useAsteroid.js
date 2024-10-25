// src/hooks/useAsteroid.js
import { useDispatch, useSelector } from 'react-redux';
import { setAsteroidId, fetchAsteroidInfo, fetchRandomAsteroid } from '../features/asteroidSlice';

export const useAsteroid = () => {
  const dispatch = useDispatch();
  const { asteroidId, asteroidData, error } = useSelector((state) => state.asteroid);

  const updateAsteroidId = (id) => {
    dispatch(setAsteroidId(id));
  };

  const fetchAsteroidDataById = () => {
    if (asteroidId) {
      dispatch(fetchAsteroidInfo(asteroidId));
    }
  };

  const fetchRandomAsteroidData = () => {
    dispatch(fetchRandomAsteroid());
  };

  return {
    asteroidId,
    asteroidData,
    error,
    updateAsteroidId,
    fetchAsteroidDataById,
    fetchRandomAsteroidData,
  };
};
