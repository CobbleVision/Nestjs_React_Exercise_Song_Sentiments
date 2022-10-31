const songSentimentService = {

    //Response is array of songs with id, title, artist and thumbnail
    searchForSongs: async function(songName){
        return new Promise((resolve, reject) => {
            var jsonObject = { "songName": songName};
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };
            xhr.onerror = () => {
                reject("The Song Search Request to the API of this Song Sentiment Service Failed. Sorry.")
            }
            xhr.open("POST", 'http://localhost:5001/song', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(jsonObject));
        }).catch((err) => {
            alert(err)
        })
    },

    getSentimentValueForSong: async function(songJSON){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const sentimentRating = xhr.responseText;
                resolve(sentimentRating);
            }
            xhr.onerror = () => {
                reject("The Song Sentiment Request to the API of this Song Sentiment Service Failed. Sorry.")
            }
            xhr.open("POST", 'http://localhost:5001/song/sentiment', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            var postJSON = {
                "songName": songJSON.title,
                "songAuthor": songJSON.artist
              }
            xhr.send(JSON.stringify(postJSON));        
        }).catch((err) => {
            alert(err)
        })
    },

    getHighestSentimentSongs: async function(){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                var resultJSON = JSON.parse(xhr.responseText);
                resolve(resultJSON);
            }
            xhr.onerror = () => {
                reject("The Song Sentiment Request to the API of this Song Sentiment Service Failed. Sorry.")
            }

            xhr.open("GET", 'http://localhost:5001/song/highest', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            
        }).catch((err) => {
            alert(err)
        })
    },

    getLowestSentimentSongs: async function(){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                var resultJSON = JSON.parse(xhr.responseText);
                resolve(resultJSON);
            }
            xhr.onerror = () => {
                reject("The Song Sentiment Request to the API of this Song Sentiment Service Failed. Sorry.")
            }
            
            xhr.open("GET", 'http://localhost:5001/song/lowest', true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            
        }).catch((err) => {
            alert(err)
        })
    }


}

export default songSentimentService;