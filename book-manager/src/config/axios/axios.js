import axios from "axios";
import {ElMessage} from "element-plus";

// 创建axios实例
const request = axios.create({
    // 请求地址
    baseURL: 'http://127.0.0.1:5173/api',
    // 超时时间
    timeout: 60000,
    // 请求头
    headers: {
        'Content-Type': 'application/json'
    },
    // 不允许携带跨域凭据(默认值)
    withCredentials: false
})

// 请求拦截器
request.interceptors.request.use(async config => {
    if (config.url.includes('/login') || config.url.includes('/register')) {
        return config;
    }
    let token = sessionStorage.getItem('token');
    if (token) {
        config.headers.authorization = token;
    } else {
        // 重定向到登入页面
        const router = useRouter();
        await router.push('/login');
    }
    return config;
})

// 响应拦截器
request.interceptors.response.use(response => {
    // 如果 responseType 是 'blob'，直接返回响应
    if (response.config.responseType === 'blob') {
        return response;
    }
    const code = response.data.code;
    if (code !== 200) {
        ElMessage({message: response.data.message, type: 'error'});
    }
    return response.data;
})

export default request;
