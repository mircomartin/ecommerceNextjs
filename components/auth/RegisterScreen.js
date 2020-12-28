import React from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Formik y yop
import { useFormik } from 'formik';
import * as Yup from 'yup';

//Semantic
import { Form, Button } from 'semantic-ui-react';

//Actions
import { startRegisterUser } from '../../store/actions/authAction';

export const RegisterScreen = ({ showLoginScreen }) => {
    const dispatch = useDispatch();
	const { loading } = useSelector(state => state.ui)

	const handleRedirect = () => {
		showLoginScreen();
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			lastname: '',
			username: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('El Campo es obligatorio'),
			lastname: Yup.string().required('El Campo es obligatorio'),
			username: Yup.string().required('El Campo es obligatorio'),
			email: Yup.string().email().required('El Campo es obligatorio'),
			password: Yup.string().required('El Campo es obligatorio'),
		}),
		onSubmit: (formData) => {
			dispatch(startRegisterUser(formData))
		},
	});

	return (
		<Form className="loginForm" onSubmit={formik.handleSubmit}>
			<Form.Input
				name="name"
				type="text"
				placeholder="Nombre"
				onChange={formik.handleChange}
				error={formik.errors.name}
			/>
			<Form.Input
				name="lastname"
				type="text"
				placeholder="Apellido"
				onChange={formik.handleChange}
				error={formik.errors.lastname}
			/>
			<Form.Input
				name="username"
				type="text"
				placeholder="Nombre de Usuario"
                onChange={formik.handleChange}
                error={formik.errors.username}
			/>
			<Form.Input
				name="email"
				type="text"
				placeholder="Correo Electronico"
                onChange={formik.handleChange}
                error={formik.errors.email}
			/>
			<Form.Input
				name="password"
				type="password"
				placeholder="Password"
				onChange={formik.handleChange}
			/>
			<div className="actions">
				<Button type="button" basic onClick={handleRedirect}>
					Iniciar Sesion
				</Button>
				<Button type="submit" className="submit" loading={loading}>
					Registrar
				</Button>
			</div>
		</Form>
	);
};
