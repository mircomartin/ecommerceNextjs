import React from 'react'

export const ListGames = ({games}) => {
    return (
        <div className="list-games">
            {
                games.length === 0 
                ? <h2>No hay juegos cargados</h2>
                : games.map((game) => (
                    <h3>{game.title}</h3>
                ))
            }
        </div>
    )
}
