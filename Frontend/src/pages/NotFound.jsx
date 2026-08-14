import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist or may have been moved." path="/404" />
      <p className="font-heading text-7xl font-extrabold text-eje-accent sm:text-8xl">404</p>
      <h1 className="mt-4 font-heading text-2xl font-extrabold text-eje-beige sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md font-body text-sm text-eje-beige/60 sm:text-base">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  )
}
