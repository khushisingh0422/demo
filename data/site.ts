// All site content lives here — edit text, numbers, images without touching components.
// Items marked "PLACEHOLDER" are sample content: replace with the client's real data before launch.

export const brand = {
  name: 'VD VANCHERS',
  tagline: 'Real Estate & Development',
  mark: 'V',
}

export const contact = {
  phone: '+91-8851510627',
  email: 'info@dvayu.com',
  address: 'New Club, Green Beauty Farms, Sector 135, Noida, Uttar Pradesh',
  socials: [
    { name: 'Facebook', href: 'https://www.facebook.com/dvayuchateau', icon: 'facebook' },
    { name: 'Instagram', href: 'https://www.instagram.com/dvayuchateau', icon: 'instagram' },
    { name: 'YouTube', href: 'https://www.youtube.com/@dvayuchatea', icon: 'youtube' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/dvayulondon', icon: 'linkedin' },
  ],
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Amenities', href: '#offer' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#consultation' },
]

// Banner text follows the OSR Realtech pattern: small label → bold heading → offer line → 2 CTAs
export const heroSlides = [
  {
    image: '/images/IMG_9996-scaled.jpg',
    eyebrow: '41+ Years of Land Development Excellence • Noida & Delhi NCR',
    title: 'Luxury Farmhouses in Sector 135, Noida.',
    subtitle: 'Trusted farmhouse developer in Noida. Private Pools, Landscaped Gardens, Gated Farm Communities & Premium Farm Plots.',
  },
  {
    image: '/images/IMG_0112-scaled.jpg',
    eyebrow: 'Just 15 Minutes from Delhi • Via Noida Expressway',
    title: 'Redefining Countryside Luxury.',
    subtitle: 'Open skies, complete privacy and modern comfort — farmhouse living that feels a world away, yet minutes from the city.',
  },
  {
    image: '/images/modern-house-facade.jpg',
    eyebrow: 'Lifestyle + Investment • Complete Legal Clarity',
    title: 'Find Your Dream Farm With Us.',
    subtitle: 'Ready-to-move farmhouses and premium farm plots with strong appreciation potential in Noida’s fastest-growing belt.',
  },
]

export const whoWeAre = {
  title: 'Luxury Farmhouses in Noida',
  lead: 'We create more than just farmhouses — we create experiences.',
  body: 'Our mission is to offer premium farmhouse living that feels a world away from the city, yet sits only minutes from it. Backed by over four decades of expertise in land development, every property we build is planned for privacy, greenery and lasting value.',
  points: [
    { title: 'Unmatched Location', text: 'Just 15 minutes from Delhi via the Noida Expressway.' },
    { title: 'Personalized Design', text: 'Customize your layout or choose from curated plans.' },
    { title: 'Trusted Legacy', text: '41+ years of real-estate experience behind every plot.' },
    { title: 'Investment-Ready', text: 'High appreciation potential with complete legal clarity.' },
  ],
  images: ['/images/IMG_9984-scaled-e1754563184490.jpg', '/images/real-estate-agent.jpg'],
}

// OSR Realtech-style counters. PLACEHOLDER values — confirm with client
export const stats = [
  { value: 41, suffix: '+', label: 'Years of Excellence' },
  { value: 5000, suffix: '+', label: 'Happy Families Served' },
  { value: 100, suffix: '+', label: 'Acres Developed' },
  { value: 3, suffix: '', label: 'Signature Farm Projects' },
]

// OSR-style project cards. PLACEHOLDER details (status / type / price / description) — confirm with client
export const projects = [
  {
    name: 'Dvayu Farms',
    location: 'Sector 135, Noida',
    status: 'Now Selling',
    type: 'Farmhouses',
    price: 'Price on Request',
    image: '/images/IMG_9996-scaled.jpg',
    text: 'Our flagship community of luxury farmhouses with private pools and landscaped lawns.',
  },
  {
    name: 'Green Beauty Farms',
    location: 'New Club, Sector 135, Noida',
    status: 'Ready to Move',
    type: 'Farmhouses',
    price: 'Price on Request',
    image: '/images/IMG_0112-scaled.jpg',
    text: 'A green, gated enclave with a clubhouse, wide internal roads and 24×7 security.',
  },
  {
    name: 'Alaska Farms',
    location: 'Noida Expressway Belt',
    status: 'Limited Plots',
    type: 'Farm Plots',
    price: 'Price on Request',
    image: '/images/modern-house-facade.jpg',
    text: 'Premium farm plots for buyers who want to design and build their own countryside retreat.',
  },
]

// PLACEHOLDER testimonials — replace with real client reviews before launch
export const testimonials = [
  {
    name: 'Rajiv Malhotra',
    role: 'Farmhouse Owner',
    quote: 'We wanted a weekend escape that didn’t mean a three-hour drive. This gave us exactly that — fresh air, a private pool, and we’re home from South Delhi in under 30 minutes.',
  },
  {
    name: 'Anita & Sanjay Kapoor',
    role: 'Owners, Green Beauty Farms',
    quote: 'The team helped us customize every detail of the layout. Paperwork was transparent from day one, which gave us real peace of mind.',
  },
  {
    name: 'Vikram Sethi',
    role: 'Investor',
    quote: 'I bought for the investment and stayed for the lifestyle. The appreciation in Sector 135 has been outstanding, and the property is beautifully maintained.',
  },
]

export const offerings = [
  { title: 'Spacious Landscaped Gardens', text: 'Manicured lawns, fruit trees and walking paths that make every morning feel like a retreat.', icon: 'garden' },
  { title: 'Living & Dining Spaces', text: 'Open, light-filled living and dining areas built for family gatherings and celebrations.', icon: 'home' },
  { title: 'Private Swimming Pools', text: 'Your own pool to unwind in, surrounded by greenery and complete privacy.', icon: 'pool' },
  { title: 'Parking & Security Systems', text: 'Gated access, CCTV surveillance and ample covered parking for total peace of mind.', icon: 'shield' },
]

export const faqs = [
  { q: 'How far is the farmhouse from Delhi?', a: 'About 15 minutes from Delhi with easy access via the Noida Expressway — ideal for weekend getaways and long-term living.' },
  { q: 'Can I customize the design of my farmhouse?', a: 'Yes. We offer flexible layout options and full design support so your farmhouse reflects your style.' },
  { q: 'Is this a good investment option?', a: 'Rapid development in Noida and rising demand give these farmhouses strong appreciation potential — a lifestyle and a financial investment.' },
]
