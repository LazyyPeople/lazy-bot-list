import { parse } from 'cookie';
export default function getAuthToken(ctx) {
    if(!ctx.req.headers.cookie) return null;
    const token = parse(ctx.req.headers.cookie)['_authkey'];
    if(!token) return null;

    return token;
}