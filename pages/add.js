import {
    Box,
    FormControl,
    Input,
    FormLabel,
    Container,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Flex,
} from "@chakra-ui/react";
import Head from "../components/head";
import Navbar from "../components/navbar";
import parseUser from "../utils/parseUser"

export default function AddBot({ user }) {
    return (
        <>
            <Head title={'{name} - Add Bot'} />
            <Navbar user={user} />

            <Container maxW={'6xl'} mt={'6'}>

                <Flex mt={'7'} flexDirection={'column'} gap={'4'}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='idbot'>Bot ID</FormLabel>
                        <Input id='idbot' placeholder='698417630108713090' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="prefix">Prefix</FormLabel>
                        <Input id='prefix' placeholder="!" />
                    </FormControl>
                </Flex>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const user = parseUser(ctx);
    if (!user) {
        ctx.req.url = '/add';
        return {
            redirect: {
                destination: '/api/discord-login',
                permanent: false
            }
        }
    }

    return {
        props: {
            user
        }
    }
}