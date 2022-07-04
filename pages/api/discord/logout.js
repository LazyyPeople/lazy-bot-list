import { serialize } from "cookie";
import config from '../../../utils/config.js';

export default function Logout(req, res) {
    res.setHeader("Set-Cookie", [
        serialize(config.jsonwebtoken["cookie-name"].auth_token, "", {
            maxAge: -1,
            path: '/'
        })
    ]);
    res.writeHead(302, {
        Location: "/"
    });
    res.end();
}