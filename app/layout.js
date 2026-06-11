import './globals.css';
import AppShell from './AppShell';

export const metadata = {
  metadataBase: new URL('https://www.acceptanceconsulting.com'),
  title: {
    default: 'Acceptance Consulting | MBA Admissions Consulting for ISB, INSEAD, LBS & Top B-Schools',
    template: '%s | Acceptance Consulting',
  },
  description: 'Affordable and personalised MBA admissions consulting with 180+ successful admits. Expert help with essays, interview prep, and applications for ISB, INSEAD, LBS, Oxford, Cambridge, NUS, HEC Paris, UCLA and more top business schools worldwide.',
  keywords: [
    'MBA admissions consulting',
    'MBA admissions consultant',
    'ISB admissions consulting',
    'ISB application help',
    'INSEAD admissions',
    'LBS admissions',
    'B-school consulting',
    'MBA essay help',
    'MBA interview prep',
    'MBA application consultant',
    'business school admissions',
    'ISB essay review',
    'MBA admissions India',
    'affordable MBA consulting',
    'personalised MBA consulting',
    'top MBA admissions consultant',
    'MBA reapplication help',
    'Oxford MBA admissions',
    'Cambridge MBA admissions',
    'NUS MBA admissions',
    'HEC Paris MBA admissions',
    'UCLA MBA admissions',
    'GMAT prep community',
    'GRE prep community',
    'MBA admissions consulting India',
    'best MBA consultant India',
  ],
  authors: [{ name: 'Acceptance Consulting' }],
  creator: 'Acceptance Consulting',
  publisher: 'Acceptance Consulting',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Acceptance Consulting | Get Accepted to Your Dream B-School',
    description: 'Not your typical consultants. 180+ successful admits to ISB, INSEAD, LBS, Oxford, Cambridge and more. Affordable, personalised MBA admissions consulting.',
    url: 'https://www.acceptanceconsulting.com',
    siteName: 'Acceptance Consulting',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Acceptance Consulting - MBA Admissions Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acceptance Consulting | MBA Admissions Consulting',
    description: '180+ successful admits. Affordable, personalised MBA admissions consulting for ISB, INSEAD, LBS, Oxford and more.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.acceptanceconsulting.com',
  },
  verification: {
    google: '8si_7vrRr4lgfq10sCgBwF3bNbCXJ8446NMUhT_DKwQ',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Acceptance Consulting',
    description: 'Affordable and personalised MBA admissions consulting with 180+ successful admits to top business schools worldwide including ISB, INSEAD, LBS, Oxford, Cambridge, NUS, HEC Paris, and UCLA.',
    url: 'https://www.acceptanceconsulting.com',
    logo: 'https://www.acceptanceconsulting.com/icon.png',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/in/tanya-mehta-b091141b/',
      'https://www.linkedin.com/in/mananguptaindia/',
    ],
    founder: [
      {
        '@type': 'Person',
        name: 'Tanya Mehta',
        jobTitle: 'Co-Founder',
        url: 'https://www.linkedin.com/in/tanya-mehta-b091141b/',
      },
      {
        '@type': 'Person',
        name: 'Manan Gupta',
        jobTitle: 'Co-Founder',
        url: 'https://www.linkedin.com/in/mananguptaindia/',
      },
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 20.5937, longitude: 78.9629 },
      geoRadius: '10000',
    },
    serviceType: [
      'MBA Admissions Consulting',
      'MBA Essay Review',
      'MBA Interview Preparation',
      'B-School Application Strategy',
      'MBA Reapplication Consulting',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '180',
      bestRating: '5',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When should I start prepping for MBA admissions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend starting at least 5-7 weeks before your target deadline, giving you room for deep work, multiple drafts, and interview preparation without rushing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you help with MBA reapplications?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely - and we have a 100% reapplicant success rate. We tear apart what went wrong, rebuild your narrative from scratch, and position you differently.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Acceptance Consulting different from other MBA consultants?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We take on a limited number of applicants each cycle so we can go deep with each one. You get direct access to us, unlimited essay revisions, and mentors who genuinely care whether you get in.',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="image" property="og:image" content="https://www.acceptanceconsulting.com/og-image.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700&family=DM+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning><AppShell>{children}</AppShell></body>
    </html>
  );
}
