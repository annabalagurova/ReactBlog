import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // сброс старых ошибок
        setSucces('');

        if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('Все поля должны быть заполнены');
            return;
        }

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        const result = register(username, password);

        if (result.success) {
            setSucces(result.message);
            setTimeout(() =>{
                navigate('/login', {
                    state: { message: 'Регистрация прошла успешно'}
                });
            }, 2000);
        }else{
            setError(result.message);
        }
    };
    return (
        <div style={{ maxWidth:'400px', margin: '50px auto' }}>
            <h2>Регистрация нового пользователя</h2>
            {error && <p style={{ color: 'green' }}>{error}</p>}
            {succes && <p style={{ color: 'green' }}>{succes}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="имя пользователя" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password" placeholder="пароль" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="password" placeholder="подтвердите пароль" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>Уже есть аккаунт?
                <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}
export default Register;