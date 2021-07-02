import { GET_PARCEL_INFO } from "./actions"

const initialState = {
    properties:{},
    booleanDrawer: false
}

export const reducer = (state = initialState, action)=>{
    if(action.type === GET_PARCEL_INFO){
        const {properties, booleanDrawer} = action.payload
        if(properties.refcat === state.properties.refcat){
            return {properties: {}, booleanDrawer: false}
        }
        else{
            return {properties, booleanDrawer: true}
        }
    }
    return state
}