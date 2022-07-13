import { extendTheme } from "@chakra-ui/react";
import { withProse } from '@nikolovlazar/chakra-ui-prose';

const theme = extendTheme({
    "config": {
        initialColorMode: 'dark',
        useSystemColorMode: false
    },
}, withProse());
export default theme;
