import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { parseError } from './http.error';
import { creatAxiosInstance } from './http.instance';
import type { HttpErrorInfo, IAxiosRequestConfig } from './http.type';

export const http = creatAxiosInstance();
http.interceptors.response.use(
    <T>(response: AxiosResponse<T>) => response,
    (error: AxiosError & { config?: IAxiosRequestConfig }): Promise<HttpErrorInfo & AxiosError> => {
        // 取消、中断请求
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        // 解析错误原因
        const { errorType, errorMsg } = parseError(error);
        const err = { errorType, errorMsg, ...error };

        return Promise.reject(err);
    }
);
