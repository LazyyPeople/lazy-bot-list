import {
    FormControl,
    Button,
    Box,
    Spinner,
    Text
} from '@chakra-ui/react';

export default function SubmitButton({
    _handleSubmit,
    buttonDisabled,
    buttonloading
}) {
    return (
        <FormControl>
            <Button disabled={buttonDisabled ? true : buttonloading} onClick={() => _handleSubmit()} colorScheme={'messenger'} px={8} size={'md'} mt={3}>
                {buttonloading ? (
                    <Box display={'flex'} gap={2} justifyContent={'center'} alignItems={'center'}>
                        <Spinner size={'sm'} />
                        <Text>Loading..</Text>
                    </Box>
                ) : (
                    <Text>Submit Bot</Text>
                )}
            </Button>
        </FormControl>
    )
}