import { serialize, parse } from "cookie";
import config from "./config";

export function setRedirectURL(path, res) {
    let body = {
        path,
        _timestamp: Date.now()
    }

    res.setHeader(
        'Set-Cookie',
        serialize(config.jsonwebtoken["cookie-name"].redirect_url, path, {
            httpOnly: true,
            maxAge: 30,
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