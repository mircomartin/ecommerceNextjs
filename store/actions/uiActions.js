import { types } from "../types";

//Modal Directions
export const uiOpenModalAddress = () => ({
    type: types.openModalAddress
})

export const uiCloseModalAddress = () => ({
    type: types.closeModalAddress
})

//Loadings
export const activeLoading = () => ({
    type: types.loadingActive
})

export const finishedLoading = () => ({
    type: types.loadingFinish
})