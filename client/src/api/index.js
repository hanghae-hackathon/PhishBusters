import axios from 'axios';

export const serverUrl = `http://localhost:1234/api/`;

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

async function patchWithFormData(params, data) {
  return axios.patch(serverUrl + params, data, {
    headers: {
      'Content-Type': 'audio',
      Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    },
  });
}

export { get, patch, post, put, del, patchWithFormData };
