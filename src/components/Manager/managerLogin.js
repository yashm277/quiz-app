import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const ManagerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const authToken = sessionStorage.getItem('Manager Auth Token')

    const handleLogin = () => {
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                sessionStorage.setItem('Manager Auth Token', response._tokenResponse.refreshToken);
                navigate('/manager');
            })
            .catch((error) => {
                alert(error);
            })
    }

    useEffect(() => { if (authToken) navigate('/manager'); }, [authToken]);

    if (authToken) return <></>;

    return (
        <>
            <input placeholder="E-mail" onChange={(e) => { setEmail(e.target.value); }} />
            <input placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value); }} />
            <button onClick={handleLogin}>Login</button>
        </>
    )
}

export default ManagerLogin;