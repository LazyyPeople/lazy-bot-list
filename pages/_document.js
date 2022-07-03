import {
    Html,
    Head,
    Main,
    NextScript
} from 'next/document';
import config from '../utils/config.js';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet='UTF-8' />
                <meta name='description' content='Improve your Discord experience using our listed Discord Bot' />
                <meta name='keywords' content='BotList, Bot Discord List, Bot Discord, List Bot Discord, LazyPeople Discord Bot, LazyPeople Bot List' />
                <meta name='author' content='LazyPeople' />

                <meta property='og:type' content='website' />
                <meta property='og:site_name' content='Lazy People' />
                <meta property='og:url' content='https://bot-list.lazypeople.tk/' />
                <meta property='og:title' content='New Discord Bot List | By Lazy People' />
                <meta property='og:description' content='Improve your Discord experience using our listed Discord Bot' />
                <meta property='og:locale' content='en_GB' />

                <meta property='og:image' content='' />
                <meta property='og:image:alt' content='Avatar Discord Bot List' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}