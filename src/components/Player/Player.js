import { useEffect, useState } from "react";
import { formatTime } from "../../functions/time-formatting";
import { Range } from "./Range";

export const Player = ({audioUrl, back}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [audioDuration, setAudioDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [audioBuffer, setAudioBuffer] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        console.log('audioDuration', audioDuration)
    }, [audioDuration])
    useEffect(()=> {
        console.log('currentTime', currentTime)
    }, [currentTime])
    useEffect(() => {
        if (!audioUrl) {
            return;
        }
        const audio = new Audio()
        audio.crossOrigin = "anonymous"
        audio.src = audioUrl
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('canplay', handleCanPlay);

        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        const gainNode = context.createGain();
        source.connect(gainNode);
        gainNode.connect(context.destination);

        setAudioBuffer(audio)
        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('waiting', handleWaiting);
            audio.removeEventListener('canplay', handleCanPlay);
            context.close();
        };
      }, [audioUrl]);

    useEffect(() => {
        if (!audioBuffer) {
            return;
        }
        audioBuffer.volume = volume;
    }, [audioBuffer, volume]);
    
    useEffect(() => {
        if (!audioBuffer) {
            return;
        }
        if (isPlaying) {
            audioBuffer.play();
        } else {
            audioBuffer.pause();
        }
    }, [audioBuffer, isPlaying]);

    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime);
    };
    
    const handleLoadedMetadata = (event) => {
        setAudioDuration(event.target.duration);
    };
    const handleWaiting = () => {
        setLoading(true)
    }
    const handleCanPlay = () => {
        setLoading(false)
    }
    const handleCurrentTimeChange = (event) => {
        audioBuffer.currentTime = event.currentTarget.value
        setCurrentTime(event.currentTarget.value)
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (event) => {
        console.log('event', event.currentTarget.value)
        audioBuffer.volume = event.currentTarget.value
        setVolume(event.target.value);
    };

    return (
        <div className="player__content">
            <button className="player__back-button" onClick={back}>
                ← Back
            </button>
            <div className="player__box">
            {loading && <div className="loader"/> }
                <button className={`player__play-pause-button player__play-button 
                    ${isPlaying ? 'player__pause-button' : 'player__play-button'}`} 
                    onClick={handlePlayPause}
                    disabled={loading}>
                </button>
                <Range
                    classNames={'player__audio-progress'}
                    max={audioDuration}
                    step='1'
                    value={currentTime}
                    handler={handleCurrentTimeChange}
                />
                <div className="player__counter-volume-content">
                    <span className="player__counter-progress">{formatTime(currentTime)}</span>
                    <Range
                        classNames={'player__volume'}
                        max='1'
                        step='0.1'
                        value={volume}
                        handler={handleVolumeChange}
                    />
                </div>
            </div>
        </div>
    )
}