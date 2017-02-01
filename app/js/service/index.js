var app = require('angular').module('App');

app.service('API', require('./API'));
app.service('MainPageService', require('./MainPageService.js'));
app.service('MusicPageService', require('./MusicPageService.js'));
app.service('BooksPageService', require('./BooksPageService.js'));
app.service('MovesPageService', require('./MovesPageService.js'));
app.service('SongPageService', require('./SongPageService.js'));
app.service('MovePageService', require('./MovePageService.js'));
app.service('BookPageService', require('./BookPageService.js'));
app.service('SearchPanelService', require('./SearchPanelService.js'));
app.service('SearchResultsPageService', require('./SearchResultsPageService.js'));
app.service('AlbumPageService', require('./AlbumPageService.js'));
app.service('PageBgService', require('./PageBgService.js'));
app.service('CheckLoaderService', require('./CheckLoaderService.js'));
app.service('LazyLoadService', require('./LazyLoadService.js'));
