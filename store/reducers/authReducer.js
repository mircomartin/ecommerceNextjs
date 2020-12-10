import { types } from "../types";

const initialState = {
	logged: false,
	modal: false,
	checking: true,
	user: {},
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.login:
			return {
                ...state,
				logged: true,
				user: action.payload,
				checking: false,
			};
		case types.logout:
			return {
				...initialState,
				checking: false,
			}
		case types.stopChecking:
			return {
				...state,
				checking: false,
			}
		case types.openModal:
			return {
				...state,
				modal: true,
			}
		case types.closeModal:
			return {
				...state,
				modal: false,
			}
		default:
			return state;
	}
};