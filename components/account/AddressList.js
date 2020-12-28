import React, { useEffect } from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Actions
import { startListAddress } from '../../store/actions/addressActions'

//Component
import { Address } from './Address'

//Semantic UI
import { Grid } from 'semantic-ui-react'

export const AddressList = () => {

    const dispatch = useDispatch()
    const { addressList } = useSelector(state => state.address)
    const { loading } = useSelector(state => state.ui)


    useEffect(() => {
        dispatch(startListAddress())
    }, [])

    if (loading) {
        return <h2>Por favor espere...</h2>
    }

    return (
        <div className="list-address">
            {
                addressList.length == 0 
                ? 
                    <h3>No hay ninguna direccion creada</h3>
                :
                <Grid>
                    {
                        addressList?.map( address => (
                            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                                <Address  address={address}/>
                            </Grid.Column>
                        ))
                    }
                </Grid>
            }
        </div>
    )
}
