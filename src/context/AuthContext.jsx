import { createContext, useContext, useState, useEffect } from "react";

// контекст - это "коробка" в которой будут лежать данные об авторизации
const AuthContext = createContext(null);

export function AuthProvider({children}) {
    // для хранения текущего вошедшего пользователя
    const [currentUser, setCurrentUser] = useState(()=>{
        const savedUser = localStorage.getItem('active_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const register = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some(u => u.username === username);
        if (userExists) {
            return {success: false, message: 'Пользователь с таким именем уже существует'};
        }
        const newUser = {id: Date.now().toString(), username, password};
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return {success: true, message: 'Регистрация успешна'};
    }

    const login = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find (u => u.username === username && u.password === password);
        // if (!user) {
        //     return {success: false, message: 'Неверное имя поользователя или пароль'};
        // }
        if (username !== user?.username || password !== user?.password) {
            return {success: false, message: 'Неверное имя пользователя или пароль'};
        }
        setCurrentUser(user);
        localStorage.setItem('active_user', JSON.stringify(user));
        return {success: true, message: 'Вход выполнен успешно'};
    }

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('active_user');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


// создаем собственный хук для удобного использования контекста в других компонентах
export function useAuth() {
    return useContext(AuthContext);
};