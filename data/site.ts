// All site content lives here — edit text, numbers, images without touching components.
// Items marked "PLACEHOLDER" are sample content: replace with real data before launch.

const u = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const brand = {
  name: 'VD VANCHERS',
  tagline: 'Real Estate & Development',
  mark: 'V',
  logo: '/images/vd-vanchers-logo.png', // from vanchers.com
}

export const contact = {
  phone: '+91 92892 45099',
  phoneHref: '+919289245099',
  email: 'info@vanchers.com',
  address: 'A-33, 5th Floor, Sector 136, Noida – 201304',
  shortAddress: 'Sector 136, Noida',
  // Add the real profile URLs here; icons appear only for entries that exist.
  socials: [] as { name: string; href: string; icon: 'facebook' | 'instagram' | 'youtube' | 'linkedin' }[],
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'What We Offer', href: '#offer' },
  { label: 'Contact', href: '#consultation' },
]

// Banner text follows OSR Realtech: pill label → heading (2nd line italic) → bordered subtext → 2 buttons
export const heroSlides = [
  {
    image: '/images/IMG_9996-scaled.jpg',
    label: '15+ Years of Real Estate Excellence • Noida & Delhi NCR',
    title: 'Luxury Farmhouses',
    accent: 'in Noida & NCR.',
    subtitle: 'Trusted real estate developer in Noida. Farmhouses, Residential Plots, Farm Plots & Gated Communities.',
  },
  {
    image: '/images/IMG_0112-scaled.jpg',
    label: '700+ Farmhouses Developed • Noida, Vrindavan & Dehradun',
    title: 'Redefining Countryside',
    accent: 'Luxury Living.',
    subtitle: 'Open landscapes, private retreats and modern comfort — just minutes from Delhi NCR.',
  },
  {
    image: '/images/modern-house-facade.jpg',
    label: 'Near Noida International Airport • Yamuna Expressway',
    title: 'Invest Where Growth',
    accent: 'Is Headed.',
    subtitle: 'Residential plots and farm land in high-potential growth corridors, with complete legal clarity.',
  },
]

// Dvayu-style "Who We Are"
export const whoWeAre = {
  title: 'VD Vanchers: Luxury Farmhouses in Noida',
  body: 'At <strong>VD Vanchers</strong>, we create more than just farmhouses — we create experiences. With <strong>15+ years of expertise in real estate and land development</strong>, our mission is to bring you premium farmhouse living that feels worlds away from the city, yet just minutes from it.',
  badge: { value: '700+', label: 'Farmhouses Developed' },
  image: '/images/IMG_9984-scaled-e1754563184490.jpg',
  circle: '/images/real-estate-agent.jpg',
}

// OSR-style numbers card. Values marked * come from the VD concept — confirm with client.
export const stats = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 5000, suffix: '+', label: 'Happy Families Served' },
  { value: 700, suffix: '+', label: 'Farmhouses Developed*' },
  { value: 5, suffix: '', label: 'Featured Developments' },
]

// OSR-style project cards. Prices are PLACEHOLDER ("Price on Request") until the client shares them.
export const projects = [
  {
    name: 'VD Residency',
    status: 'Under Construction',
    type: 'Residential Plots',
    city: 'Yamuna Expressway',
    location: 'Tappal, Yamuna Expressway',
    image: u('1600607687939-ce8a6c25118c'),
    text: 'A residential plot development positioned near the Noida International Airport growth corridor at Tappal, Yamuna Expressway.',
    price: 'Price on Request',
  },
  {
    name: 'The Royal Farm',
    status: 'Now Selling',
    type: 'Farmhouses',
    city: 'Vrindavan',
    location: 'Chhata, Vrindavan',
    image: u('1600566753086-00f18fb6b3ea'),
    text: 'A farmhouse opportunity in Chhata, Vrindavan, created for those looking for open surroundings and a private retreat.',
    price: 'Price on Request',
  },
  {
    name: 'Haripriya Enclave',
    status: 'Ready to Move',
    type: 'Residential Plots',
    city: 'Vrindavan',
    location: 'Vrindavan, Uttar Pradesh',
    image: u('1600047509807-ba8f99d2cdde'),
    text: 'A delivered residential project in Vrindavan, with plot options and a mix of essential and contemporary amenities.',
    price: 'Price on Request',
  },
  {
    name: 'The Highway Farms',
    status: 'Fresh Launch',
    type: 'Farm Plots',
    city: 'Noida',
    location: 'Noida Region',
    image: u('1600607687920-4e2a09cf159d'),
    text: 'A community combining access to key road networks with the appeal of a quieter, more open farmhouse setting.',
    price: 'Price on Request',
  },
  {
    name: 'Nature Valley',
    status: 'Ready to Move',
    type: 'Farmhouses',
    city: 'Dehradun',
    location: 'Dehradun, Uttarakhand',
    image: u('1600585154340-be6161a56a0c'),
    text: 'A delivered, nature-led farmhouse destination in Dehradun, designed around open landscapes and a relaxed lifestyle.',
    price: 'Price on Request',
  },
]

// Leadership — names, titles and lines from vanchers.com "Meet the Team".
// Add a `photo` path (e.g. '/images/vansh-thakur.jpg') to show a portrait instead of the monogram.
export const directors = {
  kicker: 'Leadership',
  title: 'The Minds Behind',
  accent: 'VD Vanchers.',
  intro: 'Founded in 2019 in Noida, VD Group is led by two directors who share one standard: every acre we develop should be one we would be proud to own.',
  people: [
    {
      name: 'Vansh Thakur',
      role: 'Founder & Director',
      initials: 'VT',
      quote: 'Ambitious and driven, thrive on challenge and constantly set goals.',
      photo: '/images/director-vansh-thakur.avif',
    },
    {
      name: 'Deepanshu Goyal',
      role: 'Co-Founder & Director',
      initials: 'DG',
      quote: 'Always looking for an opportunity to do better and achieve greatness.',
      photo: '/images/director-deepanshu-goyal.avif',
    },
  ],
}

export const testimonials = [
  {
    name: 'Azam Siddique',
    role: 'Delhi',
    quote: 'The service provided by VD Vanchers was incredible. They helped me to clear all my doubts & queries about purchasing the property. Thanks for all your help & support.',
  },
  // PLACEHOLDER — replace with a real client review
  {
    name: 'Client Name',
    role: 'Farmhouse Owner, Noida',
    quote: 'From the first site visit to registration, the team kept everything transparent. We always knew what the next step was.',
  },
]

// Dvayu-style "What We Offer": FAQ on the left, 2×2 tiles on the right (tiles with `image` show a photo)
export const offer = {
  title: 'Farms That Transform Your Living Experience',
  tiles: [
    { title: 'Spacious Landscaped Gardens' },
    { title: 'Living and Dining Spaces', image: '/images/IMG_0112-scaled.jpg' },
    { title: 'Parking and Security Systems', image: '/images/IMG_9996-scaled.jpg' },
    { title: 'Private Swimming Pools' },
  ],
  faqs: [
    { q: 'How far are your farmhouses from Delhi?', a: 'Our Noida projects are around <strong>15 minutes from Delhi</strong>, with easy access via the Noida Expressway — ideal for both weekend getaways and long-term living.' },
    { q: 'Can I customize the design of my farmhouse?', a: 'Yes. We offer flexible layout options and design support so your farmhouse reflects your style.' },
    { q: 'Is this a good investment option?', a: 'Rapid development across Noida and the Yamuna Expressway, along with rising demand, gives our projects strong appreciation potential — a lifestyle and a financial investment.' },
  ],
}

export const footer = {
  tagline: 'Experience modern farmhouse living surrounded by greenery, comfort, and peace — all just minutes away from Noida.',
  quickLinks: [
    { label: 'About Us', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Our Directors', href: '#directors' },
    { label: 'What We Offer', href: '#offer' },
    { label: 'Testimonials', href: '#testimonials' },
  ],
  findUs: [
    { label: 'Contact Us', href: '#consultation' },
    { label: 'Book a Site Visit', href: '#consultation' },
    { label: 'Call Us', href: `tel:${contact.phoneHref}` },
  ],
}
