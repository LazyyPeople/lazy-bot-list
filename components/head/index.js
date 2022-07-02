import HeadNext from 'next/head';
import config from '../../utils/config.js';

export default function Head({title}) {
    const filterTitle = title
    .replace(/{name}/g, config['web-data'].name)

    return (
        <HeadNext>
            <title>{filterTitle}</title>
        </HeadNext>
    )
}