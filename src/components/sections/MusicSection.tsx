import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MoonIcon from '../MoonIcon';

// Primary playlist (slow evenings)
const primaryPlaylist = [
  { title: "Blue", artist: "Yung Kai", src: "/audio/blue-yung-kai.mp3" },
  { title: "Kho Gaye Hum Kahan", artist: "Baar Baar Dekho", src: "/audio/kho-gaye-hum-kahan.mp3" },
  { title: "Someday Faraway", artist: "Labit", src: "/audio/someday-faraway.mp3" },
  { title: "Aas Paas Hai Khuda", artist: "Anjaana Anjaani", src: "/audio/aas-paas-hai-khuda.mp3" },
];

// Secondary playlist ("and if your nights feel incomplete")
const secondaryPlaylist = [
  { title: "Main Tumhara", artist: "Dil Bechara", src: "/audio/main-tumhara.mp3" },
  { title: "Tumse Hi Tumse", artist: "Anjaana Anjaani", src: "/audio/tumse-hi-tumse.mp3" },
  { title: "Pyaar Ke Is Khel Mein", artist: "Kishore Kumar", src: "/audio/pyaar-ke-is-khel-mein.mp3" },
  { title: "Until I Found You", artist: "Stephen Sanchez", src: "/audio/until-i-found-you.mp3" },
];

const MusicSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSecondary, setShowSecondary] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentPlaylist = showSecondary ? secondaryPlaylist : primaryPlaylist;


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrack < currentPlaylist.length - 1) {
        setCurrentTrack(prev => prev + 1);
      } else {
        setIsPlaying(false);
        setCurrentTrack(0);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, currentPlaylist.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentPlaylist[currentTrack].src;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack, currentPlaylist]);

  useEffect(() => {
    // Reset to first track when switching playlists
    setCurrentTrack(0);
    setIsPlaying(false);
    setCurrentTime(0);
  }, [showSecondary]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    setCurrentTrack(prev => (prev === 0 ? currentPlaylist.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentTrack(prev => (prev === currentPlaylist.length - 1 ? 0 : prev + 1));
  };

  const handleTrackClick = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    }, 100);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="min-h-[100dvh] py-16 sm:py-20 md:py-24 px-4 sm:px-6 flex items-center bg-gradient-to-b from-background via-secondary/20 to-background">
      <audio ref={audioRef} preload="none" />
      
      <div className="max-w-lg mx-auto w-full">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-foreground/80 mb-3 sm:mb-4">
          Only If You Want
        </h2>
        <p className="text-center text-muted-foreground text-sm sm:text-base mb-4 sm:mb-5">
          For slow evenings
        </p>


        {/* Music Player */}
        <div className="bg-card-gradient rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-card border border-border/30 backdrop-blur-sm">
          {/* Album Art / Moon */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-lavender-light to-blush flex items-center justify-center shadow-glow">
              <MoonIcon size={45} className="sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px]" glowing={isPlaying} />
              {isPlaying && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute inset-2 rounded-full border border-primary/20 animate-pulse-soft" />
                </>
              )}
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-1">
              {currentPlaylist[currentTrack].title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {currentPlaylist[currentTrack].artist}
            </p>
          </div>

          {/* Progress Bar - Seekable */}
          <div className="mb-5 sm:mb-6">
            <div 
              className="relative h-2 sm:h-2.5 bg-accent rounded-full overflow-hidden cursor-pointer group"
              onClick={(e) => {
                const audio = audioRef.current;
                if (!audio) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = Math.max(0, Math.min(1, clickX / rect.width));
                const seekTime = percentage * (duration || audio.duration || 0);
                if (seekTime > 0) {
                  audio.currentTime = seekTime;
                  setCurrentTime(seekTime);
                }
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-primary to-lavender-light rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
              {/* Seek indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
            <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={handlePrev}
              className="p-2.5 sm:p-3 rounded-full hover:bg-accent transition-colors touch-target active:scale-95"
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/70" />
            </button>

            <button
              onClick={togglePlay}
              className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105 active:scale-95 touch-target"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-2.5 sm:p-3 rounded-full hover:bg-accent transition-colors touch-target active:scale-95"
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/70" />
            </button>
          </div>

          {/* Volume - Functional */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-6">
            <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.7"
              onChange={(e) => {
                const audio = audioRef.current;
                if (audio) {
                  audio.volume = parseFloat(e.target.value);
                }
              }}
              className="w-20 sm:w-24 h-1.5 bg-accent rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
            />
          </div>
        </div>

        {/* Toggle Button - Now below player, above playlist */}
        <div className="flex justify-center my-6 sm:my-8">
          <Button
            variant="ghost"
            onClick={() => setShowSecondary(!showSecondary)}
            className="group px-5 py-2.5 h-auto rounded-full border-2 border-primary/40 bg-primary/5 hover:border-primary/60 hover:bg-primary/10 shadow-soft hover:shadow-glow transition-all duration-500"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
              {showSecondary ? 'back to evenings' : 'and if your nights feel incomplete'}
            </span>
          </Button>
        </div>

        {/* Playlist */}
        <div className="mt-6 sm:mt-8 space-y-1.5 sm:space-y-2">
          {currentPlaylist.map((track, index) => (
            <button
              key={track.title}
              onClick={() => handleTrackClick(index)}
              className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 touch-target active:scale-[0.98] ${
                index === currentTrack
                  ? 'bg-accent/70 shadow-soft'
                  : 'hover:bg-accent/40'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                  index === currentTrack ? 'bg-primary/20' : 'bg-accent'
                }`}>
                  {index === currentTrack && isPlaying ? (
                    <div className="flex gap-0.5">
                      <span className="w-0.5 h-2 sm:h-3 bg-primary rounded-full animate-pulse" />
                      <span className="w-0.5 h-1.5 sm:h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                      <span className="w-0.5 h-2.5 sm:h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    </div>
                  ) : (
                    <span className="text-[10px] sm:text-xs text-muted-foreground">{index + 1}</span>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-medium text-foreground">{track.title}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{track.artist}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
