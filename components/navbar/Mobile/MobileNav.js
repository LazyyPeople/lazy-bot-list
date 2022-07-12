import {
    Stack,
    Button,
    useColorModeValue
} from '@chakra-ui/react';
import {
    SiDiscord
} from 'react-icons/si';

import MobileNavItem from './MobileNavItem';
import config from '../../../utils/config.js';

export default function MobileNav({router, user}) {
    return (
      <Stack
        bg={useColorModeValue('gray.900', 'gray.900')}
        p={4}
        borderBottomColor={'gray.700'}
        borderBottomWidth={2}
        borderBottomLeftRadius={'4px'}
        borderBottomRightRadius={'4px'}
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