import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from 'axios'
export function convertHeadersToAxiosConfig(headers: any): AxiosRequestConfig['headers'] {
    const convertedHeaders: AxiosRequestConfig['headers'] = {};
    const commonHeaders = [
        "accept",
        "content-type",
        "authorization",
        "user-agent",
        "cookie",
        "cache-control",
        "referer",
    ];
    for (const key of Object.keys(headers)) {
        if (commonHeaders.includes(key.toLowerCase())) {
            convertedHeaders[key] = headers[key] as string;
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

