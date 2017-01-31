var app = require('angular').module('App');


require('./mediaPlayer/MediaPlayerComponent');
require('./trackList/TrackListComponent');
app.component('searchPanel', require('./searchPanel/searchPanel'));