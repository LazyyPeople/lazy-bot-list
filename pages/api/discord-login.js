import config from '../../utils/config.js';
import {
    isProduction,
    isLocalHost
} from '../../utils';

export default function DiscordLogin(req, res) {
    console.log(req.headers.host)

    const OAUTH_DISCORD = new URLSearchParams({
        client_id: config['oauth-discord'].client_id,
        
        redirect_uri: isProduction ? config['oauth-discord'].redirect_uri.production :
            (
                isLocalHost(req) ? config['oauth-discord'].redirect_uri.dev.localhost :
                    config['oauth-discord'].redirect_uri.dev.ipv4
            ),

        response_type: 'code',
        scope: config['oauth-discord'].scopes.join(" ")
    }).toString();

    res.redirect(`https://discord.com/api/oauth2/authorize?${OAUTH_DISCORD}`);
}