import React, { useState } from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Toast
import { toast } from 'react-toastify'

//Semantic
import { Form, Button } from 'semantic-ui-react'
import { startEditProfile } from '../../store/actions/authAction'

export const ProfileScreen = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.ui)

    const [profileChange, setProfileChange] = useState(user)

    const { name, lastName, email, password } = profileChange

    const handleInputChange = e => {
        e.preventDefault()

        setProfileChange({
            ...profileChange,
            [ e.target.name ]:e.target.value
        })
    }

    const handleSubmitNameLastName = e => {
        e.preventDefault()

        if( name.trim() === "" || lastName.trim() === "" || email.trim() === "" || password === "") {
            
            toast.warning("Los campos son obligatorios")
            return false;

        }else{
            
            dispatch(startEditProfile(profileChange))
            
        }
    }

    return (
        <div className="profileForm">
            <h4>Perfil de Usuario</h4>
            <p>Los campos marcados con un asterisco son obligatorios</p>
            <Form onSubmit={handleSubmitNameLastName}>
                <Form.Group>
                    <label>Nombre</label>
                    <Form.Input as='input' type='text' className="profileForm__inputText" name="name" value={name || ''} onChange={handleInputChange} />
                    <label>Apellido</label>
                    <Form.Input as='input' type='text' className="profileForm__inputText" name="lastName" value={lastName || ''} onChange={handleInputChange} />
                    <label>Email</label>
                    <Form.Input as='input' type='email' className="profileForm__inputText" name="email" value={email || ''} onChange={handleInputChange} />
                    <label>Password</label>
                    <Form.Input as='input' className="profileForm__inputText" name="password" value={password || ''} onChange={handleInputChange} placeholder="Ingresa tu nuevo password" />
                </Form.Group>
                <Button className="submit" loading={loading}>Actualizar</Button>
            </Form>
        </div>
    )
}
