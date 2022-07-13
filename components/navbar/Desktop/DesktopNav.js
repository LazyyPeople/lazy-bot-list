import {
    Stack,
    useColorModeValue,
    Box,
    Popover,
    Link,
    PopoverTrigger,
    PopoverContent
} from '@chakra-ui/react';
import config from '../../../utils/config.js';
import DesktopSubNav from './DesktopSubNav';

export default function DesktopNav({router}) {
    const linkColor = useColorModeValue('gray.500', 'gray.500');
    const linkActiveColor = useColorModeValue('gray.100', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.300', 'gray.100');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {config.navbar.navbar_data.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  href={navItem.href}
                  p={2}
                  rounded={'base'}
                  fontSize={'sm'}
                  fontWeight={'bold'}
                  transition={'all .3s ease'}
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