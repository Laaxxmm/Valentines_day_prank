import { useState, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import videoFile from './assets/vid.mp4'
import bgMusic from './assets/bgmusic.mp3'
import heartImg from './assets/valentine-heart.png'
import './App.css'

function App() {
  const [noPressed, setNoPressed] = useState(false);
  const [showValentine, setShowValentine] = useState(false);
  const [yesBtnPosition, setYesBtnPosition] = useState({});
  const audioRef = useRef(null);

  // Floating hearts generation
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate initial hearts
    const newHearts = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDuration: Math.random() * 10 + 10 + 's',
      delay: Math.random() * 10 + 's',
      size: Math.random() * 20 + 10 + 'px'
    }));
    setHearts(newHearts);
  }, []);

  const moveYesButton = () => {
    const x = Math.random() * 200 - 100; // Increased range: -100 to 100
    const y = Math.random() * 200 - 100; // Increased range: -100 to 100

    setYesBtnPosition({
      transform: `translate(${x}px, ${y}px)`,
      transition: 'all 0.2s ease'
    });
  };



  const [yesHoverCount, setYesHoverCount] = useState(0);

  const handleYesHover = () => {
    moveYesButton();
    setYesHoverCount(prev => prev + 1);
  };

  const handleNoClick = () => {
    setNoPressed(true);
  };

  const handleVideoEnd = () => {
    setShowValentine(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (noPressed && !showValentine) {
      const colors = ['#ff69b4', '#ffd700', '#00bfff', '#32cd32'];
      const interval = setInterval(function () {
        confetti({
          particleCount: 5,
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: colors,
          shapes: ['square'],
          scalar: 1.2,
          gravity: 0.6,
          ticks: 600,
          zIndex: 0,
          disableForReducedMotion: true
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [noPressed, showValentine]);

  useEffect(() => {
    if (showValentine) {
      const colors = ['#ff69b4', '#ff1493', '#ff6b9d', '#e84393', '#ffd700'];
      const interval = setInterval(function () {
        confetti({
          particleCount: 3,
          startVelocity: 20,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: colors,
          shapes: ['circle'],
          scalar: 0.8,
          gravity: 0.4,
          ticks: 800,
          zIndex: 0,
          disableForReducedMotion: true
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [showValentine]);

  return (
    <div className="container">
      <audio ref={audioRef} src={bgMusic} loop />

      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: heart.left,
              animationDuration: heart.animationDuration,
              animationDelay: heart.delay,
              fontSize: heart.size
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {showValentine ? (
        <div className="card valentine-final">
          <div className="heart-glow-wrapper">
            <img src={heartImg} alt="Heart" className="valentine-heart-img" />
          </div>
          <h1 className="valentine-title">Happy Valentine&#39;s Day</h1>
          <h2 className="valentine-name">Manimhegalai</h2>
          <div className="sparkle-container">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="sparkle"
                style={{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 3 + 's',
                  animationDuration: Math.random() * 2 + 1.5 + 's'
                }}
              />
            ))}
          </div>
        </div>
      ) : noPressed ? (
        <div className="card success-container">
          <h1 className="success-title">April Fool!!! 😂🤣</h1>
          <h3 className="subtext">Indha twist epadi iruku 🤣</h3>
          <video
            className="success-video"
            controls
            autoPlay
            playsInline
            src={videoFile}
            onEnded={handleVideoEnd}
            style={{ width: '800px', maxWidth: '100%', borderRadius: '16px', marginTop: '20px' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="card">
          <h1 className="title">
            <span className="highlight">Manimhegalai,</span>
            Will you be my Valentine? 💖💞
          </h1>

          <p className="subtext">Choose wisely. (The &quot;Yes&quot; button is... playing hard to get.)</p>

          <div className="btn-group">
            <button
              className="btn yes-btn"
              style={yesBtnPosition}
              onMouseEnter={handleYesHover}
              onClick={handleYesHover}
            >
              YES
            </button>

            <button
              className="btn no-btn"
              onClick={handleNoClick}
            >
              NO
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
