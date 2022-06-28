import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import fetch from 'node-fetch';

const scope = ['identify'].join(' ');
const redirect_uri = 'http://localhost:3000/api/discord/callback';

const OAUTH_DISCORD = new URLSearchParams({
    client_id: '702874025189179533',
    redirect_uri: redirect_uri,
    response_type: 'code',
    scope
}).toString();

const URI = `https://discord.com/api/oauth2/authorize?${OAUTH_DISCORD}`;

export default async(req, res) => {
    res.redirect(URI);
    // if(req.method !== 'GET') return res.redirect('/');

    // const body = new URLSearchParams({
    //     client_id: '702874025189179533',
    //     client_secret: 'byXbKnnKXuT68pR3bnZDFjRSdf6lMSDk',
    //     grant_type: 'authorization_code',
    //     redirect: redirect_uri,
    //     code,
    //     scope
    // }).toString();

    // const { access_token, token_type = 'Bearer' } = await fetch('https://discord.com/api/oauth2/token', {
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     method: 'POST',
    //     body
    // }).then(res => res.json());

    // if(!access_token || access_token !== 'string') {
    //     return res.redirect(URI);
    // }

    // const me = await fetch("http://discord.com/api/users/@me", {
    //     headers: {
    //         Authorization: `${token_type} ${access_token}`
    //     }
    // }).then(res => res.json());

    // if(!("id" in me)) {
    //     return res.redirect(URI);
    // }

    // const token = sign(me, 'botlistdiscordbotbylazypeople', {
    //     expiresIn: '24h'
    // });
    // console.log(token);
    // res.setHeader(
    //     "Set-Cookie",
    //     serialize('token', token, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV !== 'development',
    //         sameSite: 'strict',
    //         path: '/api/discord/callback'
    //     })
    // );

    // res.redirect('/')
}