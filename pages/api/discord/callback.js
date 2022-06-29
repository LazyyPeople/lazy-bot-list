const redirect_uri = 'http://localhost:3000/api/discord/callback';
const URI ='';
const scope = ['identify'].join(' ');
import fetch from "node-fetch";
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

export default async function DiscordCallback(req, res) {
    const {
        code,
        error
    } = req.query;

    if(error) {
        console.log('error')
        return res.redirect(`/error?message=${req.query.error}`);
    }
    console.log(code)
    if(!code || typeof code !== 'string') return res.redirect(URI);
    // console.log('g')

    const body = new URLSearchParams({
        client_id: '702874025189179533',
        client_secret: 'byXbKnnKXuT68pR3bnZDFjRSdf6lMSDk',
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri,
        code,
        scope
    }).toString();

    const discordtoken = await fetch('https://discord.com/api/oauth2/token', {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Accept': 'application/json'
        },
        method: 'POST',
        body
    }).then(res => res.json());
    if(discordtoken.error) {
        return res.send(JSON.stringify(discordtoken, null, 2));
    }

    if(!discordtoken.access_token || typeof discordtoken.access_token !== 'string') {
        return res.redirect(URI);
    }

    const me = await fetch("http://discord.com/api/users/@me", {
        headers: {
            Authorization: `${discordtoken.token_type} ${discordtoken.access_token}`
        }
    }).then(res => res.json());

    if(!("id" in me)) {
        return res.redirect(URI);
    }

    const token = sign(me, 'botlistdiscordbotbylazypeople', {
        expiresIn: '24h'
    });
    res.setHeader(
        "Set-Cookie",
        serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            path: '/'
        })
    );
    res.redirect('/');
}