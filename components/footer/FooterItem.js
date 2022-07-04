import { 
    Stack,
    Text,
    Link
} from '@chakra-ui/react';

export default function FooterItem({data}) {
    return (
        <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>{data.name}</Text>
            {data.child.map((c, index) => (
                <Link _hover={{color: 'gray.300'}} href={c.href || '#'} color={'gray.600'} key={index}>{c.name}</Link>
            ))}
        </Stack>
    )
}