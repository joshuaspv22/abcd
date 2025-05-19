// Step 3: Require/Loads the express module
const express = require('express');
// body-parser is used to read data payload from the http request body
const bodyParser = require('body-parser'); 
//  path is used to set default directories for MVC and also for the static files
const path = require('path'); 
// include the defined package
const fs = require('fs');

// Step 4: Creates our express server
const app = express();

//Serves static files inside the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'pages'));
app.use(bodyParser.urlencoded({ extended: true }));

const user_file = path.join(__dirname, 'users.json');
app.set('views', path.join(__dirname, 'src', 'pages'));
app.get('/account', (req, res) => {
  res.render('account'); // Renders account.hbs
});

function loadUsers() {
  if (!fs.existsSync(user_file)) {
    return [];
  }
  const data = fs.readFileSync(user_file);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(user_file, JSON.stringify(users, null, 2));
}
//Sets a basic route index.hbs when website initially starts and when home is clicked from the nav bar or whenever a process needs to go back to home 
app.get('/', (req, res) => {
    res.render('index.hbs');
})

app.get('/account', (req, res) => {
    res.render('account');
});

app.post('/account', (req, res) => {
  const {username, password} = req.body;
  if(!username||!password){
    return res.render('account', {error: 'Both fields are required'});
  }
  const users = loadUsers();
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.render('account', { error: 'Username already exists.' });
  }
  users.push({username, password});
  saveUsers(users);
  res.render('success',{username});
})

// Step 5: Start HTTP Server on a port number 3000
// This will create a web service for your own project
const port = 3000;
app.listen(port, () => console.log(`App listening to port ${port}`));