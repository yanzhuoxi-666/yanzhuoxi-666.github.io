// ======================
// 歌曲列表
// ======================

const songs = [

    {

        title: "第一首",

        artist: "忘了",

        audio: "audio/1.mp3",

        cover: "cover/10.png",
        
        lyric: "lyric/1.lrc"
    },

    {

        title: "第二首",

        artist: "你的名字",

        audio: "audio/song2.mp3",

        cover: "cover/song2.jpg"
      

    }

];

// ======================
// 获取元素
// ======================

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");

const currentTimeText = document.getElementById("current");

const durationText = document.getElementById("duration");

const cover = document.getElementById("cover");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const lyricBox = document.getElementById("lyric");

let lyricData = [];

const playBtn = document.getElementById("play");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");

// ======================

let current = 0;

let playing = false;

async function loadLyric(path){

    lyricBox.innerHTML = "歌词加载中...";

    lyricData = [];

    try{

        const text = await fetch(path).then(r=>r.text());

        const lines = text.split("\n");

        let html = "";

        lines.forEach(line=>{

            const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);

            if(match){

                const time =
                    parseInt(match[1])*60 +
                    parseFloat(match[2]);

                const text = match[3];

                lyricData.push({

                    time,

                    text

                });

            }

        });

        lyricData.forEach(item=>{

            html += `<p>${item.text}</p>`;

        });

        lyricBox.innerHTML = html;

    }catch(e){

        lyricBox.innerHTML="暂无歌词";

    }

}
// ======================
// 加载歌曲
// ======================

function loadSong(index){

    const song = songs[index];

    title.textContent = song.title;

    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.audio;

    loadLyric(song.lyric);

    progress.value = 0;

}


loadSong(current);
// ======================
// 播放暂停
// ======================

playBtn.onclick = ()=>{

    if(playing){

        audio.pause();

    }else{

        audio.play();

    }

}

// ======================

audio.onplay = ()=>{

    playing=true;

    playBtn.innerHTML="⏸";

    cover.classList.add("playing");

}

audio.onpause = ()=>{

    playing=false;

    playBtn.innerHTML="▶";

    cover.classList.remove("playing");

}
// ======================
// 上一首
// ======================

prevBtn.onclick=()=>{

    current--;

    if(current<0){

        current=songs.length-1;

    }

    loadSong(current);

    audio.play();

}

// ======================
// 下一首
// ======================

nextBtn.onclick=()=>{

    current++;

    if(current>=songs.length){

        current=0;

    }

    loadSong(current);

    audio.play();

}
// ======================
// 自动下一首
// ======================

audio.onended=()=>{

    nextBtn.click();

}
// ======================
// 时间格式化
// ======================

function formatTime(time){

    if(isNaN(time)) return "00:00";

    const min = Math.floor(time / 60);

    const sec = Math.floor(time % 60);

    return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}

// ======================
// 更新进度条
// ======================

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value = audio.currentTime / audio.duration * 100;

        currentTimeText.textContent = formatTime(audio.currentTime);

        durationText.textContent = formatTime(audio.duration);

    }

});
progress.addEventListener("input",()=>{

    if(audio.duration){

        audio.currentTime = progress.value / 100 * audio.duration;

    }

});
audio.addEventListener("timeupdate",()=>{

    if(!lyricData.length) return;

    const ps = lyricBox.querySelectorAll("p");

    for(let i=0;i<lyricData.length;i++){

        if(

            audio.currentTime>=lyricData[i].time &&

            (

                i==lyricData.length-1 ||

                audio.currentTime<lyricData[i+1].time

            )

        ){

            ps.forEach(p=>p.classList.remove("active"));

            ps[i].classList.add("active");

            ps[i].scrollIntoView({

                behavior:"smooth",

                block:"center"

            });

            break;

        }

    }

});