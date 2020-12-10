import { types } from "../types";

const initialState = {
	loading: false,
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
		default:
			return state;
	}
};