import fetch from "node-fetch";
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import config from '../../../utils/config.js';
import { isProduction, isLocalHost } from "../../../utils/index.js";
import { parseURL } from "../../../utils/redirectURL.js";

export default async function DiscordCallback(req, res) {
    const {
        code,
        error
    } = req.query;

    if(error) {
        console.log('error')
        return res.send(req.query.error);
    }

    if(!code || typeof code !== 'string') return res.redirect(URI);

    const body = new URLSearchParams({
        client_id: config["oauth-discord"].client_id,
        client_secret: config["oauth-discord"].client_secret,
        grant_type: 'authorization_code',
        // redirect_uri: config["oauth-discord"].redirect_uri,
        redirect_uri: isProduction ? config['oauth-discord'].redirect_uri.production :
        (
            isLocalHost(req) ? config['oauth-discord'].redirect_uri.dev.localhost :
                config['oauth-discord'].redirect_uri.dev.ipv4
        ),
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
    
    const token2 = sign({
        id: me.id,
        date: Date.now()
    }, config.jsonwebtoken["secret-key"], {
        expiresIn: '24h'
    });

    res.setHeader(
        "Set-Cookie",
        [
            serialize(config.jsonwebtoken["cookie-name"].auth_token, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'lax',
                path: '/'
            }),
            serialize('_authkey', token2, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'lax',
                path: '/'
            })
        ]
    );
    res.redirect(parseURL(req) ? parseURL(req) : '/');
}