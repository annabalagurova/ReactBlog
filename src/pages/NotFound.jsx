import { Link } from "react-router-dom";


function NotFound() {
    return (
        <>
           <h1>Ошибка 404</h1>
           <p>Страница не найдена</p>
           <Link to='/news'>Вернуться в ленту новостей</Link>
        </>
    );
};

export default NotFound;