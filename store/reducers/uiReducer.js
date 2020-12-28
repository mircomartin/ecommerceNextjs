import { types } from "../types";

const initialState = {
    loading: false,
	modalAddress: false,
}

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.loadingActive:
            return {
                ...state,
                loading: true,
            }
        case types.loadingFinish:
            return {
                ...state,
                loading: false,
            }
        case types.openModalAddress:
			return {
				...state,
				modalAddress: true,
			}
		case types.closeModalAddress:
			return {
				...state,
				modalAddress: false,
			}
		default:
			return state;
	}
};