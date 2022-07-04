import {
    Box,
    FormControl,
    Input,
    FormLabel,
    Container,
    Flex,
    Text,
    ListItem,
    Button,
    Textarea,
    List
} from "@chakra-ui/react";
import Head from "../components/head";
import Navbar from "../components/navbar";
import parseUser from "../utils/parseUser";
import { setRedirectURL } from '../utils/redirectURL';
import Footer from '../components/footer/Footer';

export default function AddBot({ user }) {
    return (
        <>
            <Head title={'{name} - Add Bot'} />
            <Navbar user={user} />

            <Container maxW={'3xl'} mt={'6'} mb={20}>
                <Flex flexDirection={{ base: 'column', md: 'column' }} gap={10}>
                    <Box>
                        <Flex mt={'7'} flexDirection={'column'} gap={'4'}>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor='idbot'>Bot ID</FormLabel>
                                <Input id='idbot' fontSize={'sm'} placeholder='698417630108713090' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="prefix">Prefix</FormLabel>
                                <Input id='prefix' fontSize={'sm'} placeholder="!" />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="owners">Owners</FormLabel>
                                <Input id='owners' fontSize={'sm'} placeholder="Use coma (,) for more than one (max 3 id)" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="sd">Short Description</FormLabel>
                                <Input id='sd' fontSize={'sm'} placeholder="describe your bot in short" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'}>Long Description</FormLabel>
                                <Textarea fontSize={'sm'} placeholder='Long description, Markdown only, min 150 characters' />
                                <Button size={'sm'} mt={3} px={5} colorScheme={'teal'}>Preview</Button>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="website">Website</FormLabel>
                                <Input id='website' fontSize={'sm'} placeholder="Website for your bot" />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="sp">Support Server</FormLabel>
                                <Input id='sp' fontSize={'sm'} placeholder="Server for your bot" />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="IUR">Invite URL</FormLabel>
                                <Input id='IUR' fontSize={'sm'} placeholder="Invite URL for your bot" />
                            </FormControl>

                            <FormControl>
                                <Button colorScheme={'messenger'} px={8} size={'md'} mt={3}>Submit Bot</Button>
                            </FormControl>
                        </Flex>
                    </Box>
                </Flex>
            </Container>

            <Footer />
        </>
    )
}

export async function getServerSideProps(ctx) {
    const user = parseUser(ctx);
    if (!user) {
        setRedirectURL('/add', ctx.res);
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