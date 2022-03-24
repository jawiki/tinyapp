const express = require("express"); //requires express package
const app = express(); // starts express
const PORT = 3000; // store port value inside port variable
const cookieParser = require("cookie-parser") //LECTURE
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser()); // LECTURE

app.listen(PORT, () => { //start listening to requests to port variable
  console.log(`Example app listening on port ${PORT}!`);
});

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const user1 = { //LECTURE
  name: "Jarrett Kirck",
  email: "jkirck@hotmail.com",
  password: "jarrett2032",
};

const userDatabase = { //LECTURE
  "jkirck@hotmail.com" : user1,
};

// function generateRandomString () {
//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
//     let String = 5;  
//     let randomString = '';  
//   for (let i=0; i<String; i++) {  
//    num = Math.floor(Math.random() * letters.length);  
//   randomString += letters.substring(num, num+1);  
//  }
// }

//in the event of a request off a type get, if the route asked it"/, then do thee callback defined where req is the request and res is the response to be sent back

app.get("/", (req, res) => {
 // return res.render("index!"); //render  the template called "index" and sends the resulting HTML
 res.redirect("/urls") 
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  res.redirect(shortURL);         // Respond with 'Ok' (we will replace this)
});

app.post("/register", (req, res) => {
  const {password, name, email} = req.body;
  if (!email || !password || !name ){
    return res.redirect("/register")
  }
  const newUser = {
  email,
  name,
  password
 }
});

app.post("/login", (req, res) => {
console.log(req.body);
const {email, password} = req.body //problem?
res.cookie("username", email)
})

//app.post("/login", (req, res) => { //LECTURE UNFINISHED break up
 //const email = req.body;
 //const passwrord = req.body;

 //if(userDatabase[email]){ //check if email exists

 // if(userDatabase[email].password === pasword){
 //   res.send("success")
 // }
 // else{
  //  console.log("bad passwword")
   // res.redirect("/")
  //}
 // return  res.redirect("/")
//};
//});