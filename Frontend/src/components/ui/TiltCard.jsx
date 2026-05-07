import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const MAX_TILT = 15

export default function TiltCard({ children, className = '', contentClassName = '', ...props }) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const rawRotateX = useTransform(pointerY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT])
  const rawRotateY = useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT])

  const rotateX = useSpring(rawRotateX, { stiffness: 230, damping: 22, mass: 0.6 })
  const rotateY = useSpring(rawRotateY, { stiffness: 230, damping: 22, mass: 0.6 })

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5

    pointerX.set(relativeX)
    pointerY.set(relativeY)
  }

  const handleMouseLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  const classes = [
    'p-8 rounded-[10px] bg-white/5 border border-eje-beige/10 cursor-pointer relative',
    'hover:border-eje-accent/50 hover:bg-white/10 transition-colors duration-300',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const innerClasses = ['h-full', contentClassName].filter(Boolean).join(' ')

  return (
    <motion.div
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      <motion.div className={innerClasses} style={{ transform: 'translateZ(40px)' }}>
        {children}
      </motion.div>
    </motion.div>
  )
}