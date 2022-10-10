import { getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {useAccount} from 'wagmi'
import LotteryEntrance from '../components/LotteryEntrance';

function User({ user }) {

    // const [userSession, setUserSession] = useState(user)

    // const [userSession, setUserSession] = useState(null)
    // const [toggle, setToggle] = useState(false)

    // const toggleAddress = ()=>{
    //     setToggle(pre=>!pre)
    // }

    // useEffect(()=>{
    //     setUserSession(user)
    // },[])

    const {address} = useAccount()
    console.log('address: ', address);

    useEffect(()=>{

    },[])

    return (
        <div>
            <h4>User session:</h4>
            <p>useAccount : {address}</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => signOut({ redirect: '/signin' })}>Sign out</button>
            {/* <button onClick={toggleAddress}>toggle address:</button> */}
            {/* {toggle ? <p style={{color:'red'}}>{userSession.address}</p> : null} */}
            {/* <p style={{color:'red'}}>{userSession.address}</p> */}
            <LotteryEntrance />
        </div>
    );
}

// export async function getServerSideProps(context) {
//     const session = await getSession(context);

//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/signin',
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: { user: session.user },
//     };
// }

export default User;
