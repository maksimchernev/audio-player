import { useState } from "react";
import { isAudioUrlValid } from "../../functions/link-validation";

export const Form = ({setAudioUrl}) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        if (!isAudioUrlValid(event.target.elements.audioSrc.value)) {
            setError("Please enter a valid audio URL");
            setIsLoading(false)
            return;
        }
        const audio = new Audio()
        audio.crossOrigin = "anonymous"
        audio.src = event.target.elements.audioSrc.value
        const cleanUp = () => {
            audio.removeEventListener("canplay", handleCanPlay)
            audio.removeEventListener("error", handleError)
        }
        const handleCanPlay = () => {
            setAudioUrl(event.target.elements.audioSrc.value);
            setIsLoading(false)
            cleanUp()
        }
        const handleError = () => {
            setError("Audio file not found");
            setIsLoading(false)
            cleanUp()
        }
        audio.addEventListener("error", handleError);
        audio.addEventListener("canplay", handleCanPlay);    
    };
    return (
        <form onSubmit={handleSubmit} className='form'>
            <label className="form__label">
                Insert the link
            </label>
            <div className="form__input-wrapper">
                <input 
                    type="text" 
                    name="audioSrc" 
                    className="form__input" 
                    placeholder="https://"
                    disabled={isLoading}
                    />
                <button type="submit" className="form__button" disabled={isLoading}></button>
            </div>
            {error && <p className="form__error">{error}</p>}
        </form>
    )
}