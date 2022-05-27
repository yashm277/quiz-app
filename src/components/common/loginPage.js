import { useNavigate } from 'react-router-dom';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    onAuthStateChanged,
} from 'firebase/auth';

import './common.css';

const LoginPage = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const navigate = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (user) navigate('/customer');
    });

    return (
        <div>
            <h2>Welcome to the Quiz App!!</h2>
            <div className="sign-btn-container">
                <button onClick={() => navigate('/manager-login')}>
                    Manager Login
                </button>
                <div>
                    <button
                        className="ctmsign"
                        onClick={() => {
                            signInWithRedirect(auth, provider);
                        }}
                    >
                        Quiz App Login with BITS mail
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
