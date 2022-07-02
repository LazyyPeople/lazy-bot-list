import { Link, MenuList, MenuItem as MenuitemChakra, MenuDivider } from "@chakra-ui/react";

export default function MenuItem({ data }) {
    return (
        <MenuList
            boxShadow={'md'}
        >
            {data.map(x => {
                if (x.name === 'divider') return <MenuDivider />;

                return (
                    <Link href={x.href} key={x.name}>
                        <MenuitemChakra
                            color={x.style == 'red' ? 'red.400' : 'gray.700'}
                            display={'flex'}
                            gap={'3'}
                            _hover={{
                                textDecoration: 'none'
                            }}
                        >
                            {x.name}
                        </MenuitemChakra>
                    </Link>
                )
            })}
        </MenuList>
    )
}