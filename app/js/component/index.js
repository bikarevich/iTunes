var app = require('angular').module('App');


require('./mediaPlayer/MediaPlayerComponent');
require('./trackList/TrackListComponent');
require('./lazyLoad/lazyLoadComponent');
require('./scrollTopBtn/scrollTopBtnComponent');
app.component('searchPanel', require('./searchPanel/searchPanel'));