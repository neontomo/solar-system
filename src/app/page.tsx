'use client'
import Image from 'next/image'
import SolarSystem from './components/SolarSystem'
import { useState } from 'react'
import { useAudio } from './utils/audio'

const Home = () => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)
  const [audioUrl, setAudioUrl] = useState('none.mp3')

  useAudio(audioUrl)

  const changeAudio = (newUrl: string) => {
    setAudioUrl(newUrl)
  }

  if (typeof window === 'undefined') {
    return null
  }
  window.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
      case '1':
        changeAudio('/audio/sun.mp3')
        break
      case '2':
        changeAudio('/audio/mercury.mp3')
        break
      case '3':
        changeAudio('/audio/venus.mp3')
        break
      case '4':
        changeAudio('/audio/earth.mp3')
        break
      case '5':
        changeAudio('/audio/mars.mp3')
        break
      case '6':
        changeAudio('/audio/jupiter.mp3')
        break
      case '7':
        changeAudio('/audio/saturn.mp3')
        break
      case '8':
        changeAudio('/audio/uranus.mp3')
        break
      case '9':
        changeAudio('/audio/neptune.mp3')
        break
      case '0':
        changeAudio('/audio/pluto.mp3')
        break
    }
  })

  return (
    <div>
      {!hasLoaded && (
        <div
          className="w-screen h-screen flex justify-center items-center font-mono"
          onClick={() => {
            changeAudio('/audio/lets-begin.mp3')
            setHasLoaded(true)
          }}>
          Press anywhere to begin...
        </div>
      )}

      <SolarSystem hasLoaded={hasLoaded} />
      {hasLoaded && (
        <Image
          src="/space-ship.png?v=4"
          width={900}
          height={900}
          alt="Space Rocket"
          className="fixed bottom-0 left-0 z-10 w-screen"
        />
      )}
    </div>
  )
}

export default Home
