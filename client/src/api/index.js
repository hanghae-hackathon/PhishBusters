import axios from 'axios';

export const serverUrl = `http://192.168.1.160:3000/@api/`;

async function get(params) {
  return axios.get(serverUrl + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
}

async function patch(params, data) {
  return axios.patch(serverUrl + params, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
}

async function post(params, data) {
  return axios.post(serverUrl + params, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
}

async function put(params, data) {
  return axios.put(serverUrl + params, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
}

async function del(params, data) {
  return axios.delete(serverUrl + params, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
}

async function postWithFormData(params, data) {
  return axios.post(serverUrl + params, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export { get, patch, post, put, del, postWithFormData };
