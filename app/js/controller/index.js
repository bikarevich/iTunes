var app = require('angular').module('App');

import {MainPageController} from './MainPageController';
import {AlbumPageController} from './AlbumPageController';
import {BookPageController} from './BookPageController';
import {BooksPageController} from './BooksPageController';
import {MusicPageController} from './MusicPageController';
import {MovesPageController} from './MovesPageController';
import {MovePageController} from './MovePageController';

app.controller('SongPageController', require('./SongPageController.js'));
app.controller('SearchResultsPageController', require('./SearchResultsPageController.js'));

app.controller('MainPageController', MainPageController);
app.controller('AlbumPageController', AlbumPageController);
app.controller('BookPageController', BookPageController);
app.controller('BooksPageController', BooksPageController);
app.controller('MusicPageController', MusicPageController);
app.controller('MovesPageController', MovesPageController);
app.controller('MovePageController', MovePageController);