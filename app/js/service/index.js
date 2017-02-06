let app = require('angular').module('App');

import {albumPageService} from './albumPageService';
import {mainPageService} from './mainPageService';
import {bookPageService} from './bookPageService';
import {booksPageService} from './booksPageService';
import {musicPageService} from './musicPageService';
import {movesPageService} from './movesPageService';
import {movePageService} from './movePageService';
import {songPageService} from './songPageService';
import {pageBgService} from './pageBgService';
import {checkLoaderService} from './checkLoaderService';
import {searchResultsPageService} from './searchResultsPageService';
import {searchPanelService} from './searchPanelService';
import {API} from './API';

app.service('mainPageService', mainPageService);
app.service('albumPageService', albumPageService);
app.service('bookPageService', bookPageService);
app.service('booksPageService', booksPageService);
app.service('musicPageService', musicPageService);
app.service('movesPageService', movesPageService);
app.service('movePageService', movePageService);
app.service('songPageService', songPageService);
app.service('pageBgService', pageBgService);
app.service('checkLoaderService', checkLoaderService);
app.service('searchResultsPageService', searchResultsPageService);
app.service('searchPanelService', searchPanelService);
app.service('API', API);
