import { useState } from 'react'

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  skeletonClassName = '',
  fallbackClassName = '',
  fallbackLabel = 'Media EJE',
  loading = 'lazy',
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const normalizedSrc = typeof src === 'string' ? src.trim() : ''
  const isMissingSource = normalizedSrc.length === 0

  const shellClasses = ['image-shell', wrapperClassName].filter(Boolean).join(' ')
  const imageClasses = [
    className,
    'transition-opacity duration-500 ease-standard',
    isLoaded ? 'opacity-100' : 'opacity-0',
  ]
    .filter(Boolean)
    .join(' ')

  if (isMissingSource) {
    return (
      <div className={shellClasses}>
        <div className={['image-skeleton', skeletonClassName].filter(Boolean).join(' ')} aria-hidden="true" />
        <div
          className={['image-fallback', fallbackClassName].filter(Boolean).join(' ')}
          role="img"
          aria-label={`${alt || 'Image'} unavailable`}
        >
          {fallbackLabel}
        </div>
      </div>
    )
  }

  return (
    <div className={shellClasses}>
      {!isLoaded && !hasError && <div className={['image-skeleton', skeletonClassName].filter(Boolean).join(' ')} aria-hidden="true" />}

      {hasError ? (
        <div
          className={['image-fallback', fallbackClassName].filter(Boolean).join(' ')}
          role="img"
          aria-label={`${alt || 'Image'} unavailable`}
        >
          {fallbackLabel}
        </div>
      ) : (
        <img
          src={normalizedSrc}
          alt={alt}
          className={imageClasses}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
