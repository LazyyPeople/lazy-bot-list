import {
    FormLabel,
    FormControl,
    useColorModeValue,
    FormHelperText
} from '@chakra-ui/react';

import MultipleSelect from '../MultipleSelect';

export default function Tags({
    validateCategory,
    _errorState,
    tags
}) {
    return (
        <FormControl isRequired>
            <FormLabel fontWeight={'bold'} color={useColorModeValue('gray.600', 'gray.400')}>Tags</FormLabel>
            <MultipleSelect isInvalid={_errorState && _errorState.message ? true : false} onChange={(e) => validateCategory(e.map(x => x.value))} options={tags} />
            {_errorState && _errorState.message && <FormHelperText color={'red.400'} mt={0.5}>{_errorState.message}.</FormHelperText>}
        </FormControl>
    )
}