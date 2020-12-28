//Toast
import { toast } from 'react-toastify'

//Utils
import { BASE_PATH } from "../../utils/constants";
import { authFetch } from '../../utils/fetch';

//Types
import { types } from "../types";

//Actions
import { activeLoading, finishedLoading } from "./uiActions";


//Modal Functions
export const uiOpenModal = () => ({
    type: types.openModal
})

export const uiCloseModal = () => ({
    type: types.closeModal
})

//Modal Directions
export const uiOpenModalAddress = () => ({
    type: types.openModalAddress
})

export const uiCloseModalAddress = () => ({
    type: types.closeModalAddress
})

//Registrar Usuario
export const startRegisterUser = (usuario) => {
    return async (dispatch) => {
        dispatch(activeLoading())

        try {
            
            const url = `${BASE_PATH}/auth/local/register`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }

            const response = await fetch(url, params)
            const results = await response.json();

            localStorage.setItem('token', results.jwt);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            const userLogin = {
                userName: results.user.username,
                uid: results.user.id,
            }

            dispatch({
                type: types.login,
                payload: userLogin,
            })

            dispatch(finishedLoading())
            dispatch(uiCloseModal())

        } catch (error) {

            dispatch(finishedLoading())
            toast.error("Hubo un error al crear el usuario, por favor intenta de nuevo")

        }
    }
}

//Login
export const startLogin = (usuario) => {
    return async (dispatch) => {
        dispatch(activeLoading())
        
        try {

            const url = `${BASE_PATH}/auth/local`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }

            const response = await fetch(url, params)
            const results = await response.json();

            localStorage.setItem('token', results.jwt);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            const userLogin = {
                userName: results.user.username,
                email: results.user.email,
                uid: results.user.id,
                name: results.user.name,
                lastName: results.user.lastname
            }

            dispatch({
                type: types.login,
                payload: userLogin,
            })

            dispatch(finishedLoading())
            dispatch(uiCloseModal())

        } catch (error) {

            dispatch(finishedLoading())
            toast.error("Hubo un error, el USUARIO o PASSWORD son incorrectos")

        }
    }
}

//Comprobar Logueo
export const startChecking = () => {
    return async (dispatch) => {

        const token = localStorage.getItem('token');

        if(!token) {
            dispatch({
                type: types.logout
            })
            
        } else {

            try {
                const url = `${BASE_PATH}/users/me`
                const result = await authFetch(url, null)

                const userLogin = {
                    userName: result.username,
                    email: result.email,
                    uid: result.id,
                    name: result.name,
                    lastName: result.lastname,
                }
    
                dispatch({
                    type: types.login,
                    payload: userLogin,
                })
    
            } catch (error) {
                console.log(error)
                dispatch({
                    type: types.stopChecking
                })
            }
        }
    }
}

//Recuperar Password
export const startRecoverPassword = (email) => {
    return async (dispatch) => {
        try {
            const url = `${BASE_PATH}/auth/forgot-password`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(email)
            }

            const response = await fetch(url, params)
            const results = await response.json();

        } catch (error) {
            console.log(error)
        }
    }
}

//Logout
export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
		dispatch({
            type: types.logout
        });

    }
}

//Actualizar datos de perfil
export const startEditProfile = (user) => {
    return async (dispatch) => {

        const token = localStorage.getItem('token');

        if(!token) {
            dispatch({
                type: types.logout
            })
            
        } else {
            dispatch(activeLoading())
            try {
                const url = `${BASE_PATH}/users/${user.uid}`

                const params = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }

                const result = await authFetch(url, params)

                if(result.statusCode === 400 ) {
                    toast.error("Hubo un error, al actualizar los datos")
                }else{
                    toast.success("Se actualizo correctamente")
                }

                dispatch(finishedLoading())
                dispatch(startChecking())

            } catch (error) {
                toast.error("Hubo un error, al actualizar los datos")
                dispatch(finishedLoading())

            }
        }
    }
}