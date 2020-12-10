import { types } from "../types";

//Loadings
export const activeLoading = () => ({
    type: types.loadingActive
})

export const finishedLoading = () => ({
    type: types.loadingFinish
})