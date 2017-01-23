var app = require('angular').module('App');

app.service('API', require('./API'));
app.service('MainPageService', require('./MainPageService'));
app.service('MusicPageService', require('./MusicPageService'));
app.service('BooksPageService', require('./BooksPageService'));
app.service('MovesPageService', require('./MovesPageService'));
app.service('SongPageService', require('./SongPageService'));
