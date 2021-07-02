export const GET_PARCEL_INFO = "GET_PARCEL_INFO";
export const SET_ACTIVE_DRAWER = "SET_ACTIVE_DRAWER";  


export const getParcelInfo = (properties, booleanDrawer)=> (dispatch)=>{
    return dispatch({
        type: GET_PARCEL_INFO,
        payload: {properties, booleanDrawer}
    })
} 