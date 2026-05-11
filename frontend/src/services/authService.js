import axios from 'axios';

const API='http://localhost:8000/api';

export const login=(data)=>axios.post(`${API}/login`,data);
export const register=(data)=>axios.post(`${API}/register`,data);
export const logout=()=>axios.post(`${API}/logout`);