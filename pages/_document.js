import {
    Html,
    Head,
    Main,
    NextScript
} from 'next/document';
import config from '../utils/config.json';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet='UTF-8' />
                <meta name='description' content='Lorem ipsum dolor ismate' />
                <meta name='keywords' content='BotList, Bot Discord List, Bot Discord, List Bot Discord' />
                <meta name='author' content='LazyPeople' />

                <meta property='og:type' content='website' />
                <meta property='og:site_name' content='Discord Bot List' />
                <meta property='og:description' content='Lorem ipsum' />
                <meta property='og:locale' content='en_GB' />

                <meta property='og:image' content='' />
                <meta property='og:image:alt' content='Avatar from Discord Bot List' />

                <title>{config['web-data'].name}</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}