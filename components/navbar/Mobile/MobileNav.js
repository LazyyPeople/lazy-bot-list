import {
    Stack,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import {
    SiDiscord
} from 'react-icons/si';

import MobileNavItem from './MobileNavItem';
import config from '../../../utils/config.json';

export default function MobileNav({router, user}) {
    return (
      <Stack
        bg={useColorModeValue('gray.700')}
        p={4}
        display={{ md: 'none' }}>
        {config.navbar.navbar_data.map((navItem) => (
          <MobileNavItem key={navItem.label} router={router} {...navItem} />
        ))}


        {!user && (
          <Button
            flex={{ base: 1 }}
            width={'100%'}
            gap={'5'}
            color={'white'}
            bg={'#5865F2'}
            onClick={(e) => {
              e.preventDefault();
              router.push('/api/discord-login');
          }}
            marginTop={'5'}
            _hover={{
              bg: config['login-data'].href.bg
            }}
          >
            <SiDiscord /> Login With Discord
          </Button>
        )}
      </Stack>
    );
  };