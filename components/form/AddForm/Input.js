import {
    FormControl,
    FormHelperText,
    FormLabel,
    InputGroup,
    Input,
    InputRightElement,
    Spinner,
    useColorModeValue,
    InputLeftAddon,

    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    RadioGroup,
    AccordionIcon,
    Stack,
    Radio,
    Text,
    Box
} from "@chakra-ui/react";

import {
    CheckIcon,
    WarningIcon
} from '@chakra-ui/icons';

export default function InputAdd({
    labelName,
    id,
    _errorState,
    validation,
    leftAddon,
    placeholder,

    useAccor,
    valueRadio,
    setValueRadio,
    accorText,
    disabled,
    childrenItems,

    ...base
}) {
    return (
        <FormControl {...base}>
            <FormLabel fontWeight={'bold'} color={useColorModeValue('gray.600', 'gray.400')}>{labelName}</FormLabel>
            <InputGroup>
                {leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}

                <Input
                    variant={'outline'}
                    autoComplete={'off'}
                    fontSize={'sm'}
                    onBlur={() => validation()}
                    disabled={disabled}
                    placeholder={placeholder}
                    id={id}
                />

                <InputRightElement>
                    {_errorState == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (_errorState == null ? '' : (_errorState !== 'success' ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />))}
                </InputRightElement>
            </InputGroup>
            {_errorState && _errorState.message && <FormHelperText color={'red.400'} mt={0.5}>{_errorState.message}.</FormHelperText>}

            {useAccor && <Accordion allowToggle mt={2}>
                <AccordionItem borderWidth={0}>
                    <Text>
                        <AccordionButton>
                            <Box fontSize={'sm'} color={'gray.500'} flex='1' textAlign={'left'}>
                                {accorText}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </Text>
                    <AccordionPanel>
                        <RadioGroup onChange={(e) => {
                            setValueRadio(e)
                            validation(e)
                        }} value={valueRadio}>
                            <Stack color={'gray.500'}>
                                {childrenItems.map((data,i) => (
                                    <Radio key={i} size={'md'} value={data.value}>{data.name}</Radio>
                                ))}
                                {/* <Radio size={'md'} value='s'>Slash Command</Radio>
                                <Radio size={'md'} value='sp'>Slash Command and Prefix</Radio> */}
                                <Box pt={4}>
                                    <Text color={'telegram.500'} onClick={() => {
                                        document.getElementById('prefix').value = '';
                                        validation()
                                        setValueRadio(0)
                                    }} cursor={'pointer'}>Clear Options</Text>
                                </Box>
                            </Stack>
                        </RadioGroup>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>}
        </FormControl>
    )
}