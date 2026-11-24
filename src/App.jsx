import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from './config.js'

const rnd = (a, b) => a + Math.random() * (b - a)

// ---------- sound (falls back to a soft synth tone if the mp3 is missing) ----------
function beep(f = 520) {
  try {
    const x = new (window.AudioContext || window.webkitAudioContext)()
    const o = x.createOscillator(), g = x.createGain()
    o.frequency.value = f; g.gain.value = 0.08
    o.connect(g); g.connect(x.destination); o.start()
    g.gain.exponentialRampToValueAtTime(0.0001, x.currentTime + 0.25); o.stop(x.currentTime + 0.3)
  } catch {}
}
const play = (src, f) => { try { const a = new Audio(src); a.onerror = () => beep(f); a.play().catch(() => beep(f)) } catch { beep(f) } }

// ---------- visual helpers ----------
function Ambient({ icons = ['💗', '🌸', '🦋', '💕'], n = 14 }) {
  const items = useMemo(() => Array.from({ length: n }, (_, i) => ({ i, l: rnd(0, 100), s: rnd(14, 30), d: rnd(9, 18), dl: rnd(0, 12), e: icons[i % icons.length] })), [n])
  const sp = useMemo(() => Array.from({ length: 16 }, () => ({ l: rnd(0, 100), t: rnd(0, 100), d: rnd(1, 4) })), [])
  return <>
    {items.map(o => <span key={o.i} className="fl" style={{ left: o.l + '%', fontSize: o.s, animationDuration: o.d + 's', animationDelay: -o.dl + 's', opacity: .7 }}>{o.e}</span>)}
    {sp.map((s, i) => <span key={i} className="spark" style={{ left: s.l + '%', top: s.t + '%', animationDelay: s.d + 's' }} />)}
  </>
}
function Petals() {
  const p = useMemo(() => Array.from({ length: 16 }, (_, i) => ({ i, l: rnd(0, 100), d: rnd(8, 16), dl: rnd(0, 10), e: i % 3 ? '🌹' : '🌸' })), [])
  return p.map(o => <span key={o.i} className="petal" style={{ left: o.l + '%', animationDuration: o.d + 's', animationDelay: -o.dl + 's', fontSize: 18, opacity: .8 }}>{o.e}</span>)
}
function Burst({ n = 50 }) {
  const items = useMemo(() => Array.from({ length: n }, (_, i) => ({ i, x: rnd(-160, 160), y: rnd(-460, -120), r: rnd(-200, 200), e: ['💗', '✨', '🎉', '🌸', '💖', '🎊'][i % 6], dl: rnd(0, .3) })), [n])
  return <div style={{ position: 'fixed', left: '50%', bottom: '35%', zIndex: 40, pointerEvents: 'none' }}>
    {items.map(o => <motion.span key={o.i} style={{ position: 'absolute', fontSize: 24 }} initial={{ x: 0, y: 0, opacity: 1, scale: .5 }}
      animate={{ x: o.x * 1.6, y: o.y, rotate: o.r, opacity: [1, 1, 0], scale: 1.2 }} transition={{ duration: 2.4, delay: o.dl, ease: 'easeOut' }}>{o.e}</motion.span>)}
  </div>
}
function Photo({ src, caption, i = 0 }) {
  const [bad, setBad] = useState(false)
  return <motion.figure className="pol" style={{ rotate: (i % 2 ? 2 : -2) + 'deg' }} initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} whileHover={{ scale: 1.04, rotate: 0 }}>
    {bad ? <div className="ph ph-fallback">{['🌸', '💗', '☕', '🦋', '✨'][i % 5]}</div> : <img className="ph" src={src} alt={caption} loading="lazy" onError={() => setBad(true)} />}
    <figcaption className="cap">{caption}</figcaption>
  </motion.figure>
}
const Btn = ({ children, onClick, alt, glow, style }) => <button className={`btn ${alt ? 'alt' : ''} ${glow ? 'glow' : ''}`} onClick={onClick} style={style}>{children}</button>
const turn = { initial: { opacity: 0, rotateY: -25, x: 60 }, animate: { opacity: 1, rotateY: 0, x: 0 }, exit: { opacity: 0, rotateY: 25, x: -60 }, transition: { duration: .6 } }

// ---------- pages ----------
function Cover({ next, startMusic }) {
  const [open, setOpen] = useState(false)
  const go = () => { startMusic(); setOpen(true); setTimeout(next, 2200) }
  return <div className="page"><Ambient /><div className="z">
    <h1 className="big">{C.cover.title}</h1>
    <p className="hand" style={{ fontSize: '1.6rem' }}>{C.cover.subtitle}</p>
    <div style={{ height: open ? 130 : 0, transition: 'height 1s' }} />
    <div className={`env ${open ? 'open' : ''}`}>
      <div className="letter">Dear {C.name}, ❤️</div>
      <div className="front" /><div className="ribbon" /><div className="flap" /><div className="seal">❤️</div>
    </div>
    <Btn glow onClick={go} style={{ marginTop: '1.5rem' }}>{C.cover.button}</Btn>
  </div></div>
}

function Memories({ next }) {
  const rail = useRef(null), paused = useRef(false), [end, setEnd] = useState(false)
  useEffect(() => {
    const t = setInterval(() => {
      const r = rail.current; if (!r || paused.current) return
      if (r.scrollLeft + r.clientWidth >= r.scrollWidth - 4) { setEnd(true); return }
      r.scrollBy({ left: 2, behavior: 'auto' })
    }, 16)
    return () => clearInterval(t)
  }, [])
  const by = d => { const r = rail.current; r.scrollBy({ left: d * (r.clientWidth * .7), behavior: 'smooth' }) }
  const hold = v => () => { paused.current = v }
  return <div className="page"><Ambient icons={['🌷', '💗', '🌼']} n={10} /><div className="z">
    <h2>{C.memories.title}</h2>
    <div className="rail" ref={rail} onPointerDown={hold(true)} onPointerUp={() => setTimeout(hold(false), 2500)} onMouseEnter={hold(true)} onMouseLeave={hold(false)}>
      {C.memories.photos.map((p, i) => <Photo key={i} i={i} {...p} />)}
    </div>
    <div><Btn alt onClick={() => by(-1)}>←</Btn> <Btn alt onClick={() => by(1)}>→</Btn></div>
    <p className="hand" style={{ fontSize: '1.6rem' }}>{C.memories.end}</p>
    {end && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><Btn glow onClick={next}>{C.memories.button}</Btn></motion.div>}
    {!end && <button onClick={next} style={{ background: 'none', border: 0, color: 'var(--coffee)', opacity: .6, textDecoration: 'underline', cursor: 'pointer' }}>skip ahead</button>}
  </div></div>
}

function Cheers({ next, sfx }) {
  const [pos, setPos] = useState({ x: 0, y: 0 }), [yes, setYes] = useState(false)
  const dodge = e => { e.preventDefault(); setPos({ x: rnd(-110, 110), y: rnd(-150, 90) }) }
  const onYes = () => { setYes(true); sfx.celebrate(); setTimeout(next, 3000) }
  return <div className="page"><Ambient n={18} /><div className="z">
    <h1 className="big">{C.cheers.title}</h1>
    <p style={{ fontSize: '1.2rem' }}>{C.cheers.text}</p>
    <h2>{C.cheers.question}</h2>
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', minHeight: 80 }}>
      <Btn glow onClick={onYes}>{C.cheers.yes}</Btn>
      <motion.button className="btn alt" animate={pos} transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        onMouseEnter={dodge} onTouchStart={dodge} onPointerDown={dodge} onClick={e => e.preventDefault()}>{C.cheers.no}</motion.button>
    </div>
    {yes && <Burst />}
  </div></div>
}

function Balloons({ next, sfx }) {
  const colors = ['#F4C2C2', '#E8D5C0', '#FFF5E8', '#E89AAE']
  const [popped, setPopped] = useState([]), [stage, setStage] = useState('a'), [cut, setCut] = useState(false), [fx, setFx] = useState(null)
  const pop = i => { if (popped.includes(i)) return; sfx.pop(); setFx(i + '-' + Date.now()); setPopped(p => [...p, i]) }
  const done = popped.length === 4
  const cutCake = () => { setCut(true); sfx.cut(); setTimeout(sfx.celebrate, 500) }
  if (stage === 'a') return <div className="page"><Ambient n={8} /><div className="z">
    <h2>{C.balloons.intro}</h2><p>{C.balloons.sub}</p>
    <div className="hand" style={{ fontSize: '2rem' }}>{popped.length}/4</div>
    <div style={{ display: 'flex', gap: '1.4rem', flexWrap: 'wrap', justifyContent: 'center', minHeight: 170 }}>
      {colors.map((c, i) => <AnimatePresence key={i}>{!popped.includes(i) && <motion.button className="balloon" aria-label="balloon" style={{ background: c, border: '1px solid #6f4e3733' }}
        animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2 + i * .4 }} exit={{ scale: 1.7, opacity: 0, transition: { duration: .2 } }} onClick={() => pop(i)} />}</AnimatePresence>)}
    </div>
    {fx && <Burst key={fx} n={14} />}
    {done && <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} className="z"><h1 className="big">{C.balloons.doneTitle}</h1><p>{C.balloons.doneText}</p><Btn glow onClick={() => setStage('b')}>{C.balloons.next}</Btn></motion.div>}
  </div></div>
  return <div className="page"><Ambient icons={['🎈', '💗', '✨']} n={10} /><div className="z">
    <h2>{C.cake.text}</h2>
    <div className="cake" style={{ height: 200 }}>
      {[0, 1].map(h => <motion.div key={h} className="half" style={{ clipPath: h ? 'inset(0 0 0 50%)' : 'inset(0 50% 0 0)' }} animate={cut ? { x: h ? 34 : -34, rotate: h ? 5 : -5 } : {}}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 5, width: 190, marginBottom: 4 }}>
          {Array.from({ length: 21 }, (_, i) => <span key={i} className={`cndl ${cut ? 'out' : ''}`}><i /></span>)}</div>
        <div className="lay" style={{ width: 150 }}>🍓 🍓 🍓</div><div className="lay" style={{ width: 200 }} /><div className="lay" style={{ width: 250 }} />
      </motion.div>)}
    </div>
    {!cut && <Btn glow onClick={cutCake}>{C.cake.button}</Btn>}
    {cut && <><Burst /><motion.h1 className="big" initial={{ scale: 0 }} animate={{ scale: 1 }}>{C.cake.done}</motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}><Btn onClick={next}>{C.cake.next}</Btn></motion.div></>}
  </div></div>
}

function Letter({ next }) {
  const L = C.letter
  return <div className="page top" style={{ background: 'radial-gradient(circle at 50% 0,#ffe9c4,#f6d6c4 45%,#e8c5b0)' }}><Ambient icons={['💗', '✨', '🌹']} n={14} /><Petals />
    <div className="z" style={{ paddingTop: '2rem' }}>
      <motion.h1 className="big" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>{L.title}</motion.h1>
      <motion.div className="letterbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }}>
        {L.body.map((t, i) => <p key={i}>{t}</p>)}<p className="hl">{L.highlight}</p>{L.after.map((t, i) => <p key={i}>{t}</p>)}
        <p style={{ whiteSpace: 'pre-line', textAlign: 'right' }}>{L.signoff}</p>
      </motion.div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.4rem', justifyContent: 'center', margin: '1rem 0' }}>{L.gallery.map((p, i) => <Photo key={i} i={i} {...p} />)}</div>
      <Btn glow onClick={next}>{L.next}</Btn>
    </div></div>
}

function Final({ replay, sfx }) {
  const F = C.final, [step, setStep] = useState('pre')
  useEffect(() => { const t = setTimeout(() => setStep('ask'), 3200); return () => clearTimeout(t) }, [])
  const yes = () => { setStep('yes'); sfx.celebrate() }
  return <div className="page" style={{ background: step === 'no' ? '#cdbfb2' : undefined, transition: 'background 1s' }}><Ambient icons={['💗', '🌹']} n={10} />{step === 'yes' && <><Petals /><Burst n={70} /></>}
    <div className="z"><AnimatePresence mode="wait">
      {step === 'pre' && <motion.p key="p" className="hand" style={{ fontSize: '2.2rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{F.pre}</motion.p>}
      {step === 'ask' && <motion.div key="a" className="z" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}><h1 className="big">{F.question}</h1>
        <div style={{ display: 'flex', gap: '1.4rem' }}><Btn glow onClick={yes}>{F.yes}</Btn><Btn alt onClick={() => setStep('no')}>{F.no}</Btn></div></motion.div>}
      {step === 'yes' && <motion.div key="y" className="z" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="roses">{['🌹', '🌷', '🌹', '🌸', '🌹', '🌷', '🌹'].map((r, i) => <motion.span key={i} initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: i * .45, type: 'spring' }}>{r}</motion.span>)}</div>
        <motion.h1 className="big" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>{F.yesTitle}</motion.h1>
        <motion.div className="letterbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }}>{F.yesText.map((t, i) => <p key={i}>{t}</p>)}</motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}><Btn alt onClick={replay}>{F.replay}</Btn></motion.div></motion.div>}
      {step === 'no' && <motion.div key="n" className="z" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div style={{ fontSize: '5rem' }} animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>🥺</motion.div>
        <h1 className="big">{F.noTitle}</h1><p className="hand" style={{ fontSize: '1.7rem', whiteSpace: 'pre-line' }}>{F.noText}</p>
        <Btn onClick={replay}>{F.replay}</Btn></motion.div>}
    </AnimatePresence></div></div>
}

// ---------- app ----------
export default function App() {
  const [page, setPage] = useState(0), [muted, setMuted] = useState(false), [run, setRun] = useState(0)
  const music = useRef(null)
  const next = useCallback(() => { setPage(p => p + 1); window.scrollTo(0, 0) }, [])
  const startMusic = () => {
    if (!music.current) { const a = new Audio(C.music); a.loop = true; a.volume = .4; music.current = a }
    music.current.muted = muted; music.current.play().catch(() => {})
  }
  const toggle = () => { setMuted(m => { if (music.current) music.current.muted = !m; return !m }) }
  const sfx = { pop: () => play(C.sounds.pop, 700), cut: () => play(C.sounds.cut, 300), celebrate: () => play(C.sounds.celebrate, 880) }
  const replay = () => { setRun(r => r + 1); setPage(0) }
  const pages = [<Cover next={next} startMusic={startMusic} />, <Memories next={next} />, <Cheers next={next} sfx={sfx} />, <Balloons next={next} sfx={sfx} />, <Letter next={next} />, <Final replay={replay} sfx={sfx} />]
  return <div style={{ perspective: 1200 }}>
    <button className="mute" onClick={toggle} aria-label="toggle music">{muted ? '🔇' : '🎵'}</button>
    <AnimatePresence mode="wait"><motion.div key={run + '-' + page} {...turn}>{pages[page]}</motion.div></AnimatePresence>
  </div>
}
