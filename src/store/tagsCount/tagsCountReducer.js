import * as types from './tagsCountActionTypes';

let initialState = {
    tagCount: undefined
}

export default function reduce(state = initialState, action = {}){
    switch(action.type){
        case types.TAG_COUNT:
        return {...state, tagCount: action.tagCount}

        default:
        return state;
    }
}