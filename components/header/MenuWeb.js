import React,{ useState, useEffect } from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Semantic y Next
import { Container, Menu, Grid, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

//Components
import { BasicModal } from '../modals/BasicModal'
import { Auth } from '../auth/Auth'
import { toast } from 'react-toastify'
import { BASE_PATH } from '../../utils/constants'

//Actions
import { startChecking, startLogout, uiOpenModal } from '../../store/actions/authAction'

export const MenuWeb = () => {

    const [platforms, setPlatforms] = useState([])
    const [titleModal, setTitleModal] = useState("Iniciar Sesion")

    const { logged, checking, user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const router = useRouter()

    const openModal = () => {
        dispatch(uiOpenModal())
    }

    const handleLogout = () => {
        dispatch(startLogout())
        router.replace("/")
    }

    const getPlatformApi = async () => {

        try {

            const url = `${BASE_PATH}/platforms?_sort=position:asc`;
            
            const response = await fetch(url);
            const result = await response.json()

            setPlatforms(result)

        } catch (error) {
            toast.error("Hubo un error, al cargar las plataformas")
        }
    }

    useEffect(() => {

        dispatch(startChecking())
        
    }, [])

    useEffect(() => {

        getPlatformApi()

    }, [])

    if(checking) {
		return null
    }
    
    return (
        <div className="menuweb">
            <Container>
                <Grid className="menuweb">
                    <Grid.Column mobile={16} tablet={8} computer={6} className="menuweb__left">
                        <Menu>
                            {
                                platforms.map( (platform) => (
                                    <Link href={`/games/${platform.url}`} key={platform.id}>
                                        <Menu.Item as="a">
                                            {platform.title}
                                        </Menu.Item>
                                    </Link>
                                ))
                            }
                        </Menu>
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={8} computer={10} className="menuweb__right">
                    <Menu>
                        {
                            logged ? 
                                <>
                                    <Link href="/orders">
                                        <Menu.Item as="a">
                                            <Icon name="game"/>
                                            Mis Pedidos
                                        </Menu.Item>
                                    </Link>
                                    <Link href="/wishlist">
                                        <Menu.Item as="a">
                                            <Icon name="heart outline"/>
                                            Mis Favoritos
                                        </Menu.Item>
                                    </Link>
                                    <Link href="/account">
                                        <Menu.Item as="a">
                                            <Icon name="heart outline"/>
                                            {user.name}
                                        </Menu.Item>
                                    </Link>
                                    <Link href="/cart">
                                        <Menu.Item as="a">
                                            <Icon name="cart" className="sinMargin" />
                                        </Menu.Item>
                                    </Link>
                                    <Menu.Item onClick={handleLogout}>
                                        <Icon name="power off" className="sinMargin"/>
                                    </Menu.Item>
                                </>
                                : <Menu.Item onClick={openModal}>
                                    <Icon name="user outline"/>
                                    Mi Cuenta
                                  </Menu.Item>
                        }
                    </Menu>
                    </Grid.Column>
                </Grid>
            </Container>
            <BasicModal title={titleModal}>
                <Auth setTitleModal={setTitleModal}/>
            </BasicModal>
        </div>
    )
}
