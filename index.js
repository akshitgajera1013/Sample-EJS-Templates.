const express=require("express");

const app=express();

const path=require("path");
app.set("view engine", "ejs");

const port=3000;

app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));

app.set("views",path.join(__dirname,"views"));

app.listen(port, () => {
    console.log(`listing on a port ${port}`);
});

app.get("/",(req,res) => {
    res.render("home.ejs");
});

app.get("/home",(req,res) => {
    res.send("home");
})

app.get("/dice",(req,res) => {
    let dice=Math.floor(Math.random () * 6) + 1;
    res.render("dice.ejs", {dice});
});

app.get("/ig/:username",(req,res) => {
    let { username } = req.params;
    const instaData=require("./data.json");
    const data=instaData[username];
    if(data){
        res.render("instagram.ejs", {data});
    } else{
        res.render("error.ejs");
    } 
});

app.get("*",(req,res) => {
    res.send("Something Went Wrong");
})