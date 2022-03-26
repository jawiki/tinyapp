const express = require("express"); 
const app = express(); 
const PORT = 3000; 
const cookieParser = require("cookie-parser")
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const cookieSession = require("cookie-session");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ name:"session", keys:["hello", "world"]}));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

const urlsForUser = function (id) {
  const results = {};
  const keys = Object.keys(urlDatabase);

  for (const shortUrl of keys) {
    const url = urlDatabase[shortUrl];
    if (url.userId === id) {
      results[id] = url;
    }
  }
  return results;
};

const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
};

const searchUserByEmail = (email) => {
  for (const userId in users) {
    const user = users[userId];
    if (user.email === email) {
      return user;
    }
  }
  return null;
};

function generateRandomString() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let String = 5; 
  let randomString = "";
  for (let i = 0; i < String; i++) {
    num = Math.floor(Math.random() * letters.length);
    randomString += letters.substring(num, num + 1);
  }
  return randomString
}

// bcrypt.genSalt(10, (err, salt, password) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     const id = math.floor(math.random() * 1000) + 1;
//     newUser[id] = {
//       email,
//       name,
//       password
//     }
//   res.redirect("/")
//   })
// });

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/urls", (req, res) => {
  const userId = req.session.userId
  console.log(userId); 

  if (!users[userId]) {
    res.status(400).send("please login first");
    return;
  }  //error
  for (let user in users){
    if (users[user].id=== userId) {
      const urls = urlsForUser(userId);
      const templateVars = { urls, user:users[user] };
      res.render("urls_index", templateVars);
    }
  }
});

app.get("/urls/new", (req, res) => {
  const templateVars = { 
    urls: urlDatabase, user: users[req.session.user_id]};
  res.render("urls_new", templateVars);
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
    longURL: urlDatabase[req.params.shortURL],
  };
  res.render("urls_show", templateVars); //change all to urls_index
});

app.get("/register", (req, res) => {
  const templateVars = {user: users[req.session.user_id]};
  res.render("register", templateVars);
});

app.get("/login", (req, res) => {
  const templateVars = {user: users[req.session.user_id]};
  res.render("login", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);
  const shortUrl = generateRandomString(6)
  urlDatabase[shortUrl]=req.body.longURL
  res.redirect(`/urls/${shortUrl}`);
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send("feilds cannot be blank");
  }
  const existingUser = searchUserByEmail(email);
  if (existingUser) {
    return res.status(400).send("the email address is already taken");
  }
  const userId = generateRandomString(6);
  const salt = bcrypt.genSaltSync(10); //syncronous 
  const hash = bcrypt.hashSync(password, salt);
  const user = {  id:userId,email, password:hash };
  users[userId] = user;
  req.session.userId= userId
  console.log(userId)
  res.redirect("/urls")
  // console.log(user);
  // console.log("test", userId)
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send("feilds cannot be blank");
  }
  const user = searchUserByEmail(email);
  // console.log(userId)
  if (!user) {
    return res.status(400).send("no user with that email found");
  }
  if (bcrypt.compareSync(password, user.password)) {
    
    req.session.userId = user.id;
    res.redirect("/urls");
  } else {
    return res.status(400).send("password does not match");
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});