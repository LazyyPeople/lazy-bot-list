// const redirect_uri = 'http://localhost:3000/api/discord/callback';
// const URI ='';
// const scope = ['identify'].join(' ');
import fetch from "node-fetch";
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import config from '../../../utils/config.js';

export default async function DiscordCallback(req, res) {
    const {
        code,
        error
    } = req.query;

    if(error) {
        console.log('error')
        return res.send(req.query.error);
    }
    // console.log(code)
    if(!code || typeof code !== 'string') return res.redirect(URI);
    // console.log('g')

    const body = new URLSearchParams({
        client_id: config["oauth-discord"].client_id,
        client_secret: config["oauth-discord"].client_secret,
        grant_type: 'authorization_code',
        redirect_uri: config["oauth-discord"].redirect_uri,
        code,
        scope: config["oauth-discord"].scopes.join(' ')
    }).toString();

    const discordtoken = await fetch(`${config.discord.api.base}/oauth2/token`, {
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

    const me = await fetch(`${config.discord.api.base}/users/@me`, {
        headers: {
            Authorization: `${discordtoken.token_type} ${discordtoken.access_token}`
        }
    }).then(res => res.json());

    if(!("id" in me)) {
        return res.redirect(URI);
    }

    const token = sign(me, config.jsonwebtoken["secret-key"], {
        expiresIn: '24h'
    });
    res.setHeader(
        "Set-Cookie",
        serialize(config.jsonwebtoken["cookie-name"], token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            path: '/'
        })
    );
    res.redirect('/');
}