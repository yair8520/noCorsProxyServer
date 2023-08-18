const allowedOrigins = ['https://yair8520.github.io', 'http://localhost:3001'];
export const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};