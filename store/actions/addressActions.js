import { types } from "../types"

import { toast } from "react-toastify"
import { BASE_PATH } from "../../utils/constants"
import { authFetch } from "../../utils/fetch"
import { activeLoading, finishedLoading } from "./uiActions"

export const startAddAddress = (newAddress) => {
    return async (dispatch, getState) => {

        dispatch(activeLoading())
        const { user } = getState().auth

        const token = localStorage.getItem('token');

        if(!token) {
            dispatch({
                type: types.logout
            })
            
        } else {

            try {
                
                const address = {
                    ...newAddress,
                    user: user.uid,
                }

                const url = `${BASE_PATH}/addresses`;
                const params = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(address),
                };
                
                const result = await authFetch(url, params);
                
                toast.success("Se cargo correctamente")
            
                dispatch({
                    type: types.addAddress,
                    payload: result,
                })

                dispatch(finishedLoading())
            } catch (error) {
                toast.error("Hubo un error, al cargar la nueva Direccion")
                dispatch(finishedLoading())

            }
        }
    }
}

export const startListAddress = () => {
    return async (dispatch, getState) => {

        dispatch(activeLoading())
        const { user } = getState().auth

        const token = localStorage.getItem('token');

        if(!token) {
            dispatch({
                type: types.logout
            })
            
        } else {

            try {

                const url = `${BASE_PATH}/addresses?user=${user.uid}`;
                
                const result = await authFetch(url, null);

                if(result.statusCode === 500) {
                    toast.error("Hubo un error, al cargar el listado")
                }else{
                    dispatch({
                        type: types.listAddress,
                        payload: result,
                    })
                }

                dispatch(finishedLoading())

            } catch (error) {
                toast.error("Hubo un error, al cargar el listado")
                dispatch(finishedLoading())

            }
        }
    }
}

export const startDeleteAddress = (id) => {
    return async (dispatch) => {

        dispatch(activeLoading())

        const token = localStorage.getItem('token');

        if(!token) {
            dispatch({
                type: types.logout
            })
            
        } else {

            try {
                
                const url = `${BASE_PATH}/addresses/${id}`;
                const params = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                
                const result = await authFetch(url, params);
                
                if(result.statusCode === 500) {
                    toast.error("Hubo un error, al eliminar la direccion")
                }else{
                    dispatch({
                        type: types.updatedAddress,
                        payload: result,
                    })
                }

                dispatch(finishedLoading())
            } catch (error) {
                toast.error("Hubo un error, al actualizar la Direccion")
                dispatch(finishedLoading())

            }
        }
    }
}

export const startUpdateAddress = (id, address) => {
    return async (dispatch) => {

        dispatch(activeLoading())

        const token = localStorage.getItem('token');

        if(!token) {
            dispatch({
                type: types.logout
            })
            
        } else {

            try {
                
                const updateAddress = {
                    ...address,
                    id,
                }

                const url = `${BASE_PATH}/addresses/${id}`;
                const params = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateAddress)
                };

                const result = await authFetch(url, params);
                
                toast.success("Se elimino correctamente")
            
                dispatch({
                    type: types.updatedAddress,
                    payload: updateAddress,
                })

                dispatch(finishedLoading())
                
            } catch (error) {

                toast.error("Hubo un error, al actualizar la nueva Direccion")
                dispatch(finishedLoading())

            }
        }
    }
}

export const activeAddress = (address) => ({
    type: types.addressActive,
    payload: address,
})

export const cleanActive = () => ({
    type: types.cleanActive,
})