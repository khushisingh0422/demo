// All site content lives here — edit text, numbers, images without touching components.
// Items marked "PLACEHOLDER" are sample content: replace with the client's real data before launch.

const u = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`

export const brand = {
  name: 'VD VANCHERS',
  tagline: 'Real Estate & Development',
  mark: 'V',
}

export const contact = {
  phone: '+91 92892 45099',
  phoneHref: '+919289245099',
  email: 'info@vanchers.com',
  address: 'A-33, 5th Floor, Sector 136, Noida – 201304',
  socials: [] as { name: string; href: string; icon: string }[], // add Facebook/Instagram/etc. URLs here
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Our Expertise', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#consultation' },
]

export const heroSlides = [
  {
    image: u('1600607687939-ce8a6c25118c', 2200),
    eyebrow: 'A legacy of trust. A vision for tomorrow.',
    title: 'Building places.<br>Creating possibilities.',
    subtitle: 'Discover thoughtfully developed residential destinations, land investments and farmhouse communities with VD Vanchers.',
  },
  {
    image: u('1600585154340-be6161a56a0c', 2200),
    eyebrow: 'Farmhouse communities',
    title: 'Open skies.<br>Private retreats.',
    subtitle: 'Farmhouse living across Noida, Vrindavan and Dehradun — designed around open landscapes and a relaxed lifestyle.',
  },
  {
    image: u('1600607687920-4e2a09cf159d', 2200),
    eyebrow: 'Land & investment',
    title: 'Invest where<br>growth is headed.',
    subtitle: 'Residential plots near the Noida International Airport corridor and other high-potential locations across Delhi NCR.',
  },
]

export const whoWeAre = {
  title: 'Real estate is more than property. It is about people.',
  lead: 'At VD Vanchers, we bring people and possibilities together through considered real estate development and customer-first service.',
  body: [
    'Established in 2019, VD Vanchers works across residential destinations, land and farmhouse developments. We believe that trust is built through transparent communication, thoughtful planning and relationships that continue well beyond a transaction.',
    'With a presence across Noida, Greater Noida, Vrindavan and Dehradun markets, our focus is to make every property journey more informed and straightforward.',
  ],
  image: u('1600607687920-4e2a09cf159d', 1100),
  note: { value: '2019', text: 'Established with a commitment to better real estate experiences' },
}

// "*" figures come from the concept — confirm with client. `count: false` shows the value as-is.
export const stats = [
  { value: 10000, suffix: '+', label: 'Happy customers*' },
  { value: 700, suffix: '+', label: 'Farmhouses developed*' },
  { value: 2019, suffix: '', label: 'Year established', count: false },
  { value: 5, suffix: '', label: 'Featured developments' },
]

export const projects = [
  {
    name: 'VD Residency',
    tag: 'Residential',
    location: 'Tappal · Yamuna Expressway',
    image: u('1600607687939-ce8a6c25118c', 900),
    text: 'A residential plot development positioned near the Noida International Airport growth corridor at Tappal, Yamuna Expressway.',
  },
  {
    name: 'The Royal Farm',
    tag: 'Farmhouse living',
    location: 'Chhata · Vrindavan',
    image: u('1600566753086-00f18fb6b3ea', 900),
    text: 'A farmhouse opportunity in Chhata, Vrindavan, created for those looking for open surroundings and a private retreat.',
  },
  {
    name: 'Haripriya Enclave',
    tag: 'Delivered',
    location: 'Vrindavan · Delivered',
    image: u('1600047509807-ba8f99d2cdde', 900),
    text: 'A residential project in Vrindavan, with plot options and a mix of essential and contemporary amenities.',
  },
  {
    name: 'The Highway Farms',
    tag: 'Farm plots',
    location: 'Noida region',
    image: u('1600607687920-4e2a09cf159d', 900),
    text: 'A community concept combining access to key road networks with the appeal of a quieter, more open setting.',
  },
  {
    name: 'Nature Valley',
    tag: 'Delivered',
    location: 'Dehradun · Delivered',
    image: u('1600585154340-be6161a56a0c', 900),
    text: 'A nature-led farmhouse destination in Dehradun, designed around open landscapes and a relaxed lifestyle.',
  },
]

export const testimonials = [
  {
    name: 'Azam Siddique',
    role: 'Delhi',
    quote: 'The service provided by VD Vanchers was incredible. They helped me to clear all my doubts & queries about purchasing the property. Thanks for all your help & support.',
  },
  // PLACEHOLDER — replace with a real client review
  {
    name: 'Client Name',
    role: 'Noida',
    quote: 'From the first site visit to registration, the team kept everything transparent and simple. We always knew what the next step was.',
  },
  // PLACEHOLDER — replace with a real client review
  {
    name: 'Client Name',
    role: 'Greater Noida',
    quote: 'They understood exactly what we wanted from a farmhouse and showed us options that matched our budget and lifestyle.',
  },
]

export const services = {
  title: 'Guidance at every step<br>of your property journey.',
  intro: 'Whether you are looking to buy, sell or invest, our team helps simplify the process with practical guidance and customer-focused support.',
  items: [
    { title: 'Buy', text: 'Explore property options aligned with your needs, preferred location and investment goals.' },
    { title: 'Sell', text: 'Get support to position your property, connect with interested buyers and move forward confidently.' },
    { title: 'Invest', text: 'Understand land and real estate opportunities with a clearer view of location and potential.' },
    { title: 'Property Appraisals', text: 'Make more informed decisions with guidance on evaluating property value.' },
    { title: 'Registration Support', text: 'Get assistance navigating property documentation and registration steps.' },
    { title: 'End-to-End Guidance', text: 'Get a team to help coordinate your journey from first enquiry to the next steps.' },
  ],
}

export const enquiryInterests = [
  'Buying a property',
  'Selling a property',
  'Real estate investment',
  ...projects.map(p => p.name),
  'Other',
]
