import axios from 'axios';
// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8080', // api的baseURL
    timeout: 30000 // 超时时间
});
export default service;