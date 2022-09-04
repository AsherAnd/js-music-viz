// add playlist to queue list
function addQueue(song) {
  musicQueue.innerHTML += `
  <div class="col">
  <div class="d-flex align-items-center">
    <div class="flex-shrink-0">
      <img
        src="assets/music/image/${song.cover}"
        style="width: 64px; height: 64px"
        alt="Cover Image"
      />
    </div>
    <div class="flex-grow-1 mx-3">
      <div class="musicInfo" id="musicInfo">
        <p class="queueTitle">${song.title}</p>
        <p class="queueArtist">${song.artist}</p>
      </div>
    </div>
  </div>
</div><hr />`;
}

function getPlaylist() {
  // load song
  loadJSON("scripts/soundtracks.json", function (data) {
    for (i = 0; i < data["tracks"].length; i++) {
      var artist = data["tracks"][i]["artist"];
      var title = data["tracks"][i]["title"];
      var album = data["tracks"][i]["album"];
      var fileName = data["tracks"][i]["file name"];
      var cover = data["tracks"][i]["cover"];

      var song = new Song(artist, title, album, fileName, cover);
      playlist.add(song);
      addQueue(song);
    }
    console.log(playlist);

    playlist.loadSong();
    mappedCover = [];
    particlesVisual = [];
  });
}

class Song {
  constructor(artist, title, album, fileName, cover) {
    this.artist = artist;
    this.title = title;
    this.album = album;
    this.fileName = fileName;
    this.cover = cover;
  }
}

class Playlist {
  constructor() {
    this.songs = {};
    this.head = 0;
    this.tail = 0;
    this.index = 0;
  }

  add(song) {
    this.songs[this.tail] = song;
    this.tail++;
  }

  remove() {
    const song = this.songs[this.head];
    delete this.songs[this.head];
    this.head++;
    return song;
  }

  peek() {
    return this.songs[this.head];
  }

  loadSong() {
    title.innerText = this.songs[this.index].title;
    artist.innerText = this.songs[this.index].artist;
    audio.src = `assets/music/audio/${this.songs[this.index].fileName}`;
    cover.src = `assets/music/image/${this.songs[this.index].cover}`;
  }

  get length() {
    return this.tail - this.head;
  }
  get isEmpty() {
    return this.length === 0;
  }
}
