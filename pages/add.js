import {
    Box,
    Container,
    Flex,
    useDisclosure,
    useToast,
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
import DOMPurify from "dompurify";

import getAuthToken from "../utils/getAuthToken";
const FormBuild = require('../components/form/AddForm/FormBuild.json');

import ModalPreview from '../components/form/AddForm/ModalPreview';
import InputAdd from '../components/form/AddForm/Input';
import SubmitButton from "../components/form/AddForm/SubmitButton";
import Tags from "../components/form/AddForm/Tags";
import Description from "../components/form/AddForm/Description";

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
            return;
        }
        if (!app.bot_public) {
            setIDError(responCode["-10001001"]);
            return;
        }
        if (app.bot_require_code_grant) {
            setIDError(responCode["-10001002"]);
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
        if (web.value.length > 0) {
            setWebError('loading');
            let validURL = "((http|https)://)(www.)?"
                + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]"
                + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
            let y = new RegExp(validURL)
            let validTest = y.test(web.value);

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
        let inv = document.getElementById('iur');
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
            ld: document.getElementById('desc').value
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

        let iur = document.getElementById("iur");
        if (iur.value.length > 0) {
            Object.assign(body, { iur: iur.value });
        }

        console.log(body)

        fetch(`https://api.lazypeople.tk/bot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${authkey}`,
            },
            body: JSON.stringify(body)
        }).then(x => {
            console.log(x)
        })
            .then(res => {

                console.log(res);
                // if (res.status !== 200) {
                //     createToast(toast, {
                //         title: 'Unable to submit bot',
                //         desc: res.message
                //     },
                //         'error');
                //     return;
                // }
            })
        setLoad(false);
    }

    return (
        <>
            <Head title={'{name} - Add Bot'} />

            <Navbar user={user} />

            <Container maxW={'3xl'} pt={'70px'} mb={20}>
                <Flex flexDirection={{ base: 'column', md: 'column' }} gap={10}>
                    <Box>
                        <Flex mt={'7'} flexDirection={'column'} gap={'4'}>
                            
                            <InputAdd
                                placeholder={'698417630108713090'}
                                id={'idbot'}
                                isInvalid={idError && idError.message ? true : false}
                                validation={validateBot}
                                _errorState={idError}
                                labelName={'ID Bot'}
                                isRequired
                            />

                            <InputAdd
                                placeholder={'!'}
                                labelName={'Prefix'}
                                _errorState={prefixError}
                                id={'prefix'}
                                isInvalid={prefixError && prefixError.message ? true : false}
                                isRequired
                                validation={validatePrefix}

                                disabled={valueRadio == 's' ? true : false}

                                useAccor={true}
                                setValueRadio={setValueRadio}
                                valueRadio={valueRadio}
                                accorText={'My bot uses slash command'}
                                childrenItems={[{ value: 's', name: 'Slash Command' }, { value: 'sp', name: 'Slash Command and Prefix' }]}
                            />

                            <Tags
                                _errorState={catError}
                                tags={tags}
                                validateCategory={validateCategory}
                            />

                            <InputAdd
                                labelName={'Owners'}
                                isRequired
                                validation={validateOwners}
                                _errorState={ownersError}
                                id={'owners'}
                                isInvalid={ownersError && ownersError.message ? true : false}
                                placeholder={'use a comma (,) to enter more than one id'}
                            />

                            <InputAdd
                                labelName={'Short Description'}
                                id={'sd'}
                                _errorState={sdError}
                                placeholder={'describe your bot in short'}
                                isInvalid={sdError && sdError.message ? true : false}
                                isRequired
                                validation={validateSD}
                            />

                            <>
                                <Description
                                    id={'desc'}
                                    label={'Description'}
                                    preViewRef={preViewRef}
                                    hasPreview={true}
                                    _errorState={descError}
                                    PreviewMD={PreviewMD}
                                    validation={validateLongDS}
                                    onOpen={onOpen}
                                    placeholder={'Long description, Markdown only, min 150 characters'}
                                />
                                <ModalPreview
                                    onClose={onClose}
                                    preViewRef={preViewRef}
                                    isOpen={isOpen}
                                    html={html}
                                />
                            </>

                            <InputAdd
                                id={'website'}
                                isInvalid={webError && webError.message ? true : false}
                                validation={validateWebsite}
                                _errorState={webError}
                                labelName={'Website'}
                                placeholder={'Website for your bot'}
                            />

                            <InputAdd
                                id={'sp'}
                                placeholder={'5zynJbhkuB'}
                                leftAddon={'discord.gg/'}
                                _errorState={serverError}
                                validation={validateInviteServer}
                                isInvalid={serverError && serverError.message ? true : false}
                                labelName={'Support Server'}
                            />

                            <InputAdd
                                id={"iur"}
                                _errorState={iurError}
                                validation={validateInviteBot}
                                placeholder={'Invite URL'}
                                isInvalid={iurError && iurError.message ? true : false}
                                labelName={'Invite URL'}
                            />

                            <SubmitButton
                                buttonDisabled={buttonDisabled}
                                buttonloading={buttonloading}
                                _handleSubmit={_handleSubmit}
                            />
                        </Flex>
                    </Box>
                </Flex>
            </Container >

            <Footer />
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

    return {
        props: {
            user,
            authkey
        }
    }
}