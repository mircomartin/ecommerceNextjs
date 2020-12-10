import React, {useState} from 'react'

//Components
import {LoginScreen} from './LoginScreen'
import {RegisterScreen} from './RegisterScreen'

export const Auth = ({setTitleModal}) => {

    const [showLogin, setShowLogin] = useState(true)

    const showRegisterScreen = () => {
        setTitleModal("Crear una cuenta")
        setShowLogin(false)
    }

    const showLoginScreen = () => {
        setTitleModal("Iniciar Sesion")
        setShowLogin(true)
    }

    return (
        <div>
            {
                showLogin ?
                    <LoginScreen showRegisterScreen={showRegisterScreen}/>
                    :
                    <RegisterScreen showLoginScreen={showLoginScreen}/>
            }
            
        </div>
    )
}
