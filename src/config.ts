export const BASE_API = '/api/';

export const SOCKET_URL =
    process.env.NODE_ENV === 'development'
        ? '//localhost:9000/api/v1/'
        : process.env.NODE_ENV == 'test'
        ? 'https://downfuture.com/api/v1/'
        : 'https://downfuture.com/api/v1/';
