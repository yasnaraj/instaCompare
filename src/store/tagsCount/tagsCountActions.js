import * as types from './tagsCountActionTypes';
import instaFeed from '../../services/instafeed';

export function GetFeedCountByTag(tagName){
    return async(dispatch, getState) => {
        try{
            let tagDetails = await instaFeed.GetFeedCountByTag(tagName);
            if(tagDetails){
                var tagCount = tagDetails.data;
                dispatch({type: types.TAG_COUNT,tagCount});
            }
        }catch (error) {
            console.error(error);
          }
    }
}