import {
    Stack,
    Flex,
    Text,
    Collapse,
    useDisclosure,
    useColorModeValue,
    Link
} from '@chakra-ui/react';
import {
    Icon
} from '@chakra-ui/icons';

export default function MobileNavItem({ label, children, href, router }) {
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