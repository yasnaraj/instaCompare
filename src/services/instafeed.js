var access_Token = 'ACCESS_TOKEN';

class instaFeed{
    //gets the count of the hashtag
    GetFeedCountByTag(tagName){
        const url = 'https://api.instagram.com/v1/tags/' + tagName + '?access_token=' + access_Token;

        return fetch(url, {
            method: 'GET',
            headers: {
				Accept: 'application/json'
			}
        }).then(function(response){
            return response.json();

        }).catch(function(error){
			throw new Error(error);
		});
    }

}


export default new instaFeed();