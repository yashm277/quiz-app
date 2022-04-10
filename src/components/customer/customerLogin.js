import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from "firebase/auth";

// Customer login inconsistently fails with the error message: Unable to process request due to missing initial state.
// This may happen if browser sessionStorage is inaccessible or accidentally cleared.
// Known issue since Jan 2021
// Github link: https://github.com/firebase/firebase-js-sdk/issues/4256

// Another bug is that customer login fails if using incognito/private browsing. Issue known since May 2020.
// Github link: https://github.com/firebase/firebase-js-sdk/issues/3004

const CustomerLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const navigate = useNavigate();


    onAuthStateChanged(auth, (user) => { if (user) navigate("/customer"); });

    return (
        <>
            <button onClick={() => { signInWithRedirect(auth, provider); }}>Sign in with Google</button>
        </>
    )
}

export default CustomerLogin;