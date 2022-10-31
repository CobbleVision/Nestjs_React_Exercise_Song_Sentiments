
var registerNewUser = function(){
  var username = document.getElementById("F").value

  //Checking for valid username expression
  if(username === "") alert("You need to enter a value for the username!");
  else{
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        var response = JSON.parse(xhr.responseText)
        if(response.statusCode === 400) alert("Please choose a different username! This one is already taken!")
        else{
          alert("Your api key is: " + response.apikey + ". You can find it below the username registration.");
          document.getElementById("apikeyHelp").innerHTML = "Your apikey is " + response.apikey
        } 
      };
    xhr.open("POST", 'http://localhost:5000/user');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "username": username}));
  }
}

var sendSentimentMessage = function(){
  var usernameSentimentInput = document.getElementById("usernameInput").value
  var apikeySentimentInput = document.getElementById("apikeySentimentInput").value
  var sentimentMessageInput = document.getElementById("sentimentMessageInput").value

  if(usernameSentimentInput === "" || apikeySentimentInput === "" || sentimentMessageInput === "") alert("You need to enter a value in every field of this form!");
  else{
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if(xhr.status === 201){
          var resultScore = Number(xhr.responseText)
          if(resultScore >= 0) alert("This is a positive message!")
          else alert("This is a negative message!")
        }else{
          alert("Your apikey and/or username are incorrect!")
        }
      };
    xhr.open("POST", 'http://localhost:5000/sentiment');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "username": usernameSentimentInput, "apikey":apikeySentimentInput, "message":sentimentMessageInput}));

  }
}

var deleteUser = function(){
  var username = document.getElementById("usernameDeleteInput").value
  var apikey = document.getElementById("apiKeyDeleteInput").value

  //Checking for valid username expression
  if(username === "" || apikey === "") alert("You need to enter a value for the username and apikey!");
  else{
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        var response = JSON.parse(xhr.responseText)
        alert("User " + username + " was deleted, if the apikey was correct.");
      };
    xhr.open("DELETE", 'http://localhost:5000/user');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "username": username, "apikey":apikey}));
  }
}

function UserRegistration() {
  return (
    <div>
      <br></br>
      <div className="card">
        <div className="card-header">
          <b>Register a new user to use the sentiment application!</b>
        </div>
        <div className="card-body">
          <label for="usernameInput">Username</label>
          <input type="username" className="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Enter Username">
          </input>
          <small id="apikeyHelp" class="form-text text-muted">Your API Key is not defined yet!</small>
          <br></br>
          <button onClick={registerNewUser} class="btn btn-primary">Register</button>
        </div>
      </div> 
    </div>  
  )
}

function UserDeletion() {
  return (
    <div>
      <br></br>
      <div className="card">
        <div className="card-header">
          <b>Delete your user!</b>
        </div>
        <div className="card-body">
          <label for="usernameDeleteInput">Username</label>
          <input type="username" className="form-control" id="usernameDeleteInput" aria-describedby="usernameHelp" placeholder="Enter Username">
          </input>
          <br></br>
          <label for="apiKeyDeleteInput">ApiKey</label>
          <input type="username" className="form-control" id="apiKeyDeleteInput" aria-describedby="usernameHelp" placeholder="Enter Username">
          </input>
          <br></br>
          <button onClick={deleteUser} class="btn btn-primary">Delete user</button>
        </div>
      </div> 
    </div>  
  )
}

function SentimentComponent() {
  return (
    <div>
      <br></br>
      <div className="card">
        <div className="card-header">
          <b>Enter your Apikey and Username to send a message to be analyzed for sentiment.</b>
        </div>
        <div className="card-body">
          <label for="usernameSentimentInput">Username</label>
          <input type="username" className="form-control" id="usernameSentimentInput" aria-describedby="usernameHelp" placeholder="Enter Username"></input>
          <br></br>
          <label for="apikeySentimentInput">ApiKey</label>
          <input type="apikey" className="form-control" id="apikeySentimentInput" aria-describedby="usernameHelp" placeholder="Enter ApiKey"></input>
          <br></br>
          <label for="sentimentMessageInput">Sentiment Message</label>
          <input type="apikey" className="form-control" id="sentimentMessageInput" aria-describedby="usernameHelp" placeholder="Enter Sentiment Message"></input>
          <br></br>
          <button onClick={sendSentimentMessage} class="btn btn-primary">Send Sentiment message</button>
        </div>
      </div> 
    </div>
  )
}

function Body() {

  const myBackGroundStyle = {
    backgroundColor: "lightblue",
    fontFamily: "Arial"
  };

  return (
    <body style={myBackGroundStyle}> 
      <div className="container h-100" >
        <div className="row">
          <div className="col">
            < UserRegistration />
            < SentimentComponent />    
          </div>
          <div className="col">
          < UserDeletion />
          </div>
        </div>
      </div>
      <br>
      </br>
    </body>
  );
}

  export default Body;
