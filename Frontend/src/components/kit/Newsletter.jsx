import { useState } from 'react'
import { Send } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!email || !email.includes('@')) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="relative bg-[#1a1d2e] px-6 py-24 sm:px-12 lg:px-32 border-t border-eje-beige/10">
      <div className="mx-auto max-w-3xl text-center">

        {/* Title */}
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-eje-beige sm:text-5xl">
          Join our community!
        </h2>

        {/* Subtitle */}
        <p className="mt-4 font-body text-base leading-relaxed text-eje-beige/60">
            Subscribe to our annual newsletter to receive<br className="hidden sm:block" />
            the latest news and exclusive offers.
        </p>

        {/* Input row */}
        {!submitted ? (
          <div className="mt-10 flex items-center overflow-hidden rounded-full border border-eje-beige/10 bg-eje-beige/5 px-2 pl-6 backdrop-blur-sm focus-within:border-eje-accent/40 transition-all duration-300">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="votre.email@example.com"
              className="flex-1 bg-transparent py-4 font-body text-sm text-eje-beige placeholder-eje-beige/30 outline-none"
            />
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-full bg-eje-accent px-6 py-3 font-heading text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(46,163,221,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-4px_rgba(46,163,221,0.8)] active:scale-95"
            >
              Subscribe
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <div className="mt-10 rounded-full border border-eje-accent/30 bg-eje-accent/10 px-8 py-4 font-body text-sm font-semibold text-eje-accent">
            ✓ Thank you! You have successfully subscribed to our newsletter.
          </div>
        )}

      </div>
    </section>
  )
}
