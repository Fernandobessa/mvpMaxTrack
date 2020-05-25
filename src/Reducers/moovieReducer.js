
const INITIAL_STATE = {listMoovie:[],person:[],tv:[]};

export default function moovie(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'SET_LIST':
        return {...state, listMoovie:action.payload}
      case 'SET_PERSON':
        return {...state, person:action.payload}
      case 'SET_TV':
        return {...state, tv:action.payload}    
      default:
        return state
    }
  }