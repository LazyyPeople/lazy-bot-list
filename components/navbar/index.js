import {
    Box,
    Flex,
    IconButton,
    Button,
    Heading,
    Stack,
    Collapse,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SiDiscord } from "react-icons/si";
import {
    HamburgerIcon,
    CloseIcon
} from '@chakra-ui/icons';

import DesktopNav from './Desktop/DesktopNav';
import MobileNav from './Mobile/MobileNav';

import config from '../../utils/config.js';
import Menu from './Component/Menu/Menu';

export default function Navbar({ user }) {
    const { isOpen, onToggle } = useDisclosure();
    const router = useRouter();

    return (
        <Box position={'fixed'} w={'full'} zIndex={20}>
            <Flex
                bg={useColorModeValue('gray.700', 'gray.900')}
                backdropFilter={'auto'}
                backdropBlur={'3px'}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={0}
                flexDirection={'row'}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        _hover={{
                            bg: 'gray.700'
                        }}
                        _active={{
                            bg: 'gray.700'
                        }}
                        icon={
                            isOpen ? <CloseIcon color={'gray.400'} w={3} h={3} /> : <HamburgerIcon color={'gray.400'} w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Heading
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        fontWeight={'800'}
                        fontSize={'xl'}
                        color={useColorModeValue('blue.300', 'green.300')}>
                        Lazy People
                    </Heading>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav router={router} />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>

                    {user ? (
                        <Menu user={user} />
                    ) : (
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            onClick={(e) => {
                                e.preventDefault();
                                router.push('/api/discord-login');
                            }}
                            color={'white'}
                            bg={'#5865F2'}
                            flex={{ base: 1 }}
                            gap={'2'}
                            _hover={{
                                bg: config['login-data'].href.bg,
                            }}>
                            <SiDiscord /> Login With Discord
                        </Button>
                    )}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav user={user} router={router} />
            </Collapse>
        </Box>
    );
}