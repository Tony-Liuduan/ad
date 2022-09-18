import type { AxiosError } from 'axios';
import type { HttpErrorInfo, HttpErrorType } from './http.type';
import { HttpErrorTypeCodeMap, HttpErrorTypeNameMap, HTTP_ERROR_TYPE } from './http.type';

function parseErrorType(error: AxiosError): HttpErrorType {
    const { code, message, response } = error;

    // 访问超时
    if (code === 'ECONNABORTED' && message.startsWith('timeout')) {
        return HTTP_ERROR_TYPE.TIMEOUT;
    }

    const {
        status = 0 // 服务端响应的状态码值
    } = response || {};

    const errorType = HttpErrorTypeCodeMap.get(status >= 500 ? 400 : status);

    if (errorType) {
        return errorType;
    }

    // 网络繁忙
    if (message === 'Network Error') {
        return HTTP_ERROR_TYPE.NETWORK_ERROR;
    }

    // 未知错误
    return HTTP_ERROR_TYPE.UNKNOWN;
}

function parseErrorMsg(type: HttpErrorType, error: AxiosError): string {
    const { message, response } = error;

    const errorTypeName = HttpErrorTypeNameMap.get(type);
    if (errorTypeName && type !== HTTP_ERROR_TYPE.UNKNOWN) {
        return errorTypeName;
    }

    let dataMsg: string | undefined;
    const { data, statusText } = response || {};
    if (data) {
        dataMsg =
            typeof data === 'object' ? (data as { message?: string }).message : typeof data === 'string' ? data : '';
    }
    return dataMsg || message || statusText || '未知请求错误';
}

export function parseError(error: AxiosError): HttpErrorInfo {
    const errorType = parseErrorType(error);
    const errorMsg = parseErrorMsg(errorType, error);
    return {
        errorType,
        errorMsg
    };
}
