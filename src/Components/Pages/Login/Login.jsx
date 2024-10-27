import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';

function Login() {
    
    const [pseudo,setPseudo] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handlePseudoChange = (event) => {
        setPseudo(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        // fetch the payload
    }

    return (
        <>
            <div className='login-header'>
                <h1 className='login-title'>VinciChat</h1>
            </div>
            <div className='login-container'>
                <div className='login-form-wrapper'>
                    <form onSubmit={handleFormSubmit} className='login-form'>
                        <h2 className='form-title'>Sign In</h2>
                        <div className="form-group">
                            <label htmlFor="pseudo" className='form-label'>Pseudo</label>
                            <input type="text" name="pseudo" id="pseudo" className='form-input' value={pseudo} onChange={handlePseudoChange}/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password" className='form-label'>Password</label>
                            <input type="password" name="password" id="password" className='form-input' value={password} onChange={handlePasswordChange}/>
                        </div>
                        
                        <button type="submit" className='form-button'>Sign In</button>
                        
                        <a onClick={handleRegisterClick} className='forgot-password-link'>Forgot password?</a>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;