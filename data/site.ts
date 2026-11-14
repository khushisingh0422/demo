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
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'What We Offer', href: '/what-we-offer' },
  { label: 'Contact', href: '/contact' },
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

// OSR-style project cards. Data aligned to the live VD Vanchers reference site.
export const projects = [
  {
    name: 'VD Residency',
    slug: 'vdresidency',
    status: 'Now Selling',
    type: 'Residential Plots',
    city: 'Noida',
    location: 'Near Noida International Airport, Tappal, Yamuna Expressway',
    image: u('1600607687939-ce8a6c25118c'),
    text: 'VD Group presents a premium residential project near Jewar International Airport with plot options and modern amenities.',
    shortSummary: 'A premium residential plot destination near the upcoming Jewar Airport corridor, designed for future-focused families and investors seeking long-term value.',
    price: 'Price on Request',
    area: 'Near International Airport',
    possession: 'Registration / Immediate Booking',
    overview: 'VD Group presents you the luxurious residential project which is situated on Tappal, Yamuna Expressway near Jewar International Airport, Greater Noida. The plots are available with all types of amenities that are both basic and modern ranging from 50 Sq. Yds To Multiple sizes.',
    highlights: ['Near Jewar International Airport', 'Yamuna Expressway connectivity', 'Residential plots with modern amenities', 'Strong appreciation potential'],
    amenities: ['Clubhouse', 'Swimming Pool', 'Fitness Centre', 'Playground', 'Security', 'Green Landscape'],
    gallery: [
      u('1600607687939-ce8a6c25118c'),
      u('1600607687920-4e2a09cf159d'),
      u('1600047509807-ba8f99d2cdde'),
    ],
  },
  {
    name: 'The Royal Farmhouse',
    slug: 'theroyalfarmhouse',
    status: 'Now Selling',
    type: 'Farmhouse',
    city: 'Vrindavan',
    location: 'Chhata, Mathura, Vrindavan',
    image: u('1600566753086-00f18fb6b3ea'),
    text: 'A luxury farmhouse opportunity in Chhata, Vrindavan with open skies, spiritual serenity, and ultra-luxury lifestyle appeal.',
    shortSummary: 'An ultra-luxury farmhouse destination blending green surroundings, modern comfort, and spiritual calm in the heart of Vrindavan.',
    price: 'Price on Request',
    area: 'Farmhouse Plots',
    possession: 'Immediate Registration',
    overview: 'An opportunity for dreamers to make their dream of building a luxurious Farm House in the heart of city. A lush green with breath-taking view of sunrise is the new way of Ultra luxury lifestyle. Invest today, Build now.',
    highlights: ['Sanskriti University', 'KD Medical College', 'Prem Mandir', 'Banke Bihari Mandir', 'Yamuna Expressway', 'Jewar International Airport'],
    amenities: ['Club House', 'Swimming Pool', 'Cricket Ground', 'GYM', 'Kids Play Area', 'Helipad (Proposed)', 'Stud Farming', 'Horse Riding', 'Restaurant', 'Golf Chip & Putt'],
    gallery: [
      u('1600566753086-00f18fb6b3ea'),
      u('1600607687939-ce8a6c25118c'),
      u('1600585154340-be6161a56a0c'),
    ],
  },
  {
    name: 'Haripriya Enclave Vrindavan',
    slug: 'haripriyaenclavevrindavan',
    status: 'Delivered',
    type: 'Residential Plots',
    city: 'Vrindavan',
    location: 'Vrindavan NH2 Expressway, Near Jewar International Airport',
    image: u('1600047509807-ba8f99d2cdde'),
    text: 'A delivered residential project on the Vrindavan NH2 Expressway with plots sized from 100 Sq. Yds to multiple sizes.',
    shortSummary: 'A delivered community project with plot options and essential amenities, ideal for buyers seeking practical, secure, and lifestyle-driven land ownership.',
    price: 'Price on Request',
    area: '100 Sq. Yds to Multiple Sizes',
    possession: 'Delivered',
    overview: 'VD Groups presents you the luxurious residential project which is situated on Vrindavan NH2 Expressway, Near Jewar International Airport. The plots are available with all types of amenities that are both basic and modern ranging from 100 Sq. Yds To Multiple Size.',
    highlights: ['Vrindavan NH2 Expressway', 'Near Jewar Airport', 'Delivered project', 'Plots with modern amenities'],
    amenities: ['Security', 'Road Infrastructure', 'Green Planning', 'Community Amenities'],
    gallery: [
      u('1600047509807-ba8f99d2cdde'),
      u('1600566753086-00f18fb6b3ea'),
      u('1600607687920-4e2a09cf159d'),
    ],
  },
  {
    name: 'The Highway Farms',
    slug: 'thehighwayfarms',
    status: 'Fresh Launch',
    type: 'Farm Plots',
    city: 'Noida',
    location: 'The Highway Farms, Noida',
    image: u('1600607687920-4e2a09cf159d'),
    text: 'A premium farm-plot community in Noida combining highway access, lifestyle comfort, and investment potential.',
    shortSummary: 'A premium township in Noida that blends city access with green, serene living and strategic investment upside.',
    price: 'Price on Request',
    area: 'Farm Plots',
    possession: 'Pre-launch',
    overview: 'Located in the thriving and rapidly developing city of Noida, our township offers the best of both worlds - the convenience of city living combined with the serenity of a suburban community. With easy access to major highways, our location is unbeatable.',
    highlights: ['Galgotias University', 'Sports City', 'International Cricket Stadium', 'International Budha Circuit', 'Yamuna Expressway', 'Noida International Airport', 'IT Hub', 'Film City'],
    amenities: ['Road Connectivity', 'Landscape Planning', 'Community Lifestyle', 'Secure Entry'],
    gallery: [
      u('1600607687920-4e2a09cf159d'),
      u('1600607687939-ce8a6c25118c'),
      u('1600047509807-ba8f99d2cdde'),
    ],
  },
  {
    name: 'Nature Valley Dehradun',
    slug: 'naturevalleydehradun',
    status: 'Delivered',
    type: 'Farmhouse',
    city: 'Dehradun',
    location: 'Dehradun, Uttarakhand',
    image: u('1600585154340-be6161a56a0c'),
    text: 'A serene farmhouse retreat in the hills of Dehradun with fresh air, open views, and a peaceful premium lifestyle.',
    shortSummary: 'A beautiful hill-side farmhouse destination delivering privacy, open views, and calm luxury in the heart of Dehradun.',
    price: 'Price on Request',
    area: 'Hillside Farmhouse Retreat',
    possession: 'Delivered',
    overview: 'Are you looking for a peaceful and serene retreat from the hustle and bustle of city life? Look no further! Our real estate property in the hills offers breathtaking views and a chance to escape the noise and stress of daily life. Nestled in the rolling hills, this property is the perfect place to call home.',
    highlights: ['Peaceful hill lifestyle', 'Breathtaking views', 'Private deck / patio living', 'Fresh air and serenity'],
    amenities: ['Private Deck', 'Natural Views', 'Open Landscapes', 'Luxury Living'],
    gallery: [
      u('1600585154340-be6161a56a0c'),
      u('1600566753086-00f18fb6b3ea'),
      u('1600607687920-4e2a09cf159d'),
    ],
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
      photo: '/images/director-vansh-thakur.jpg',
    },
    {
      name: 'Deepanshu Goyal',
      role: 'Co-Founder & Director',
      initials: 'DG',
      quote: 'Always looking for an opportunity to do better and achieve greatness.',
      photo: '/images/director-deepanshu-goyal.jpg',
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
    { label: 'About Us', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Our Directors', href: '/#directors' },
    { label: 'What We Offer', href: '/#offer' },
    { label: 'Testimonials', href: '/#testimonials' },
  ],
  findUs: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Book a Site Visit', href: '/contact' },
    { label: 'Call Us', href: `tel:${contact.phoneHref}` },
  ],
}
