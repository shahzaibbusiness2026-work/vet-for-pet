import { 
  Doctor, 
  SupportStaff, 
  ServiceItem, 
  GalleryItem, 
  Product, 
  Testimonial, 
  FAQItem,
  AdminAppointment,
  AdminOrder,
  InventoryItem,
  MessageItem
} from '../types';

export const CLINIC_INFO = {
  name: "Vet for Pet Clinic",
  tagline: "Healthy Pets • Happier Lives",
  subTagline: "Sahiwal's Trusted Pet Clinic",
  phone: "0329-0220220",
  whatsapp: "923290220220",
  email: "info@vetforpetclinic.com",
  address: "House #220, KIPS Road, Stop #05, Fareed Town, Sahiwal, 57000",
  hoursWeekday: "Sat – Thu: 10:00 AM – 10:00 PM",
  hoursFriday: "Friday: 3:00 PM – 10:00 PM",
  hoursSunday: "Sunday: 10:00 AM – 4:00 PM",
  rating: "5.0",
  clientsCount: "268+",
  yearsCount: "7+",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "checkups",
    title: "General Checkups",
    description: "Routine health exams to keep your pet healthy, active and vibrant at every stage of life.",
    iconName: "Stethoscope",
    petImage: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=400&q=80", // Husky
    category: "general",
    fullDetails: "Comprehensive head-to-tail physical examinations checking eyes, ears, coat, joints, heart, lungs, and vital signs to detect early issues before they become serious.",
    badge: "Routine Care"
  },
  {
    id: "vaccinations",
    title: "Vaccinations",
    description: "Essential core and lifestyle vaccines to protect from common and life-threatening pet diseases.",
    iconName: "Syringe",
    petImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80", // Kitten
    category: "wellness",
    fullDetails: "Rabies, DHPP, Parvovirus, FVRCP, and customized vaccination schedules tailored for puppies, kittens, and adult pets.",
    badge: "Preventive"
  },
  {
    id: "treatment-surgery",
    title: "Treatment & Surgery",
    description: "Advanced diagnosis and surgical treatment for health issues with dedicated sterile operating theatre.",
    iconName: "HeartPulse",
    petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80", // Golden Retriever
    category: "surgery",
    fullDetails: "Soft-tissue surgery, spay/neuter, wound repair, tumor removal, and intensive post-operative care monitored by skilled veterinary surgeons.",
    badge: "Advanced Care"
  },
  {
    id: "grooming",
    title: "Pet Grooming",
    description: "Professional bathing, de-shedding, fur trimming, and nail clipping for clean, happy, fresh pets.",
    iconName: "Scissors",
    petImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=400&q=80", // Shih Tzu groomed
    category: "wellness",
    fullDetails: "Therapeutic medicated baths, breed-specific haircuts, ear cleaning, hygienic paw clipping, and flea/tick spa treatments.",
    badge: "Spa & Hygiene"
  },
  {
    id: "dental-care",
    title: "Dental Care",
    description: "Oral health examinations, ultrasonic scaling, polishing and gingivitis prevention for healthy teeth.",
    iconName: "Smile",
    petImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80", // Dog smiling
    category: "general",
    fullDetails: "Tarter removal, periodontal therapy, tooth extractions when required, and breath-freshening oral wellness maintenance.",
    badge: "Oral Health"
  },
  {
    id: "nutrition",
    title: "Nutrition Advice",
    description: "Personalized dietary counseling and custom diet plans tailored for allergies, growth, or weight management.",
    iconName: "Utensils",
    petImage: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=400&q=80", // Bunny / Rabbit
    category: "wellness",
    fullDetails: "Expert nutrition planning for growing puppies/kittens, renal/hepatic diets, weight loss programs, and hypoallergenic food guidance.",
    badge: "Nutrition"
  },
  {
    id: "emergency",
    title: "Emergency Care",
    description: "Prompt, compassionate emergency response when your pet experiences sudden illness, accidents or trauma.",
    iconName: "AlertCircle",
    petImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=400&q=80", // Alert cat
    category: "specialized",
    fullDetails: "Critical triage, IV fluid therapy, oxygen support, poisoning antidote, trauma stabilization, and emergency surgical intervention.",
    badge: "Urgent Care"
  },
  {
    id: "pet-products",
    title: "Pet Products",
    description: "Premium vet-approved pet foods, grooming essentials, accessories, carriers, and therapeutic diets.",
    iconName: "ShoppingBag",
    petImage: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=400&q=80", // Dog bowl
    category: "wellness",
    fullDetails: "Full selection of imported brands like Royal Canin, Whiskas, Pedigree, supplements, collars, harnesses, carriers, and toys.",
    badge: "In-Clinic Shop"
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    description: "In-house lab testing, blood chemistry, digital X-rays and ultrasound for rapid and accurate diagnosis.",
    iconName: "Activity",
    petImage: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=80", // Vet with cat
    category: "specialized",
    fullDetails: "Complete blood count (CBC), urine analysis, skin scrapings, viral antigen rapid testing, and digital imaging.",
    badge: "Lab & Imaging"
  },
  {
    id: "deworming",
    title: "Deworming",
    description: "Safe, effective internal parasite control protecting dogs, cats and rabbits from harmful worms.",
    iconName: "ShieldCheck",
    petImage: "https://images.unsplash.com/photo-1589952283406-b53a7d13d368?auto=format&fit=crop&w=400&q=80", // Fluffy rabbit
    category: "general",
    fullDetails: "Scheduled deworming protocol covering roundworms, tapeworms, hookworms, and whipworms for clean gut health.",
    badge: "Preventive"
  },
  {
    id: "preventive-care",
    title: "Preventive Care",
    description: "Flea, tick, and mite control, environmental allergy management, and proactive wellness screenings.",
    iconName: "Shield",
    petImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80", // Golden puppy
    category: "wellness",
    fullDetails: "Topical and chewable ectoparasite treatments, heartworm prevention, and seasonal wellness checkups.",
    badge: "Protection"
  },
  {
    id: "senior-pet-care",
    title: "Senior Pet Care",
    description: "Specialized geriatric care to manage arthritis, mobility, kidney function, and maintain high quality of life.",
    iconName: "Heart",
    petImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&q=80", // Senior calm cat
    category: "specialized",
    fullDetails: "Pain management, joint health supplements, senior blood profiles, blood pressure monitoring, and comfort care adjustments.",
    badge: "Geriatric Care"
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-ahmad-raza",
    name: "Dr. Ahmad Raza",
    role: "Senior Veterinarian & Clinic Head",
    specialty: "Internal Medicine, Surgery",
    experience: "8+ Years Experience",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80", // Smiling male doctor in scrubs
    bio: "Passionate about animal health and community pet care in Sahiwal. Committed to compassionate, evidence-based treatment.",
    fullBio: "Dr. Ahmad Raza completed his DVM with distinction and has dedicated over 8 years to advancing pet health in Punjab. He established Vet for Pet Clinic with a mission to bring compassionate, modern, and affordable clinical standards to every pet in Sahiwal. He specializes in soft-tissue surgery, critical care, and diagnostic ultrasound.",
    education: "DVM, M.Phil Veterinary Surgery (UVAS)",
    availableDays: "Mon – Sat (10:00 AM – 8:00 PM)"
  },
  {
    id: "dr-ayesha-khan",
    name: "Dr. Ayesha Khan",
    role: "Veterinarian",
    specialty: "Preventive Care, Vaccination",
    experience: "6+ Years Experience",
    image: "https://images.unsplash.com/photo-1594824813633-91c2f9e42104?auto=format&fit=crop&w=600&q=80", // Female vet in green scrubs
    bio: "Loves working with pets of all kinds, with special interest in preventive care, pediatric pet health, and wellness counseling.",
    fullBio: "Dr. Ayesha brings gentle, empathetic handling techniques that keep anxious pets calm during vaccinations and wellness checks. She leads our feline friendly clinic initiatives and puppy socialization guidelines.",
    education: "DVM (Veterinary Medicine), Member PVMC",
    availableDays: "Sat – Thu (10:00 AM – 6:00 PM)"
  },
  {
    id: "dr-bilal-hussain",
    name: "Dr. Bilal Hussain",
    role: "Veterinarian",
    specialty: "Surgery, Emergency Care",
    experience: "5+ Years Experience",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80", // Male vet doctor
    bio: "Specializes in surgical care and emergency medicine with a calm and gentle approach even in high-pressure situations.",
    fullBio: "With extensive training in trauma management and emergency procedures, Dr. Bilal handles surgical consults, bone splinting, and post-operative recovery monitoring with precision.",
    education: "DVM, Certified Veterinary Emergency Care",
    availableDays: "Mon – Sat (2:00 PM – 10:00 PM)"
  },
  {
    id: "dr-sana-malik",
    name: "Dr. Sana Malik",
    role: "Veterinarian",
    specialty: "Exotic Pets, Dermatology",
    experience: "4+ Years Experience",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80", // Friendly female vet
    bio: "Dedicated to the wellbeing of cats, dogs, rabbits, birds and exotic pets with a focus on skin health and personalized care.",
    fullBio: "Dr. Sana is passionate about avian and pocket pet medicine, rabbit GI health, and treating chronic allergic dermatological disorders in dogs and cats.",
    education: "DVM, Diploma in Veterinary Dermatology",
    availableDays: "Sat – Wed (11:00 AM – 7:00 PM)"
  }
];

export const SUPPORT_STAFF: SupportStaff[] = [
  {
    id: "ali-hassan",
    name: "Ali Hassan",
    role: "Veterinary Technician",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "fathima-noor",
    name: "Fathima Noor",
    role: "Pet Care Assistant",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "umer-farooq",
    name: "Umer Farooq",
    role: "Receptionist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "nimra-shah",
    name: "Nimra Shah",
    role: "Clinic Coordinator",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Happy Patient - Golden Smile",
    category: "dogs",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    likes: 142
  },
  {
    id: "g2",
    title: "Our Caring Team with Kitten",
    category: "staff",
    imageUrl: "https://images.unsplash.com/photo-1594824813633-91c2f9e42104?auto=format&fit=crop&w=800&q=80",
    likes: 98
  },
  {
    id: "g3",
    title: "Clean Reception & Welcome Desk",
    category: "clinic",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    likes: 67
  },
  {
    id: "g4",
    title: "Gentle Pet Grooming Session",
    category: "grooming",
    imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
    likes: 184
  },
  {
    id: "g5",
    title: "Routine Health Checkup with Dr. Ahmad",
    category: "staff",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    likes: 112
  },
  {
    id: "g6",
    title: "Sterile Modern Treatment Room",
    category: "clinic",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    likes: 76
  },
  {
    id: "g7",
    title: "Our Feline Friends - Persian Cat",
    category: "cats",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    likes: 156
  },
  {
    id: "g8",
    title: "Happy Pet Owner with Healthy Retriever",
    category: "patients",
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    likes: 210
  },
  {
    id: "g9",
    title: "Small Pets Care - Bunny Checkup",
    category: "patients",
    imageUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80",
    likes: 89
  },
  {
    id: "g10",
    title: "Beagle Puppy First Vaccination",
    category: "dogs",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    likes: 195
  },
  {
    id: "g11",
    title: "Comfortable Pet-Friendly Waiting Lounge",
    category: "clinic",
    imageUrl: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
    likes: 82
  },
  {
    id: "g12",
    title: "Cat Deshedding & Coat Conditioning",
    category: "grooming",
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
    likes: 120
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Royal Canin Kitten Dry Food (2kg)",
    category: "cat-feed",
    petType: "cat",
    price: 3200,
    rating: 4.9,
    reviewCount: 120,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isTopSeller: true,
    inStock: true,
    description: "Specially formulated for kittens from 4 to 12 months with high digestive tolerance and immune system support."
  },
  {
    id: "p2",
    name: "Whiskas Wet Food Gravy Pouch (85g)",
    category: "cat-feed",
    petType: "cat",
    price: 220,
    rating: 4.7,
    reviewCount: 96,
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isTopSeller: true,
    inStock: true,
    description: "Delicious wet cat food pouch rich in protein, zinc and omega fatty acids for a glossy shiny fur coat."
  },
  {
    id: "p3",
    name: "Multi-Level Cat Scratching Post",
    category: "cat-accessories",
    petType: "cat",
    price: 4500,
    rating: 4.6,
    reviewCount: 72,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=500&q=80",
    isPopular: false,
    isTopSeller: false,
    inStock: true,
    description: "Durable natural sisal rope scratching tree with cozy plush perches and dangling play balls."
  },
  {
    id: "p4",
    name: "Easy-Clean Cat Litter Tray (Large)",
    category: "cat-accessories",
    petType: "cat",
    price: 2800,
    rating: 4.5,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isTopSeller: false,
    inStock: true,
    description: "High-walled litter box designed to reduce litter scatter with an included ergonomic scoop."
  },
  {
    id: "p5",
    name: "Pedigree Adult Dog Food Chicken & Veg (3kg)",
    category: "dog-food",
    petType: "dog",
    price: 2820,
    rating: 4.8,
    reviewCount: 110,
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isTopSeller: true,
    inStock: true,
    description: "Complete and balanced dry nutrition packed with essential vitamins, minerals, and prebiotic dietary fibers."
  },
  {
    id: "p6",
    name: "Padded Adjustable Dog Collar & Leash",
    category: "dog-accessories",
    petType: "dog",
    price: 850,
    rating: 4.6,
    reviewCount: 57,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=500&q=80",
    isPopular: false,
    isTopSeller: true,
    inStock: true,
    description: "Breathable neoprene padded collar with reflective nylon webbing for safe nighttime walks."
  },
  {
    id: "p7",
    name: "Gentle Care Herbal Pet Shampoo (500ml)",
    category: "grooming",
    petType: "all",
    price: 1250,
    rating: 4.7,
    reviewCount: 82,
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isTopSeller: false,
    inStock: true,
    description: "pH-balanced hypoallergenic aloe vera shampoo soothing irritated skin and eliminating odors."
  },
  {
    id: "p8",
    name: "Self-Cleaning Deshedding Slicker Brush",
    category: "grooming",
    petType: "all",
    price: 950,
    rating: 4.6,
    reviewCount: 68,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=500&q=80",
    isPopular: false,
    isTopSeller: true,
    inStock: true,
    description: "One-click hair release button quickly removes loose undercoat without scratching delicate skin."
  },
  {
    id: "p9",
    name: "Omega 3+6 Skin & Coat Supplement",
    category: "supplements",
    petType: "all",
    price: 1800,
    rating: 4.8,
    reviewCount: 91,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isTopSeller: true,
    inStock: true,
    description: "Pure wild Alaskan salmon oil rich in EPA and DHA to relieve dry itching and support joint agility."
  },
  {
    id: "p10",
    name: "Interactive Cat Toy Set (5 Pieces)",
    category: "toys",
    petType: "cat",
    price: 750,
    rating: 4.6,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isTopSeller: false,
    inStock: true,
    description: "Feather teaser wand, crinkle balls, catnip mice, and bell rollers for endless indoor exercise."
  },
  {
    id: "p11",
    name: "Stainless Steel Anti-Skid Pet Bowl Set",
    category: "bowls",
    petType: "all",
    price: 1100,
    rating: 4.7,
    reviewCount: 83,
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=500&q=80",
    isPopular: false,
    isTopSeller: true,
    inStock: true,
    description: "Rust-resistant hygienic food-grade double bowls with non-slip silicone base."
  },
  {
    id: "p12",
    name: "Sturdy Travel Pet Carrier Box (Medium)",
    category: "dog-accessories",
    petType: "all",
    price: 3500,
    rating: 4.5,
    reviewCount: 50,
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=500&q=80",
    isPopular: true,
    isTopSeller: false,
    inStock: true,
    description: "Ventilated secure travel crate with metal grill gate, safety latch, and ergonomic carry handle."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Ayesha Khan",
    role: "Pet Owner, Sahiwal",
    petName: "Milo",
    petType: "Persian Cat",
    rating: 5,
    comment: "Best pet clinic in Sahiwal! Very professional, kind staff and excellent care for my cat. Dr. Ahmad explained everything patiently and handled Milo so gently. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    date: "Dec 8, 2026"
  },
  {
    id: "t2",
    author: "Sara Khan",
    role: "Pet Parent, Fareed Town",
    petName: "Bella",
    petType: "Golden Retriever",
    rating: 5,
    comment: "Dr. Ahmad and the team are amazing! They treated my dog with so much care and patience when she had an emergency stomach issue. The clinic is spotless and modern.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    date: "Nov 28, 2026"
  },
  {
    id: "t3",
    author: "Bilal Ahmed",
    role: "Pet Parent, Sahiwal",
    petName: "Rocky",
    petType: "German Shepherd",
    rating: 5,
    comment: "Very professional and friendly team. The clinic is clean, well-equipped with modern diagnostic tools, and the staff truly love animals. My dog actually looks forward to his visits!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    date: "Nov 15, 2026"
  },
  {
    id: "t4",
    author: "Ayesha Malik",
    role: "Pet Parent, KIPS Road",
    petName: "Snowy",
    petType: "Angora Rabbit",
    rating: 5,
    comment: "Great experience! Finding an exotic pet specialist in Sahiwal was tough until we found Dr. Sana at Vet for Pet Clinic. Snowy received the best preventive care!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    date: "Oct 22, 2026"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I need an appointment for a general checkup?",
    answer: "While walk-ins are welcome for routine checks, we recommend booking an appointment online or calling 0329-0220220 to avoid wait times and ensure your preferred veterinarian is available."
  },
  {
    question: "Do you handle emergency veterinary cases?",
    answer: "Yes, we prioritize urgent and critical cases immediately during our clinic operating hours. Please call 0329-0220220 directly on your way so our medical team can prepare the triage area."
  },
  {
    question: "What vaccinations do puppies and kittens need?",
    answer: "Puppies require core protection against Parvovirus, Distemper, Hepatitis, and Rabies starting from 6-8 weeks. Kittens need FVRCP and Rabies vaccines. Our veterinarians will create a tailored immunization schedule for your pet."
  },
  {
    question: "Can I buy pet food and products directly at the clinic?",
    answer: "Yes! Our clinic houses a fully stocked pet shop with premium authentic cat and dog food brands (Royal Canin, Whiskas, Pedigree), supplements, grooming kits, toys, and carriers. We also offer fast local delivery across Sahiwal."
  },
  {
    question: "Where is the clinic located in Sahiwal?",
    answer: "We are conveniently located at House #220, KIPS Road, Stop #05, Fareed Town, Sahiwal (near KIPS College and Fareed Town Park). Ample parking is available right outside."
  },
  {
    question: "How long does a typical consultation or checkup take?",
    answer: "A standard comprehensive consultation takes approximately 20 to 30 minutes, allowing our veterinarian sufficient time to examine your pet, answer questions, and formulate a care plan."
  }
];

export const ADMIN_APPOINTMENTS: AdminAppointment[] = [
  {
    id: "app-1",
    petName: "Buddy",
    petType: "Dog (Golden)",
    petAvatar: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80",
    owner: "Ahmed Raza",
    phone: "0300-1234567",
    service: "General Checkup",
    vet: "Dr. Sarah Khan",
    dateTime: "Dec 10, 2026 10:00 AM",
    status: "Completed"
  },
  {
    id: "app-2",
    petName: "Milo",
    petType: "Cat (Persian)",
    petAvatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=80",
    owner: "Fatima Ali",
    phone: "0321-9876543",
    service: "Vaccination",
    vet: "Dr. Ali Raza",
    dateTime: "Dec 10, 2026 11:30 AM",
    status: "In Progress"
  },
  {
    id: "app-3",
    petName: "Bella",
    petType: "Dog (Beagle)",
    petAvatar: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&q=80",
    owner: "Usman Khan",
    phone: "0333-5551234",
    service: "Dental Care",
    vet: "Dr. Sarah Khan",
    dateTime: "Dec 10, 2026 02:00 PM",
    status: "Confirmed"
  },
  {
    id: "app-4",
    petName: "Luna",
    petType: "Cat (Siamese)",
    petAvatar: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=100&q=80",
    owner: "Ayesha Malik",
    phone: "0312-4447788",
    service: "Skin Treatment",
    vet: "Dr. Hira Fatima",
    dateTime: "Dec 10, 2026 03:30 PM",
    status: "Pending"
  },
  {
    id: "app-5",
    petName: "Max",
    petType: "Dog (German Shepherd)",
    petAvatar: "https://images.unsplash.com/photo-1589952283406-b53a7d13d368?auto=format&fit=crop&w=100&q=80",
    owner: "Bilal Ahmed",
    phone: "0345-9988776",
    service: "Surgery Consult",
    vet: "Dr. Ali Raza",
    dateTime: "Dec 10, 2026 04:00 PM",
    status: "Confirmed"
  }
];

export const ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "ord-1",
    orderNumber: "#ORD-1024",
    customer: "Sara Khan",
    itemsCount: 3,
    total: 5600,
    status: "Delivered",
    date: "Dec 10, 2026"
  },
  {
    id: "ord-2",
    orderNumber: "#ORD-1023",
    customer: "Ahmed Raza",
    itemsCount: 2,
    total: 3200,
    status: "Processing",
    date: "Dec 10, 2026"
  },
  {
    id: "ord-3",
    orderNumber: "#ORD-1022",
    customer: "Fatima Ali",
    itemsCount: 5,
    total: 7850,
    status: "Shipped",
    date: "Dec 09, 2026"
  },
  {
    id: "ord-4",
    orderNumber: "#ORD-1021",
    customer: "Usman Khan",
    itemsCount: 1,
    total: 2320,
    status: "Delivered",
    date: "Dec 09, 2026"
  },
  {
    id: "ord-5",
    orderNumber: "#ORD-1020",
    customer: "Ayesha Malik",
    itemsCount: 4,
    total: 4600,
    status: "Pending",
    date: "Dec 08, 2026"
  }
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "inv-1",
    productName: "Royal Canin Cat Food",
    category: "Cat Food",
    stock: 5,
    status: "Low Stock",
    reorderLevel: 10,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: "inv-2",
    productName: "Whiskas Wet Food",
    category: "Cat Food",
    stock: 8,
    status: "Low Stock",
    reorderLevel: 15,
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: "inv-3",
    productName: "Pedigree Adult Dog Food",
    category: "Dog Food",
    stock: 3,
    status: "Low Stock",
    reorderLevel: 8,
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: "inv-4",
    productName: "Cat Scratching Post",
    category: "Cat Accessories",
    stock: 4,
    status: "Low Stock",
    reorderLevel: 6,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: "inv-5",
    productName: "Pet Grooming Brush",
    category: "Grooming",
    stock: 18,
    status: "In Stock",
    reorderLevel: 10,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=80&q=80"
  },
  {
    id: "inv-6",
    productName: "Omega Pet Supplement",
    category: "Supplements",
    stock: 6,
    status: "Low Stock",
    reorderLevel: 12,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=80&q=80"
  }
];

export const VET_SCHEDULE = [
  {
    name: "Dr. Sarah Khan",
    role: "Senior Veterinarian",
    hours: "9:00 AM – 5:30 PM",
    appointmentsCount: 6,
    avatar: "https://images.unsplash.com/photo-1594824813633-91c2f9e42104?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Dr. Ali Raza",
    role: "Veterinarian",
    hours: "9:00 AM – 5:30 PM",
    appointmentsCount: 5,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Dr. Hira Fatima",
    role: "Veterinarian",
    hours: "10:00 AM – 6:00 PM",
    appointmentsCount: 4,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Dr. Usman Malik",
    role: "Surgical Specialist",
    hours: "10:00 AM – 6:00 PM",
    appointmentsCount: 3,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&q=80"
  }
];

export const CUSTOMER_MESSAGES: MessageItem[] = [
  {
    id: "m1",
    sender: "Ayesha Khan",
    senderAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
    message: "Is dog spine health supplement in stock?",
    time: "10:24 AM",
    unreadCount: 2
  },
  {
    id: "m2",
    sender: "Usman Ali",
    senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    message: "Can I reschedule tomorrow's appointment?",
    time: "09:15 AM",
    unreadCount: 1
  },
  {
    id: "m3",
    sender: "Fatima Noor",
    senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    message: "What are your grooming charges for cats?",
    time: "Yesterday"
  },
  {
    id: "m4",
    sender: "Bilal Ahmed",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    message: "Do you offer home visits for senior pets?",
    time: "Yesterday"
  },
  {
    id: "m5",
    sender: "Sara Khan",
    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    message: "Thank you for the great care! 💚",
    time: "Dec 8"
  }
];
