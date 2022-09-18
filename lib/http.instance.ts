import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import qs from 'qs';
import { CONTENT_TYPE } from './http.type';

function formateAxiosData(config: AxiosRequestConfig) {
    if (!config.data) {
        return;
    }
    const contentType = (config.headers?.['Content-Type'] || '') as string;
    if (contentType.startsWith(CONTENT_TYPE.JSON)) {
        return;
    }
    if (contentType.startsWith(CONTENT_TYPE.FROM_DATA)) {
        return;
    }
    config.data = qs.stringify(config.data);
}

export const jsonAxiosConfig = {
    headers: {
        'Content-Type': CONTENT_TYPE.JSON
    }
};

export const formDataAxiosConfig = {
    headers: {
        'Content-Type': CONTENT_TYPE.FROM_DATA
    }
};

export const creatAxiosInstance = (defaultParams?: Record<string, any>) => {
    const instance = axios.create({
        timeout: 9999, // 指定请求超时的毫秒数(0 表示无超时时间)
        proxy: false,
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Cache-Control': 'no-cache'
        }
    });

    instance.interceptors.request.use(
        config => {
            // params 是数组类型如arr=[1,2]，则转换成arr=1&arr=2
            config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });
            formateAxiosData(config);

            const [url, urlParamsString] = config.url!.split(/\?|#/);
            const urlParams = urlParamsString ? qs.parse(urlParamsString) : undefined;

            return {
                ...config,
                url,
                params: {
                    ...defaultParams,
                    ...urlParams,
                    ...config.params
                }
            };
        },
        error => Promise.reject(error)
    );

    return instance;
};
