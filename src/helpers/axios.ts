import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from 'axios'
export function convertHeadersToAxiosConfig(headers: any): AxiosRequestConfig['headers'] {
    console.log(headers)
    const convertedHeaders: AxiosRequestConfig['headers'] = {};
    const commonHeaders = [
        "Accept",
        "Content-Type",
        "authorization",
        "User-Agent",
        "Cookie",
        "Cache-Control",
        "Origin",
        "Referer",
        "Content-Length",
        "Host",
    ];
    for (const key of Object.keys(headers)) {
        if (commonHeaders.includes(key.toLowerCase())) {
            convertedHeaders[key] = headers[key] as string;
        }
    }
    console.log(headers)

    return convertedHeaders;
}


export const makeAxiosCall = (axiosConfig: AxiosRequestConfig): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
        axios(axiosConfig)
            .then((response: AxiosResponse) => resolve(response))
            .catch((error: AxiosError) => reject(error));
    });
};

