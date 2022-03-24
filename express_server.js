const express = require("express"); //requires express package
const app = express(); // starts express
const PORT = 3000; // store port value inside port variable
//const cookieParser = require("cookie-parser") //LECTURE
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const cookieSESSION = require("cookie-session")
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser()); // LECTURE
app.use(cookieSession({

})) //unfinished

app.listen(PORT, () => { 
  console.log(`Example app listening on port ${PORT}!`);
});

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
}

function generateRandomString () {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
    let String = 5;  
    let randomString = '';  
  for (let i=0; i<String; i++) {  
   num = Math.floor(Math.random() * letters.length);  
  randomString += letters.substring(num, num+1);  
 }
}

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
  console.log(req.body);  
  res.redirect(shortURL);        
});

// app.get("/register", (req, res) => {
//   const {password, name, email} = req.body;
//  }
// });

app.post("/register", (req, res) => { //use generateRandom & add errors
  const {password, name, email} = req.body;
  if (!email || !password || !name ){
    return res.redirect("/urls")
  }
  const newUser = {
  email,
  name,
  password
 }
});

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    const id = math.floor(math.random() * 1000) + 1;
    newUser[id] = {
      email,
      name,
      password
    }
  res.redirect("/")
  })
});

app.post("/login", (req, res) => { 
 const email = req.body; // have to add bcrypt
 const passwrord = req.body;

 if(userDatabase[email]){ //check if email exists

 if(userDatabase[email].password === pasword){
   res.send("success")
 }
 else{
   console.log("bad passwword")
   res.redirect("/")
  }
 return  res.redirect("urls")
};// impliment res.cookie("username", email)
req.session.userId = user.id;
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/")
});