import { serialize, parse } from "cookie";
import config from "./config";

export function setRedirectURL(path, res) {
    res.setHeader(
        'Set-Cookie',
        serialize(config.jsonwebtoken["cookie-name"].redirect_url, path, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            path: '/'
        })
    );

    return 200;
}

export function parseURL(req) {
    if(!req.headers.cookie) return null;
    let path = parse(req.headers.cookie)[config.jsonwebtoken["cookie-name"].redirect_url];
    if(!path) return null;

    return path;
}