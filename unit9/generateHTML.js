const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "black",
        links: "darkgreen"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C",
        links: "white"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C",
        links: "darkgray"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "black",
        photoBorderColor: "white",
        links: "darkgray"
    }
};


function generateHTML(data) {
    console.log(data)
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans|Josefin+Slab|Nanum+Myeongjo&display=swap" rel="stylesheet">
        <!-- font-family: 'Alegreya Sans', sans-serif;
        font-family: 'Nanum Myeongjo', serif;
        font-family: 'Josefin Slab', serif; -->
    
        
        <style>
                #topCard{
                margin-right: 100px;
                margin-left: 30px;
                margin-top: 45px;
                border-radius: 15px !important;
                position: relative;
                background-color: ${colors[data.color].headerBackground};
                margin: auto;
                color: ${colors[data.color].headerColor};
                border:1px solid black;
                }
    
                img{
                display: block;
                margin-left: auto;
                margin-right: auto;
                border-radius:50%;
                border:2px solid ${colors[data.color].photoBorderColor};
                max-width: 120px;
                }
    
                h1{
                    text-align: center;
                    font-family: 'Josefin Slab', serif;
                }
    
                h2{
                    text-align: center;
                    font-family: 'Josefin Slab', serif;
                }

                h3{
                    font-size:15px;
                    text-align: center;
                    font-family: 'Alegreya Sans', sans-serif;
                }
    
                h4{
                    font-size: 20px;
                    font-family: 'Nanum Myeongjo', serif;
                }

                p{
                    font-family: 'Alegreya Sans', sans-serif;
                }
    
                body{
                    background-color:${colors[data.color].wrapperBackground};
                }
                   
                a{
                    color: ${colors[data.color].photoBorderColor};
                }

                .col-4{
                    text-align: center;
                    color: lightgray;
                }

                .blog{
                    text-align: center;
                }
                
                #bio{
                    background-color:lightgray;
                    color:black;
                    border:1px solid black;
                }

                #contact{
                    text-align: center;
                    padding:10px;
                    font-family: 'Nanum Myeongjo', serif;
                }
    
                .infoCards{
                    margin: auto 0;
                    text-align: center;
                    background:white;
                    border: 1px solid black;
                }

                .left{
                    padding-right:0;
                }
  
        </style>
    
    
        <title>${data.response.name}</title>
    </head>
    
<body>

<header>
<img id="frontpageimage" src="${data.response.avatar_url}"/>
</header>

<div class = "container">

    <div id="topCard">
        <div class = "row"> 
            <div class = "col-12">
                <h1>hi!</h1>
            </div>
        </div>

        <div class = "row"> 
            <div class = "col-12">
                <h2>My name is ${data.response.name}</h2>
            </div>
        </div>

        <div class = "row"> 
            <div class = "col-12">
                <h2>I work at ${data.response.company}</h2>
            </div>
        </div>
    
    <div class = "links">
        <div class = "row">
            <div class = "col-4">    
                <nav>
                ${data.response.location ? `<a class="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/
                ${data.response.location}"><i class="fas fa-location-arrow"></i> ${data.response.location}</a>` : " "}</nav>
            </div>
            <div class = "col-4">  
                <a class="github" style="text-align:center" href="${data.response.html_url}"> <i class="fab fa-github-alt"></i> GitHub</a>
            </div>
            <div class = "col-4">  
                <a class="blog" style="text-align:center" href="${data.response.blog}">Blog</a>
            </div>
        </div>
    </div>
    
    
     <!-- git hub bio  -->
    <div id="bio">
        <div class = "row"> 
            <div class = "col-12">
                <h3>${data.response.bio ? `${data.response.bio}` : " "} </h3>
            </div>
        </div>
    </div>
    
        <div class="infoCards">
                
            <!-- pubic repo -->

            <div class = "row">
                <div class = "col-6">
                    <div class = "row"> 
                        <div class = "col-12">
                            <h4>Public Repositories</h4>
                        </div>
                    </div>
                    <div class = "row"> 
                        <div class = "col-12">
                            <p>${data.response.public_repos}</p>
                        </div>
                    </div>
                </div>

                                    
                <!--  followers -->

                <div class = "col-6">
                    <div class = "row"> 
                        <div class = "col-12">
                            <h4>Followers</h4>
                        </div>
                    </div>
                    <div class = "row"> 
                        <div class = "col-12">
                            <p>${data.response.followers}</p>
                        </div>
                    </div>
                </div>
            </div>         

                <!-- stars -->

            <div class = "row">
                    <div class = "col-6">
                        <div class = "row"> 
                            <div class = "col-12">
                                <h4>GitHub Stars</h4>
                            </div>
                        </div>
                        <div class = "row"> 
                            <div class = "col-12">
                                <p> ${data.response.stars ? `${data.response.stars}` : "None"}</p>
                            </div>
                        </div>
                    </div>

                                    
                 <!-- following -->

                <div class = "col-6">
                    <div class = "row"> 
                        <div class = "col-12">
                            <h4>Following</h4>
                        </div>
                    </div>
                    <div class = "row"> 
                        <div class = "col-12">
                            <p>${data.response.following}</p>
                        </div>
                    </div>
                </div>
            </div>     


<!-- last div for infocard -->
        </div>
    
<!-- last container div -->
    </div>            
    
    
    </body>
    
    </html>`;
}

module.exports = generateHTML;