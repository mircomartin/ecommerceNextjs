import React from 'react'
import { Container } from 'semantic-ui-react'
import { Header } from '../components/header/Header'

export const BasicLayout = ({children}) => {

    return (
        <Container fluid className="basic-layout">
            <Header/>
            <Container className="content">
                {children}
            </Container>
            <div>Footer</div>
        </Container>
    )
}
