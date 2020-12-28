import { types } from "../types";

const initialState = {
    addressList: [],
    active: {},
}

export const addressReducer = (state = initialState, action) => {
	switch (action.type) {
        case types.addAddress: 
            return {
                ...state,
                addressList: [...state.addressList, action.payload ],
                active: {},
            }
        case types.listAddress: 
            return {
                ...state,
                addressList: action.payload,
                active: {},
            }
        case types.deleteAddress: 
            return {
                ...state,
                addressList: state.addressList.filter (address => address.id !== action.payload),
            }
        case types.addressActive: 
            return {
                ...state,
                active: action.payload,
            }
        case types.cleanActive: 
            return {
                ...state,
                active: {},
            }
        case types.updatedAddress: 
            return {
                ...state,
                addressList: state.addressList.map( address => 
                    address.id === action.payload.id 
                    ? action.payload : address 
                ),
                active: {},
            }
		default:
			return state;
	}
};