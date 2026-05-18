import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  url,
  image,
}) => {
  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta
        name="keywords"
        content="healthy snacks, nutrition snacks, protein snacks, Crave Nutri, wellness foods"
      />

      <meta name="author" content="Crave Nutri" />

      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Crave Nutri" />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@cravenutri" />

      {/* Theme Color */}
      <meta name="theme-color" content="#f59e0b" />

      {/* Organization Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Crave Nutri",
          "url": "https://cravenutri.com",
          "logo": "https://cravenutri.com/cravenutriicon.png"
        }
        `}
      </script>

      {/* Website Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org/",
          "@type": "WebSite",
          "name": "Crave Nutri",
          "url": "https://cravenutri.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://cravenutri.com/collection?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
        `}
      </script>

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org/",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://cravenutri.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Shop",
              "item": "https://cravenutri.com/collection"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "About",
              "item": "https://cravenutri.com/about"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Contact",
              "item": "https://cravenutri.com/contact"
            }
          ]
        }
        `}
      </script>
    </Helmet>
  );
};

export default SEO;