const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const adminRoutes = require('./routes/admin');
const adminHome = require('./routes/home');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(adminRoutes);
app.use(adminHome);


app.set('view engine', 'ejs');
app.set('views', 'views');


app.get('/taash_version', function (req, res) {
    res.send('7.18')
  })

app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))