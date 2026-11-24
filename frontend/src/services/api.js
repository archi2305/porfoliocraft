import axios from 'axios';

// Dynamically use backend port 8000 in dev or relative /api in production
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    if (window.location.port === '5173') {
      return `http://${window.location.hostname}:8000/api`;
    }
  }
  return '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to format uploaded file URLs
export const getAssetUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/api') && typeof window !== 'undefined' && window.location.port === '5173') {
    return `http://${window.location.hostname}:8000${url}`;
  }
  return url;
};

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfoliocraft_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      if (window.location.pathname.startsWith('/dashboard')) {
        localStorage.removeItem('portfoliocraft_token');
        localStorage.removeItem('portfoliocraft_user');
        window.location.href = '/login?expired=1';
      }
    }
    return Promise.reject(error);
  }
);

// --- Auth Endpoints ---
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// --- Portfolio Endpoints ---
export const portfolioAPI = {
  getPortfolio: () => api.get('/portfolio'),
  updatePersonalInfo: (data) => api.put('/portfolio/personal', data),
  updateTemplate: (selected_template) => api.put('/portfolio/template', { selected_template }),
  togglePublish: (is_published) => api.put('/portfolio/publish', { is_published }),

  // Education
  addEducation: (data) => api.post('/portfolio/education', data),
  updateEducation: (id, data) => api.put(`/portfolio/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/portfolio/education/${id}`),

  // Skills
  addSkill: (data) => api.post('/portfolio/skills', data),
  deleteSkill: (id) => api.delete(`/portfolio/skills/${id}`),

  // Projects
  addProject: (data) => api.post('/portfolio/projects', data),
  updateProject: (id, data) => api.put(`/portfolio/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/portfolio/projects/${id}`),

  // Experience
  addExperience: (data) => api.post('/portfolio/experience', data),
  updateExperience: (id, data) => api.put(`/portfolio/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/portfolio/experience/${id}`),

  // Certifications
  addCertification: (data) => api.post('/portfolio/certifications', data),
  updateCertification: (id, data) => api.put(`/portfolio/certifications/${id}`, data),
  deleteCertification: (id) => api.delete(`/portfolio/certifications/${id}`),

  // Social Links
  addSocial: (data) => api.post('/portfolio/socials', data),
  deleteSocial: (id) => api.delete(`/portfolio/socials/${id}`),

  // Contact Messages
  getMessages: () => api.get('/portfolio/messages'),
  markMessageRead: (id) => api.put(`/portfolio/messages/${id}/read`),
  deleteMessage: (id) => api.delete(`/portfolio/messages/${id}`),
};

// --- Upload Endpoints ---
export const uploadAPI = {
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  removeResume: () => api.delete('/upload/resume'),
};

// --- Public Endpoints ---
export const publicAPI = {
  getPortfolio: (username, preview = false) =>
    api.get(`/public/${username}${preview ? '?preview=true' : ''}`),
  sendMessage: (username, data) => api.post(`/public/${username}/contact`, data),
};

export default api;
