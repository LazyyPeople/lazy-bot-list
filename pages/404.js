import {
    Stack,
    Box,
    Heading,
    Text,
    Button
} from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Stack
            h={'100vh'}
        >
            <Box
                display={'flex'}
                h={'100%'}
                justifyContent={'center'}
                gap={2}
                alignItems={'center'}
            >
                <Box textAlign={'center'}>
                    <Heading fontSize={'3xl'}>404</Heading>
                    <Text fontWeight={'medium'}>This page could not be found</Text>
                    <Link href='/'>
                        <Button mt={3}>Back Home</Button>
                    </Link>
                </Box>
            </Box>
        </Stack>
    )
}