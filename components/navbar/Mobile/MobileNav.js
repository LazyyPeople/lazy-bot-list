import {
    Stack,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import {
    SiDiscord
} from 'react-icons/si';
const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Partners',
    href: '/partners'
  }
];


import MobileNavItem from './MobileNavItem';
const LOGIN = {
  href: '/api/discord-login',
  bg: '#5865F2',
  href: {
    bg: '#7289da'
  },
  color: 'white'
}

export default function MobileNav({router}) {
    return (
      <Stack
        bg={useColorModeValue('gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} router={router} {...navItem} />
        ))}
        <Button
          flex={{ base: 1 }}
          width={'100%'}
          gap={'5'}
          color={'white'}
          bg={'#5865F2'}
          marginTop={'5'}
          href={LOGIN.href}
          _hover={{
            bg: '#7289da'
          }}
        >
          <SiDiscord /> Login With Discord
        </Button>
      </Stack>
    );
  };