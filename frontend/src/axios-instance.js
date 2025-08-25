import axios from 'axios';
import supabase from './client';
import { useMutation } from '@tanstack/react-query';

const getAxiosClient = async () => {
  // Get the supabase session
  const currentSession = await supabase.auth.getSession();
  // create an axios instance with the supabase access_token
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${currentSession.data.session.access_token}`,
    },
  });
  // Return the instance
  return instance;
  // Fill code here
};

export default getAxiosClient;
