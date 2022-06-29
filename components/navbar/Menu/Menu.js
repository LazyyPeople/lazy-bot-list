import {
    Menu as MenuChakra,
    MenuButton,
    Button,
    Avatar
} from '@chakra-ui/react';
import MenuItem from './MenuItem';

export default function Menu({user}) {
    return (
        <MenuChakra>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                    width={'45px'}
                    height={'45px'}
                    src={
                        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                    }
                />
            </MenuButton>
            <MenuItem data={data} />
            {/* <MenuList>
                <MenuItem display={'flex'} gap={'3'}><BiUserCircle /> Profile</MenuItem>
                <MenuItem display={'flex'} gap={'3'}><AddIcon w={3} h={3} /> Add Bot</MenuItem>
                <MenuDivider />
                <MenuItem color={'red.400'} display={'flex'} gap={'3'}><TbLogout /> Logout</MenuItem>
            </MenuList> */}
        </MenuChakra>
    )
}

const data = [
    {
        name: 'Profile'
    },
    {
        name: 'Add Bot'
    },
    {
        name: 'divider'
    },
    {
        name: 'Logout',
        href: '/api/discord/logout',
        style: 'red'
    }
]