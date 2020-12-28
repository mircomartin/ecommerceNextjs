import React from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Semantic
import { Modal, Icon } from 'semantic-ui-react'

//Actions
import { uiCloseModal, uiCloseModalAddress } from './../../store/actions/authAction'

export const BasicModal = ({title, children}) => {

    const { modal } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onClose = () => {
        dispatch(uiCloseModal())
    }

    return (
        <Modal className="basic-modal" open={modal} size="small">
            <Modal.Header>
                <span>{title}</span><Icon name="close" onClick={onClose}/>
            </Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}
