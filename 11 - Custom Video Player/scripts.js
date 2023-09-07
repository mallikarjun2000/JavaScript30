const videoPlayer = document.querySelector(".player__video");
const progressBar = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");
let isVideoPlaying = false;
const playButton = document.querySelector(".player__button");
const volumeScroller = document.querySelector("input[name='volume']");
const playBackRate = document.querySelector("input[name='playbackRate']");
const dataSkip = document.querySelectorAll(".player__button");

playButton.addEventListener("click", (e) => {
  if (isVideoPlaying) {
    videoPlayer.pause();
  } else {
    videoPlayer.play();
  }
  isVideoPlaying = !isVideoPlaying;
});

volumeScroller.addEventListener("change", changeEventHandler);
playBackRate.addEventListener("change", changeEventHandler);

function changeEventHandler(e) {
  videoPlayer[e.target.name] = e.target.value;
}

for (let skipButton of dataSkip) {
  skipButton.addEventListener("click", (e) => {
    videoPlayer.currentTime =
      Math.round(Number(videoPlayer.currentTime)) +
      Number(e.target.dataset.skip ? e.target.dataset.skip : 0);
  });
}

function handleProgress() {
  const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

videoPlayer.addEventListener("timeupdate", handleProgress);

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
  videoPlayer.currentTime = scrubTime;
}

window.addEventListener("keydown", (e) => {
  if (e.key === "f") {
    videoPlayer.requestFullscreen();
  }
});
