import './customer.css';
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const loginBtnFn = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                alert(error);
            });
        setAnchorElUser(null);
    };

    return (
        <div className="user-info">
            <img
                src={localStorage.getItem('profilePicture')}
                alt={localStorage.getItem('name')}
            ></img>
            <h5 className="info">{localStorage.getItem('name')}</h5>
            <h5 className="info">{localStorage.getItem('email')}</h5>
            <button className="logout-btn" onClick={loginBtnFn}>
                Logout
            </button>
        </div>
    );
};

export default Profile;
