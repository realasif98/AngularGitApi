//Install express server    
const express = require('express');

const path = require('path');   

const app = express();   

// Serve only the static files form the dist directory    
app.use(express.static(__dirname + '/src/assets'));

app.get('/', function(req,res) {  
    console.log(path.join(__dirname+'/src/index.html'));
    res.sendFile(path.join(__dirname+'/dist/index.html'));   
});  

// Start the app by listening on the default Heroku port    
app.listen(process.env.PORT || 4000, () => {
    console.log("Node app is running at localhost: 4000");
});