import {
    Box,
    FormControl,
    Input,
    FormLabel,
    Container,
    Flex,
    Text,
    ListItem,
    Textarea,
    List
} from "@chakra-ui/react";
import Head from "../components/head";
import Navbar from "../components/navbar";
import parseUser from "../utils/parseUser";
import Footer from '../components/footer/Footer';

export default function AddBot({ user }) {
    return (
        <>
            <Head title={'{name} - Add Bot'} />
            <Navbar user={user} />

            <Container maxW={'6xl'} mt={'6'} mb={20}>
                <Flex flexDirection={{base: 'column', md: 'row'}} gap={10}>
                    <Box w={{base: '100%', md:'70%'}}>
                        <Flex mt={'7'} flexDirection={'column'} gap={'4'}>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'}  htmlFor='idbot'>Bot ID</FormLabel>
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
                                <FormLabel fontWeight={'medium'} color={'gray.600'}>Description</FormLabel>
                                <Textarea fontSize={'sm'} placeholder='Here is a sample placeholder' />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="website">Website</FormLabel>
                                <Input id='website' fontSize={'sm'} placeholder="Website for your bot" />
                            </FormControl>
                        </Flex>
                    </Box>
                    <Box h={'min-content'} bg={'gray.700'} display={{base: 'none', md: 'block'}} p={5} rounded={'base'} w={'30%'}>
                        <Text fontWeight={'medium'} color={'gray.300'}>Rules Add Bot</Text>
                        <List spacing={2} fontSize={'sm'} color={'gray.500'} fontWeight={'normal'} mt={3}>
                            <ListItem>
                                1. You must own a bot or be part of a bot owners
                            </ListItem>
                            <ListItem>
                                2. Make sure your bot doesn't respond to other bots
                            </ListItem>
                            <ListItem>
                                3. The bot must have a <b>help</b> command
                            </ListItem>
                            <ListItem>
                                4. Bots will be rejected if using a bot maker
                            </ListItem>
                        </List>
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