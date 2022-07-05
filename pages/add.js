import {
    Box,
    FormControl,
    Input,
    FormLabel,
    FormHelperText,
    Container,
    Flex,
    Text,
    Stack,
    Radio,
    RadioGroup,
    Button,
    Textarea,
    Alert,
    AlertIcon,
    AlertDescription,
    useDisclosure,
    Modal,
    Accordion,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    ModalFooter,

    InputGroup,
    InputRightElement,
    Spinner
} from "@chakra-ui/react";
import {
    CheckIcon,
    WarningIcon
} from '@chakra-ui/icons';
import Head from "../components/head";
import Navbar from "../components/navbar";
import parseUser from "../utils/parseUser";
import { setRedirectURL } from '../utils/redirectURL';
import Footer from '../components/footer/Footer';
import {
    mdToHtml
} from '../utils/markdown';
import config from "../utils/config";
import { useRef, useState } from "react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import DOMPurify from "dompurify";

export default function AddBot({ user }) {
    const [valueRadio, setValueRadio] = useState(0);

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclosure();
    const preViewRef = useRef(null);

    let [html, setHtml] = useState('<p>hello</p>');
    async function PreviewMD() {
        let longdesc = document.getElementById('desc');
        let p = DOMPurify.sanitize(await mdToHtml(longdesc));
        setHtml(p);
        return;
    }

    const [error, setError] = useState(null);

    const [idError, setIDError] = useState(false);
    async function validateBot() {
        setIDError('loading');
        let id = document.getElementById('idbot');
        if (!id.value) {
            setIDError({
                errorType: 'emptyID',
                message: 'ID Bot is required'
            });
            return;
        }
        let app = await fetch('https://discord.com/api/v9/applications/' + id.value + '/rpc', {
            headers: {
                'Authorization': `Bearer ${config.discord.api.authorization}`
            }
        }).then(x => x.json());

        let responCode = {
            "10002": {
                errorType: 'Unknown App',
                message: 'Bot can not be found'
            },
            "50035": {
                errorType: 'Invalid ID',
                message: 'The ID provided is invalid'
            },
            "0": {
                errorType: 'Unauthorized',
                message: '401: Unauthorized'
            },

            // Custom code
            "-10001001": {
                errorType: "Forbidden (not public)",
                message: 'Your bot is private, we can\'t invite it'
            },
            "-10001002": {
                errorType: 'Forbidden (bot require code grant)',
                message: 'Code grant is active, make sure it\'s disabled'
            }
        }

        if (app.code !== undefined) {
            setIDError(responCode[app.code]);
            window.scrollTo(0, 0);
            return;
        }
        if (!app.bot_public) {
            setIDError(responCode["-10001001"]);
            window.scrollTo(0, 0);
            return;
        }
        if (app.bot_require_code_grant) {
            setIDError(responCode["-10001002"]);
            window.scrollTo(0, 0);
            return;
        }
        setIDError('success');
    }

    const [prefixError, setPrefixError] = useState(null);
    function validatePrefix(radioValue) {
        setPrefixError('loading');
        let prefix = document.getElementById('prefix');
        if(radioValue == 's') {
            prefix.value = '/ (slash commands)';
        } else {
            prefix.value = '';
        }
        if(radioValue !== 's' && !prefix.value) {
            setPrefixError({
                message: 'Prefix must be filled in'
            });
            return;
        } else {
            setPrefixError('success')
        }
        if(radioValue !== 's' && prefix.value.length > 5) {
            setPrefixError({ 
                message: 'The maximum character in the prefix is ​​only 5 characters'
            });
            return;
        }
        setPrefixError('success');
    }

    async function _handleSubmit() {

    }

    return (
        <>
            <Head title={'{name} - Add Bot'} />
            <Navbar user={user} />

            <Container maxW={'3xl'} mt={'6'} mb={20}>
                <Flex flexDirection={{ base: 'column', md: 'column' }} gap={10}>
                    <Box>
                        {error && <Alert status='error'>
                            <AlertIcon />
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>}
                        <Flex mt={'7'} flexDirection={'column'} gap={'4'}>
                            <FormControl isInvalid={idError && idError.message ? true : false} isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor='idbot'>Bot ID</FormLabel>
                                {/* <Input onBlur={() => validateBot()} autoComplete={'off'} id='idbot' fontSize={'sm'} placeholder='698417630108713090' /> */}
                                <InputGroup>
                                    <Input variant={'filled'} onBlur={() => validateBot()} autoComplete={'off'} id='idbot' fontSize={'sm'} placeholder='698417630108713090' />
                                    <InputRightElement children={idError == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (idError.message ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />)} />
                                </InputGroup>
                                {idError && idError.message && <FormHelperText color={'red.400'} mt={0.5}>{idError.message}.</FormHelperText>}
                            </FormControl>

                            <FormControl isInvalid={prefixError && prefixError.message ? true : false} isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="prefix">Prefix</FormLabel>
                                <InputGroup>
                                    <Input onBlur={() => validatePrefix()} variant={'filled'} autoComplete={'off'} id='prefix' fontSize={'sm'} disabled={valueRadio == 's' ? true : false} placeholder={valueRadio == 's' ? "/" : "!"} />
                                    <InputRightElement children={prefixError == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (prefixError.message ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />)} />
                                </InputGroup>
                                {prefixError && prefixError.message && <FormHelperText color={'red.400'} mt={0.5}>{prefixError.message}.</FormHelperText>}
                                <Accordion allowToggle mt={2}>
                                    <AccordionItem borderWidth={0}>
                                        <Text>
                                            <AccordionButton>
                                                <Box fontSize={'sm'} color={'gray.500'} flex='1' textAlign={'left'}>
                                                    My bot uses slash command
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </Text>
                                        <AccordionPanel>
                                            <RadioGroup onChange={(e) => {
                                                setValueRadio(e)
                                                validatePrefix(e)
                                            }} value={valueRadio}>
                                                <Stack color={'gray.500'}>
                                                    <Radio size={'md'} value='s'>Slash Command</Radio>
                                                    <Radio size={'md'} value='sp'>Slash Command and Prefix</Radio>
                                                    <Box pt={4}>
                                                        <Text color={'telegram.500'} onClick={() => {
                                                            document.getElementById('prefix').value = '';
                                                            validatePrefix()
                                                            setValueRadio(0)
                                                        }} cursor={'pointer'}>Clear Options</Text>
                                                    </Box>
                                                </Stack>
                                            </RadioGroup>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="owners">Owners</FormLabel>
                                <Input variant={'filled'} autoComplete={'off'} id='owners' fontSize={'sm'} placeholder="Use coma (,) for more than one (max 3 id)" />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="sd">Short Description</FormLabel>
                                <Input variant={'filled'} autoComplete={'off'} id='sd' fontSize={'sm'} placeholder="describe your bot in short" />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel htmlFor={'desc'} fontWeight={'medium'} color={'gray.600'}>Long Description</FormLabel>
                                <Textarea variant={'filled'} autoComplete={'off'} rows={15} id='desc' fontSize={'sm'} placeholder='Long description, Markdown only, min 150 characters' />
                                <Button ref={preViewRef} onClick={() => {
                                    onOpen();
                                    PreviewMD()
                                }} size={'sm'} mt={3} px={5} colorScheme={'teal'}>Preview</Button>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="website">Website</FormLabel>
                                <Input variant={'filled'} autoComplete={'off'} id='website' fontSize={'sm'} placeholder="Website for your bot" />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="sp">Support Server</FormLabel>
                                <Input variant={'filled'} autoComplete={'off'} id='sp' fontSize={'sm'} placeholder="Server for your bot" />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="IUR">Invite URL</FormLabel>
                                <Input variant={'filled'} autoComplete={'off'} id='IUR' fontSize={'sm'} placeholder="Invite URL for your bot" />
                            </FormControl>

                            <FormControl>
                                <Button onClick={() => _handleSubmit()} colorScheme={'messenger'} px={8} size={'md'} mt={3}>Submit Bot</Button>
                            </FormControl>
                        </Flex>
                    </Box>
                </Flex>
            </Container>

            <Footer />

            {/* Modal Preview */}
            <Modal
                onClose={onClose}
                finalFocusRef={preViewRef}
                isOpen={isOpen}
                scrollBehavior={'inside'}
                size={"full"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'gray.500'}>Preview Description</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Prose>
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </Prose>
                    </ModalBody>
                    <ModalFooter>
                        <Text fontSize={{ base: 'xs', md: 'sm' }} color={'gray.600'} fontWeight={'medium'}>*This is just a preview, maybe the text size will change when on the page view bot</Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const user = parseUser(ctx);
    if (!user) {
        setRedirectURL('/add', ctx.res);
        return {
            redirect: {
                destination: '/api/discord-login',
                permanent: false
            }
        }
    }

    return {
        props: {
            user
        }
    }
}