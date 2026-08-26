import { useCallback, useEffect, useRef, useState } from 'react'
import { CloseIcon } from './Icons.jsx'

// A browser-canvas port of github.com/ptetalicoder/alien_invasion (Python + Pygame).
// Fixed logical coordinate space; the canvas element is scaled with CSS so the
// game plays the same on a phone as it does on a desktop.
const LOGICAL_W = 640
const LOGICAL_H = 480
const SHIP_W = 34
const SHIP_H = 18
const BULLET_W = 3
const BULLET_H = 12
const BULLETS_ALLOWED = 3
const STARTING_LIVES = 3
const ALIEN_CELL = 3
const ALIEN_W = 11 * ALIEN_CELL
const ALIEN_H = 8 * ALIEN_CELL
const COLUMNS = 8
const ROWS = 5
const SPEEDUP_SCALE = 1.1
const SCORE_SCALE = 1.5
const EDGE_MARGIN = 10
const HIGH_SCORE_KEY = 'alienInvasionHighScore'

// Classic invader glyph, 11 columns x 8 rows.
const ALIEN_BITMAP = [
  '00100000100',
  '00010001000',
  '00111111100',
  '01101110110',
  '11111111111',
  '10111111101',
  '10100000101',
  '00011011000',
]

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function createFleet() {
  const aliens = []
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      aliens.push({
        x: ALIEN_W + col * 2 * ALIEN_W,
        y: ALIEN_H + row * 2 * ALIEN_H,
        w: ALIEN_W,
        h: ALIEN_H,
        alive: true,
      })
    }
  }
  return aliens
}

function createInitialState() {
  return {
    ship: { x: (LOGICAL_W - SHIP_W) / 2, y: LOGICAL_H - 40, w: SHIP_W, h: SHIP_H },
    bullets: [],
    aliens: createFleet(),
    fleetDirection: 1,
    shipSpeed: 260,
    bulletSpeed: 420,
    alienSpeed: 45,
    fleetDropSpeed: 18,
    alienPoints: 50,
    score: 0,
    level: 1,
    lives: STARTING_LIVES,
    hitPauseUntil: 0,
    stars: Array.from({ length: 60 }, () => ({
      x: Math.random() * LOGICAL_W,
      y: Math.random() * LOGICAL_H,
      r: Math.random() * 1.2 + 0.3,
      phase: Math.random() * Math.PI * 2,
    })),
  }
}

function readHighScore() {
  try {
    return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0
  } catch {
    return 0
  }
}

export default function AlienInvasionGame({ onClose }) {
  const canvasRef = useRef(null)
  const stateRef = useRef(createInitialState())
  const statusRef = useRef('ready')
  const keysRef = useRef({ left: false, right: false })
  const rafRef = useRef(0)
  const lastTimeRef = useRef(0)
  const pushedHudRef = useRef({ score: -1, level: -1, lives: -1 })

  const [status, setStatus] = useState('ready')
  const [hud, setHud] = useState({ score: 0, level: 1, lives: STARTING_LIVES })
  const [finalScore, setFinalScore] = useState(0)
  const [highScore, setHighScore] = useState(readHighScore)

  const fireBullet = useCallback(() => {
    if (statusRef.current !== 'playing') return
    const st = stateRef.current
    if (st.bullets.length >= BULLETS_ALLOWED) return
    st.bullets.push({
      x: st.ship.x + st.ship.w / 2 - BULLET_W / 2,
      y: st.ship.y,
      w: BULLET_W,
      h: BULLET_H,
    })
  }, [])

  const startGame = useCallback(() => {
    stateRef.current = createInitialState()
    pushedHudRef.current = { score: -1, level: -1, lives: -1 }
    statusRef.current = 'playing'
    setStatus('playing')
  }, [])

  const endGame = useCallback((score) => {
    statusRef.current = 'gameover'
    setStatus('gameover')
    setFinalScore(score)
    setHighScore((prev) => {
      const next = Math.max(prev, score)
      try {
        localStorage.setItem(HIGH_SCORE_KEY, String(next))
      } catch {
        // localStorage unavailable (private mode, etc.) — high score just won't persist.
      }
      return next
    })
  }, [])

  // Keyboard controls.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'Space', 'KeyA', 'KeyD'].includes(e.code)) {
        e.preventDefault()
      }
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') keysRef.current.left = true
      if (e.code === 'ArrowRight' || e.code === 'KeyD') keysRef.current.right = true
      if (e.code === 'Space') {
        if (statusRef.current === 'playing') fireBullet()
        else startGame()
      }
      if (e.code === 'Escape') onClose()
    }
    const onKeyUp = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') keysRef.current.left = false
      if (e.code === 'ArrowRight' || e.code === 'KeyD') keysRef.current.right = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [fireBullet, startGame, onClose])

  // Lock page scroll while the modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Main render/update loop.
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = LOGICAL_W * dpr
    canvas.height = LOGICAL_H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const update = (dt, now) => {
      const st = stateRef.current
      if (now < st.hitPauseUntil) return

      if (keysRef.current.left) st.ship.x -= st.shipSpeed * dt
      if (keysRef.current.right) st.ship.x += st.shipSpeed * dt
      st.ship.x = clamp(st.ship.x, 0, LOGICAL_W - st.ship.w)

      for (const b of st.bullets) b.y -= st.bulletSpeed * dt
      st.bullets = st.bullets.filter((b) => b.y + b.h > 0)

      for (const b of st.bullets) {
        for (const a of st.aliens) {
          if (a.alive && rectsOverlap(b, a)) {
            a.alive = false
            b.dead = true
            st.score += st.alienPoints
          }
        }
      }
      st.bullets = st.bullets.filter((b) => !b.dead)

      if (st.aliens.every((a) => !a.alive)) {
        st.level += 1
        st.alienSpeed *= SPEEDUP_SCALE
        st.bulletSpeed *= SPEEDUP_SCALE
        st.shipSpeed *= SPEEDUP_SCALE
        st.alienPoints = Math.floor(st.alienPoints * SCORE_SCALE)
        st.bullets = []
        st.aliens = createFleet()
        st.fleetDirection = 1
      }

      let hitEdge = false
      for (const a of st.aliens) {
        if (!a.alive) continue
        if (
          (a.x + a.w >= LOGICAL_W - EDGE_MARGIN && st.fleetDirection > 0) ||
          (a.x <= EDGE_MARGIN && st.fleetDirection < 0)
        ) {
          hitEdge = true
          break
        }
      }
      if (hitEdge) {
        for (const a of st.aliens) a.y += st.fleetDropSpeed
        st.fleetDirection *= -1
      }
      for (const a of st.aliens) {
        if (a.alive) a.x += st.alienSpeed * st.fleetDirection * dt
      }

      let shipHit = false
      for (const a of st.aliens) {
        if (!a.alive) continue
        if (rectsOverlap(a, st.ship) || a.y + a.h >= st.ship.y) {
          shipHit = true
          break
        }
      }
      if (shipHit) {
        st.lives -= 1
        if (st.lives <= 0) {
          endGame(st.score)
        } else {
          st.aliens = createFleet()
          st.bullets = []
          st.ship.x = (LOGICAL_W - SHIP_W) / 2
          st.hitPauseUntil = now + 500
        }
      }

      const pushed = pushedHudRef.current
      if (pushed.score !== st.score || pushed.level !== st.level || pushed.lives !== st.lives) {
        pushedHudRef.current = { score: st.score, level: st.level, lives: st.lives }
        setHud({ score: st.score, level: st.level, lives: Math.max(st.lives, 0) })
      }
    }

    const draw = (now) => {
      const st = stateRef.current
      ctx.fillStyle = '#05070f'
      ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H)

      ctx.fillStyle = '#ffffff'
      for (const star of st.stars) {
        const alpha = 0.35 + 0.35 * Math.sin(now / 900 + star.phase)
        ctx.globalAlpha = Math.max(alpha, 0.08)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (statusRef.current !== 'ready') {
        ctx.fillStyle = '#f472b6'
        for (const alien of st.aliens) {
          if (!alien.alive) continue
          for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 11; c++) {
              if (ALIEN_BITMAP[r][c] === '1') {
                ctx.fillRect(
                  alien.x + c * ALIEN_CELL,
                  alien.y + r * ALIEN_CELL,
                  ALIEN_CELL,
                  ALIEN_CELL,
                )
              }
            }
          }
        }

        ctx.fillStyle = '#fbbf24'
        for (const b of st.bullets) ctx.fillRect(b.x, b.y, b.w, b.h)

        ctx.fillStyle = '#5eead4'
        ctx.beginPath()
        ctx.moveTo(st.ship.x + st.ship.w / 2, st.ship.y)
        ctx.lineTo(st.ship.x + st.ship.w, st.ship.y + st.ship.h)
        ctx.lineTo(st.ship.x, st.ship.y + st.ship.h)
        ctx.closePath()
        ctx.fill()
      }
    }

    const loop = (now) => {
      const dt = Math.min((now - (lastTimeRef.current || now)) / 1000, 0.05)
      lastTimeRef.current = now
      if (statusRef.current === 'playing') update(dt, now)
      draw(now)
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [endGame])

  const handlePressStart = (dir) => () => {
    keysRef.current[dir] = true
  }
  const handlePressEnd = (dir) => () => {
    keysRef.current[dir] = false
  }

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-line bg-surface p-4 shadow-2xl sm:p-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Alien Invasion mini-game"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-4 font-mono text-xs text-muted sm:text-sm">
            <span>
              SCORE <b className="text-fg">{hud.score}</b>
            </span>
            <span>
              LEVEL <b className="text-fg">{hud.level}</b>
            </span>
            <span>
              LIVES <b className="text-fg">{hud.lives}</b>
            </span>
            <span>
              BEST <b className="text-accent">{highScore}</b>
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close game"
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-line">
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: 'auto', aspectRatio: `${LOGICAL_W} / ${LOGICAL_H}`, display: 'block' }}
          />

          {status !== 'playing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 px-6 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-white/60">
                {status === 'gameover' ? 'Game Over' : 'Alien Invasion'}
              </p>
              {status === 'gameover' && (
                <p className="text-sm text-white/80">
                  Final score <span className="font-semibold text-white">{finalScore}</span>
                </p>
              )}
              <button
                type="button"
                onClick={startGame}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
              >
                {status === 'gameover' ? 'Play again' : 'Play'}
              </button>
              <p className="hidden text-xs text-white/50 sm:block">
                Arrow keys / A·D to move, Space to fire, Esc to close
              </p>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 sm:hidden">
          <div className="flex gap-2">
            <button
              type="button"
              onPointerDown={handlePressStart('left')}
              onPointerUp={handlePressEnd('left')}
              onPointerLeave={handlePressEnd('left')}
              onPointerCancel={handlePressEnd('left')}
              style={{ touchAction: 'none' }}
              aria-label="Move left"
              className="grid h-11 w-14 place-items-center rounded-lg border border-line bg-surface-2 text-lg select-none"
            >
              ◀
            </button>
            <button
              type="button"
              onPointerDown={handlePressStart('right')}
              onPointerUp={handlePressEnd('right')}
              onPointerLeave={handlePressEnd('right')}
              onPointerCancel={handlePressEnd('right')}
              style={{ touchAction: 'none' }}
              aria-label="Move right"
              className="grid h-11 w-14 place-items-center rounded-lg border border-line bg-surface-2 text-lg select-none"
            >
              ▶
            </button>
          </div>
          <button
            type="button"
            onPointerDown={fireBullet}
            style={{ touchAction: 'none' }}
            aria-label="Fire"
            className="h-11 rounded-lg border border-line bg-surface-2 px-6 text-sm font-semibold text-accent select-none"
          >
            FIRE
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-muted">
          A canvas port of my{' '}
          <a
            href="https://github.com/ptetalicoder/alien_invasion"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            Alien Invasion
          </a>{' '}
          Python + Pygame project.
        </p>
      </div>
    </div>
  )
}
