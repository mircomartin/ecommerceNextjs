import React from 'react'
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux'

import { activeAddress, startDeleteAddress } from '../../store/actions/addressActions';
import { uiOpenModalAddress } from '../../store/actions/uiActions';

export const Address = ({address}) => {

    const dispatch = useDispatch()
    const { title, name, address:direccion, state, city, postalCode, phone, id } = address;

    const handleDelete = () => {
        dispatch(startDeleteAddress(id))
    }

    const handleEditAddress = () => {
        dispatch(activeAddress(address))
        dispatch(uiOpenModalAddress())
    }

    return (
        <div className="address">
            <p>{title}</p>
            <p>{name}</p>
            <p>{direccion}</p>
            <p>{state}, {city} {postalCode}</p>
            <p>{phone}</p>
            <div className="actions">
                <Button primary onClick={handleEditAddress}>Editar</Button>
                <Button onClick={handleDelete}>Eliminar</Button>
            </div>
        </div>
    )
}
