import './globals.css';

export const metadata = {
  title: 'Acceptance Consulting | Personalized ISB and Foreign B-School Admissions Consulting',
  description: 'Affordable, personalised, and proven MBA admissions consulting. We help you get accepted to ISB, INSEAD, LBS, Wharton, Stanford GSB, and more.',
  keywords: 'MBA admissions, ISB consulting, INSEAD admissions, B-school consulting, MBA essay help, interview prep',
  openGraph: {
    title: 'Acceptance Consulting | Get Accepted to Your Dream B-School',
    description: 'Not your typical consultants. We're the friends who've been in your shoes, sat in those classrooms, and now sit in your corner.',
    url: 'https://www.acceptanceconsulting.com',
    siteName: 'Acceptance Consulting',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700&family=DM+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
