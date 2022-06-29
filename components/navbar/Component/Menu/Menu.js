import {
    Menu as MenuChakra,
    MenuButton,
    Button,
    Avatar
} from '@chakra-ui/react';
import MenuItem from './MenuItem';
import { navbar } from '../../../../utils/config.json';

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
            <MenuItem data={navbar.profile_nav} />
        </MenuChakra>
    )
}