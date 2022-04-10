import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate('/manager-login')}>Manager Login Page</button>
            <button onClick={() => navigate('/customer-login')}>Customer Login Page</button>
        </>
    )
}

export default LoginPage;