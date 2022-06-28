import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  Link
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import parseUser from  '../utils/parseUser';
import { SiDiscord } from "react-icons/si";
import {
  BiUserCircle
} from 'react-icons/bi';
import { TbLogout } from 'react-icons/tb';
import { useRouter } from 'next/router';

export default function Home({user}) {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('gray.800', 'gray.800')}
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
              bg: 'blue.200'
            }}
            _active={{
              bg: 'blue.200'
            }}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
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
            size={'md'}
            color={useColorModeValue('blue.300', 'white')}>
            Discord Bot List
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
            // <Button 
            //   borderRadius={'50%'}
            //   size={'sm'}
            //   height={'40px'}
            //   width={'40px'}
            // >
            //   <Avatar size={'sm'} name={user.username} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} />
            // </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  width={'45px'}
                  height={'45px'}
                  src={
                    `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem display={'flex'} gap={'3'}><BiUserCircle /> Profile</MenuItem>
                <MenuItem display={'flex'} gap={'3'}><AddIcon w={3} h={3} /> Add Bot</MenuItem>
                <MenuDivider />
                <MenuItem color={'red.400'} display={'flex'} gap={'3'}><TbLogout /> Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (<Button
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
              bg: '#7289da',
            }}>
            <SiDiscord /> Login With Discord
          </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav router={router} />
      </Collapse>
    </Box>
  );
}
export async function getServerSideProps (ctx) {
  const user = parseUser(ctx);

  return {
    props: {
      user
    }
  }
}

const DesktopNav = ({router}) => {
  const linkColor = useColorModeValue('gray.500');
  const linkActiveColor = useColorModeValue('gray.200');
  const linkHoverColor = useColorModeValue('white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                href={navItem.href}
                p={2}
                fontSize={'sm'}
                fontWeight={700}
                color={router.pathname === navItem.href ? linkActiveColor : linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                  {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({router}) => {
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

const MobileNavItem = ({ label, children, href, router }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={router.pathname === href ? 'gray.200' : 'gray.600'}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              // <NextLink href={child.href} passHref key={child.label}>
                <Link href={child.href} py={2}>
                  {child.label}
                </Link>
              // </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

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

const LOGIN = {
  href: '/api/discord-login',
  bg: '#5865F2',
  href: {
    bg: '#7289da'
  },
  color: 'white'
}