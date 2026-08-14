import { useEffect, useState } from 'react'
import ejeLogo from '../assets/EJE_White.png'

const SLOGAN = 'Always Striving For Greatness'
const TYPE_SPEED_MS = 70
const NBSP = String.fromCharCode(160)

export default function Loader({ exiting = false }) {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= SLOGAN.length) {
        setTyped(SLOGAN.slice(0, i))
        i++
      } else {
        clearInterval(interval)
        setDone(true)
      }
    }, TYPE_SPEED_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        .app-loader {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100vh;
          background-color: #1f2029;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10%;
          z-index: 10000;
          opacity: 1;
          filter: blur(0);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .app-loader.exiting {
          opacity: 0;
          filter: blur(6px);
          pointer-events: none;
        }
        .app-loader.done {
          background-repeat: no-repeat;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: appLoaderGradient 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .app-loader__logo {
          width: 200px;
          height: 200px;
          opacity: 0;
          animation: appLoaderDrop 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .app-loader__slogan {
          font-family: 'Photograph Signature', cursive;
          font-size: 4rem;
          color: #dfded2;
        }
        .app-loader__slogan.shine {
          color: #fff;
          transition: color 0.5s ease;
        }
        .app-loader__char {
          display: inline-block;
          opacity: 0;
          animation: appLoaderCharIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes appLoaderDrop {
          0% { transform: translateY(-60%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes appLoaderCharIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes appLoaderGradient {
          0% { background: linear-gradient(320deg, #1f2029 99%, #2da2dd); }
          20% { background: linear-gradient(320deg, #1f2029 80%, #2da2dd); }
          40% { background: linear-gradient(320deg, #1f2029 60%, #2da2dd); }
          60% { background: linear-gradient(320deg, #1f2029 40%, #2da2dd); }
          80% { background: linear-gradient(320deg, #1f2029 20%, #2da2dd); }
          100% { background: linear-gradient(320deg, #1f2029 0%, #2da2dd); }
        }
        @media (max-width: 650px) {
          .app-loader__slogan { font-size: 3rem; }
        }
        @media (max-width: 485px) {
          .app-loader__logo { width: 150px; height: 150px; }
          .app-loader__slogan { font-size: 2.5rem; }
        }
        @media (max-width: 480px) {
          .app-loader__slogan { font-size: 2rem; }
        }
        @media (max-width: 320px) {
          .app-loader__logo { width: 120px; height: 120px; }
          .app-loader__slogan { font-size: 1.75rem; }
        }
      `}</style>
      <div className={`app-loader ${done ? 'done' : ''} ${exiting ? 'exiting' : ''}`}>
        <img src={ejeLogo} alt="ENSI Junior Entreprise" className="app-loader__logo" />
        <div className={`app-loader__slogan ${done ? 'shine' : ''}`}>
          {typed.split('').map((ch, i) => (
            <span key={i} className="app-loader__char">
              {ch === ' ' ? NBSP : ch}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
