import React from 'react'
import { Container, Grid, Image, Input } from 'semantic-ui-react'
import Link from 'next/link'

export const TopBar = () => {
    return (
        <Container className="topbar">
            <Grid className="topbar">
                <Grid.Column mobile={16} tablet={8} computer={8} verticalAlign="middle" className="topbar__left">
                    <Link href="/">
                        <a>
                            <Image src="/assets/img/logo.png" alt="Gaming Ecommerce"/>
                        </a>
                    </Link>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8} className="topbar__right">
                    <Input 
                        id="search-game"
                        icon={{name:"search"}}
                        placeholder="Buscar..."
                    />
                </Grid.Column>
            </Grid>
        </Container>
    )
}
