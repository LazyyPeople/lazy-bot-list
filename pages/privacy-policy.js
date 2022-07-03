import { Box, Container, List, ListIcon, Divider, ListItem, Text } from '@chakra-ui/react';
import Navbar from '../components/navbar/index';
import Header from '../components/head/index';

import {
    MdCircle
} from 'react-icons/md';

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <Header title={'{name} - Privacy Policy'} />

            <Box p={2}>
                <Container bg={'blackAlpha.200'} p={5} rounded={'base'} mt={4} maxW={'6xl'}>
                    <Box>
                        <Text fontWeight={'bold'} color={'gray.700'} fontSize={{ base: '2xl', md: '3xl' }}>Data Stored</Text>
                        <Box mt={5}>
                            <Text fontWeight={'medium'} fontSize={'xl'}>1. Discord</Text>
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
                    </Box>
                </Container>
            </Box>
        </>
    )
}