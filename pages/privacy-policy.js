import { Box, Container, List, ListIcon, Divider, ListItem, Text } from '@chakra-ui/react';
import Navbar from '../components/navbar/index';
import Header from '../components/head/index';
import parseUser from '../utils/parseUser';
import Footer from '../components/footer/Footer';
import {
    MdCircle
} from 'react-icons/md';

export default function PrivacyPolicy({user}) {
    return (
        <>
            <Navbar user={user} />
            <Header title={'{name} - Privacy Policy'} />

            <Box p={2} pb={10}>
                <Container bg={'blackAlpha.50'} p={5} rounded={'base'} mt={4} maxW={'4xl'}>
                    <Box>
                        <Text fontWeight={'bold'} color={'gray.700'} fontSize={{ base: '2xl', md: '3xl' }}>Privacy Policy</Text>
                        <Text fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>By accessing this site without logging in, you will be referred to as an anonymous visitor and we will not collect data for anonymous visitors.</Text>
                        <Text fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>We only collect data according to user needs, such as adding bots to our site.</Text>
                        <Text mt={4} fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>The following explains how we use and store your data:</Text>
                        <Box mt={2}>
                            <Text display={'flex'} gap={1}>1. <Text color={'gray.600'} fontWeight={'bold'} fontSize={'md'}>Discord Authentication</Text></Text>
                            <Text fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>We collect your personal information which has been provided by <b>Discord</b> when you log in to a website using Discord Authentication.</Text>
                            <Text fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>The following personal information has been provided by Discord: </Text>
                            <List spacing={2} mt={2} px={5} color={'gray.600'} rounded={'md'} fontSize={'sm'}>
                                <ListItem display={'flex'} alignItems={'center'}>
                                    <ListIcon as={MdCircle} color={'green.500'} w={'2'} />
                                    User ID
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdCircle} color={'green.500'} w={'2'} />
                                    Avatar
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdCircle} color={'green.500'} w={'2'} />
                                    Username
                                </ListItem>
                            </List>
                            <Divider pt={4} />
                            <Box pt={2}>
                                <Text fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>On the add bot page, we only take and store the data you provide and save it to the database.</Text>
                            </Box>
                        </Box>
                        <Box mt={5}>
                            <Text display={'flex'} gap={1}>2. <Text color={'gray.600'} fontWeight={'bold'} fontSize={'md'}>Cookies</Text></Text>
                            <Text fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>We use cookies to store your personal data which was described in the previous explanation about Discord (1.<b> Discord Authentication</b>). Within the next 24 hours after authentication, the data we store in cookies will be deleted. </Text>
                        </Box>
                        <Box mt={5}>
                        <Text display={'flex'} gap={1}>3. <Text color={'gray.600'} fontWeight={'bold'} fontSize={'md'}>Displayed data</Text></Text>
                            <Text fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>On the Home page we just share some information about your bot.</Text>
                            <Text fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>the following data is displayed:</Text>
                            <List spacing={1} mt={2} px={5} color={'gray.600'} rounded={'md'} fontSize={'sm'}>
                                <ListItem display={'flex'} alignItems={'center'}>
                                    <ListIcon as={MdCircle} color={'green.500'} w={'2'} />
                                    Bot Name & Avatar
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdCircle} color={'green.500'} w={'2'} />
                                    Prefix Bot
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdCircle} color={'green.500'} w={'2'} />
                                    Total Server
                                </ListItem>
                            </List>
                            <Text pt={2} fontSize={{ base: 'sm', md: 'medium' }} color={'gray.600'}>On the bot view page, we display all the data that you filled in when adding a bot, and we also display the usernames & avatars of the developers.</Text>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Footer />
        </>
    )
}

export async function getServerSideProps(ctx) {
    const user = parseUser(ctx);
  
    return {
      props: {
        user
      }
    }
  }
  