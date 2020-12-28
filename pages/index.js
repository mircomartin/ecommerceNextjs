import { useEffect } from 'react'

import { Loader } from 'semantic-ui-react'

//Next
import Head from 'next/head'

//Components
import { BasicLayout } from "../layouts/BasicLayout";

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { startListLastGames } from '../store/actions/gamesActions';
import { ListGames } from '../components/games/ListGames';

export default function Home() {

	const { loading } = useSelector(state => state.ui)
	const { games } = useSelector(state => state.games)

	const dispatch = useDispatch()

	useEffect(() => {

		dispatch(startListLastGames(1))

	}, [])

	return (
		<BasicLayout>
			<Head>
				<title>Gaming - Home</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="home">
				{
					(loading) ? <Loader active>Cargando Juegos</Loader>
					: <ListGames games={games}/>
				}
			</div>
		</BasicLayout>
	);
}
