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

    const { name, lastName, email } = profileChange

    const handleInputChange = e => {
        e.preventDefault()

        setProfileChange({
            ...profileChange,
            [ e.target.name ]:e.target.value
        })
    }

    const handleSubmitNameLastName = e => {
        e.preventDefault()

        if( name.trim() === "" || lastName.trim() === "" || email.trim() === "") {
            
            toast.warning("Los campos son obligatorios")
            return false;

        }else{
            
            dispatch(startEditProfile(profileChange))
            
        }
    }

    return (
        <div className="profileForm">
            <h4>Perfil de Usuario</h4>
            <Form onSubmit={handleSubmitNameLastName}>
                <Form.Group>
                    <Form.Input as="input" className="profileForm__inputText" name="name" value={name || ''} onChange={handleInputChange} />
                    <Form.Input as="input" className="profileForm__inputText" name="lastName" value={lastName || ''} onChange={handleInputChange} />
                    <Form.Input as="input" className="profileForm__inputText" name="email" value={email || ''} onChange={handleInputChange} />
                </Form.Group>
                <Button className="submit" loading={loading}>Actualizar</Button>
            </Form>
        </div>
    )
}
