import parseUser from  '../utils/parseUser';
import Head from '../components/head';
import Navbar from '../components/navbar';

export default function Home({user}) {
  return (
    <>
      <Head title={'{name} - Home'} />
      <Navbar user={user} />    
    </>
  )
}
export async function getServerSideProps (ctx) {
  const user = parseUser(ctx);
  return {
    props: {
      user
    }
  }
}