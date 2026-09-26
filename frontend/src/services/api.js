const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  let url = envUrl || '/api';
  // Strip trailing slash if present
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
};

const getHeaders = (isJson = true) => {
  const token = localStorage.getItem('campuscart_token');
  const headers = {};
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.error(`[API Error] Received non-JSON response (${res.status}):`, text.substring(0, 200));
    throw new Error(
      `Server connection failed (${res.status}). Please verify API endpoint configuration.`
    );
  }
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `API request failed with status ${res.status}`);
  }
  return data;
};

export const api = {
  // GET
  get: async (endpoint) => {
    const baseUrl = getApiBase();
    const url = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: getHeaders()
    });
    return await handleResponse(res);
  },

  // POST
  post: async (endpoint, body) => {
    const baseUrl = getApiBase();
    const url = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return await handleResponse(res);
  },

  // PUT
  put: async (endpoint, body) => {
    const baseUrl = getApiBase();
    const url = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return await handleResponse(res);
  },

  // DELETE
  delete: async (endpoint) => {
    const baseUrl = getApiBase();
    const url = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return await handleResponse(res);
  }
};
