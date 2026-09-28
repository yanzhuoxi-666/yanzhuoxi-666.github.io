const songs = [
  {
    title: "Super Max",
    artist: "Max Verstappen",
    audio: "./audio/1.mp3",
    cover: "./cover/10.jpg"
  },
  {
    title: "Ferrari",
    artist: "Carlos Sainz",
    audio: "./audio/song2.mp3",
    cover: "./cover/song2.jpg"
  },
  {
    title: "Victory",
    artist: "Formula 1",
    audio: "./audio/song3.mp3",
    cover: "./cover/song3.jpg"
  }
];
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

let current = 0;

function loadSong(index) {
    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;

    cover.src = song.cover;
    audio.src = song.audio;
}

loadSong(0);