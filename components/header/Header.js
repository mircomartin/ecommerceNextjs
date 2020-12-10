import React from 'react'
import { MenuWeb } from './MenuWeb'

//Components
import { TopBar } from './TopBar'

export const Header = () => {
    return (
        <header className="header">
            <TopBar/>
            <MenuWeb/>
        </header>
    )
}
