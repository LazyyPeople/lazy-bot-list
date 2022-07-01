import { 
    Stack,
    Text,
    Link
} from '@chakra-ui/react';

export default function FooterItem({data}) {
    return (
        <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>{data.name}</Text>
            {data.child.map(c => (
                <Link href={c.href || '#'}>{c.name}</Link>
            ))}
        </Stack>
    )
}