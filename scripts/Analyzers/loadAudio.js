function getPlaylist() {
  // load song
  loadJSON("scripts/soundtracks.json", function (data) {
    for (i = 0; i < data["tracks"].length; i++) {
      playlist.createSong(data["tracks"][i]);
    }
    console.log(playlist);
    playlist.loadSong();
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
  getTitle() {
    return this.title;
  }
  getArtist() {
    return this.artist;
  }
  getAlbum() {
    return this.album;
  }
  getFileName() {
    return this.fileName;
  }
  getCover() {
    return this.cover;
  }
}

class Playlist {
  constructor() {
    this.songs = {};
    this.head = 0;
    this.tail = 0;
    this.index = 0;
  }

  createSong(data) {
    var song = new Song(
      data["artist"],
      data["title"],
      data["album"],
      data["file name"],
      data["cover"]
    );
    this.add(song);
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

    mappedCover = [];
    particlesVisual = [];
  }

  get length() {
    return this.tail - this.head;
  }
  get isEmpty() {
    return this.length === 0;
  }
}
