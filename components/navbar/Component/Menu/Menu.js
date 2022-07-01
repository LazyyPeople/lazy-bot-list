import {
    Menu as MenuChakra,
    MenuButton,
    Button,
    Avatar
} from '@chakra-ui/react';
import MenuItem from './MenuItem';
import config from '../../../../utils/config.json';

export default function Menu({user}) {
    return (
        <MenuChakra >
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
                        `${config.discord.api.cdn}/avatars/${user.id}/${user.avatar}.png`
                    }
                />
            </MenuButton>
            <MenuItem data={config.navbar.profile_nav} />
        </MenuChakra>
    )
}