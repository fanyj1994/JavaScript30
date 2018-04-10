/* 获取元素  */
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
let isDrag = false

function togglePlay () {
  video.paused ? video.play() : video.pause()
}

function toggleButton () {
  let icon = video.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

function skip () {
  video.currentTime += parseFloat(this.dataset.skip)
}

function updateVolumeHandle () {
  video[this.name] = this.value
}

function progressHandle (e) {
  let percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function jump (e) {
  let playPostion = (e.offsetX / progress.offsetWidth) * video.duration
  console.log(typeof playPostion)
  video.currentTime = playPostion
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', toggleButton)
video.addEventListener('pause', toggleButton)
// 时间更新，更新进度条
video.addEventListener('timeupdate', progressHandle)
progress.addEventListener('click', jump)
progress.addEventListener('mousemove', (e) => {
  isDrag && jump(e)
})
progress.addEventListener('mousedown', () => isDrag = true)
progress.addEventListener('mouseup', () => isDrag = false)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', updateVolumeHandle))

