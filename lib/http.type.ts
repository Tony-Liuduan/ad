import type { AxiosError, AxiosRequestConfig } from 'axios';

export type HttpErrorInfo = {
    errorType: HttpErrorType;
    errorMsg: string;
};

export type IAxiosRequestConfig<D = any> = AxiosRequestConfig<D> & {
    _retry?: number;
    _error?: (error: HttpErrorInfo & AxiosError) => boolean;
};

export enum HTTP_ERROR_TYPE {
    TIMEOUT = 'Timeout',
    NETWORK_ERROR = 'NetworkError',
    SERVICE_ERROR = 'ServiceError',
    FORBIDDEN = 'Forbidden',
    NOT_LOGIN = 'NotLogin',
    NOT_FOUND = 'NotFound',
    REQUEST_LIMIT = 'RequestLimit',
    UNKNOWN = 'Unknown'
}

export type HttpErrorType =
    | HTTP_ERROR_TYPE.TIMEOUT
    | HTTP_ERROR_TYPE.NETWORK_ERROR
    | HTTP_ERROR_TYPE.SERVICE_ERROR
    | HTTP_ERROR_TYPE.FORBIDDEN
    | HTTP_ERROR_TYPE.NOT_LOGIN
    | HTTP_ERROR_TYPE.NOT_FOUND
    | HTTP_ERROR_TYPE.REQUEST_LIMIT
    | HTTP_ERROR_TYPE.UNKNOWN;

export const HttpErrorTypeNameMap = new Map<HttpErrorType, string>([
    [HTTP_ERROR_TYPE.TIMEOUT, '访问超时，请稍后重试'],
    [HTTP_ERROR_TYPE.NETWORK_ERROR, '网络繁忙，请稍后重试'],
    [HTTP_ERROR_TYPE.SERVICE_ERROR, '服务开小差'],
    [HTTP_ERROR_TYPE.FORBIDDEN, '无权访问'],
    [HTTP_ERROR_TYPE.NOT_LOGIN, '未登录'],
    [HTTP_ERROR_TYPE.NOT_FOUND, '404'],
    [HTTP_ERROR_TYPE.REQUEST_LIMIT, '系统拥挤，请稍后重试']
]);

export const HttpErrorTypeCodeMap = new Map<number, HttpErrorType>([
    [401, HTTP_ERROR_TYPE.NOT_LOGIN],
    [403, HTTP_ERROR_TYPE.FORBIDDEN],
    [404, HTTP_ERROR_TYPE.NOT_FOUND],
    [429, HTTP_ERROR_TYPE.REQUEST_LIMIT],
    [500, HTTP_ERROR_TYPE.SERVICE_ERROR]
]);

export enum CONTENT_TYPE {
    JSON = 'application/json',
    FORM = 'application/x-www-form-urlencoded',
    FROM_DATA = 'multipart/form-data'
}
