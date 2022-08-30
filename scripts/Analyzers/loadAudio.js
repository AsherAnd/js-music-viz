function getPlaylist() {
  // load song
  loadJSON("scripts/soundtracks.json", function (data) {
    playlist = data;
    // get availabe album covers for songs
    loadJSON("scripts/covers.json", function (coverData) {
      for (let i = 0; i < coverData.covers.length; i++) {
        covers.push(coverData.covers[i]["file name"]);
      }
      loadSong(playlist.tracks[songIndex]);
    });
  });
}

// locate song using properties
function loadSong(track) {
  title.innerText = track.title;
  artist.innerText = track.artist;
  audio.src = `../assets/music/audio/${track["file name"]}`;

  // remove special characters from album name
  var tempAlbum =
    track.album != null
      ? track.album.replace(/[\/\\#,+()$~%":*?<>{}]/g, "") + ".jpg"
      : null;

  // check if album cover exists
  if (tempAlbum != null && covers.includes(tempAlbum)) {
    cover.src = `../assets/music/image/${tempAlbum}`;
  } else {
    cover.src = `../assets/music/image/Unknown.png`;
  }

  mappedCover = [];
  particlesVisual = [];

  console.log(tempAlbum);
}
