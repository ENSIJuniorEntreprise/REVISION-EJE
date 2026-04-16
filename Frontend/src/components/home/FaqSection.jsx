import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { faqs, sectionLinks } from './homeData'
import { getRevealProps, usePrefersReducedMotion } from './motionPresets'

export default function FaqSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="contact" className="scroll-mt-32 bg-eje-dark pb-24">
      <SectionHeading
        eyebrow="FAQ et newsletter"
        title={
          <>
            Questions frequentes, <span className="text-eje-accent">reponses claires</span>.
          </>
        }
        subtitle="Retrouvez les informations essentielles rapidement et recevez les actualites EJE en avant-premiere."
        links={sectionLinks.faq}
      />

      <div className="container grid grid-cols-1 gap-16 lg:grid-cols-2">
        <motion.div className="card-glass p-8" {...getRevealProps(0.08, reducedMotion)}>
          <h3 className="mb-4 text-3xl font-bold">Recevoir les actualites EJE</h3>
          <p className="mb-6 text-eje-beige/70">Une synthese concise de nos projets, evenements et opportunites de collaboration.</p>
          <form className="flex max-w-md gap-2" onSubmit={(event) => event.preventDefault()} aria-label="Inscription à la newsletter">
            <label htmlFor="newsletter-home-email" className="sr-only">
              Adresse email
            </label>
            <input
              id="newsletter-home-email"
              name="newsletterHomeEmail"
              type="email"
              placeholder="votre.email@example.com"
              autoComplete="email"
              className="flex-1 rounded-[10px] border border-eje-beige/25 bg-eje-dark/80 px-6 py-3 text-eje-beige placeholder:text-eje-beige/45 focus:border-eje-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eje-accent focus-visible:ring-offset-2 focus-visible:ring-offset-eje-dark"
            />
            <button type="submit" className="btn btn-primary px-6">
              Envoyer
            </button>
          </form>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const answerId = `faq-answer-${index}`

            return (
              <motion.details
                key={faq.q}
                className="card-glass group overflow-hidden"
                {...getRevealProps(0.12 + index * 0.08, reducedMotion)}
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between p-6 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eje-accent focus-visible:ring-offset-2 focus-visible:ring-offset-eje-dark"
                  aria-controls={answerId}
                >
                  <span>{faq.q}</span>
                  <span aria-hidden="true" className="text-eje-accent transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div id={answerId} className="px-6 pb-6 text-sm leading-relaxed text-eje-beige/70">
                  {faq.a}
                </div>
              </motion.details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
