import { useEffect } from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Next
import Head from 'next/head'
import { useRouter } from 'next/router'

//Semantic
import { Icon } from 'semantic-ui-react'

//Components
import { BasicLayout } from '../layouts/BasicLayout'
import { ProfileScreen } from '../components/account/ProfileScreen'
import { AddressModal } from '../components/modals/AddressModal'
import { AddressForm } from '../components/account/AddressForm'
import { AddressList } from '../components/account/AddressList'

//Actions
import { uiOpenModalAddress } from '../store/actions/uiActions'
import { cleanActive } from '../store/actions/addressActions'

export default function Account() {

    const dispatch = useDispatch()
    const { logged } = useSelector(state => state.auth)
    const router = useRouter()

    useEffect(() => {
        
        if(!logged) {
            router.replace("/")
        }

    }, [])

    if(!logged) return null

    const handleModalOpen = () => {
        dispatch(uiOpenModalAddress())
        dispatch(cleanActive())
    }

    return (
        <BasicLayout>
			<Head>
				<title>Gaming - Mi Cuenta</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="account">
				<div className="account__configuration">
                    <div className="title">
                        Configuracion
                    </div>
                    <div className="data">
                        <ProfileScreen/>
                    </div>
                </div>
                <div className="account__addresses">
                    <div className="title">
                        Direcciones
                        <Icon name="plus" link onClick={handleModalOpen} />
                    </div>
                    <div className="data">
                        <AddressList/>
                    </div>
                    <AddressModal>
                        <AddressForm/>
                    </AddressModal>
                </div>

			</div>
		</BasicLayout>
    )
}
