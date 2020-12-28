import React from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Semantic
import { Modal, Icon } from 'semantic-ui-react'

//Actions
import { uiCloseModalAddress } from '../../store/actions/uiActions'
import { cleanActive } from '../../store/actions/addressActions'

export const AddressModal = ({children}) => {

    const { modalAddress } = useSelector(state => state.ui)
    const { active } = useSelector(state => state.address)

    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(uiCloseModalAddress())
        dispatch(cleanActive())
    }

    return (
        <Modal className="basic-modal" open={modalAddress} size="small">
            <Modal.Header>
                <span>
                    {
                        active?.id ? active.title : "Nueva Direccion"
                    }
                </span><Icon name="close" onClick={onClose}/>
            </Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}