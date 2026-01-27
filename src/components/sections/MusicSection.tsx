import { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import MoonIcon from '../MoonIcon';

const playlist = [
  { title: "Soft Evening", artist: "Ambient Dreams", duration: "4:32" },
  { title: "Mountain Whispers", artist: "Nature Sounds", duration: "3:45" },
  { title: "Moonlit Path", artist: "Peaceful Piano", duration: "5:12" },
  { title: "Quiet Moments", artist: "Lo-fi Collection", duration: "3:28" },
];

const MusicSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  return (
    <section className="min-h-screen py-24 px-6 flex items-center bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground/80 mb-4">
          Only If You Want
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          For slow evenings
        </p>

        {/* Music Player */}
        <div className="bg-card-gradient rounded-3xl p-8 md:p-10 shadow-card border border-border/30 backdrop-blur-sm">
          {/* Album Art / Moon */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-lavender-light to-blush flex items-center justify-center shadow-glow">
              <MoonIcon size={60} glowing={isPlaying} />
              {isPlaying && (
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
              )}
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl text-foreground mb-1">
              {playlist[currentTrack].title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {playlist[currentTrack].artist}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-1 bg-accent rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-lavender-light rounded-full transition-all duration-300"
                style={{ width: isPlaying ? '35%' : '0%' }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{isPlaying ? '1:35' : '0:00'}</span>
              <span>{playlist[currentTrack].duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setCurrentTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1))}
              className="p-3 rounded-full hover:bg-accent transition-colors"
              aria-label="Previous track"
            >
              <SkipBack className="w-5 h-5 text-foreground/70" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-5 rounded-full bg-primary text-primary-foreground shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>

            <button
              onClick={() => setCurrentTrack((prev) => (prev === playlist.length - 1 ? 0 : prev + 1))}
              className="p-3 rounded-full hover:bg-accent transition-colors"
              aria-label="Next track"
            >
              <SkipForward className="w-5 h-5 text-foreground/70" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <div className="w-24 h-1 bg-accent rounded-full">
              <div className="w-16 h-full bg-primary/50 rounded-full" />
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="mt-8 space-y-2">
          {playlist.map((track, index) => (
            <button
              key={track.title}
              onClick={() => setCurrentTrack(index)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                index === currentTrack
                  ? 'bg-accent/70 shadow-soft'
                  : 'hover:bg-accent/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === currentTrack ? 'bg-primary/20' : 'bg-accent'
                }`}>
                  {index === currentTrack && isPlaying ? (
                    <div className="flex gap-0.5">
                      <span className="w-0.5 h-3 bg-primary rounded-full animate-pulse" />
                      <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                      <span className="w-0.5 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">{index + 1}</span>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{track.title}</p>
                  <p className="text-xs text-muted-foreground">{track.artist}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{track.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
