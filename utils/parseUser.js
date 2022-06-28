import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';

export default function parseUser(ctx) {
    // console.log(ctx.req.headers)
    if(!ctx.req.headers.cookie) return null;

    const token = parse(ctx.req.headers.cookie)['token'];

    if(!token) return null;
     
    try {
        const user = verify(token, 'botlistdiscordbotbylazypeople');
        // console.log(token);
        return user;
    } catch(e) {
        return null;
    }
}