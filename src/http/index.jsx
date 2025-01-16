import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8082/tasks/',
});

export default http;
