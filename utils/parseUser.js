import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';
import config from './config.js';

export default function parseUser(ctx) {
    if(!ctx.req.headers.cookie) return null;
    const token = parse(ctx.req.headers.cookie)[config.jsonwebtoken['cookie-name']];
    if(!token) return null;
     
    try {
        const user = verify(token, config.jsonwebtoken['secret-key']);
        return user;
    } catch(e) {
        return null;
    }
}