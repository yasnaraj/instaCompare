import * as types from './tagsCountActionTypes';
import Immutable from 'seamless-immutable';

let initialState = {
    tagCount: undefined
}

export default function reduce(state = initialState, action = {}){
    switch(action.type){
        case types.TAG_COUNT:
        tagCount: action.tagCount
        return {...state, tagCount: action.tagCount}

        default:
        return state;
    }
}