import React from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Formik y yop
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Semantic
import { Form, Button } from 'semantic-ui-react';

//Actions
import { startLogin, startRecoverPassword } from '../../store/actions/authAction';

export const LoginScreen = ({showRegisterScreen}) => {
    const dispatch = useDispatch();
	const { loading } = useSelector(state => state.ui)
    
    const handleRedirect = () => {
        showRegisterScreen()
    }

    const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			identifier: Yup.string().email().required('El Campo es obligatorio'),
			password: Yup.string().required('El Campo es obligatorio'),
		}),
		onSubmit: (formData) => {

			dispatch(startLogin(formData))

		},
	});

	const resetPassword = () => {
		formik.setErrors({})
		const validateEmail = Yup.string().email().required()

		if(!validateEmail.isValidSync(formik.values.identifier)) {
			formik.setErrors({identifier: true})
		} else {
			dispatch(startRecoverPassword(formik.values.identifier))
		}
	}

    return (
        <Form className="loginForm" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="identifier"
				type="text"
                placeholder="Correo Electronico"
                onChange={formik.handleChange}
                error={formik.errors.identifier}
			/>
			<Form.Input
				name="password"
				type="password"
                placeholder="Password"
                placeholder="Password"
				onChange={formik.handleChange}
			/>
			<div className="actions">
				<Button type="button" basic onClick={handleRedirect}>
					Registrar
				</Button>
                <div>
                    <Button type="submit" className="submit" loading={loading}>
                        Iniciar Sesion
                    </Button>
                    <Button type="button" onClick={resetPassword}>
                        Has olvidado tu password?
                    </Button>
                </div>
			</div>
		</Form>
    )
}
