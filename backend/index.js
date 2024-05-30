const express = require("express");
const mainRouter = require("./routes/index")

const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",mainRouter);

app.listen(3000,function(err){
    if(err){
        console.log(err)
    }else{
        console.log("listening to port 3000")
    }
})



