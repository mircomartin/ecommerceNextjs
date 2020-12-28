import React from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Semantic
import { Form, Button } from 'semantic-ui-react'

//Formik yup
import { useFormik } from 'formik'
import * as Yup from 'yup'

//Actions
import { startAddAddress, startUpdateAddress } from '../../store/actions/addressActions'
import { uiCloseModalAddress } from '../../store/actions/uiActions'

export const AddressForm = () => {

    const { loading } = useSelector(state => state.ui)
    const { active } = useSelector(state => state.address)

    const dispatch = useDispatch()

    const { id, title, name, address, phone, state, postalCode, city } = active;

    const formik = useFormik({
        initialValues:{
            title: title || '' ,
            name: name || '' ,
            address: address || '' ,
            city: city || '',
            state: state || '',
            postalCode: postalCode || '',
            phone: phone || '',
        },
        validationSchema: Yup.object({
			title: Yup.string().required('El Campo es obligatorio'),
			name: Yup.string().required('El Campo es obligatorio'),
			address: Yup.string().required('El Campo es obligatorio'),
			city: Yup.string().required('El Campo es obligatorio'),
            state: Yup.string().required('El Campo es obligatorio'),
            postalCode: Yup.string().required('El Campo es obligatorio'),
            phone: Yup.number().required('El Campo es obligatorio'),
        }),
        onSubmit: (formData) => {
            if (active?.id) {
                dispatch(startUpdateAddress(id, formData))
            }else{
                dispatch(startAddAddress(formData))
            }

            dispatch(uiCloseModalAddress());
            formik.resetForm();
        }
    })

    return (
        <Form onSubmit={formik.handleSubmit}>

            <Form.Input
                name="title"
                type="text"
                label="Titulo de la direccion"
                placeholder="Titulo de la direccion"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title}
            />

            <Form.Group widths="equal">
                <Form.Input
                    name="name"
                    type="text"
                    label="Nombre y Apellido"
                    placeholder="Nombre y Apellido"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                />
                <Form.Input
                    name="address"
                    type="text"
                    label="Direccion"
                    placeholder="Direccion"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={formik.errors.address}
                />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input
                    name="city"
                    type="text"
                    label="Ciudad"
                    placeholder="Ciudad"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    error={formik.errors.city}
                />
                <Form.Input
                    name="state"
                    type="text"
                    label="Estado/Provincia/Region"
                    placeholder="Estado/Provincia/Region"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    error={formik.errors.state}
                />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input
                    name="postalCode"
                    type="text"
                    label="Codigo Postal"
                    placeholder="Codigo Postal"
                    onChange={formik.handleChange}
                    value={formik.values.postalCode}
                    error={formik.errors.postalCode}
                />
                <Form.Input
                    name="phone"
                    type="number"
                    label="Numero de telefono"
                    placeholder="Numero de telefono"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                />
            </Form.Group>
            <div className="actions">
                <Button className="submit" type="submit" loading={loading}>
                    {
                        !active?.id ? "Cargar Direccion" : "Editar"
                    }
                </Button>
            </div>

        </Form>
    )
}
