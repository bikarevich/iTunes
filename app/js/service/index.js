let app = require('angular').module('App');

import {albumPageService} from './albumPageService';
import {mainPageService} from './mainPageService';
import {bookPageService} from './bookPageService';
import {booksPageService} from './booksPageService';
import {musicPageService} from './musicPageService';
import {movesPageService} from './movesPageService';
import {movePageService} from './movePageService';


app.service('API', require('./API'));
app.service('SongPageService', require('./SongPageService.js'));
app.service('SearchPanelService', require('./SearchPanelService.js'));
app.service('SearchResultsPageService', require('./SearchResultsPageService.js'));
app.service('PageBgService', require('./PageBgService.js'));
app.service('CheckLoaderService', require('./CheckLoaderService.js'));
app.service('LazyLoadService', require('./LazyLoadService.js'));

app.service('mainPageService', mainPageService);
app.service('albumPageService', albumPageService);
app.service('bookPageService', bookPageService);
app.service('booksPageService', booksPageService);
app.service('musicPageService', musicPageService);
app.service('movesPageService', movesPageService);
app.service('movePageService', movePageService);
