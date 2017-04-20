queueKle.controller('albumCtrl', function($scope, Spotify, $routeParams) {
	Spotify.artistCtrl = false;
	//if-statement checks whether the page has been loaded or not.
	if (Spotify.albumCtrl == false) {
		var name = $routeParams;
		Spotify.getAlbum.get({
			id:name.id}, function(output) {
				$scope.artistImg = output.images[0].url;
				$scope.artist = output.artists[0].name;
				$scope.artistId = output.artists[0].id;
				$scope.albumName = output.name;
				$scope.release = output.release_date;
				$scope.albumImg = output.images[1].url;
				$scope.albumTracks = output.tracks.items;
			}
		);
	}
	//Calculates the runtime of a song
	$scope.getTrackTime = function(duration) {
		var min = 0;
		var test = duration*0.001;
		var rest=true;
		while (rest==true) {
			if (test-60 > 0) {
				test = test-60;
				min +=1;
			} 
			else {
				test = Math.round(test)
				rest=false;
			}
		}
		if (test<10) {
			var result = min + ":0" + test;
		}
		else {
			var result = min + ":" + test;

		}
		return result
	}
})