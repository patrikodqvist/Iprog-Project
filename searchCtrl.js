queueKle.controller('searchCtrl', function($scope,$window,$routeParams,$rootScope,Spotify,Authentication) {
	//Initial Values
	$scope.searchInput=false;
	Spotify.artistCtrl=false;
	Spotify.albumCtrl=false;
	$scope.save = false;

	//Backbutton changes the states of variables that search is displayed correctly
	$scope.backButton = function() {
		$scope.artistResult = Spotify.artistSearch;
		$scope.albumResult = Spotify.albumSearch;
		$scope.trackResult = Spotify.trackSearch;
		Spotify.artistCtrl = false;
		Spotify.albumCtrl = false;
		Spotify.back = true;
	}

	//Checks the search page for header
	$scope.searchPageLoad = function() {
		$scope.searchPage = true;
		Spotify.reload=true;
		Spotify.selUserLoad=true;
	}

	//Checks the album page for header
	$scope.albumPageLoad = function() {
		$scope.albumToArtist =true;
		$scope.searchPage = false;
	}

	//Checks the artist page for header
	$scope.artistPageLoad = function() {
		$scope.searchPage = false;
	}

	//Checks the user page for header
	$scope.friendPageLoad = function() {
		if (Spotify.reload == false) {
			Authentication.userSearch($routeParams.id);
			Spotify.reload=true;
		}
		$scope.User = false;
		$scope.searchPage = false;
		if ($rootScope.selUser) {
			if ($rootScope.currentUser.id == $rootScope.selUser.id) {
				$scope.User = true;
			}
			else{

			}
		}
		else {	
		}
	}

	//Checks the user page for header
	$scope.friendPlaylistLoad = function() {
		//Checks if page is reloaded
		if (Spotify.reload == false) {
			Authentication.userSearch($routeParams.id);
			Spotify.reload=true;
		}
		$scope.User=false;
		$scope.searchPage=false;
		$scope.friendPlaylistPage=true;

		if ($rootScope.selUser) {
				//Checks if page is reloaded
				if (Spotify.selUserLoad == false) {
					var list = Spotify.userInfo;
					for (i in $rootScope.selUser.playlists){
						if (i==list[0]){
							if ($rootScope.selUser.playlists[i].PlaylistName == list[2]) {
								$rootScope.selectedUser = $rootScope.selUser.playlists[i];
								$rootScope.currentRating = $rootScope.selUser.playlists[i].Ranking;
							}
						}
					}
					Spotify.selUserLoad = true;
				}
			if ($rootScope.selectedUser) { 
				if ($rootScope.currentUser.id == $rootScope.selUser.id) {
					$scope.User = true;
				}
				else{
				}
			}
			else{
			}
		}
		else {
		}
	}

	//Returns the right index for the songs
	$scope.getRowIndex = function(index) {
		var result = index +1;
		result = result+". "
		return result
	}

	//checks the queue if it is empty
	$scope.checkQueue = function() {
		var list = Spotify.getQueue();
		if (list.length > 0) {
			$scope.queueEmpty=false;
		}
		else {
			$scope.queueEmpty=true;
		}
	}

	//checkMessage
	$scope.messageFunction = function() {
		var bol = $rootScope.messageSaved;
		return bol;
	}

	//returns the searchword
	$scope.searchWord = function() {
		var test = Spotify.searchWord;
		return test;
	}

	//Checks if page has ever been loaded
	$scope.changeToResults = function() {
		if (Spotify.back) {
			if (Spotify.searchWord) {
				$scope.searchInput = true;
			}
		}
	}

	//Searches for a specific user
	$scope.searchUser = function(user) {
		Authentication.searchUser(user);
	};

	$scope.artistResults = function() {
		return Spotify.artistSearch;
	}

	$scope.albumResults = function() {
		return Spotify.albumSearch;
	}

	$scope.trackSearch = function() {
		return Spotify.trackSearch;
	}

	//Gets the artists in search
	$scope.searchArtist = function(input) {
		Spotify.searchWord = input;
		Spotify.Artist.get({name:input}, function(output) {
			$scope.artistResult = output.artists.items;
			Spotify.artistSearch = output.artists.items;
		});
	}

	//Gets the tracks in search
	$scope.searchTracks = function(input) {
		Spotify.track.get({track:input}, function(output){
			$scope.trackResult = output.tracks.items;
			Spotify.trackSearch = output.tracks.items;
			Spotify.back = true;
			if ($scope.searchInput) { 
				$scope.resetSortSymbols();
			}
			$scope.searchInput = true;

		});
	}

	//Gets the albums in search
	$scope.searchAlbums = function(input) {
		Spotify.album.get({name:input}, function(output) {
			$scope.albumResult = output.albums.items;
			Spotify.albumSearch = output.albums.items;
		});
	}

	$scope.getAlbums = function() {
		return Spotify.ArtistAlbums;
	}

	$scope.getArtistName = function() {
		return Spotify.artistName;
	}

	//Returns the songs from a specifik album
	$scope.getAlbum = function(id) {
		Spotify.artistAlbum.get({
			id:id}, function(output) {
				$scope.ArtistAlbums = output.items;
				Spotify.ArtistAlbums = output.items;
				//$scope.artist = output.items[0].artists[0].name;
				
		});
	}

	//resets the sort arrows
	$scope.resetSortSymbols = function() {
		for (i=0; i < 4; i++) {
			var symbol = document.getElementById("sort" + i);
			symbol.className = "hej";
		}
	}

	//sorterar låtarna i bokstavsordning
	$scope.sortTracks = function() {
		$scope.resetSortSymbols();
		var test = Spotify.trackSort;
		$scope.trackResult = Spotify.trackSearch;
		if (test == true) {
			$scope.trackResult.sort(function(a, b){
			    var x = a.name.toLowerCase();
			    var y = b.name.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;});
				Spotify.trackSort = false;
				var symbol = document.getElementById("sort0");
				symbol.className = "glyphicon glyphicon-triangle-top"
		}
		else {
			$scope.trackResult.sort(function(a, b){
			    var x = a.name.toLowerCase();
			    var y = b.name.toLowerCase();
			    if (x > y) {return -1;}
			    if (x < y) {return 1;}
			    return 0;});
				Spotify.trackSort = true;
				var symbol = document.getElementById("sort0");
				symbol.className = "glyphicon glyphicon-triangle-bottom"
				
		}

		Spotify.trackSearch = $scope.trackResult;
	}

	//sorterar artisterna i bokstavsordning
	$scope.sortArtist = function() {
		$scope.resetSortSymbols();
		var test = Spotify.artistSort;
		$scope.trackResult = Spotify.trackSearch;
		if (test == true) {
			$scope.trackResult.sort(function(a, b){
			    var x = a.artists[0].name.toLowerCase();
			    var y = b.artists[0].name.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;});
				Spotify.artistSort = false;
				var symbol = document.getElementById("sort1");
				symbol.className = "glyphicon glyphicon-triangle-top"
		}
		else {
			$scope.trackResult.sort(function(a, b){
			    var x = a.artists[0].name.toLowerCase();
			    var y = b.artists[0].name.toLowerCase();
			    if (x > y) {return -1;}
			    if (x < y) {return 1;}
			    return 0;});
			Spotify.artistSort = true;
			var symbol = document.getElementById("sort1");
			symbol.className = "glyphicon glyphicon-triangle-bottom"

		}
		Spotify.trackSearch = $scope.trackResult;
	}

	//sorterar albumen i bokstavsordning
	$scope.sortAlbum = function() {
		$scope.resetSortSymbols();
		var test = Spotify.albumSort;
		$scope.trackResult = Spotify.trackSearch;
		if (test == true) {
			$scope.trackResult.sort(function(a, b){
			    var x = a.album.name.toLowerCase();
			    var y = b.album.name.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;});
				Spotify.albumSort = false;
				var symbol = document.getElementById("sort2");
				symbol.className = "glyphicon glyphicon-triangle-top"
		}
		else {
			$scope.trackResult.sort(function(a, b){
			    var x = a.album.name.toLowerCase();
			    var y = b.album.name.toLowerCase();
			    if (x > y) {return -1;}
			    if (x < y) {return 1;}
			    return 0;});
			Spotify.albumSort = true;
			var symbol = document.getElementById("sort2");
			symbol.className = "glyphicon glyphicon-triangle-bottom"
		}
		Spotify.trackSearch = $scope.trackResult;
	}

	//sorterar efter popularitet
	$scope.popularitySort = function() {
		$scope.resetSortSymbols();
		var test = Spotify.popSort;
		$scope.trackResult = Spotify.trackSearch;
		if (test==true){
		$scope.trackResult.sort(function(a, b){return b.popularity - a.popularity});
		Spotify.popSort=false;
		var symbol = document.getElementById("sort3");
		symbol.className = "glyphicon glyphicon-triangle-top"

		}
		else {
			$scope.trackResult.sort(function(a, b){return a.popularity - b.popularity});
			Spotify.popSort=true;
			var symbol = document.getElementById("sort3");
				symbol.className = "glyphicon glyphicon-triangle-bottom"
		}
		Spotify.trackSearch = $scope.trackResult;
	}

	$scope.getList = function() {
		return Spotify.getQueue();
	}

	//beräknar köns playtime
	$scope.totalRuntime = function() {
		var playlist = Spotify.getQueue();
		var runtime = Spotify.getPlaylistTime(playlist);
		return runtime;
	}

	//Fills in favorited songs in Search
	$scope.favoriteSongs = function(id) {
		var result = "glyphicon glyphicon-star-empty";
		var key = $rootScope.currentUser.favorite_songs;
		for (song in key) {
			if (key[song].favorites.id == id){
				result = "glyphicon glyphicon-star";
			}
		}
		return result;
	}

	//Adds and removes songs in profil
	$scope.favoriteSong = function(track) {
		var symbol = document.getElementById(track.id);
		var send = [];
		var key = $rootScope.currentUser.favorite_songs;
		for (favo in key) {
			if (key[favo].favorites.id == track.id){
				send = favo;
			}
		}
		if (symbol.className == "glyphicon glyphicon-star") {
			Authentication.deleteFavorite(send);
		}
		else {
			Authentication.favoriteSong(track);
		}
	}

	//Fills in favorited songs in Search
	$scope.friendStatus = function(id) {
		var result = "glyphicon glyphicon-plus";
		if ($rootScope.currentUser) {
			var key = $rootScope.currentUser.friends;

			for (friend in key) {
				if (key[friend].friend.id == id){
					result = "glyphicon glyphicon-minus";
				}
			}
		}
		return result;
	}

	//Adds and removes songs in profil
	$scope.addFriend = function(user) {
		var symbol = document.getElementById(user.id);
		var send = [];
		var key = $rootScope.currentUser.friends;
		for (friend in key) {
			if (key[friend].friend.id == user.id){
				send = friend;
			}
		}
		if (symbol.className == "glyphicon glyphicon-minus") {
			Authentication.deleteUserFromProfile(send);
		}
		else {
			Authentication.addUserToProfile(user);
		}
	}

	//Sends queued symbol in search
	$scope.queueSongs = function(id) {
		var result = "glyphicon glyphicon-plus";
		var key = Spotify.getQueue();
		for (song in key) {
			if (key[song].id == id){
				result = "glyphicon glyphicon-minus";
			}
		}
		return result;
	}

	//Queue Songs
	$scope.queueSong = function(song) {
		var symbol = document.getElementById("queque" + song.id);
		if (symbol.className == "glyphicon glyphicon-minus") {
			$scope.removeSong(song.id);
		}

		else {
			symbol.className = "glyphicon glyphicon-minus";
			Spotify.getTrackByID.get({id:song.id}, function(output){
				$rootScope.messageSaved=false;
				Spotify.addToPlaylist(output);
			})
			
		}		
	}

	//Removes song from the queue
	$scope.removeSong = function(id) {
		Spotify.removeSong(id);
		$scope.queueList = Spotify.getQueue();
	}
	
	//Resets the queue when queue is saved as new playlist
	$scope.resetQueue = function() {
		Spotify.resetPlaylist();
	}

	//shows the saving playlist icons
	$scope.saveFunction = function() {
		if ($scope.save) {
			$scope.save = false;
		}
		else {
			$scope.save = true;
		}
	}

	//Ändrar ordningen i kön
    $scope.changeOrder = function() {
    	var test = Spotify.getQueue();
    	var list = [];
    	for (i in test) {
    		var checkbox = document.getElementById('test'+i);
    		if (checkbox.checked) {
    			list.push(parseInt(checkbox.value));
    		}
    	}
    	if (list.length == 2){ 
	    	var items = $scope.queueList;
	    	var NewItems = [];
	    	var itemOne = test[list[0]];
	    	//$scope.items.splice(list[0],1);
	    	var itemTwo = test[list[1]];
	    	//$scope.items.splice(list[1],1);
	    	for (i in test) {
	    		if (list[0] == i) {
	    			NewItems.push(itemTwo);
	    		}
	    		else if (list[1] == i) {
	    			NewItems.push(itemOne);
	    		}
	    		else {
	    			NewItems.push(test[i])
	    		}

	    	}
	    	Spotify.queue=NewItems;
	    }
    }

    //resetsform
    $scope.resetCheckboxes = function() { 
	    var test = Spotify.getQueue();
	    var list = [];
    	for (i in test) {
    		var checkbox = document.getElementById('test'+i);
    		checkbox.checked=false;
    		$scope.changeDirection(i);
    	}
	}
	
	//Checks that only two boxes can be checked
	$scope.checkCheckboxes = function() {
		var test = Spotify.getQueue();
    	var list = [];
    	for (i in test) {
    		var checkbox = document.getElementById('test'+i);

    		if (list.length == 2) {
    			checkbox.checked = false;
    			$scope.changeDirection(i);	
    			
    			}
    		
    		else if (checkbox.checked == true) {
    			list.push(parseInt(checkbox.value));
    		}

    		if (list.length==2) {
    			if (list[0] > list[1]) {
    				var symbol = document.getElementById("direction"+list[1]);
    				symbol.className = "glyphicon glyphicon-arrow-down";
    				var symbolTwo = document.getElementById("direction"+list[0]);
    				symbolTwo.className = "glyphicon glyphicon-arrow-up";

    			}

    			else if (list[1] > list[0]) {
    				var symbol = document.getElementById("direction"+list[0]);
    				symbol.className = "glyphicon glyphicon-arrow-down";
    				var symbolTwo = document.getElementById("direction"+list[1]);
    				symbolTwo.className = "glyphicon glyphicon-arrow-up";

    			}
    		}
    		if (checkbox==false) {
    			var symbol = document.getElementById('direction'+i);
    			symbol.className="hej"
    		}
    	}
    }
	
	//Resets the symbol when unchecked
	$scope.changeDirection = function(index) {
		var symbol = document.getElementById("direction"+index);
		symbol.className = "hej";	
	}

	//Preview the songs in a new window
	$scope.player = function(url) {
    	var playern = $window.open(url,"","width=350,height=10");
    }

    //Retrives user Playlist
    $scope.getPlaylist = function(playlist, title) {
    	Spotify.userPlaylist = playlist;
    	Spotify.userPlaylistTitle = title;
    }

    //Retrives the title of the playlist
    $scope.getUserPlaylistTitle = function() {
    	return Spotify.userPlaylistTitle;
    }

    //Retrives the userPlaylist from the model
    $scope.getUserPlaylist = function() {
    	return Spotify.userPlaylist;
    } 
});