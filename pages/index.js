
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import parseUser from  '../utils/parseUser';
import { SiDiscord } from "react-icons/si";
import {
  BiUserCircle
} from 'react-icons/bi';
import { TbLogout } from 'react-icons/tb';
import { useRouter } from 'next/router';

import Navbar from '../components/navbar';

export default function Home({user}) {
  return (
    <>
      <Navbar user={user} />    
    </>
  )
}
export async function getServerSideProps (ctx) {
  const user = parseUser(ctx);

  console.log(user);
  return {
    props: {
      user
    }
  }
}

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Partners',
    href: '/partners'
  }
];

const LOGIN = {
  href: '/api/discord-login',
  bg: '#5865F2',
  href: {
    bg: '#7289da'
  },
  color: 'white'
}