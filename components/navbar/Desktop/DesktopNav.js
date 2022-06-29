import {
    Stack,
    useColorModeValue,
    Box,
    Popover,
    Link,
    PopoverTrigger,
    PopoverContent
} from '@chakra-ui/react';
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

export default function DesktopNav({router}) {
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