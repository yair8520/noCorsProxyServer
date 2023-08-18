import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from 'axios'
export function convertHeadersToAxiosConfig(headers: any): AxiosRequestConfig['headers'] {
    const convertedHeaders: AxiosRequestConfig['headers'] = {};
    const commonHeaders = [
        "Accept",
        "Content-Type",
        "Authorization",
        "User-Agent",
        "Cookie",
        "Cache-Control",
        "Origin",
        "Referer",
        "Content-Length",
    ];
    for (const commonHeader of commonHeaders) {
        const lowercaseKey = commonHeader.toLowerCase();
        if (headers.hasOwnProperty(lowercaseKey)) {
            convertedHeaders[commonHeader] = headers[lowercaseKey] as string;
        }
    }
    return convertedHeaders;
}


export const makeAxiosCall = (axiosConfig: AxiosRequestConfig): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
        axios(axiosConfig)
            .then((response: AxiosResponse) => resolve(response))
            .catch((error: AxiosError) => reject(error));
    });
};

