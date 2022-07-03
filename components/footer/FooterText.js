import {
    Text
} from '@chakra-ui/react';

export default function FooterText({ text }) {
    return (
        <Text color={'gray.600'} fontSize={{base: 'sm'}}>{text}</Text>
    )
}