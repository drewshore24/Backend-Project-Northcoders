const app = require("./app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
    if(err){
        console.log(err,'error in listen.js')
    }
    else{
    console.log(`Listening on ${PORT}...`)}
});