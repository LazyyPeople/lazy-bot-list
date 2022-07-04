import {
    remark
} from 'remark';
import html from 'remark-html';
// import prism from 'remark-prism';

export async function mdToHtml(md) {
    const r = await remark()
    .use(html, {
        sanitize: true
    })
    .process(md);

    return r.toString();
}