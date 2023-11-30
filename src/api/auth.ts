import axios from 'axios';
import { type FieldValues } from 'react-hook-form';

const API = 'http://localhost:4000';

export const registerRequest = async function (
  userValues: FieldValues,
): Promise<Response> {
  try {
    const response = await axios.post<Response>(`${API}/register`, userValues);
    return response.data;
  } catch (error) {
    console.error('Error in registerRequest:', error);
    throw new Error('Failed to register user');
  }
};
