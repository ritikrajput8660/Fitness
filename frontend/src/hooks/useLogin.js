// Custom hook to handle logging in

import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axiosInstance from '../utils/axios';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/api/user/login', {
        email,
        password
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch({ type: 'LOGIN', payload: response.data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return { login, isLoading, error };
};