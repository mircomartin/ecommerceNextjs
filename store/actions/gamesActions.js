//Library
import { toast } from "react-toastify";

//Utils
import { BASE_PATH } from "../../utils/constants";

//Redux
import { types } from "../types";
import { activeLoading, finishedLoading } from "./uiActions";

export const startListLastGames = (limit) => {
    return async (dispatch) => {

        dispatch(activeLoading())
        console.log(limit)
        try {

            const limitItems = `?_limit=${limit}`
            const sortItems = "&_sort=createAt:desc"

            const url = `${BASE_PATH}/games${limitItems}${sortItems}`;
            
            const response = await fetch(url);
            const result = await response.json();

            console.log(result)

            dispatch({
                type: types.listGames,
                payload: result,
            })

            dispatch(finishedLoading())

        } catch (error) {

            toast.error("Hubo un error, al cargar el listado")
            dispatch(finishedLoading())

        }
    }
}