import { useEffect } from 'react'

//Redux
import { useSelector } from 'react-redux'

//Next
import Head from 'next/head'
import { useRouter } from 'next/router'

//Components
import { BasicLayout } from '../layouts/BasicLayout'
import { ProfileScreen } from '../components/account/ProfileScreen'

export default function Account() {

    const { logged } = useSelector(state => state.auth)
    const router = useRouter()

    useEffect(() => {

        if(!logged) {
            router.replace("/")
        }

    }, [])

    if(!logged) return null

    return (
        <BasicLayout>
			<Head>
				<title>Gaming - Mi Cuenta</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="account">
				<div className="account__configuration">
                    <div className="title">
                        title
                    </div>
                    <div className="data">
                        <ProfileScreen/>
                    </div>
                </div>

			</div>
		</BasicLayout>
    )
}
