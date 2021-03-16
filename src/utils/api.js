import axios from 'axios';
import storage from './storage';

const { getData } = storage;

// export const baseUrl = 'https://gourmetfood-api.herokuapp.com';
export const baseUrl = 'http://192.168.0.53:4000';

/**
 * @description Returns the api response
 * @param {number} status Status code
 * @param {object} data Data object
 * @param {string} error Error message
 * @returns {object} Object containing status and data or status and error
 */
const apiResponse = (status, data, error) => {
  if (status && data) {
    return { status, data };
  } if (error && error.response) {
    const newStatus = error.response.status;
    const errorMessage = error.response.data.error;
    return { status: newStatus, data: null, error: errorMessage };
  }
  return { status: 503, data: null, error: error.message };
};

/**
 * @description Gets auth from storage and returns token
 * @returns {string} Token string
 */
const getToken = async () => {
  const token = await getData('token');
  const parsedToken = await JSON.parse(token);
  return parsedToken;
};

export const signupService = async (payload) => {
  try {
    const { status, data } = await axios({
      url: `${baseUrl}/api/auth/signup`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    });
    return apiResponse(status, data, null);
  } catch (error) {
    return apiResponse(null, null, error);
  }
};

export const verifyService = async (payload) => {
  try {
    const token = await getToken();
    const { status, data } = await axios({
      url: `${baseUrl}/api/auth/verify`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });
    return apiResponse(status, data, null);
  } catch (error) {
    return apiResponse(null, null, error);
  }
};

export const resendOTPService = async () => {
  try {
    const token = await getToken();
    const { status, data } = await axios({
      url: `${baseUrl}/api/auth/verify/retry`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return apiResponse(status, data, null);
  } catch (error) {
    return apiResponse(null, null, error);
  }
};

export const logoutService = async () => {
  try {
    const token = await getToken();
    const { status, data } = await axios({
      url: `${baseUrl}/api/auth/logout`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return apiResponse(status, data, null);
  } catch (error) {
    return apiResponse(null, null, error);
  }
};

export const postService = async (url, method, payload) => {
  try {
    const token = await getToken();
    const { status, data } = await axios({
      url: `${baseUrl}${url}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` || '',
      },
      data: payload,
    });
    return apiResponse(status, data, null);
  } catch (error) {
    return apiResponse(null, null, error);
  }
};

export const getService = async (url, method) => {
  try {
    const token = await getToken();
    const { status, data } = await axios({
      url: `${baseUrl}${url}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` || '',
      },
    });
    return apiResponse(status, data, null);
  } catch (error) {
    return apiResponse(null, null, error);
  }
};
