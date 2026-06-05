import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const MAX_TILT = 12
const SPRING_CONFIG = { stiffness: 210, damping: 28, mass: 0.7 }

export default function TiltCard({ as = 'div', children, className = '', contentClassName = '', onMouseMove, onMouseLeave, ...props }) {
  const prefersReducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const rawRotateX = useTransform(pointerY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT])
  const rawRotateY = useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT])

  const rotateX = useSpring(rawRotateX, SPRING_CONFIG)
  const rotateY = useSpring(rawRotateY, SPRING_CONFIG)

  const MotionElement = motion[as] ?? motion.div

  const handleMouseMove = (event) => {
    if (typeof onMouseMove === 'function') {
      onMouseMove(event)
    }

    if (prefersReducedMotion) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5

    pointerX.set(relativeX)
    pointerY.set(relativeY)
  }

  const handleMouseLeave = () => {
    if (typeof onMouseLeave === 'function') {
      onMouseLeave()
    }

    pointerX.set(0)
    pointerY.set(0)
  }

  const classes = [
    'relative cursor-pointer rounded-[10px] border border-eje-beige/10 bg-white/5 p-8 will-change-transform',
    'hover:border-eje-accent/50 hover:bg-white/10 transition-colors duration-300',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const innerClasses = ['h-full', contentClassName].filter(Boolean).join(' ')

  return (
    <MotionElement
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1100,
            }
      }
      {...props}
    >
      <div className={innerClasses}>
        {children}
      </div>
    </MotionElement>
  )
}