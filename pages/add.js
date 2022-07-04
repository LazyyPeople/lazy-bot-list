import {
    Box,
    FormControl,
    Input,
    FormLabel,
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
    ModalFooter
} from "@chakra-ui/react";
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

    async function _handleSubmit() {
        let botID = document.getElementById('idbot');

        // validate bot
        let app = await fetch('https://discord.com/api/v9/applications/' + botID.value + '/rpc', {
            headers: {
                'Authorization': `Bearer ${config.discord.api.authorization}`
            }
        }).then(x => x.json());

        let responCode = {
            "10002": {
                errorType: 'Unknown App',
                message: 'Bot could not found'
            },
            "50035": {
                errorType: 'Invalid ID',
                message: 'invalid id provided'
            },
            "0": {
                errorType: 'Unauthorized',
                message: '401: Unauthorized'
            },

            // Custom code
            "-10001001": {
                errorType: "Forbidden (not public)",
                message: 'Your bot is not public'
            },
            "-10001002": {
                errorType: 'Forbidden (bot require code grant)',
                message: 'Bot can\'t add if require code grant'
            }
        }
        if(app.code !== undefined) {
            setError(responCode[app.code]);
            window.scrollTo(0,0);
            return;
        }
        if (!app.bot_public) {
            setError(responCode["-10001001"]);
            window.scrollTo(0,0);
            return;
        }
        if(app.bot_require_code_grant) {
            setError(responCode["-10001002"]);
            window.scrollTo(0,0);
            return;
        }



        // Prefix

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
                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor='idbot'>Bot ID</FormLabel>
                                <Input id='idbot' fontSize={'sm'} placeholder='698417630108713090' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="prefix">Prefix</FormLabel>
                                <Input id='prefix' fontSize={'sm'} placeholder="!" />
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
                                            <RadioGroup onChange={setValueRadio} value={valueRadio}>
                                                <Stack color={'gray.500'}>
                                                    <Radio size={'md'} value='s'>Slash Command</Radio>
                                                    <Radio size={'md'} value='sp'>Slash Command and Prefix</Radio>
                                                    <Box pt={4}>
                                                        <Text color={'telegram.500'} onClick={() => setValueRadio(0)} cursor={'pointer'}>Clear Options</Text>
                                                    </Box>
                                                </Stack>
                                            </RadioGroup>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="owners">Owners</FormLabel>
                                <Input id='owners' fontSize={'sm'} placeholder="Use coma (,) for more than one (max 3 id)" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="sd">Short Description</FormLabel>
                                <Input id='sd' fontSize={'sm'} placeholder="describe your bot in short" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor={'desc'} fontWeight={'medium'} color={'gray.600'}>Long Description</FormLabel>
                                <Textarea rows={15} id='desc' fontSize={'sm'} placeholder='Long description, Markdown only, min 150 characters' />
                                <Button ref={preViewRef} onClick={() => {
                                    onOpen();
                                    PreviewMD()
                                }} size={'sm'} mt={3} px={5} colorScheme={'teal'}>Preview</Button>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="website">Website</FormLabel>
                                <Input id='website' fontSize={'sm'} placeholder="Website for your bot" />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="sp">Support Server</FormLabel>
                                <Input id='sp' fontSize={'sm'} placeholder="Server for your bot" />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="IUR">Invite URL</FormLabel>
                                <Input id='IUR' fontSize={'sm'} placeholder="Invite URL for your bot" />
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
                    <ModalHeader>Preview Description</ModalHeader>
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