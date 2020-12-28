import { types } from "../types";

const initialState = {
    games: [],
}

export const gamesReducer = (state = initialState, action) => {
	switch (action.type) {
        case types.listGames:
			return {
				...state,
				games: action.payload,
			}
		default:
			return state;
	}
};