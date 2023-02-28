import { useState } from "react"
import { Form } from "./components/Form/Form"
import { Player } from "./components/Player/Player"

function App() {
  const [audioUrl, setAudioUrl] = useState('')
  const back = () => {
    setAudioUrl('')
  }
  return (
  <>
      {!audioUrl  ? (       
          <Form setAudioUrl={setAudioUrl}/>
      ) : (
          <Player 
            audioUrl={audioUrl}
            back={back}
          />
      )}
  </>
);
}

export default App