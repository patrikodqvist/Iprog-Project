queueKle.controller('artistCtrl', function($scope, Spotify, $routeParams) {
	Spotify.albumCtrl=false;
	//Checks that the page is loaded once
	if (Spotify.artistCtrl == false) {
		var name = $routeParams
		
		//retrives artist
		Spotify.getArtist.get({
			id:name.id}, function(output) {
				console.log(output);
				$scope.artist = output.name
				$scope.artistImg = output.images[0].url;
				if (output.genres.length > 0 ) {
					$scope.genres = output.genres;
				}
				else {
					$scope.genres = ["not given"];
				}
			}
		);
		//retrives the artist albums
		Spotify.artistAlbum.get({
			id:name.id}, function(output) {
				$scope.albumResult = output.items;
		});
		Spotify.artistAlbumSingles.get({
			id:name.id}, function(output) {
				$scope.albumResultSingles = output.items;
		});


		//retrives top tracks
		Spotify.topTracks.get({id:name.id}, function(output){
			$scope.topTracks = output.tracks
		});
		//Returns the right index for the songs
		$scope.getRowIndex = function(index) {
			var result = index +1;
			result = result+". "
			return result
		}

	Spotify.artistCtrl = true;
	}
	}
);

