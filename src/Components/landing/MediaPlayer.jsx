import { useEffect, useRef, useState } from "react";
import { Play, Pause, Clock, Tag, Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "../../config/axios";

export default function MediaSection() {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [progress, setProgress] = useState(0);


  const [showControls, setShowControls] = useState(true);
  const hideTimeout = useRef(null);

  const videoRef = useRef(null);
 

  // FETCH
  useEffect(() => {
   fetchVideos();
  }, []);

useEffect(() => {
    console.log("VIDEO MOUNT");
}, []);

    useEffect(() => {
      return () => {
        if (hideTimeout.current) {
          clearTimeout(hideTimeout.current);
        }
      };
    }, []);

  const fetchVideos = async () => {
    try {
      const res = await axiosInstance.get("/video");
      const active = res.data.filter(v => v.status_video === "aktif");
      setVideos(active);
      setIndex(0);
    } catch (err) {
      console.error(err);
    }
  };

  const video = videos[index];

  // FORMAT TIME
  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // RESET PLAYER (INI PENTING)
  const resetPlayer = () => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime("00:00");
    setDuration("00:00");

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // CHANGE SLIDE
  const changeVideo = (newIndex) => {
    resetPlayer();
    setIndex(newIndex);
  };

  const nextVideo = () => {
    if (videos.length <= 1) return;
    changeVideo((index + 1) % videos.length);
  };

  const prevVideo = () => {
    if (videos.length <= 1) return;
    changeVideo((index - 1 + videos.length) % videos.length);
  };

  // PLAY / PAUSE (FIX)
      const toggle = async () => {
      const v = videoRef.current;
      if (!v) return;

      try {
        if (v.paused) {
          await v.play();
          setPlaying(true);

          showVideoControls();
        } else {
          v.pause();
          setPlaying(false);

          setShowControls(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

  // FULLSCREEN
  const handleFullscreen = () => {
    const v = videoRef.current;
    if (v?.requestFullscreen) v.requestFullscreen();
  };

  // UPDATE TIME
        const handleTimeUpdate = () => {
        const v = videoRef.current;

        if (!v) return;

        const percent = (v.currentTime / v.duration) * 100;

        setProgress(percent);

        setCurrentTime(formatTime(v.currentTime));
      };

  // LOAD META
  const handleLoadedMetadata = () => {
  const v = videoRef.current;

  if (!v) return;

  setDuration(formatTime(v.duration));

  setProgress((v.currentTime / v.duration) * 100);
  setCurrentTime(formatTime(v.currentTime));
};


const showVideoControls = () => {
  setShowControls(true);

  if (hideTimeout.current) {
    clearTimeout(hideTimeout.current);
  }

  if (playing) {
    hideTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  }
};

  

  // AUTO NEXT VIDEO
  const handleEnded = () => {
  setPlaying(false);
  setShowControls(true);
  nextVideo();
};

  if (!video) {
    return (
      <section className="py-24 text-center">
        <p>Tidak ada video aktif</p>
      </section>
    );
  }

  return (
    <section
        id="mediaplayer"
        className="py-24 bg-card scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">
            Video Pembelajaran
          </h2>
        </div>

        <div className="bg-black rounded-2xl p-4 relative">

          {/* VIDEO */}
          <div
              className="relative"
              onMouseMove={showVideoControls}
              onMouseEnter={showVideoControls}
              onMouseLeave={() => {
                if (playing) setShowControls(false);
              }}
            >

            <video
                      ref={videoRef}
                      preload="auto"
                                  
                       src={`${import.meta.env.VITE_API_URL}/video/stream/${video.file_video}`}
                       className="w-full rounded-xl"
                       onLoadedMetadata={() => {
                      const v = videoRef.current;

                      console.log("duration =", v.duration);
                      console.log("readyState =", v.readyState);
                      console.log("seekable length =", v.seekable.length);

                      if (v.seekable.length > 0) {
                          console.log(
                              "seekable:",
                              v.seekable.start(0),
                              v.seekable.end(0)
                          );
                      }

                      handleLoadedMetadata();
                  }}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onSeeking={() => console.log("SEEKING", videoRef.current.currentTime)}
                onSeeked={() => console.log("SEEKED", videoRef.current.currentTime)}
                onLoadedData={() => console.log("LOADED DATA")}
                onCanPlay={() => console.log("CAN PLAY")}
              />

            {/* PLAY */}
            
            <div
                className={`
                  absolute inset-0 flex items-center justify-center
                  transition-all duration-300 ease-in-out
                  ${
                    showControls
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90 pointer-events-none"
                  }
                `}
              >
                <button
                  onClick={toggle}
                  className="
                    bg-white/95 hover:bg-white
                    shadow-xl p-5 rounded-full
                    transition-all duration-300
                    hover:scale-110
                    active:scale-95
                  "
                >
                  {playing ? (
                    <Pause size={34} className="text-black" />
                  ) : (
                    <Play size={34} className="text-black ml-1" />
                  )}
                </button>
              </div>
                

            
            {/* FULLSCREEN */}
            <button
                onClick={handleFullscreen}
                className={`
                  absolute bottom-12 right-4
                  bg-white/90 hover:bg-white
                  p-2 rounded-full shadow-lg z-20
                  transition-all duration-300 ease-in-out
                  hover:scale-110
                  ${
                    showControls
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }
                `}
              >
                  <Maximize size={18} className="text-black" />
              </button>

            {/* SEEK BAR */}
              
                {/* SEEK BAR */}
                  <div
                    className={`
                      absolute bottom-0 left-0 w-full px-3 pb-2
                      transition-all duration-300 ease-in-out
                      ${
                        showControls
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }
                    `}
                  >
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={progress}
                      onMouseDown={() => {
                        if (videoRef.current) {
                          videoRef.current.pause();
                        }
                      }}
                      onChange={(e) => {
                        const v = videoRef.current;
                        if (!v) return;

                        const value = Number(e.target.value);
                        const newTime = (value / 100) * v.duration;

                        v.currentTime = newTime;

                        // Update UI langsung
                        setProgress(value);
                        setCurrentTime(formatTime(newTime));
                      }}
                      onMouseUp={() => {
                        if (videoRef.current && playing) {
                          videoRef.current.play();
                        }
                      }}
                      className="
                        w-full
                        accent-red-500
                        cursor-pointer
                        transition-all
                        duration-300
                        hover:scale-[1.01]
                      "
                    />
                  </div>

            {/* SLIDER */}
            {videos.length > 1 && (
              <>
                <button
                  onClick={prevVideo}
                  className={`
                    absolute left-2 top-1/2 -translate-y-1/2
                    bg-white p-2 rounded-full shadow-lg
                    transition-all duration-300 ease-in-out
                    hover:scale-110
                    ${
                      showControls
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-3 pointer-events-none"
                    }
                  `}
              >
                  <ChevronLeft />
              </button>

                <button
                  onClick={nextVideo}
                  className={`
                    absolute right-2 top-1/2 -translate-y-1/2
                    bg-white p-2 rounded-full shadow-lg
                    transition-all duration-300 ease-in-out
                    hover:scale-110
                    ${
                      showControls
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-3 pointer-events-none"
                    }
                  `}
              >
                  <ChevronRight />
              </button>
              </>
            )}

          </div>

          {/* INFO */}
            <div className="text-white mt-4 space-y-3">

              {/* Durasi */}
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Clock size={16} />
                <span>{currentTime} / {duration}</span>
              </div>

              {/* Judul */}
              <h3 className="text-2xl font-bold leading-snug">
                {video.judul}
              </h3>

              {/* Deskripsi */}
              <p className="text-white/70 text-sm leading-relaxed">
                {video.deskripsi}
              </p>

            </div>

        </div>
      </div>
    </section>
  );
}