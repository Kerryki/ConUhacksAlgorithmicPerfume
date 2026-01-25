/**
 * Utility functions for collecting and submitting perfume creation data
 */

// API base URL - uses environment variable in production, localhost in development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Collects all perfume data from localStorage
 * @returns {Object} Object containing all collected data from each step
 */
export function collectAllPerfumeData() {
  const keys = [
    'perfume_personality_data',
    'perfume_color_data', 
    'perfume_longevity_data',
    'perfume_age_data',
    'perfume_gender_data',
    'perfume_time_data',
    'perfume_accord_data',
    'perfume_weather_data',
    'perfume_personal_name'
  ];
  
  const collected = {};
  
  keys.forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        
        // Special handling for accord_data: extract scent_identity directly
        if (key === 'perfume_accord_data' && parsedData.scent_identity) {
          collected['scent_identity'] = parsedData.scent_identity;
        } else {
          // Remove 'perfume_' prefix for cleaner key names
          const cleanKey = key.replace('perfume_', '');
          collected[cleanKey] = parsedData;
        }
      } catch (error) {
        console.error(`Error parsing ${key}:`, error);
      }
    }
  });
  
  return collected;
}

/**
 * Submits perfume data to the backend recommendation endpoint
 * @param {Object} data - The collected perfume data
 * @returns {Promise<Object>} The backend response
 * @throws {Error} If the request fails
 */
export async function submitPerfumeData(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/create-scent`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting perfume data:', error);
    throw error;
  }
}

/**
 * Clears all perfume data from localStorage
 * Useful for starting a new session
 */
export function clearAllPerfumeData() {
  const keys = [
    'perfume_personality_data',
    'perfume_color_data', 
    'perfume_longevity_data',
    'perfume_age_data',
    'perfume_gender_data',
    'perfume_time_data',
    'perfume_accord_data',
    'perfume_weather_data',
    'perfume_personal_name'
  ];
  
  keys.forEach(key => {
    localStorage.removeItem(key);
  });
}
