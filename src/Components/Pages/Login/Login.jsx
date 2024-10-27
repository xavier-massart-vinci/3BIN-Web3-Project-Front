import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <>
            <div className='login-header'>
                <h1 className='login-title'>VinciChat</h1>
            </div>
            <div className='login-container'>
                <div className='login-form-wrapper'>
                    <form className='login-form'>
                        <h2 className='form-title'>Sign In</h2>
                        <div className="form-group">
                            <label htmlFor="pseudo" className='form-label'>Pseudo</label>
                            <input type="text" name="pseudo" id="pseudo" className='form-input' />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password" className='form-label'>Password</label>
                            <input type="password" name="password" id="password" className='form-input' />
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