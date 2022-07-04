import config from '../../utils/config.js';

const OAUTH_DISCORD = new URLSearchParams({
    client_id: config['oauth-discord'].client_id,
    redirect_uri: config['oauth-discord'].redirect_uri,
    response_type: 'code',
    scope: config['oauth-discord'].scopes.join(" ")
}).toString();

const URI = `https://discord.com/api/oauth2/authorize?${OAUTH_DISCORD}`;

export default function DiscordLogin(req, res) {
    res.redirect(URI);
}