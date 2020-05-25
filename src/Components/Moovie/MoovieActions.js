import axios from 'axios'; 
const API_KEY = 'c741207dcc6e98c196eb7476b823b709'
const BASE_URL = 'https://api.themoviedb.org/3'

export const updateMoovieList = (data) =>{
    return {
    type: 'SET_LIST',
    payload: data
  }
};

export const getMooviesByName = (type,query) => {
    return dispatch => {
                axios.get(BASE_URL +'/search/'+ type +'?api_key='+API_KEY + '&language=en-US&page=1&include_adult=false&query='+query).then(
                resp=>{
                    dispatch(updateMoovieList(resp.data))
                }
            )

    }
}

export const updatePerson = (data) =>{
    console.log(data)
    return {
    type: 'SET_PERSON',
    payload: data
  }
};
export const getPerson = (personId) => {
    console.log(personId)
    return dispatch => {
                axios.get(BASE_URL + '/person/'+personId+'?api_key='+API_KEY + '&language=en-US').then(
                resp=>{
                    dispatch(updatePerson(resp.data))
                }
            )

    }
}

export const updateTvDetails = (data) =>{
    return {
    type: 'SET_TV',
    payload: data
  }
};
export const getTvDetail = (tvId) => {
    return dispatch => {
                axios.get(BASE_URL + '/tv/'+tvId+'?api_key='+API_KEY + '&language=en-US').then(
                resp=>{
                    dispatch(updateTvDetails(resp.data))
                }
            )

    }
}
