import {
    FormControl,
    FormLabel,
    Textarea,
    Button,
    useColorModeValue,
    FormHelperText
} from '@chakra-ui/react';

export default function Description({
    _errorState,
    label,
    id,
    placeholder,
    validation,

    hasPreview,
    preViewRef,
    onOpen,
    PreviewMD
}) {
    return (
        <FormControl isInvalid={_errorState && _errorState.message ? true : false} isRequired>
            <FormLabel htmlFor={id} fontWeight={'bold'} color={useColorModeValue('gray.600', 'gray.400')}>{label}</FormLabel>
            <Textarea onBlur={() => validation()} variant={'outline'} autoComplete={'off'} rows={15} id={id} fontSize={'sm'} placeholder={placeholder} />
            {_errorState && _errorState.message && <FormHelperText color={'red.400'} mt={0.5}>{_errorState.message}.</FormHelperText>}

            {hasPreview && (
                <>
                    <Button ref={preViewRef} onClick={() => {
                        onOpen();
                        PreviewMD()
                    }} size={'sm'} mt={3} px={5} colorScheme={'teal'}>Preview</Button>
                </>
            )}
        </FormControl>
    )
}