import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import config from '../../utils/config.json';
import FooterItem from "./FooterItem";
import FooterText from "./FooterText";

export default function Footer() {
    return (
        <Box
            bg={'gray.900'}
            color={'gray.200'}
        >
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
                    {config.navbar.footer_nav.links.map((x, i) => (
                        <FooterItem data={x} key={i} />
                    ))}
                </SimpleGrid>
            </Container>
            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={'gray.700'}
            >
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    spacing={1}
                    py={4}
                    centerContent
                >
                    <FooterText text={config.navbar.footer_nav.anotherText || ''} />
                    <FooterText text={config.navbar.footer_nav.notAffiliated} />
                </Container>
            </Box>
        </Box>
    )
}