import config from "./config";

export const isProduction = process.env.NODE_ENV === "production";

export function isLocalHost(req) {
    if (req.headers.host == `localhost:${config['web-data'].port}`) return true;
    else if (req.headers.host == `127.0.0.1:${config['web-data'].port}`) return false;
}