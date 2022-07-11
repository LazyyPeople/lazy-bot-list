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
    InputLeftAddon,
    InputRightElement,
    Spinner,

    useToast
} from "@chakra-ui/react";
import {
    CheckIcon,
    WarningIcon
} from '@chakra-ui/icons';
import MultipleSelect from "../components/form/MultipleSelect";
import Head from "../components/head";
import Navbar from "../components/navbar";
import parseUser from "../utils/parseUser";
import { setRedirectURL } from '../utils/redirectURL';
import Footer from '../components/footer/Footer';
import {
    mdToHtml
} from '../utils/markdown';
import config from "../utils/config";
import HeadNext from 'next/head';
import ScriptNext from 'next/script';
// import Select from 'react-select';
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import DOMPurify from "dompurify";
import getAuthToken from "../utils/getAuthToken";


function createToast(toast, body, status, dur) {
    let _id = 'testing';

    if (!toast.isActive(_id)) {
        toast({
            id: _id,
            title: body.title,
            description: body.desc,
            status: status,
            duration: dur ? dur : 5000,
            position: 'bottom-right',
            isClosable: true,
        })
    }

    return;
}

export default function AddBot({ user, authkey }) {
    const [token, setToken] = useState(null);
    const [valueRadio, setValueRadio] = useState(0);
    const toast = useToast();
    const [buttonDisabled, setbuttonDisabled] = useState(false);

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclosure();
    const preViewRef = useRef(null);

    let tags = config["web-data"].category.map(data => {
        return {
            label: data.name,
            value: data.name.toLowerCase()
        }
    });
    const [buttonloading, setLoad] = useState(false);
    let [html, setHtml] = useState('<p>hello</p>');
    async function PreviewMD() {
        let longdesc = document.getElementById('desc');
        let p = DOMPurify.sanitize(await mdToHtml(longdesc));
        setHtml(p);
        return;
    }

    const [error, setError] = useState(false);

    const [idError, setIDError] = useState(null);
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
        // console.log(app)

        let getBotFromDatabase = await fetch(`https://api.lazypeople.tk/bot/${id.value}`, {
            method: 'GET'
        });

        if (getBotFromDatabase.status == 200) {
            return setIDError({
                errorType: 'Bot already added',
                message: 'This bot is already in the data'
            })
        }

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
            // createToast(toast, {
            //     title: 'ID Bot Error',
            //     desc: responCode[app.code].message
            // },
            // 'error');
            return;
        }
        if (!app.bot_public) {
            setIDError(responCode["-10001001"]);
            // createToast(toast, {
            //     title: 'ID Bot Error',
            //     desc: responCode['-10001001'].message
            // },
            // 'error');
            return;
        }
        if (app.bot_require_code_grant) {
            setIDError(responCode["-10001002"]);
            // createToast(toast, {
            //     title: 'ID Bot Error',
            //     desc: responCode['-10001002'].message
            // },
            // 'error');
            return;
        }

        setIDError('success');
    }

    const [prefixError, setPrefixError] = useState(null);
    function validatePrefix(radioValue) {
        setPrefixError('loading');
        let prefix = document.getElementById('prefix');
        if (radioValue == 's') {
            prefix.value = '/ (slash commands)';
        } else if (radioValue == 'sp') {
            prefix.value = '';
        }
        if (radioValue !== 's' && !prefix.value) {
            setPrefixError({
                message: 'Prefix must be filled in'
            });
            return;
        } else {
            setPrefixError('success')
        }
        setbuttonDisabled(false);
        setPrefixError('success');
    }

    const [category, setCategory] = useState([]);
    const [catError, setCE] = useState(null);
    function validateCategory(e) {
        setCE(null);
        setCategory(e);
        if (e.length == 0) {
            setCE({
                message: 'Please choose a Tags according to your bot'
            });
            return;
        }
        setCE('success')
    }

    const [ownersError, setOwnersError] = useState(null);
    const [ownersID, setOwnersID] = useState([]);
    function validateOwners() {
        setOwnersError(null);
        setOwnersID([])
        let owners = document.getElementById('owners');
        if (!owners.value) return;

        setOwnersError('loading');
        setLoad(true);

        let ownersToArray = owners.value.split(',')
            // remove space in array ['id', ''] => ['id']
            .filter(x => x !== '')
            // remove space in array value ['id', ' id2'] => ['id', 'id2']
            .map(z => z.replace(/ /g, ''))
        // remove duplicate in array ['test', 't3st', 'test'] => ['test', 't3st']
        ownersToArray = ownersToArray.filter(function (item, p) {
            return ownersToArray.indexOf(item) == p;
        });

        if (ownersToArray.includes(user.id)) {
            setLoad(false);
            setOwnersError({
                message: 'you can\'t enter your id here'
            });
            return;
        }

        if (ownersToArray.length > 3) {
            setLoad(false);
            setOwnersError({
                message: 'Maximum can only add three users'
            });
            return;
        }

        ownersToArray.map(async (userId) => {
            let userinfo = await fetch('https://api.lazypeople.tk/user/' + userId + '/fetch', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.discord.api.authorization}`
                }
            }).then(x => x.json());
            if (userinfo.statusCode == '404') {
                console.log(`[Fetch] - ${userId} Not found`)
                setLoad(false);
                setOwnersError({
                    message: 'There is an invalid ID, double check the ID again'
                })
                return;
            } else if (userinfo.statusCode == '200') {
                if (userinfo.data.bot) {
                    setLoad(false);
                    createToast(toast, {
                        title: 'owners',
                        desc: 'there is an id which is a bot account'
                    },
                        'error');
                    return setOwnersError({
                        message: 'Double check the id given, there is an id which is a bot account'
                    })
                } else {
                    setLoad(false);
                    setOwnersID(ownersToArray);
                    return setOwnersError('success');
                }
            }
        })

    }

    const [sdError, setSDError] = useState(null);
    function validateSD() {
        setSDError('loading');
        let shortDesc = document.getElementById('sd');
        if (!shortDesc.value) {
            return setSDError({
                message: 'This input cannot be empty'
            })
        }
        if (shortDesc.value.length < 10) {
            return setSDError({
                message: 'I know this is for a short description, but it\'s too short :\'('
            })
        }
        setSDError('success');
    }

    const [descError, setDescError] = useState(null);
    function validateLongDS() {
        setDescError('loading')
        let desc = document.getElementById('desc');
        if (!desc.value) {
            return setDescError({
                message: 'This input cannot be empty'
            })
        }
        // console.log(desc.value)
        if (desc.value.length < 150) {
            return setDescError({
                message: 'Description must have a minimum of 150 characters'
            })
        }

        setDescError('success')
    }

    const [webError, setWebError] = useState(null);
    function validateWebsite() {
        setWebError(null)
        let web = document.getElementById('website');
        // console.log(web.value)
        if (web.value.length > 0) {
            setWebError('loading');
            // console.log('p')
            let validURL = "((http|https)://)(www.)?"
                + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]"
                + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
            let y = new RegExp(validURL)
            let validTest = y.test(web.value);
            // console.log(validTest)

            if (!validTest) {
                return setWebError({
                    message: 'Invalid website url, check again. make sure to start with HTTPS / HTTP'
                })
            } else {
                return setWebError('success')
            }
        }
    }

    const [serverError, setServerError] = useState(null);
    async function validateInviteServer() {
        setServerError(null);

        let server = document.getElementById('sp');
        if (server.value.length > 0) {
            setServerError('loading');
            setLoad(true);
            let _n = Date.now();
            console.log('[API] - Fetch code');
            let g = await fetch(`https://discord.com/api/v9/invites/${server.value}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.discord.api.authorization}`
                }
            }).then(x => x.json())
            if (g.code == 10006) {
                setLoad(false);
                createToast(toast, {
                    title: 'support server',
                    desc: g.message
                },
                    'error');
                return setServerError({
                    message: g.message
                })
            }
            console.log(`[API] - Successfully get guild info [${g.guild.name}] in ${Date.now() - _n}ms`)
            setServerError('success');
            setLoad(false);
            return;
        }
    }

    const [iurError, setIURError] = useState(null);
    async function validateInviteBot() {
        let inv = document.getElementById('IUR');
        setIURError(null);
        if (inv.value.length > 0) {
            setIURError('loading');
            let regex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)?\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;
            if (!regex.test(inv.value)) {
                return setIURError({
                    message: 'Invalid url'
                })
            }
            setIURError('success');
            return;
        }
    }

    async function _handleSubmit() {
        setLoad(true);
        let idbot = document.getElementById('idbot');
        if (!idbot.value.length) {
            setLoad(false);
            createToast(toast, {
                desc: 'bot id cannot be empty'
            },
                'error');
            return setIDError({
                message: 'Please enter bot ID'
            })
        }

        let prefix = document.getElementById('prefix');
        if (!prefix.value.length) {
            setLoad(false);
            createToast(toast, {
                desc: 'Please enter your bot prefix'
            },
                'error');
            return setPrefixError({
                message: 'Please enter your bot prefix'
            })
        }

        // category
        if (!category.length) {
            setLoad(false);
            createToast(toast, {
                desc: 'Make sure you choose a tag that matches your bot'
            },
                'error');
            return setCE({
                message: 'Make sure you choose a tag that matches your bot'
            })
        }

        let sd = document.getElementById('sd');
        if (!sd.value.length) {
            setLoad(false);
            createToast(toast, {
                desc: 'Make sure you provide a short description of your bot'
            },
                'error');
            return setSDError({
                message: 'Make sure you provide a short description of your bot'
            })
        }

        let desc = document.getElementById('desc');
        if (!desc.value.length) {
            setLoad(false);
            createToast(toast, {
                desc: 'Make sure you provide a complete description of your bot'
            },
                'error');
            return setDescError({
                message: 'Make sure you provide a complete description of your bot'
            })
        }

        if (!(idError === 'success'
            &&
            prefixError === 'success'
            &&
            catError === 'success'
            &&
            sdError === 'success'
            &&
            descError === 'success'
        )) {
            setLoad(false);
            createToast(toast, {
                title: 'There is an error',
                desc: 'Please re-check the form that has been filled'
            },
                'error');
            return;
        }

        let owners = document.getElementById('owners');
        if (owners.value.length > 0 && ownersError !== 'success') {
            setLoad(false);
            createToast(toast, {
                title: 'TextInput: owners',
                desc: 'The ID provided is invalid'
            },
                'error');
            return;
        }

        let website = document.getElementById('website');
        if (website.value.length > 0 && webError !== 'success') {
            setLoad(false);
            createToast(toast, {
                title: 'TextInput: Website',
                desc: webError.message
            },
                'error');
            return;
        }

        let server = document.getElementById('sp');
        if (server.value.length > 0 && serverError !== 'success') {
            setLoad(false);
            createToast(toast, {
                title: 'TextInput: Support Server',
                desc: serverError.message
            },
                'error');
            return;
        }

        // success code
        let body = {
            bot_id: document.getElementById('idbot').value,
            prefix: document.getElementById('prefix').value,
            tags: category,
            sd: document.getElementById('sd').value,
            ld: document.getElementById('desc').value,
            captcha: token
        }

        if (ownersID.length > 0) {
            Object.assign(body, { owners: ownersID });
        }
        if (website.value.length > 0) {
            Object.assign(body, { web: website.value });
        }
        if (server.value.length > 0) {
            Object.assign(body, { ss: server.value })
        }

        console.log(body)

        fetch(`https://api.lazypeople.tk/bot`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${authkey}`,
            },
            body: body
        }).then(x => x.json())
            .then(res => {
                console.log(res);
                if (res.status !== 200) {
                    createToast(toast, {
                        title: 'Unable to submit bot',
                        desc: res.message
                    },
                        'error');
                    return;
                }
            })
        setLoad(false);
    }

    return (
        <>
            <Head title={'{name} - Add Bot'} />

            <HeadNext>
                <ScriptNext src="https://js.hcaptcha.com/1/api.js" async defer />
            </HeadNext>

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
                                    <Input variant={'outline'} onBlur={() => validateBot()} autoComplete={'off'} id='idbot' fontSize={'sm'} placeholder='698417630108713090' />
                                    <InputRightElement>
                                        {idError == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (idError == null ? '' : (idError !== 'success' ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />))}
                                    </InputRightElement>
                                </InputGroup>
                                {idError && idError.message && <FormHelperText color={'red.400'} mt={0.5}>{idError.message}.</FormHelperText>}
                            </FormControl>

                            <FormControl isInvalid={prefixError && prefixError.message ? true : false} isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="prefix">Prefix</FormLabel>
                                <InputGroup>
                                    <Input onBlur={() => validatePrefix()} variant={'outline'} autoComplete={'off'} id='prefix' fontSize={'sm'} disabled={valueRadio == 's' ? true : false} placeholder={valueRadio == 's' ? "/" : "!"} />
                                    <InputRightElement>
                                        {prefixError == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (prefixError == null ? '' : (prefixError !== 'success' ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />))}
                                    </InputRightElement>
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

                            <FormControl isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="owners">Tags</FormLabel>
                                <MultipleSelect isInvalid={catError && catError.message ? true : false} onChange={(e) => validateCategory(e.map(x => x.value))} options={tags} />
                                {catError && catError.message && <FormHelperText color={'red.400'} mt={0.5}>{catError.message}.</FormHelperText>}

                            </FormControl>

                            <FormControl isInvalid={ownersError && ownersError.message ? true : false}>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="owners">Owners</FormLabel>

                                {/* <Input onBlur={() => validateOwners()} variant={'outline'} autoComplete={'off'} id='owners' fontSize={'sm'} placeholder="use a comma (,) to enter more than one id" /> */}
                                <InputGroup>
                                    <Input variant={'outline'} onBlur={() => validateOwners()} autoComplete={'off'} id='owners' fontSize={'sm'} placeholder='use a comma (,) to enter more than one id' />
                                    <InputRightElement>
                                        {ownersError == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (ownersError == null ? '' : (ownersError !== 'success' ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />))}
                                    </InputRightElement>
                                </InputGroup>
                                {ownersError && ownersError.message && <FormHelperText color={'red.400'} mt={0.5}>{ownersError.message}.</FormHelperText>}
                                {ownersError == 'null' && <FormHelperText fontSize={'sm'}>Who can edit your bot here?</FormHelperText>}
                            </FormControl>

                            <FormControl isInvalid={sdError && sdError.message ? true : false} isRequired>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="sd">Short Description</FormLabel>
                                {/* <Input onBlur={() => validateSD()} variant={'outline'} autoComplete={'off'} id='sd' fontSize={'sm'} placeholder="describe your bot in short" /> */}
                                <InputGroup>
                                    <Input variant={'outline'} onBlur={() => validateSD()} autoComplete={'off'} id='sd' fontSize={'sm'} placeholder='describe your bot in short' />
                                    <InputRightElement>
                                        {sdError == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (sdError == null ? '' : (sdError !== 'success' ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />))}
                                    </InputRightElement>
                                </InputGroup>
                                {sdError && sdError.message && <FormHelperText color={'red.400'} mt={0.5}>{sdError.message}</FormHelperText>}
                            </FormControl>

                            <FormControl isInvalid={descError && descError.message ? true : false} isRequired>
                                <FormLabel htmlFor={'desc'} fontWeight={'medium'} color={'gray.600'}>Long Description</FormLabel>
                                <Textarea onBlur={() => validateLongDS()} variant={'outline'} autoComplete={'off'} rows={15} id='desc' fontSize={'sm'} placeholder='Long description, Markdown only, min 150 characters' />
                                {descError && descError.message && <FormHelperText color={'red.400'} mt={0.5}>{descError.message}.</FormHelperText>}
                                <Button ref={preViewRef} onClick={() => {
                                    onOpen();
                                    PreviewMD()
                                }} size={'sm'} mt={3} px={5} colorScheme={'teal'}>Preview</Button>
                            </FormControl>

                            <FormControl isInvalid={webError && webError.message ? true : false}>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="website">Website</FormLabel>
                                {/* <Input variant={'outline'} autoComplete={'off'} id='website' fontSize={'sm'} placeholder="Website for your bot" /> */}
                                <InputGroup>
                                    <Input variant={'outline'} onBlur={() => validateWebsite()} autoComplete={'off'} id='website' fontSize={'sm'} placeholder='Website for your bot' />
                                    <InputRightElement>
                                        {webError == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (webError == null ? '' : (webError !== 'success' ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />))}
                                    </InputRightElement>
                                </InputGroup>
                                {webError && webError.message && <FormHelperText color={'red.400'} mt={0.5}>{webError.message}.</FormHelperText>}
                            </FormControl>

                            <FormControl isInvalid={serverError && serverError.message ? true : false}>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="sp">Support Server</FormLabel>
                                {/* <Input variant={'outline'} autoComplete={'off'} id='sp' fontSize={'sm'} placeholder="Server for your bot" /> */}
                                <InputGroup>
                                    <InputLeftAddon>discord.gg/</InputLeftAddon>
                                    <Input onBlur={() => validateInviteServer()} type='text' autoComplete={'off'} id='sp' fontSize={'sm'} placeholder='5zynJbhkuB' />
                                    <InputRightElement>
                                        {serverError == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (serverError == null ? '' : (serverError !== 'success' ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />))}
                                    </InputRightElement>
                                </InputGroup>
                                {serverError && serverError.message && <FormHelperText color={'red.400'} mt={0.5}>{serverError.message}.</FormHelperText>}
                            </FormControl>

                            <FormControl isInvalid={iurError && iurError.message ? true : false}>
                                <FormLabel fontWeight={'medium'} color={'gray.600'} htmlFor="IUR">Invite URL</FormLabel>
                                {/* <Input variant={'outline'} autoComplete={'off'} id='IUR' fontSize={'sm'} placeholder="Invite URL for your bot" /> */}
                                <InputGroup>
                                    <Input onBlur={() => validateInviteBot()} id="IUR" fontSize={'sm'} autoComplete={'off'} placeholder={'Invite URL'} />
                                    <InputRightElement>
                                        {iurError == 'loading' ? <Spinner size={'sm'} color={'blue.400'} /> : (iurError == null ? '' : (iurError !== 'success' ? <WarningIcon color={'red.300'} /> : <CheckIcon color='green.500' />))}
                                    </InputRightElement>
                                </InputGroup>
                                {iurError && iurError.message && <FormHelperText color={'red.400'} mt={0.5}>{iurError.message}.</FormHelperText>}
                            </FormControl>

                            <FormControl>
                                {/* <div className="h-captcha" data-sitekey={config["web-data"].hcaptcha.sitekey}></div> */}
                                <HCaptcha
                                    sitekey={config["web-data"].hcaptcha.sitekey}
                                    onVerify={(token, ekey) => {
                                        setToken(token)
                                    }}
                                    onExpire={() => {
                                        setToken(null)
                                    }}
                                />
                                <Button disabled={buttonDisabled ? true : (token !== null ? buttonloading : true)} onClick={() => _handleSubmit()} colorScheme={'messenger'} px={8} size={'md'} mt={3}>
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
                        </Flex>
                    </Box>
                </Flex>
            </Container >

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

    const authkey = getAuthToken(ctx);
    console.log(authkey)

    return {
        props: {
            user,
            authkey
        }
    }
}