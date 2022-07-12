import { extendTheme } from "@chakra-ui/react";
import { withProse } from '@nikolovlazar/chakra-ui-prose';

const theme = extendTheme({
    "config": {
        initialColorMode: 'light',
        useSystemColorMode: false
    },
}, withProse());
export default theme;