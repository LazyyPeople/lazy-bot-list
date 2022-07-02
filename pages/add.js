import parseUser from "../utils/parseUser"

export default function Addbot() {
    return (
        <p>hello world</p>
    )
}

export async function getServerSideProps(ctx) {
    const user = parseUser(ctx);
    if(!user) {
        return {
            redirect: {
                destination: "/api/discord-login?r=add",
                permanent: false
            }
        }
    }
}