queueKle.factory('Spotify',function ($resource,$cookieStore, Authentication) {
	//search variables
	this.searchBack = false;
	this.artistSearch = [];
	this.albumSearch = [];
	this.trackSearch = [];
	this.artistAlbums = [];
	this.artistName = [];
	this.searched = null;
	this.back = false;
	this.searchWord = undefined;
	this.reload=false;
	this.selUserLoad = false;

	//global variabels
	this.queue = [];
	this.artistCtrl = false;
	this.albumCtrl = false;

	//sort variables
	this.trackSort = true;
	this.artistSort = true;
	this.albumSort = true;
	this.popSort = true;
	this.userInfo = [];
	
	_this = this;
	this.getCookieQueue = function() {
		var tempQueue = $cookieStore.get("queue");
		for(song in tempQueue) { 
			_this.getTrackByID.get({id:tempQueue[song]}, function(data) {
				_this.queue.push(data);
			 });
		}
	}
	_this = this;
	this.getCookieUser = function(){
		var tempUser = $cookieStore.get("id");
		for (item in tempUser) {
			_this.userInfo.push(tempUser[item]);
		}
	}

	this.insertUserCookie = function(key,id,name) {
		var list = [key,id,name];
		this.userInfo = list;
		$cookieStore.put("id", list);
	}


	//calculates totalplaytime in playlist
	this.getPlaylistTime = function(playlist) {
		var runtime = 0;
		for (song in playlist) {
			runtime += playlist[song].duration_ms * 0.001;
		}
		var min = 0;
		var sec = runtime;
		var rest=true;
		while (rest==true) {
			if (sec-60 > 0) {
				sec = sec-60;
				min +=1;
			} 
			else {
				sec = Math.round(sec)
				rest=false;
			}
		}
		if (sec < 10) {
			var results = min +":0"+sec;
		}
		else {
			var results = min +":"+sec;
		} 
		return results;
	}
	//updates the cookies
	this.updateCookieQueue = function() {
		var cookieQueue = [];
		for (song in this.queue) {
			cookieQueue.push(this.queue[song].id);
		}
		$cookieStore.put("queue", cookieQueue);
		var bajs = $cookieStore.get("queue");
	}
	//adds song to queue
	this.addToPlaylist = function(song) {
		this.queue.push(song);
		this.updateCookieQueue();
	}
	//resets the playlist when playlist is saved
	this.resetPlaylist = function() {
		this.queue = [];
		this.updateCookieQueue();
	}
	//Deletes song from queue
	this.removeSong = function(id) {
		for (song in this.queue) {
			if (id == this.queue[song].id) {
				this.queue.splice(song,1);
			}
		}
		this.updateCookieQueue();
	}
	//returns the queue
	this.getQueue = function() {
		return this.queue;
	}

	//Spotify Api-requests
	this.Artist = $resource('https://api.spotify.com/v1/search?q=:name&type=artist&limit=6',{},{
    get: {
		}
	});

	this.topTracks = $resource('https://api.spotify.com/v1/artists/:id/top-tracks?country=SE',{},{
		get: {}
	});

	this.AlbumSearchArtistId = $resource('https://api.spotify.com/v1/artists/:id/albums?market=SE',{},{
    get: {
		}
	});

	this.track = $resource('https://api.spotify.com/v1/search?q=:track&type=track&limit=50',{},{
		get: {}
	});

	this.album = $resource('https://api.spotify.com/v1/search?q=:name&type=album&limit=6',{},{
		get: {}
	});

	this.artistAlbum = $resource('https://api.spotify.com/v1/artists/:id/albums?market=SE&limit=50&album_type=album',{},{
    get: {
		}
	});

	this.artistAlbumSingles = $resource('https://api.spotify.com/v1/artists/:id/albums?market=SE&limit=50&album_type=single',{},{
    get: {
		}
	});

	this.getArtist = $resource('https://api.spotify.com/v1/artists/:id',{},{
    get: {
		}
	});

	this.getTrack = $resource('https://api.spotify.com/v1/albums/:id/tracks',{},{
    get: {
		}
	});

	this.getTrackByID = $resource('https://api.spotify.com/v1/tracks/:id', {}, {
		get: {}
	});

	this.getAlbum = $resource('https://api.spotify.com/v1/albums/:id',{},{
    get: {
		}
	});
	this.getCookieUser();
	this.getCookieQueue();
	return this;

	

});
