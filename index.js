const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const methodOverride = require('method-override');
const transformers = require('./controllers/transformersWeb');
const path = require('path');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', expressHandlebars({defaultLayout: 'home', layoutsDir: path.join(__dirname, 'views/layouts')}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'));

app.use('/', transformers);

app.listen(process.env.PORT, () => {
  console.log('Listening..');
});
