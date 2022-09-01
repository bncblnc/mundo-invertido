let nowPlaying;
let pause = false;

export function playAudio(music) {
  if (nowPlaying) nowPlaying.pause();
  nowPlaying = music;

  if (pause) return;
  music.play();
  music.volume = 0.2;
}

export function audioControl(e) {
  const btn = e.target.closest('button');
  btn.classList.toggle('audio-on');
  btn.classList.toggle('audio-off');

  if (btn.classList.contains('audio-off')) {
    nowPlaying.pause();
    pause = true;
  } else {
    pause = false;
    playAudio(nowPlaying);
  }
}
