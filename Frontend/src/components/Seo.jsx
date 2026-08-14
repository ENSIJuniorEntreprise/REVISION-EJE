import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'ENSI Junior Entreprise'
const SITE_URL = 'https://ensijuniorentreprise.com'
const DEFAULT_IMAGE = `${SITE_URL}/assets/Logoo.png`

export default function Seo({ title, description, path = '/', image = DEFAULT_IMAGE }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
