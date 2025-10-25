import type { WelcomeResponse, AboutResponse, NameResponse } from '../types/api.types';

// API Base URL - Change this for production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

/**
 * API Service - All backend endpoints
 */
export const apiService = {
  /**
   * Get Welcome Message
   * GET /api
   */
  getWelcome: async (): Promise<WelcomeResponse> => {
    return fetchAPI<WelcomeResponse>('/');
  },

  /**
   * Get About Information
   * GET /api/about
   */
  getAbout: async (): Promise<AboutResponse> => {
    return fetchAPI<AboutResponse>('/about');
  },

  /**
   * Get My Name
   * GET /api/my-name
   */
  getMyName: async (): Promise<NameResponse> => {
    return fetchAPI<NameResponse>('/my-name');
  },
};

export default apiService;

