const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

let appdata = [{
  id: 0,
  title: "Celeste",
  year: 2018,
  blurb: "My favourite game of all time.",
  gameplayRating: 10,
  storyRating: 10,
  visualsRating: 10,
  musicRating: 10,
  overallRating: 10,
  datePosted: new Date().toLocaleString()
}]

let tbid = 1;

const server = http.createServer(function(request, response){
  if (request.method === "GET"){
    handleGet( request, response )    
  } else if (request.method === "POST"){
    handlePost( request, response ) 
  }
})

const handleGet = function(request, response){
  const filename = dir + request.url.slice(1) 

  if (request.url === "/"){
    sendFile( response, "public/index.html" )
  } else if (request.url === "/reviews"){
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function(request, response){
  let dataString = ""

  request.on("data", function(data){
      dataString += data 
  })

  request.on("end", function(){
    const data  = JSON.parse(dataString)

    if (request.url === "/submit"){
      const overallRating = ((parseInt(data.gameplayRating) || 0) + (parseInt(data.storyRating) || 0) + (parseInt(data.visualsRating) || 0) + (parseInt(data.musicRating) || 0)) / 4
      const datePosted = new Date().toLocaleString()
      const newReview = { tbid, ...data, overallRating, datePosted }
      tbid++
      appdata.push(newReview)
      response.writeHead(200, "OK", { "Content-Type": "application/json" })
      response.end(JSON.stringify(appdata))
    } else if (request.url === "/delete"){
      const index = appdata.findIndex(item => item.id === data.id)
      appdata.splice(index, 1)
      response.writeHead(200, "OK", { "Content-Type": "application/json" })
      response.end(JSON.stringify(appdata))
    } else {
      response.writeHead(404)
      response.end("404 Error: POST Not Found")
    }
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{
      console.log("err = ", err)

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
