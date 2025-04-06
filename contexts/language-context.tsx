"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "id" | "en"

type Translations = {
  [key: string]: {
    en: string
    id: string
  }
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// All translations
const translations: Translations = {
  // Navigation
  "nav.home": {
    en: "Home",
    id: "Beranda",
  },
  "nav.about": {
    en: "About",
    id: "Tentang",
  },
  "nav.services": {
    en: "Services",
    id: "Layanan",
  },
  "nav.team": {
    en: "Team",
    id: "Tim",
  },
  "nav.contact": {
    en: "Contact",
    id: "Kontak",
  },
  "nav.getStarted": {
    en: "Get Started",
    id: "Mulai",
  },

  // Hero Section
  "hero.title": {
    en: "One-stop solution for your Blockchain and Web3 Needs",
    id: "Solusi lengkap untuk kebutuhan Blockchain dan Web3 Anda",
  },
  "hero.description": {
    en: "BLOCK3 is a leading blockchain technology and development company dedicated to creating innovative solutions that drive business growth.",
    id: "BLOCK3 adalah perusahaan teknologi dan pengembangan blockchain terkemuka yang berdedikasi untuk menciptakan solusi inovatif yang mendorong pertumbuhan bisnis.",
  },
  "hero.services": {
    en: "Our Services",
    id: "Layanan Kami",
  },
  "hero.contactUs": {
    en: "Contact Us",
    id: "Hubungi Kami",
  },

  // About Section
  "about.title": {
    en: "About BLOCK3",
    id: "Tentang BLOCK3",
  },
  "about.subtitle": {
    en: "Our Mission & Vision",
    id: "Misi & Visi Kami",
  },
  "about.description": {
    en: "Empowering businesses with cutting-edge blockchain solutions that enhance security, transparency, and efficiency.",
    id: "Memberdayakan bisnis dengan solusi blockchain mutakhir yang meningkatkan keamanan, transparansi, dan efisiensi.",
  },
  "about.mission.title": {
    en: "Our Mission",
    id: "Misi Kami",
  },
  "about.mission.description": {
    en: "To revolutionize how businesses operate by providing innovative blockchain solutions that address real-world challenges, enhance security, and drive digital transformation.",
    id: "Merevolusi cara bisnis beroperasi dengan menyediakan solusi blockchain inovatif yang mengatasi tantangan dunia nyata, meningkatkan keamanan, dan mendorong transformasi digital.",
  },
  "about.vision.title": {
    en: "Our Vision",
    id: "Visi Kami",
  },
  "about.vision.description": {
    en: "To be the global leader in blockchain technology, creating a future where businesses across all industries leverage the power of decentralized systems to achieve unprecedented levels of efficiency, security, and growth.",
    id: "Menjadi pemimpin global dalam teknologi blockchain, menciptakan masa depan di mana bisnis di semua industri memanfaatkan kekuatan sistem terdesentralisasi untuk mencapai tingkat efisiensi, keamanan, dan pertumbuhan yang belum pernah terjadi sebelumnya.",
  },
  "about.security.title": {
    en: "Security",
    id: "Keamanan",
  },
  "about.security.description": {
    en: "We prioritize the highest standards of security in all our blockchain implementations.",
    id: "Kami memprioritaskan standar keamanan tertinggi dalam semua implementasi blockchain kami.",
  },
  "about.innovation.title": {
    en: "Innovation",
    id: "Inovasi",
  },
  "about.innovation.description": {
    en: "We continuously explore new technologies and approaches to deliver cutting-edge solutions.",
    id: "Kami terus mengeksplorasi teknologi dan pendekatan baru untuk memberikan solusi mutakhir.",
  },
  "about.integrity.title": {
    en: "Integrity",
    id: "Integritas",
  },
  "about.integrity.description": {
    en: "We operate with transparency and honesty in all our business relationships.",
    id: "Kami beroperasi dengan transparansi dan kejujuran dalam semua hubungan bisnis kami.",
  },

  // Services Section
  "services.title": {
    en: "Our Services",
    id: "Layanan Kami",
  },
  "services.subtitle": {
    en: "Blockchain Solutions",
    id: "Solusi Blockchain",
  },
  "services.description": {
    en: "Comprehensive blockchain services tailored to your business needs.",
    id: "Layanan blockchain komprehensif yang disesuaikan dengan kebutuhan bisnis Anda.",
  },
  "services.smartContract.title": {
    en: "Smart Contract Development",
    id: "Pengembangan Smart Contract",
  },
  "services.smartContract.description": {
    en: "Custom smart contracts for automated, secure business processes.",
    id: "Smart contract khusus untuk proses bisnis yang otomatis dan aman.",
  },
  "services.smartContract.content": {
    en: "Our expert developers create secure, efficient smart contracts that automate business processes, reduce costs, and eliminate intermediaries.",
    id: "Pengembang ahli kami menciptakan smart contract yang aman dan efisien yang mengotomatisasi proses bisnis, mengurangi biaya, dan menghilangkan perantara.",
  },
  "services.dapp.title": {
    en: "DApp Development",
    id: "Pengembangan DApp",
  },
  "services.dapp.description": {
    en: "End-to-end decentralized application development services.",
    id: "Layanan pengembangan aplikasi terdesentralisasi end-to-end.",
  },
  "services.dapp.content": {
    en: "We build robust, scalable decentralized applications that provide enhanced security, transparency, and user control.",
    id: "Kami membangun aplikasi terdesentralisasi yang kuat dan dapat diskalakan yang memberikan keamanan, transparansi, dan kontrol pengguna yang ditingkatkan.",
  },
  "services.security.title": {
    en: "Blockchain Security",
    id: "Keamanan Blockchain",
  },
  "services.security.description": {
    en: "Comprehensive security audits and vulnerability assessments.",
    id: "Audit keamanan komprehensif dan penilaian kerentanan.",
  },
  "services.security.content": {
    en: "Our security experts identify and address vulnerabilities in your blockchain implementations to ensure maximum protection.",
    id: "Pakar keamanan kami mengidentifikasi dan mengatasi kerentanan dalam implementasi blockchain Anda untuk memastikan perlindungan maksimal.",
  },
  "services.enterprise.title": {
    en: "Enterprise Blockchain",
    id: "Blockchain Perusahaan",
  },
  "services.enterprise.description": {
    en: "Custom blockchain solutions for enterprise needs.",
    id: "Solusi blockchain khusus untuk kebutuhan perusahaan.",
  },
  "services.enterprise.content": {
    en: "We develop and implement private and consortium blockchains tailored to your organization's specific requirements.",
    id: "Kami mengembangkan dan mengimplementasikan blockchain pribadi dan konsorsium yang disesuaikan dengan kebutuhan spesifik organisasi Anda.",
  },
  "services.consulting.title": {
    en: "Blockchain Consulting",
    id: "Konsultasi Blockchain",
  },
  "services.consulting.description": {
    en: "Strategic guidance for blockchain implementation.",
    id: "Panduan strategis untuk implementasi blockchain.",
  },
  "services.consulting.content": {
    en: "Our consultants help you navigate the blockchain landscape, identify opportunities, and develop effective implementation strategies.",
    id: "Konsultan kami membantu Anda menavigasi lanskap blockchain, mengidentifikasi peluang, dan mengembangkan strategi implementasi yang efektif.",
  },
  "services.tokenization.title": {
    en: "Tokenization",
    id: "Tokenisasi",
  },
  "services.tokenization.description": {
    en: "Asset tokenization and cryptocurrency development.",
    id: "Tokenisasi aset dan pengembangan cryptocurrency.",
  },
  "services.tokenization.content": {
    en: "We help businesses tokenize assets and create custom cryptocurrencies with secure, compliant implementations.",
    id: "Kami membantu bisnis melakukan tokenisasi aset dan membuat cryptocurrency khusus dengan implementasi yang aman dan sesuai.",
  },

  // New service categories
  "services.blockchainAudit.title": {
    en: "Blockchain Audit",
    id: "Audit Blockchain",
  },
  "services.blockchainDevelopment.title": {
    en: "Blockchain Development",
    id: "Pengembangan Blockchain",
  },
  "services.web3Marketing.title": {
    en: "Web3 Marketing Agency",
    id: "Agensi Pemasaran Web3",
  },

  // Blockchain Audit services
  "services.tokenomics.title": {
    en: "Token Economics (Tokenomics) Audit",
    id: "Audit Ekonomi Token (Tokenomics)",
  },
  "services.tokenomics.description": {
    en: "Comprehensive analysis of token economics models to ensure sustainability and value creation.",
    id: "Analisis komprehensif model ekonomi token untuk memastikan keberlanjutan dan penciptaan nilai.",
  },
  "services.smartContractAudit.title": {
    en: "Smart Contract Audit",
    id: "Audit Smart Contract",
  },
  "services.smartContractAudit.description": {
    en: "Thorough review of smart contract code to identify vulnerabilities and ensure security.",
    id: "Peninjauan menyeluruh kode smart contract untuk mengidentifikasi kerentanan dan memastikan keamanan.",
  },
  "services.penetrationTesting.title": {
    en: "Penetration Testing",
    id: "Pengujian Penetrasi",
  },
  "services.penetrationTesting.description": {
    en: "Simulated cyber attacks to identify and address security weaknesses in blockchain systems.",
    id: "Simulasi serangan cyber untuk mengidentifikasi dan mengatasi kelemahan keamanan dalam sistem blockchain.",
  },
  "services.compliance.title": {
    en: "Compliance, AML, Risk Management",
    id: "Kepatuhan, AML, Manajemen Risiko",
  },
  "services.compliance.description": {
    en: "Ensuring blockchain solutions meet regulatory requirements and manage risks effectively.",
    id: "Memastikan solusi blockchain memenuhi persyaratan regulasi dan mengelola risiko secara efektif.",
  },

  // Blockchain Development services
  "services.consulting.title": {
    en: "Consulting",
    id: "Konsultasi",
  },
  "services.consulting.description": {
    en: "Expert guidance on blockchain implementation strategies tailored to your business needs.",
    id: "Panduan ahli tentang strategi implementasi blockchain yang disesuaikan dengan kebutuhan bisnis Anda.",
  },
  "services.research.title": {
    en: "Research",
    id: "Penelitian",
  },
  "services.research.description": {
    en: "In-depth analysis of blockchain technologies and their potential applications for your industry.",
    id: "Analisis mendalam tentang teknologi blockchain dan potensi aplikasinya untuk industri Anda.",
  },
  "services.softwareDev.title": {
    en: "Software Development & Maintenance",
    id: "Pengembangan & Pemeliharaan Perangkat Lunak",
  },
  "services.softwareDev.description": {
    en: "Custom blockchain solution development with ongoing support and maintenance.",
    id: "Pengembangan solusi blockchain kustom dengan dukungan dan pemeliharaan berkelanjutan.",
  },
  "services.advisory.title": {
    en: "Advisory",
    id: "Penasehat",
  },
  "services.advisory.description": {
    en: "Strategic guidance on blockchain adoption and integration with existing systems.",
    id: "Panduan strategis tentang adopsi blockchain dan integrasi dengan sistem yang ada.",
  },

  // Web3 Marketing Agency services
  "services.communityBuilding.title": {
    en: "Community Building",
    id: "Pembangunan Komunitas",
  },
  "services.communityBuilding.description": {
    en: "Creating and nurturing engaged communities around your blockchain project.",
    id: "Menciptakan dan memelihara komunitas yang terlibat di sekitar proyek blockchain Anda.",
  },
  "services.investorExposure.title": {
    en: "Exposure to Investors",
    id: "Eksposur kepada Investor",
  },
  "services.investorExposure.description": {
    en: "Connecting your project with potential investors and funding opportunities.",
    id: "Menghubungkan proyek Anda dengan investor potensial dan peluang pendanaan.",
  },
  "services.marketingStrategy.title": {
    en: "Marketing Strategy & Execution",
    id: "Strategi & Eksekusi Pemasaran",
  },
  "services.marketingStrategy.description": {
    en: "Comprehensive marketing plans designed specifically for blockchain and Web3 projects.",
    id: "Rencana pemasaran komprehensif yang dirancang khusus untuk proyek blockchain dan Web3.",
  },
  "services.salesStrategy.title": {
    en: "Sales Strategy & Execution",
    id: "Strategi & Eksekusi Penjualan",
  },
  "services.salesStrategy.description": {
    en: "Effective sales approaches to drive adoption and revenue for your blockchain solution.",
    id: "Pendekatan penjualan efektif untuk mendorong adopsi dan pendapatan untuk solusi blockchain Anda.",
  },

  // Team Section
  "team.title": {
    en: "Our Team",
    id: "Tim Kami",
  },
  "team.subtitle": {
    en: "Meet Our Experts",
    id: "Temui Para Ahli Kami",
  },
  "team.description": {
    en: "A team of passionate blockchain professionals dedicated to your success.",
    id: "Tim profesional blockchain yang berdedikasi untuk kesuksesan Anda.",
  },
  "team.ceo": {
    en: "CEO & Founder",
    id: "CEO & Pendiri",
  },
  "team.cto": {
    en: "CTO",
    id: "CTO",
  },
  "team.lead": {
    en: "Lead Blockchain Developer",
    id: "Pengembang Blockchain Utama",
  },

  // Contact Section
  "contact.title": {
    en: "Contact Us",
    id: "Hubungi Kami",
  },
  "contact.subtitle": {
    en: "Get In Touch",
    id: "Hubungi Kami",
  },
  "contact.description": {
    en: "Ready to transform your business with blockchain technology? Contact us today.",
    id: "Siap untuk mentransformasi bisnis Anda dengan teknologi blockchain? Hubungi kami hari ini.",
  },
  "contact.info.title": {
    en: "Contact Information",
    id: "Informasi Kontak",
  },
  "contact.info.description": {
    en: "We're here to answer your questions and discuss how BLOCK3 can help your business leverage blockchain technology.",
    id: "Kami siap menjawab pertanyaan Anda dan mendiskusikan bagaimana BLOCK3 dapat membantu bisnis Anda memanfaatkan teknologi blockchain.",
  },
  "contact.form.title": {
    en: "Send Us a Message",
    id: "Kirim Pesan Kepada Kami",
  },
  "contact.form.description": {
    en: "Fill out the form below and we'll get back to you as soon as possible.",
    id: "Isi formulir di bawah ini dan kami akan menghubungi Anda sesegera mungkin.",
  },
  "contact.form.firstName": {
    en: "First Name",
    id: "Nama Depan",
  },
  "contact.form.lastName": {
    en: "Last Name",
    id: "Nama Belakang",
  },
  "contact.form.email": {
    en: "Email",
    id: "Email",
  },
  "contact.form.message": {
    en: "Message",
    id: "Pesan",
  },
  "contact.form.send": {
    en: "Send Message",
    id: "Kirim Pesan",
  },
  "contact.form.firstNamePlaceholder": {
    en: "Enter your first name",
    id: "Masukkan nama depan Anda",
  },
  "contact.form.lastNamePlaceholder": {
    en: "Enter your last name",
    id: "Masukkan nama belakang Anda",
  },
  "contact.form.emailPlaceholder": {
    en: "Enter your email",
    id: "Masukkan email Anda",
  },
  "contact.form.messagePlaceholder": {
    en: "Enter your message",
    id: "Masukkan pesan Anda",
  },

  // Footer
  "footer.rights": {
    en: "All rights reserved.",
    id: "Seluruh hak cipta dilindungi.",
  },
  "footer.language": {
    en: "Language",
    id: "Bahasa",
  },
  "theme.light": {
    en: "Light",
    id: "Terang",
  },
  "theme.dark": {
    en: "Dark",
    id: "Gelap",
  },
  "theme.system": {
    en: "System",
    id: "Sistem",
  },

  // Mobile Menu
  "mobileMenu.open": {
    en: "Open menu",
    id: "Buka menu",
  },
  "mobileMenu.close": {
    en: "Close menu",
    id: "Tutup menu",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

