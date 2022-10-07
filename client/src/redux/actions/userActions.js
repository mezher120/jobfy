import { message } from 'antd';
import axios from 'axios';

export const registerUser = (values) => async dispatch => { 
    dispatch({type: 'LOADING', payload: true});
    try {
        await axios.post('/api/users/register', values) // no pongo localhost... porque ya lo puse en el package.json como proxy
        message.success('Congratulations! you have registered')
        setTimeout(() => {
            window.location.href='/login';   // para ir automaticamente a una direccion luego de mili segundos con fx timeout
        }, 1000);
        dispatch({type: 'LOADING', payload: false});
    } catch (error) {
        console.log(error.message);
        message.error('An error has occured')
        dispatch({type: 'LOADING', payload: false});
    }  
}

export const loginUser = (values) => async dispatch => { 
    dispatch({type: 'LOADING', payload: true});
    try {
        const user = await axios.post('/api/users/login', values) // no pongo localhost... porque ya lo puse en el package.json como proxy
        message.success('Congratulations! Login success')
        console.log(user.data, 'en login')
        localStorage.setItem('user', JSON.stringify(user.data)); // para almacenar data en un item 'user' en el localstorage, luego se obtiene con getItem
        setTimeout(() => {
            window.location.href='/';
        }, 1000);
        dispatch({type: 'LOADING', payload: false});   // el loading lo doy de baja una vez que se realizo la accion por bien o mal
    } catch (error) {
        console.log(error.message);
        message.error('Invalid credencials')
        dispatch({type: 'LOADING', payload: false});
    }  
}

export const updateUser = (values) => async (dispatch) => {
    dispatch({type: 'LOADING', payload: true});
    try {
        const user = await axios.put('/api/users/update', values)
        message.success('Congratulations! User updated')
        localStorage.setItem('user', JSON.stringify(user.data));
        console.log(user.data, "pase el local")
        setTimeout(() => {
            window.location.reload();   // para ir automaticamente a una direccion luego de mili segundos con fx timeout
        }, 1000);
        dispatch({type: 'LOADING', payload: false});
    } catch (error) {
        message.error('Invalid credencials')
        dispatch({type: 'LOADING', payload: false});
    }
}

// export const getUsers = () => async dispatch => {
//     try {
//         console.log("llegue al getusers")
//         const users = await axios.get('/api/users/getall');
//         console.log(users, 'action users')
//         dispatch({type: "GET_USERS", payload: users.data});
//     } catch (error) {
//        return console.log(error.message)
// }
// }

export async function getUsers(dispatch) {
    console.log('aca llegue')
    dispatch({type:"LOADING", payload: true});

    try {
        const response = await axios.get('/api/users/getall'); // no pongo localhost... porque ya lo puse en el package.json como proxy
        console.log(response.data);
        dispatch({type: "GET_USERS", payload: response.data})
        console.log('aca llegu1')
        dispatch({type:"LOADING", payload: false});
    } catch (error) {
        console.log(error.message);
        dispatch({type:"LOADING", payload: false});
    }
}