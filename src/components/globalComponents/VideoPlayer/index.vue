<template>
  <div class="video-player" :style="{ background }" @click="handleClickEvent">
    <video ref="videoRef" playsinline x5-playsinline x-webkit-airplay webkit-playsinline preload="auto"
      x5-video-orientation="portraint" :src="src" :poster="poster" :muted="isMuted" @timeupdate="videoTimeUpdate"
      @playing="playingEvent" @pause="pauseEvent" :style="{ height }">
      您的浏览器不支持video标签。
    </video>
    <!-- loading -->
    <div class="loading" v-show="isLoading">
      <img class="loading-svg" src="./svg/loading.svg" alt="" />
    </div>
    <!-- 首次进入视频中间的播放按钮 -->
    <div class="loading" v-if="isFirstEnter" @click="handlePlayOrPause">
      <img class="play-svg" src="./svg/play.svg" alt="" />
    </div>
    <div class="video-player-bar" :class="{ hidden: !videoBar }">
      <div class="video-controls">
        <div class="control-button" @click="handlePlayOrPause">
          <img v-if="!isPlay" src="./svg/play_icon.svg" alt="" />
          <img v-else src="./svg/pause_icon.svg" alt="" />
        </div>
        <div class="progress-wrapper">
          <div class="current-time">{{ format(CurrentTime) }}</div>
          <div class="progress-container">
            <div class="progress" ref="progressBarRef">
              <div class="buffered" :style="{ width: videoMetadata + '%' }"></div>
              <div ref="videoBallRef" class="video-ball" :style="{ left: playProgress + '%' }">
                <div class="slider"></div>
              </div>
              <div class="played" ref="playedBarRef" :style="{ width: playProgress + '%' }"></div>
            </div>
          </div>
          <div class="duration-time">{{ format(videoTime) }}</div>
        </div>
      </div>
      <div class="right-oper">
        <div class="muted-icon" @click="isMuted = !isMuted">
          <img class="muted-img" v-show="!isMuted" src="./svg/video_audio_on.svg" alt="" />
          <img class="muted-img" v-show="isMuted" src="./svg/video_audio_off.svg" alt="" />
        </div>
        <div class="fullscreen-icon" @click="fullScreen">
          <img src="./svg/fullscreen.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs, reactive } from "vue";
export default defineComponent({
  name: 'VideoPlayer',
  props: {
    src: {
      // 视频文件url，必传，支持网络地址 https 和相对地址 require('@/assets/files/Bao.mp4')
      type: String,
      required: true,
      default: "",
    },
    poster: {
      // 视频文件url，必传，支持网络地址 https 和相对地址 require('@/assets/files/Bao.mp4')
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "", // 背景色
    },
    height: {
      type: String,
      default: "", // 背景色
    },
  },
  setup() {
    const state = reactive({
      playProgress: 0,
      CurrentTime: 0,
      videoTime: 0,
      videoRef: null,
      progressBarRef: null,
      playedBarRef: null,
      touch: [],
      videoMetadata: 0,
      isPlay: false,
      videoBar: false,
      hiddenBarTimer: "",
      isLoading: false, //
      isMuted: false, // 是否静音播放
      isFirstEnter: true, // 是否首次进入 用于首次进入显示 播放按钮
      videoBallRef: null
    });

    onMounted(() => {
      state.videoRef.load();
      document.addEventListener(
        "WeixinJSBridgeReady",
        () => {
          state.videoRef.load();
        },
        false
      );
      state.videoRef.addEventListener(
        "progress",
        () => {
          setTimeout(() => {
            let v = state.videoRef;
            let r = v.buffered;
            let total = v.duration;
            try {
              let end = r.end(0);
              state.videoTime = total;
              state.videoMetadata = (end / total) * 100;
            } catch (e) { }
          }, 100);
        },
        false
      );
      state.videoRef.addEventListener("seeked", () => {
        if (state.videoRef.readyState >= 2) {
          state.isLoading = false;
        }
      });
      state.videoRef.addEventListener("waiting", () => {
        state.isLoading = true;
      });
      document.addEventListener("fullscreenchange", (e) => {
        console.log(e.target.muted);
        if (checkIsFullScreen()) {
          console.log("进入全屏");
          state.isMuted = e.target.muted;
        } else {
          console.log("退出全屏");
          state.isMuted = e.target.muted;
        }
      });
      // 监听进度条拖拽事件
      state.videoBallRef?.addEventListener("touchstart", sliderStart, {
        passive: true,
      });
      state.videoBallRef?.addEventListener("touchmove", sliderMove, {
        passive: true,
      });
      state.videoBallRef?.addEventListener("touchend", sliderEnd, {
        passive: true,
      });
    });

    function checkIsFullScreen() {
      var isFullScreen =
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen;
      return isFullScreen == undefined ? false : isFullScreen;
    }

    function playingEvent() {
      state.isLoading = false;
      state.hiddenBarTimer = setTimeout(() => {
        state.videoBar = false;
      }, 5000);
    }

    function handleClickEvent() {
      if (!state.videoBar && !state.isFirstEnter) {
        state.videoBar = true;
        state.hiddenBarTimer = setTimeout(() => {
          state.videoBar = false;
        }, 5000);
      }
    }
    function pauseEvent() {
      clearTimeout(state.hiddenBarTimer);
      state.isPlay = false;
      state.videoBar = true;
    }
    function sliderStart(e) {
      //开始拖拽
      clearTimeout(state.hiddenBarTimer);
      state.videoRef.pause();
      state.isPlay = false;
      state.touch.initiated = true;
      state.touch.startX = e.touches[0].pageX;
      state.touch.left =
        state.playedBarRef.clientWidth /
        (state.progressBarRef.clientWidth / 100);
    }
    function sliderMove(e) {
      //拖拽中
      if (!state.touch.initiated) return;
      let oldX = e.touches[0].pageX - state.touch.startX;
      let slide = Math.min(
        Math.max(
          0,
          state.touch.left + oldX / (state.progressBarRef.clientWidth / 100)
        ),
        100
      );
      state.playProgress = slide;
      state.CurrentTime = (state.playProgress / 100) * state.videoTime;
    }

    function sliderEnd() {
      //拖拽完毕
      state.touch.initiated = false;
      state.videoRef.currentTime = (state.playProgress / 100) * state.videoTime;
      state.videoRef.play();
      state.isPlay = true;
    }
    function handlePlayOrPause() {
      state.isPlay = !state.isPlay;
      if (state.isPlay) {
        state.isFirstEnter = false;
        state.videoRef.play();
      } else {
        state.videoRef.pause();
      }
    }
    function videoTimeUpdate(e) {
      state.CurrentTime = e.target.currentTime;
      state.playProgress = (state.CurrentTime / state.videoTime) * 100;
    }
    function fullScreen() {
      let dom = state.videoRef;
      state.videoRef.play();
      state.isPlay = true;
      if (dom.requestFullscreen) {
        dom.requestFullscreen();
      } else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen();
      } else if (dom.webkitRequestFullscreen) {
        dom.webkitRequestFullscreen();
      } else if (dom.webkitEnterFullscreen) {
        // Safari for iOS
        dom.webkitEnterFullscreen();
      }
    }
    // 格式化时间
    function format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = zeroFill(interval % 60);
      return `${minute}:${second}`;
    }

    function zeroFill(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    }

    return {
      ...toRefs(state),
      checkIsFullScreen,
      playingEvent,
      handleClickEvent,
      pauseEvent,
      sliderStart,
      sliderMove,
      sliderEnd,
      handlePlayOrPause,
      videoTimeUpdate,
      format,
      zeroFill,
      fullScreen,
    };
  },
});
</script>
<style lang="less">
.video-player {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);

  video {
    width: 100%;
    height: 200px;
    display: block;
  }

  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 38px;
    height: 38px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);

    .loading-svg {
      animation: loading 1s steps(12, end) infinite;
    }
  }

  .video-player-bar {
    position: absolute;
    width: 100%;
    height: 34px;
    background: rgba(0, 0, 0, 0.5);
    padding: 0 10px;
    bottom: 0;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    &.hidden {
      bottom: -34px;
    }

    .video-controls {
      flex: 1;
      display: flex;
      align-items: center;

      .control-button {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }

      .progress-wrapper {
        flex: 1;
        display: flex;
        align-items: center;

        .current-time,
        .duration-time {
          width: 44px;
          font-size: 13px;
          color: #fff;
        }

        .duration-time {
          text-align: right;
        }

        .progress-container {
          flex: 1;

          .progress {
            position: relative;
            height: 2px;
            background: rgba(255, 255, 255, 0.4);

            .buffered {
              position: absolute;
              height: 2px;
              background: rgba(255, 255, 255, 0.6);
            }

            .video-ball {
              position: absolute;
              width: 24px;
              height: 24px;
              top: 50%;
              transform: translateY(-50%);
              z-index: 99;
              margin-left: -6px;
              display: flex;
              align-items: center;
              justify-content: flex-start;

              .slider {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                display: block;
                background: #fff;
              }
            }

            .played {
              position: absolute;
              height: 2px;
              background-color: #00bfc6;
            }
          }
        }
      }
    }

    .right-oper {
      // width: 80px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .muted-icon,
      .fullscreen-icon {
        margin-left: 8px;
      }

      .muted-icon {
        width: 20px;
        height: 20px;

        .muted-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}

@keyframes loading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>
