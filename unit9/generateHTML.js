const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

//EX ${colors[data.color].wrapperbackground}

function generateHTML(data) {
    console.log(data)
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
    
        
        <style>
                #topCard{
                margin-right: 100px;
                margin-left: 30px;
                margin-top: 45px;
                border-radius: 15px !important;
                position: relative;
                background-color: cadetblue;
                max-width: 960px;
                margin: auto;
                }
    
                img{
                text-align: center;
                position: absolute;
                right: 400px;
                left: 400px;
                bottom:100px;
                top:-10px;
                }
    
                h1{
                    text-align: center;
                }
    
                h2{
                    text-align: center;
                }
    
                h4{
                    font-size: 30px;
                }
    
                body{
                    background-color:cornflowerblue;
                }
    
                /* #topCardText{
                    position:absolute;
                    top:100px;
                } */
                
                #contact{
                    text-align: center;
                    padding:10px;
                }
    
                .infoCards{
                    margin: auto 0;
                    text-align: center;
                    position:relative;
                    background:white;
                    width: 100%;
                }
    
                #publicRepo{
                    width:50%;
                    padding:30px;
                    position:relative;
                }
    
                #followers{
                    width:50%;
                    padding:30px;
                    position:relative;
                }
    
                #stars{
                    width:50%;
                    padding:30px;
                    position:relative;
                }
    
                #following{
                    width:50%;
                    padding:30px;
                    position:relative;
                }
                .float{
                    float: left;
                    padding: 20px;
                }
        </style>
    
    
        <title></title>
    </head>
    
    <body>
    
    <div id="topCard">
            <img id="frontpageimage" src="${data.response.avatar_url}"/>
            <div id="topCardText">
            <h1 class="display-4">Hello!</h1>
            <h2>My name is ${data.response.name}</h2>
            <h2> </h2>
    
            <nav id=contact>
            ${data.response.location ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/
            ${data.response.location}"><i class="fas fa-location-arrow"></i> ${data.response.location}</a>`: " "}
                <a class="github" href="${data.response.html_url}"> <i class="fab fa-github-alt"></i> GitHub</a>
                <a class="contact" href="${data.response.blog}">Contact</a>
            </nav>
            </div>
    </div>
    
    
     <!-- git hub bio  -->
     <div id="bio">
     <h3>${data.response.bio ? `${data.response.bio}` : " "} </h3>
    </div>
    
        <div class="infoCards">
                <!-- pubic repo -->
                <div class="float">
                    <div id="publicRepo">
                        <h4>Public Repositories</h4>
                        <p>${data.response.public_repos}</p>
                    </div>
                </div>
                                    
                <!--  followers -->
                <div class="float">
                    <div id="followers">
                        <h4>Followers</h4>
                        <p>${data.response.followers}</p>
                    </div>           
                </div>
                <!-- stars -->
                <div class="float">
                    <div id="stars">
                    <h4>GitHub Stars</h4>
                    <p> ${data.response.stars ? `${data.response.stars}` : "None"}</p>
                    </div>
                </div>
                <!-- following -->
                <div class="float">
                    <div id="following">
                    <h4>Following</h4>
                    <p>${data.response.following}</p>
                    </div>
                </div>
    
        </div>
                        
    </body>
    
    </html>`;
  }

module.exports = generateHTML;