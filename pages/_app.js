//Redux
import { createWrapper } from 'next-redux-wrapper';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store/store';

//Semantic
import 'semantic-ui-css/semantic.min.css'

//Toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//Sass
import './../scss/styles.scss'

function MyApp({ Component, pageProps }) {

	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<ToastContainer 
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
			/>
		</Provider>
	);
}

const makestore = () => store;
const wrapper = createWrapper(makestore);
export default wrapper.withRedux(MyApp);
