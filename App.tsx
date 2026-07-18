
import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { motion } from 'motion/react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, BarChart, Bar, ComposedChart } from 'recharts';
import { 
  Home, 
  Compass, 
  ShoppingBag, 
  Wallet, 
  User, 
  Shield, 
  ShieldCheck, 
  Bell, 
  Plus, 
  Image as ImageIcon, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Check,
  Edit3,
  Slash,
  UserPlus,
  Search,
  ArrowUpRight,
  TrendingUp,
  Music,
  Camera,
  Settings,
  HelpCircle,
  UserCheck,
  Users,
  Play,
  Pause,
  Volume2,
  LogOut,
  Lock,
  Download,
  FileText,
  BarChart2,
  ListMusic,
  FolderHeart,
  PieChart as PieIcon,
  Sun,
  Moon,
  Printer,
  Copy,
  CheckCircle
} from 'lucide-react';

import { 
  MapPin, 
  Star, 
  Ticket, 
  Sparkles, 
  Filter, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Bookmark, 
  AlertCircle, 
  Info,
  Map,
  Utensils,
  Bed,
  ArrowUpDown,
  DollarSign,
  Trash2,
  Phone,
  Store,
  Tag,
  X,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  Send,
  Minus,
  History,
  Receipt,
  QrCode,
  Coins,
  TrendingDown,
  Briefcase,
  RefreshCw,
  FileDown,
  Maximize2,
  Minimize2,
  Navigation,
  Eye,
  EyeOff,
  Car
} from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  category: "Budaya" | "Konservasi" | "Air Terjun" | "Danau" | "Pegunungan" | "Hutan Adat";
  location: string;
  description: string;
  longDescription: string;
  image: string;
  rating: number;
  ticketPrice: number;
  ticketPriceStr: string;
  bestSeason: string;
  travelTime: string;
  travelMinutes: number;
  features: string[];
  mapX: number;
  mapY: number;
  gallery: string[];
  packagePrice: number;
  packagePriceStr: string;
  packageInclusions: string[];
  packageDescription: string;
}

export interface CraftUMKM {
  id: number;
  name: string;
  owner: string;
  category: "Tenun Doyo" | "Anyaman Rotan" | "Manik-manik" | "Seni Ukir";
  description: string;
  location: string;
  distanceFromDest: string;
  phone: string;
  mapX: number;
  mapY: number;
  image: string;
  associatedDestinationId: number;
  featuredProduct: string;
  priceRange: string;
  operatingHours: string;
}

export const KUBAR_CRAFT_UMKMS: CraftUMKM[] = [
  {
    id: 101,
    name: "Tenun Ulap Doyo Isuy Mandiri",
    owner: "Ibu Maria Luhat",
    category: "Tenun Doyo",
    description: "Pembuat kerajinan asli kain tenun tradisional dari serat daun Doyo dengan pewarnaan alami tumbuhan hutan Kalimantan.",
    location: "Kampung Tanjung Isuy, Jempang",
    distanceFromDest: "150 meter dari Lamin Mancong",
    phone: "0812-5555-8899",
    mapX: 79.5,
    mapY: 77.5,
    image: "https://images.unsplash.com/photo-1584184924103-e310d9d8555e?w=400&q=80",
    associatedDestinationId: 1, // Lamin Mancong
    featuredProduct: "Sarung Tenun Ulap Doyo",
    priceRange: "Rp 150.000 - Rp 850.000",
    operatingHours: "08:00 - 17:00 WITA"
  },
  {
    id: 102,
    name: "Prajurit Manik Jempang",
    owner: "Ibu Kristina",
    category: "Manik-manik",
    description: "Pusat kerajinan aksesori manik khas Dayak Dayak Benuaq mulai dari kalung, bando adat, rompi, hingga hiasan dinding.",
    location: "Kampung Tanjung Isuy, Jempang",
    distanceFromDest: "250 meter dari Lamin Mancong",
    phone: "0813-2244-1100",
    mapX: 76.5,
    mapY: 74.5,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    associatedDestinationId: 1, // Lamin Mancong
    featuredProduct: "Kalung Manik-manik Benuaq",
    priceRange: "Rp 35.000 - Rp 250.000",
    operatingHours: "08:00 - 18:00 WITA"
  },
  {
    id: 103,
    name: "Sape' & Ukir Kayu Lamin Isuy",
    owner: "Bapak Samuel",
    category: "Seni Ukir",
    description: "Sanggar pembuatan alat musik petik Sape' Dayak dan ukiran miniatur rumah lamin dari kayu ulin asli.",
    location: "Kecamatan Jempang",
    distanceFromDest: "400 meter dari Danau Jempang",
    phone: "0812-4444-5555",
    mapX: 86.5,
    mapY: 67.0,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80",
    associatedDestinationId: 4, // Danau Jempang
    featuredProduct: "Alat Musik Sape' Dayak",
    priceRange: "Rp 800.000 - Rp 3.500.000",
    operatingHours: "09:00 - 17:00 WITA (Minggu Libur)"
  },
  {
    id: 104,
    name: "Rotan Indah Sekolaq Darat",
    owner: "Ibu Monica",
    category: "Anyaman Rotan",
    description: "Pengrajin spesialis anyaman rotan berkualitas tinggi seperti tas anjat, tikar rotan, lampit, dan topi caping adat.",
    location: "Kecamatan Sekolaq Darat",
    distanceFromDest: "200 meter dari Cagar Alam Kersik Luway",
    phone: "0812-5555-8899",
    mapX: 53.5,
    mapY: 57.0,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80",
    associatedDestinationId: 2, // Kersik Luway
    featuredProduct: "Tas Anjat Rotan Asli",
    priceRange: "Rp 75.000 - Rp 300.000",
    operatingHours: "08:00 - 16:30 WITA"
  },
  {
    id: 105,
    name: "Ukiran Mandau & Tameng Bigung",
    owner: "Bapak Yohanes",
    category: "Seni Ukir",
    description: "Pengerjaan senjata tradisional Mandau Dayak yang dihiasi ukiran bulu enggang serta tameng kayu pelindung adat.",
    location: "Kampung Linggang Bigung",
    distanceFromDest: "300 meter dari Hutan Adat Hemaq Beniung",
    phone: "0852-1111-2222",
    mapX: 29.5,
    mapY: 50.0,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    associatedDestinationId: 6, // Hemaq Beniung
    featuredProduct: "Gagang Mandau Ukir Ulin",
    priceRange: "Rp 250.000 - Rp 1.500.000",
    operatingHours: "09:00 - 18:00 WITA"
  },
  {
    id: 106,
    name: "Kriya Bambu & Serat Linggang",
    owner: "Bapak Markus",
    category: "Anyaman Rotan",
    description: "Pembuatan aneka wadah bambu serbaguna, saringan tradisional, serta topi rimba khas suku Dayak Tunjung.",
    location: "Kampung Linggang Bigung",
    distanceFromDest: "500 meter dari Air Terjun Jantur Mecu",
    phone: "0813-9999-8888",
    mapX: 23.5,
    mapY: 26.5,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
    associatedDestinationId: 3, // Jantur Mecu
    featuredProduct: "Keranjang Bambu Selendang",
    priceRange: "Rp 50.000 - Rp 180.000",
    operatingHours: "08:00 - 17:00 WITA"
  },
  {
    id: 107,
    name: "Manik & Rajut Temula Lestari",
    owner: "Ibu Paulina",
    category: "Manik-manik",
    description: "Menggabungkan seni manik-manik modern dengan rajutan tradisional menciptakan tas kasual bermotif etnik Dayak.",
    location: "Kampung Temula",
    distanceFromDest: "350 meter dari Air Terjun Jantur Inar",
    phone: "0853-4444-9999",
    mapX: 47.0,
    mapY: 33.5,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    associatedDestinationId: 5, // Jantur Inar
    featuredProduct: "Tas Rajut Kombinasi Manik",
    priceRange: "Rp 120.000 - Rp 400.000",
    operatingHours: "08:30 - 17:30 WITA"
  }
];

const KUBAR_PRESET_SCENERIES = [
  {
    name: "Jembatan Aji Tulur Jejangkat",
    url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
    desc: "Keindahan jembatan megah di hulu Sungai Mahakam"
  },
  {
    name: "Cagar Alam Kersik Luway",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    desc: "Rumah Anggrek Hitam langka di tengah hutan"
  },
  {
    name: "Danau Jempang",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    desc: "Hamparan air danau purba dengan kehidupan adat Dayak"
  },
  {
    name: "Sungai Mahakam Melak",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    desc: "Aliran air yang membelah pedalaman Kutai Barat"
  },
  {
    name: "Hutan Adat Kampung Sentiyu",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    desc: "Pepohonan rimbun tempat rotan dan ulin tumbuh"
  }
];

const KUBAR_DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Lamin Mancong",
    category: "Budaya",
    location: "Tanjung Isuy, Jempang",
    description: "Rumah panggung kayu ulin tradisional suku Dayak Benuaq yang megah berusia ratusan tahun dengan ukiran patung Belontang.",
    longDescription: "Lamin Mancong adalah salah satu warisan budaya Dayak Benuaq paling ikonik di Kalimantan Timur. Terdiri dari bangunan kayu ulin dua tingkat yang dipenuhi ukiran ukiran khas, patung-patung leluhur (Belontang) di depannya berfungsi untuk upacara adat ritual kematian Kwangkey. Tempat ini sangat populer untuk belajar sejarah adat serta pertunjukan tari tradisional Dayak.",
    image: "/src/assets/images/lamin_mancong_1783580148459.jpg",
    rating: 4.8,
    ticketPrice: 15000,
    ticketPriceStr: "Rp 15.000",
    bestSeason: "April - Oktober (saat ada festival adat)",
    travelTime: "3 Jam dari Sendawar",
    travelMinutes: 180,
    features: ["Sejarah Dayak", "Seni Ukir", "Tari Tradisional", "Edukasi Budaya"],
    mapX: 78,
    mapY: 76,
    gallery: ["/src/assets/images/lamin_mancong_alt_1783581083282.jpg"],
    packagePrice: 450000,
    packagePriceStr: "Rp 450.000 / org",
    packageInclusions: ["Menginap di Lamin Adat (Tidur)", "Makan Tradisional Dayak 3x", "Sewa Baju Adat Foto Sesi", "Pemandu Ritual Kwangkey"],
    packageDescription: "Rasakan sensasi otentik bermalam berselimut ulin kuno di Rumah Lamin Mancong asli. Sudah termasuk suguhan masakan khas Dayak Benuaq (makan) dan penginapan lamin adat (tidur)."
  },
  {
    id: 2,
    name: "Cagar Alam Kersik Luway",
    category: "Konservasi",
    location: "Sekolaq Darat",
    description: "Cagar alam unik habitat asli dari Anggrek Hitam raksasa yang langka tumbuh subur di tanah pasir putih hutan padang kersik.",
    longDescription: "Kersik Luway merupakan cagar alam seluas 5.000 hektar yang terkenal secara internasional karena menyimpan puluhan spesies anggrek liar. Bintang utamanya adalah Anggrek Hitam (Coelogyne pandurata) yang mekar indah dengan lidah berwarna hitam beludru eksotis. Berjalan di atas tanah pasir putih yang dikelilingi vegetasi unik memberikan sensasi petualangan yang damai.",
    image: "/src/assets/images/kersik_luway_1783580166646.jpg",
    rating: 4.7,
    ticketPrice: 10000,
    ticketPriceStr: "Rp 10.000",
    bestSeason: "Maret - Juni (saat musim mekar anggrek)",
    travelTime: "30 Menit dari Sendawar",
    travelMinutes: 30,
    features: ["Anggrek Hitam", "Padang Pasir Putih", "Fotografi Alam", "Flora Langka"],
    mapX: 52,
    mapY: 55,
    gallery: ["/src/assets/images/kersik_luway_alt_1783581097028.jpg"],
    packagePrice: 350000,
    packagePriceStr: "Rp 350.000 / org",
    packageInclusions: ["Menginap di Guesthouse Terdekat (Tidur)", "Makan Siang Prasmanan Khas Kutai", "Edukasi Spesialis Anggrek", "Transportasi Sendawar PP"],
    packageDescription: "Paket tur ramah lingkungan untuk eksplorasi anggrek liar di padang kersik pasir putih. Termasuk akomodasi penginapan nyaman (tidur) dan santap kuliner prasmanan khas Kutai (makan)."
  },
  {
    id: 3,
    name: "Air Terjun Jantur Mecu",
    category: "Air Terjun",
    location: "Kampung Linggang Bigung",
    description: "Pesona air terjun alami nan tersembunyi di Linggang Bigung dengan kolam renang alami yang menyegarkan di kelilingi tebing hijau.",
    longDescription: "Jantur Mecu adalah permata tersembunyi di Kecamatan Linggang Bigung. Air terjun ini mengalir jernih melewati bebatuan karst besar ke dalam kolam alami di bawahnya. Sangat cocok untuk berenang, bersantai menikmati suasana hutan tropis yang sejuk, serta mendengarkan nyanyian burung hutan Kalimantan.",
    image: "/src/assets/images/jantur_mecu_1783580178250.jpg",
    rating: 4.9,
    ticketPrice: 5000,
    ticketPriceStr: "Rp 5.000",
    bestSeason: "Sepanjang Tahun (paling indah setelah hujan sedang)",
    travelTime: "45 Menit dari Sendawar",
    travelMinutes: 45,
    features: ["Berenang", "Tebing Batu", "Hutan Tropis", "Spot Foto"],
    mapX: 25,
    mapY: 28,
    gallery: ["/src/assets/images/jantur_mecu_alt_1783581109259.jpg"],
    packagePrice: 250000,
    packagePriceStr: "Rp 250.000 / org",
    packageInclusions: ["Tenda Dome Camping Tepi Sungai (Tidur)", "Makan BBQ Ikan Bakar Sungai 2x", "Sewa Hammock & Ban Karet", "Pemandu Keselamatan"],
    packageDescription: "Menyatu dengan alam lewat paket camping tepi sungai berderu. Paket ini sudah mencakup tenda dome siap pakai (tidur), serta santap malam BBQ ikan patin sungai bakar khas Mahakam (makan)."
  },
  {
    id: 4,
    name: "Danau Jempang",
    category: "Danau",
    location: "Kecamatan Jempang",
    description: "Danau raksasa Kalimantan Timur dengan kehidupan nelayan terapung, pemandangan matahari terbenam magis, dan burung migran.",
    longDescription: "Danau Jempang adalah danau air tawar terbesar di aliran Sungai Mahakam. Memiliki luas sekitar 15.000 hektar, danau ini menawarkan pengalaman menaiki perahu ces (perahu kayu tradisional) melintasi perkampungan nelayan terapung di Tanjung Isuy. Jika beruntung, Anda bisa melihat kawanan burung air langka migran serta pesut mahakam.",
    image: "/src/assets/images/danau_jempang_1783580190817.jpg",
    rating: 4.9,
    ticketPrice: 0,
    ticketPriceStr: "Gratis (Sewa Perahu Menyesuaikan)",
    bestSeason: "Juni - September (saat debit air stabil)",
    travelTime: "2.5 Jam dari Sendawar",
    travelMinutes: 150,
    features: ["Susur Perahu", "Sunset View", "Fauna Danau", "Kampung Apung"],
    mapX: 85,
    mapY: 65,
    gallery: ["/src/assets/images/danau_jempang_alt_1783581121828.jpg"],
    packagePrice: 550000,
    packagePriceStr: "Rp 550.000 / org",
    packageInclusions: ["Homestay Apung Nelayan Danau (Tidur)", "Kuliner Nelayan Ikan Bakar Danau 3x", "Sewa Perahu Ces Eksklusif", "Tur Susur Perkampungan"],
    packageDescription: "Menginap di atas rumah apung nelayan di tengah Danau Jempang yang tenang (tidur), nikmati hidangan ikan nila dan baung tangkapan segar yang dibakar di tempat (makan), serta susuri danau luas."
  },
  {
    id: 5,
    name: "Air Terjun Jantur Inar",
    category: "Air Terjun",
    location: "Kampung Temula",
    description: "Air terjun megah setinggi 30 meter berkabut embun yang dikelilingi hutan rimbun dan tangga petualangan yang eksotis.",
    longDescription: "Jantur Inar menyuguhkan keindahan air terjun setinggi lebih dari 30 meter yang jatuh menghantam bebatuan besar, menciptakan embun sejuk di sekelilingnya. Untuk mencapainya, pengunjung berjalan kaki menyusuri anak tangga kayu ulin di tengah hutan bambu dan vegetasi hutan hujan tropis Kutai Barat yang lebat.",
    image: "/src/assets/images/jantur_inar_1783580206224.jpg",
    rating: 4.8,
    ticketPrice: 5000,
    ticketPriceStr: "Rp 5.000",
    bestSeason: "Desember - Mei (musim air melimpah)",
    travelTime: "25 Menit dari Sendawar",
    travelMinutes: 25,
    features: ["Trekking Tangga", "Kabut Pelangi", "Hutan Bambu", "Suasana Sejuk"],
    mapX: 45,
    mapY: 35,
    gallery: ["/src/assets/images/jantur_inar_alt_1783581133743.jpg"],
    packagePrice: 300000,
    packagePriceStr: "Rp 300.000 / org",
    packageInclusions: ["Menginap di Guesthouse Temula (Tidur)", "Makan Tradisional Nasi Bambu 2x", "Akses Gazebo VIP & Kopi Aren", "Pemandu Foto & Trekking"],
    packageDescription: "Bebaskan penat dengan udara pegunungan yang segar. Paket memanjakan Anda dengan guesthouse estetik dekat lokasi (tidur), makan siang nasi liwet di dalam bambu bakar (makan), dan kopi aren hangat."
  },
  {
    id: 6,
    name: "Hutan Adat Hemaq Beniung",
    category: "Hutan Adat",
    location: "Kampung Linggang Bigung",
    description: "Hutan lindung adat yang dijaga ketat oleh masyarakat adat Dayak, kaya akan tanaman obat tradisional dan pohon madu raksasa.",
    longDescription: "Hemaq Beniung adalah bentuk pelestarian alam berbasis kearifan lokal Dayak di Linggang Bigung. Hutan seluas puluhan hektar ini menjadi rumah bagi aneka jenis kayu berharga seperti ulin, meranti, serta tempat bersarangnya lebah madu hutan pada pohon banggeris raksasa. Wisawan dapat melakukan jungle trekking berpanduan lokal.",
    image: "/src/assets/images/hemaq_beniung_1783580217760.jpg",
    rating: 4.7,
    ticketPrice: 10000,
    ticketPriceStr: "Rp 10.000",
    bestSeason: "Mei - Oktober",
    travelTime: "40 Menit dari Sendawar",
    travelMinutes: 40,
    features: ["Jungle Trekking", "Edukasi Herbal", "Pohon Banggeris", "Burung Enggang"],
    mapX: 28,
    mapY: 48,
    gallery: ["/src/assets/images/hemaq_beniung_alt_1783581149087.jpg"],
    packagePrice: 400000,
    packagePriceStr: "Rp 400.000 / org",
    packageInclusions: ["Glamping Luxury di Area Adat (Tidur)", "Makan Malam Api Unggun Tradisional", "Edukasi Herbal Berpanduan Tetua", "Madu Hutan Asli Kupas Langsung"],
    packageDescription: "Petualangan edukatif yang menenangkan jiwa. Berkemah mewah (glamping) di bawah tajuk kanopi pohon raksasa (tidur), nikmati makan malam khas Dayak di depan api unggun hangat (makan), dan edukasi herbal adat."
  }
];

export interface KubarEvent {
  id: number;
  name: string;
  dateStr: string;
  day: number;
  daysRange: number[];
  month: number; // 7 = July, 8 = August
  year: number;
  location: string;
  destinationId: number;
  description: string;
  time: string;
  priceStr: string;
}

export const KUBAR_EVENTS: KubarEvent[] = [
  {
    id: 1,
    name: "Ritual Adat Belian Sentiyu",
    dateStr: "12 - 15 Juli 2026",
    day: 12,
    daysRange: [12, 13, 14, 15],
    month: 7,
    year: 2026,
    location: "Kampung Linggang Bigung",
    destinationId: 6,
    description: "Upacara syukur suku Dayak atas hasil panen buah-buahan hutan liar dan panen madu lebah pohon banggeris raksasa.",
    time: "09:00 - Selesai",
    priceStr: "Gratis (Terbuka untuk Umum)"
  },
  {
    id: 2,
    name: "Festival Mekar Anggrek Hitam",
    dateStr: "22 - 25 Juli 2026",
    day: 22,
    daysRange: [22, 23, 24, 25],
    month: 7,
    year: 2026,
    location: "Cagar Alam Kersik Luway",
    destinationId: 2,
    description: "Pekan ekowisata merayakan puncak mekar anggrek hitam liar di kawasan cagar alam padang kersik pasir putih.",
    time: "08:00 - 17:00 WITA",
    priceStr: "Termasuk tiket masuk cagar alam"
  },
  {
    id: 3,
    name: "Upacara Kematian Kwangkey",
    dateStr: "10 - 14 Agustus 2026",
    day: 10,
    daysRange: [10, 11, 12, 13, 14],
    month: 8,
    year: 2026,
    location: "Rumah Lamin Mancong, Jempang",
    destinationId: 1,
    description: "Upacara sakral ritual kematian tingkat akhir suku Dayak Benuaq untuk menghormati dan mengantar arwah ke alam baka.",
    time: "Sepanjang Hari",
    priceStr: "Donasi Sukarela Adat"
  },
  {
    id: 4,
    name: "Parade Perahu Hias Jempang",
    dateStr: "22 - 24 Agustus 2026",
    day: 22,
    daysRange: [22, 23, 24],
    month: 8,
    year: 2026,
    location: "Kampung Tanjung Isuy, Danau Jempang",
    destinationId: 4,
    description: "Parade tahunan perahu tradisional (ces) berhias janur dan pernak-pernik khas Dayak menyusuri danau luas saat sunset.",
    time: "15:30 - 18:00 WITA",
    priceStr: "Sewa perahu mulai Rp 50.000"
  }
];

const getRelativeTime = (timestampStr: string): string => {
  if (!timestampStr) return "baru saja";
  
  const cleanStr = timestampStr.trim().toLowerCase();
  if (cleanStr === "just now" || cleanStr === "baru saja") {
    return "baru saja";
  }
  if (cleanStr === "kemarin") {
    return "kemarin";
  }
  
  // Parse shorthand like "2h ago", "5m ago", "1h ago"
  const shorthandMatch = cleanStr.match(/^(\d+)([hm])\s+ago$/);
  if (shorthandMatch) {
    const value = parseInt(shorthandMatch[1], 10);
    const unit = shorthandMatch[2];
    if (unit === 'h') {
      return `${value} jam yang lalu`;
    } else if (unit === 'm') {
      return `${value} menit yang lalu`;
    }
  }

  // Parse shorthand like "2j yang lalu", "5j yang lalu"
  const shorthandIdMatch = cleanStr.match(/^(\d+)([jm])\s+yang\s+lalu$/);
  if (shorthandIdMatch) {
    const value = parseInt(shorthandIdMatch[1], 10);
    const unit = shorthandIdMatch[2];
    if (unit === 'j') {
      return `${value} jam yang lalu`;
    } else if (unit === 'm') {
      return `${value} menit yang lalu`;
    }
  }

  const parsedMs = Date.parse(timestampStr);
  if (isNaN(parsedMs)) {
    return timestampStr;
  }

  const now = Date.now();
  const diffMs = now - parsedMs;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return "baru saja";
  } else if (diffMin < 60) {
    return `${diffMin} menit yang lalu`;
  } else if (diffHour < 24) {
    return `${diffHour} jam yang lalu`;
  } else if (diffDay === 1) {
    return "kemarin";
  } else if (diffDay < 30) {
    return `${diffDay} hari yang lalu`;
  } else {
    const date = new Date(parsedMs);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }
};

const parseCSV = (text: string) => {
  const lines: string[][] = [];
  let row: string[] = [""];
  let insideQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (insideQuote) {
      if (char === '"') {
        if (nextChar === '"') {
          row[row.length - 1] += '"';
          i++;
        } else {
          insideQuote = false;
        }
      } else {
        row[row.length - 1] += char;
      }
    } else {
      if (char === '"') {
        insideQuote = true;
      } else if (char === ',') {
        row.push("");
      } else if (char === '\r' || char === '\n') {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        lines.push(row);
        row = [""];
      } else {
        row[row.length - 1] += char;
      }
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }

  if (lines.length < 2) return [];

  const headers = lines[0].map(h => h.trim().toLowerCase().replace(/[\s_]+([a-z])/g, (_, g) => g.toUpperCase()));
  
  return lines.slice(1).map(line => {
    const obj: any = {};
    headers.forEach((header, idx) => {
      let key = header;
      if (header === 'id') key = 'id';
      else if (header === 'title') key = 'title';
      else if (header === 'content') key = 'content';
      else if (header === 'category') key = 'category';
      else if (header === 'mood') key = 'mood';
      else if (header === 'createdat' || header === 'created At') key = 'createdAt';

      const val = line[idx];
      obj[key] = val !== undefined ? val.trim() : "";
    });
    return obj;
  });
};

const stringifyCSV = (items: any[]) => {
  const headers = ["ID", "Title", "Content", "Category", "Mood", "Created At"];
  const rows = items.map(item => [
    item.id || "",
    item.title || "",
    item.content || "",
    item.category || "",
    item.mood || "",
    item.createdAt || ""
  ]);

  const escapeCSVField = (val: string) => {
    const str = String(val);
    if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  return [
    headers.join(","),
    ...rows.map(row => row.map(escapeCSVField).join(","))
  ].join("\n");
};

const App = () => {
  // --- Navigation ---
  const [currentPage, setCurrentPage] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  // --- Global State ---
  const [posts, setPosts] = useState<Array<{
    id: number;
    user: string;
    content: string;
    image: string | null;
    likes: number;
    timestamp: string;
    comments: Array<{
      id: number;
      user: string;
      content: string;
      timestamp: string;
    }>;
  }>>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reflections, setReflections] = useState<Array<{
    id: string;
    title: string;
    content: string;
    category: string;
    mood: string;
    createdAt: string;
  }>>([]);
  const [isLoadingReflections, setIsLoadingReflections] = useState(true);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'like', user: 'Sarah J.', content: 'liked your post', timestamp: '5m ago', read: false },
    { id: 2, type: 'follow', user: 'Alex Rivera', content: 'started following you', timestamp: '1h ago', read: true }
  ]);
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('kubar_wallet_balance');
    return saved ? Number(saved) : 18682500;
  });
  const [followerCount, setFollowerCount] = useState(45200);
  const [isFollowing, setIsFollowing] = useState(false);
  const [newPostText, setNewPostText] = useState<string>(() => {
    return localStorage.getItem('kubar_draft_post_text') || '';
  });
  const [newPostImage, setNewPostImage] = useState<string | null>(() => {
    return localStorage.getItem('kubar_draft_post_image') || null;
  });
  const [showPostImagePicker, setShowPostImagePicker] = useState<boolean>(false);

  // --- Bursa Investment Portfolio Alert & Baseline States ---
  const [lastPurchasePortfolioValue, setLastPurchasePortfolioValue] = useState<number>(() => {
    const saved = localStorage.getItem('kubar_last_purchase_portfolio_value');
    if (saved) return Number(saved);
    return 735000;
  });
  const [hasAlertedSinceLastPurchase, setHasAlertedSinceLastPurchase] = useState<boolean>(() => {
    return localStorage.getItem('kubar_has_alerted_10percent') === 'true';
  });

  // --- Community Poll Creator & Voting States ---
  const [showPollCreator, setShowPollCreator] = useState<boolean>(() => {
    return localStorage.getItem('kubar_draft_show_poll_creator') === 'true';
  });
  const [pollQuestion, setPollQuestion] = useState<string>(() => {
    return localStorage.getItem('kubar_draft_poll_question') || '';
  });
  const [pollOptions, setPollOptions] = useState<string[]>(() => {
    const saved = localStorage.getItem('kubar_draft_poll_options');
    return saved ? JSON.parse(saved) : ['', ''];
  });
  const [votedPollIds, setVotedPollIds] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('kubar_voted_poll_ids');
    return saved ? JSON.parse(saved) : {};
  });

  // --- Auto-Save Drafts Effects ---
  useEffect(() => {
    localStorage.setItem('kubar_draft_post_text', newPostText);
  }, [newPostText]);

  useEffect(() => {
    if (newPostImage) {
      localStorage.setItem('kubar_draft_post_image', newPostImage);
    } else {
      localStorage.removeItem('kubar_draft_post_image');
    }
  }, [newPostImage]);

  useEffect(() => {
    localStorage.setItem('kubar_draft_show_poll_creator', String(showPollCreator));
  }, [showPollCreator]);

  useEffect(() => {
    localStorage.setItem('kubar_draft_poll_question', pollQuestion);
  }, [pollQuestion]);

  useEffect(() => {
    localStorage.setItem('kubar_draft_poll_options', JSON.stringify(pollOptions));
  }, [pollOptions]);

  // --- Stories States ---
  interface Story {
    id: number;
    user: string;
    avatar: string;
    image: string;
    caption: string;
    timestamp: string;
    reactions?: Record<string, number>;
  }
  const [stories, setStories] = useState<Story[]>([]);
  const [activeStoryUser, setActiveStoryUser] = useState<string | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [showStoryCreateModal, setShowStoryCreateModal] = useState<boolean>(false);
  const [newStoryImage, setNewStoryImage] = useState<string>('');
  const [newStoryCaption, setNewStoryCaption] = useState<string>('');
  const [showStoryPresetGallery, setShowStoryPresetGallery] = useState<boolean>(false);
  const [floatingReactions, setFloatingReactions] = useState<{ id: number; char: string; left: number }[]>([]);

  const handleReactToStory = async (storyId: number, emoji: string) => {
    try {
      const response = await fetch(`/api/stories/${storyId}/react`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emoji }),
      });
      if (response.ok) {
        const updatedStory = await response.json();
        setStories(prev => prev.map(s => s.id === storyId ? updatedStory : s));
        
        // Trigger a floating particle
        const id = Date.now() + Math.random();
        const left = Math.random() * 60 + 20; // range between 20% and 80%
        setFloatingReactions(prev => [...prev, { id, char: emoji, left }]);
        
        setTimeout(() => {
          setFloatingReactions(prev => prev.filter(r => r.id !== id));
        }, 1600);
      }
    } catch (err) {
      console.error("Failed to react to story:", err);
    }
  };

  const activeStories = activeStoryUser ? stories.filter(s => s.user === activeStoryUser) : [];
  const currentStory = activeStories[activeStoryIndex] || null;

  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});

  // Editing state for posts
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editContentText, setEditContentText] = useState<string>('');

  // Liking state for posts
  const [likedPostIds, setLikedPostIds] = useState<Record<number, boolean>>({});

  // --- Kutai Barat State ---
  const [kubarSearchQuery, setKubarSearchQuery] = useState('');
  const [selectedKubarCategory, setSelectedKubarCategory] = useState('Semua');
  const [kubarSortOption, setKubarSortOption] = useState<'rating' | 'price' | 'distance'>('rating');
  const [kubarItinerary, setKubarItinerary] = useState<number[]>([]);
  const [simulatedDate, setSimulatedDate] = useState({ day: 9, month: 7, year: 2026 }); // Default: 9 Juli 2026 (3 hari sebelum ritual Belian Sentiyu pada 12 Juli)
  const [selectedKubarDest, setSelectedKubarDest] = useState<Destination | null>(null);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [kubarBookings, setKubarBookings] = useState<Array<{
    id: number;
    destId: number;
    destName: string;
    date: string;
    qty: number;
    name: string;
    contact: string;
    status: 'confirmed' | 'active';
    totalPrice: number;
  }>>([
    {
      id: 101,
      destId: 6,
      destName: "Hutan Adat Hemaq Beniung",
      date: "2026-07-12",
      qty: 2,
      name: "Edo Erpani",
      contact: "0812-3456-7890",
      status: 'active',
      totalPrice: 800000
    }
  ]);
  const [showBookingModal, setShowBookingModal] = useState<Destination | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'wallet' | 'va' | 'qris'>('wallet');
  const [isProcessingBookingPayment, setIsProcessingBookingPayment] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: 'Edo Erpani', date: '2026-07-12', qty: 2, contact: '0812-3456-7890' });
  const [exploreSubTab, setExploreSubTab] = useState<'destinations' | 'calendar'>('destinations');
  const [calendarMonth, setCalendarMonth] = useState({ month: 7, year: 2026 }); // July 2026
  const [selectedCalendarEventId, setSelectedCalendarEventId] = useState<number | null>(1); // pre-select Belian Sentiyu
  const [visitedDestIds, setVisitedDestIds] = useState<number[]>([2]); // pre-visit Anggrek Hitam for visual richness
  const [heldDestId, setHeldDestId] = useState<number | null>(null);
  const [heldProgress, setHeldProgress] = useState(0);

  const handleInstantBook = (dest: any) => {
    const totalCost = dest.ticketPrice;
    if (balance < totalCost) {
      triggerPushNotification("❌ Saldo Tidak Cukup", `Gagal melakukan Instant Book. Anda membutuhkan Rp ${totalCost.toLocaleString('id-ID')} tetapi saldo Anda Rp ${balance.toLocaleString('id-ID')}.`, "error");
      return;
    }
    
    setBalance(prev => prev - totalCost);
    
    const newTx = {
      id: Math.floor(100000 + Math.random() * 900000),
      type: 'payment' as const,
      title: `Instant Book: ${dest.name}`,
      amount: -totalCost,
      time: 'Hari ini',
      category: 'Wisata'
    };
    setWalletTransactions(prev => [newTx, ...prev]);

    const bookingId = Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: bookingId,
      destId: dest.id,
      destName: dest.name,
      date: `${simulatedDate.year}-07-12`,
      qty: 1,
      name: profileName,
      contact: '0812-3456-7890',
      status: 'confirmed' as const,
      totalPrice: totalCost
    };
    setKubarBookings(prev => [newBooking, ...prev]);
    triggerPushNotification("⚡ Instant Book Sukses!", `Berhasil memesan tiket ${dest.name} secara instan dengan saldo EunoiaPay!`, "success");
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();
        const now = audioCtx.currentTime;
        const playPluck = (freq: number, delay: number) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.setValueAtTime(freq, now + delay);
          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.18, now + delay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.8);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.9);
        };
        playPluck(330, 0);
        playPluck(440, 0.12);
        playPluck(550, 0.24);
      }
    } catch(e) {}
  };

  // --- Profile View Additional Modal States ---
  const [isRegistered, setIsRegistered] = useState(() => localStorage.getItem('is_registered') === 'true');
  const [authMode, setAuthMode] = useState<'login' | 'register'>(() => {
    const saved = localStorage.getItem('eunoia_saved_accounts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return 'login';
        }
      } catch (e) {}
    }
    return 'register';
  });
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showMusicPlayerModal, setShowMusicPlayerModal] = useState(false);

  // --- Music Playlists types & state ---
  interface Playlist {
    id: string;
    name: string;
    trackIds: number[];
    isSystem?: boolean;
  }

  const KUBAR_TRACKS = [
    { id: 1, name: "Melodi Senja Jempang", notes: [220, 247.5, 275, 330, 371.25, 440], duration: "02:15", category: "Klasik", description: "Melodi klasik Sape' yang menceritakan ketenangan senja di Danau Jempang." },
    { id: 2, name: "Hutan Adat Beniung", notes: [196, 220, 261.63, 293.66, 329.63, 392], duration: "03:02", category: "Alam", description: "Suasana harmoni hutan adat Beniung yang sarat dengan kehidupan liar." },
    { id: 3, name: "Riak Sungai Mahakam", notes: [220, 261.63, 293.66, 349.23, 392, 440], duration: "02:40", category: "Sungai", description: "Menggambarkan riak air Sungai Mahakam yang mengalir tenang membelah Borneo." },
    { id: 4, name: "Pesta Adat Dahau", notes: [293.66, 329.63, 392, 440, 523.25, 587.33], duration: "01:55", category: "Festival", description: "Melodi riang gembira merayakan kesuburan tanah dan panen melimpah." },
    { id: 5, name: "Tari Gong Sentiyu", notes: [164.81, 220, 246.94, 329.63, 392, 440], duration: "03:10", category: "Tari Adat", description: "Iringan sakral Tari Gong untuk menyambut tamu agung di lamin adat Sentiyu." },
    { id: 6, name: "Harmoni Bukit Kelam", notes: [220, 293.66, 329.63, 371.25, 440, 587.33], duration: "02:25", category: "Ritual", description: "Alunan mistis yang dimainkan saat upacara ritual di kaki bukit batu purba." },
    
    // Album: Eunoime
    { id: 7, name: "Arkais", notes: [220, 247.5, 275, 330, 366.6, 440], duration: "02:45", category: "Eunoime - Prolog", description: "Pembuka: Kenangan lama yang terasa antik dan jauh." },
    { id: 8, name: "Ilusi Atma", notes: [220, 275, 330, 343.75, 440, 550], duration: "03:12", category: "Eunoime - Bab I", description: "Saat imajinasi cinta mulai mengaburkan realita." },
    { id: 9, name: "Renjana yang Patah", notes: [196, 220, 246.94, 293.66, 329.63, 392], duration: "02:58", category: "Eunoime - Bab II", description: "Titik di mana ekspektasi hancur berkeping-keping." },
    { id: 10, name: "Palung Nadir", notes: [146.83, 164.81, 196, 220, 246.94, 293.66], duration: "04:05", category: "Eunoime - Bab III", description: "Kehancuran total di titik terendah kehidupan." },
    { id: 11, name: "Aksara Lara", notes: [164.81, 220, 246.94, 275, 330, 440], duration: "03:30", category: "Eunoime - Bab IV", description: "Mengekspresikan kesedihan melalui kata-kata yang sunyi." },
    { id: 12, name: "Anila Musim", notes: [220, 246.94, 293.66, 329.63, 392, 440], duration: "03:15", category: "Eunoime - Bab V", description: "Tahun demi tahun yang berlalu dalam kehampaan." },
    { id: 13, name: "Lini Masa", notes: [220, 261.63, 293.66, 349.23, 392, 440], duration: "02:50", category: "Eunoime - Bab VI", description: "Refleksi atas waktu yang terus berjalan tanpa menunggu." },
    { id: 14, name: "Pendar Sunyi", notes: [293.66, 329.63, 392, 440, 523.25, 587.33], duration: "03:05", category: "Eunoime - Bab VII", description: "Cahaya kecil yang mulai muncul di tengah kesendirian." },
    { id: 15, name: "Amerta", notes: [261.63, 293.66, 329.63, 392, 440, 523.25], duration: "03:40", category: "Eunoime - Bab VIII", description: "Belajar bahwa luka tidak harus abadi jika kita melepaskannya." },
    { id: 16, name: "Nirwana Diri", notes: [220, 277.18, 329.63, 369.99, 440, 554.37], duration: "03:22", category: "Eunoime - Bab IX", description: "Proses berdamai dengan ego dan masa lalu." },
    { id: 17, name: "Saujana Waktu", notes: [220, 246.94, 293.66, 329.63, 392, 440], duration: "03:55", category: "Eunoime - Epilog", description: "Melihat masa depan yang luas tanpa beban kenangan." },
    { id: 18, name: "Adiwarna", notes: [293.66, 329.63, 392, 440, 493.88, 587.33], duration: "04:12", category: "Eunoime - Fin", description: "Penutup: Hidup yang kembali berwarna dengan langkah kaki yang mantap." }
  ];

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem('kubar_playlists');
    let loaded: Playlist[] = [];
    if (saved) {
      try {
        loaded = JSON.parse(saved);
      } catch (e) {}
    }

    const defaultPlaylists = [
      { id: 'all', name: "Semua Lagu", trackIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], isSystem: true },
      { id: 'favorites', name: "Lagu Favorit", trackIds: [1, 3], isSystem: true },
      { id: 'eunoime', name: "Album: Eunoime", trackIds: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], isSystem: true }
    ];

    if (loaded.length > 0) {
      const hasEunoime = loaded.some(p => p.id === 'eunoime');
      let updated = loaded.map(p => {
        if (p.id === 'all') {
          return { ...p, trackIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] };
        }
        return p;
      });
      if (!hasEunoime) {
        updated.push({ id: 'eunoime', name: "Album: Eunoime", trackIds: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], isSystem: true });
      }
      return updated;
    }
    return defaultPlaylists;
  });

  const [activePlaylistId, setActivePlaylistId] = useState<string>('all');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreatePlaylistForm, setShowCreatePlaylistForm] = useState(false);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState<number | null>(null); // holds trackId to add
  const [musicPlayerTab, setMusicPlayerTab] = useState<'playing' | 'playlists'>('playing');

  const [showInboxModal, setShowInboxModal] = useState(false);
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profile_name') || 'Edo Erpani');
  const [profileLocation, setProfileLocation] = useState(() => localStorage.getItem('profile_location') || 'Kalimantan, Indonesia');
  const [profilePhoto, setProfilePhoto] = useState(() => localStorage.getItem('profile_photo') || 'https://placehold.co/200?text=EDO');
  const [activeSettingsTab, setActiveSettingsTab] = useState<'profile' | 'info' | 'assets' | 'general' | 'privacy' | 'faq' | 'logout'>('profile');
  const [faqExpandedIdx, setFaqExpandedIdx] = useState<number | null>(null);
  const [settingsLanguage, setSettingsLanguage] = useState<'ID' | 'EN'>('ID');
  const [settingsHaptic, setSettingsHaptic] = useState(true);
  const [blessingsUnlocked, setBlessingsUnlocked] = useState<string[]>(() => {
    const saved = localStorage.getItem('kubar_unlocked_blessings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kubar_unlocked_blessings', JSON.stringify(blessingsUnlocked));
  }, [blessingsUnlocked]);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('kubar_theme') as 'light' | 'dark') || 'dark');

  useEffect(() => {
    localStorage.setItem('kubar_theme', theme);
    const existing = document.getElementById('theme-override-styles');
    if (existing) {
      existing.remove();
    }

    if (theme === 'light') {
      const style = document.createElement('style');
      style.id = 'theme-override-styles';
      style.innerHTML = `
        body {
          background-color: #f8fafc !important;
          color: #0f172a !important;
        }
        header, main, nav, div, section, p, span, h1, h2, h3, h4, h5, h6, select, input, textarea, button {
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.15s ease;
        }
        .bg-neutral-900, .bg-\\[\\#171717\\], .bg-neutral-900\\/80 {
          background-color: #f1f5f9 !important;
        }
        .bg-neutral-800, .bg-neutral-800\\/80, .bg-neutral-800\\/90 {
          background-color: #ffffff !important;
          border-color: #e2e8f0 !important;
        }
        .bg-neutral-950, .bg-neutral-950\\/80, .bg-neutral-950\\/50 {
          background-color: #f8fafc !important;
          border-color: #cbd5e1 !important;
        }
        .bg-neutral-700, .bg-neutral-700\\/50, .bg-neutral-700\\/30 {
          background-color: #e2e8f0 !important;
        }
        .text-white {
          color: #0f172a !important;
        }
        .text-gray-300 {
          color: #1e293b !important;
        }
        .text-gray-400 {
          color: #475569 !important;
        }
        .text-gray-500 {
          color: #64748b !important;
        }
        .text-neutral-400 {
          color: #334155 !important;
        }
        .border-neutral-800, .border-neutral-700\\/20, .border-neutral-800\\/50, .border-neutral-800\\/60, .border-neutral-700\\/50, .border-neutral-700 {
          border-color: #e2e8f0 !important;
        }
        .neu-flat {
          box-shadow: 6px 6px 12px #cbd5e1, -6px -6px 12px #ffffff !important;
        }
        .neu-pressed {
          box-shadow: inset 3px 3px 6px #cbd5e1, inset -3px -3px 6px #ffffff !important;
        }
        .neu-button:active {
          box-shadow: inset 3px 3px 6px #cbd5e1, inset -3px -3px 6px #ffffff !important;
        }
        /* Keep blue button highlights white text */
        .bg-blue-600, .bg-blue-500, .bg-gradient-to-br {
          color: #ffffff !important;
        }
        .bg-blue-600 .text-white, .bg-blue-500 .text-white, .bg-gradient-to-br .text-white {
          color: #ffffff !important;
        }
        .bg-blue-600 .text-gray-400 {
          color: #dbeafe !important;
        }
        /* Badges */
        .bg-emerald-950\\/30, .bg-emerald-950\\/40 {
          background-color: #ecfdf5 !important;
        }
        .bg-amber-950\\/40 {
          background-color: #fef3c7 !important;
        }
        .text-emerald-400 {
          color: #059669 !important;
        }
        .text-amber-400 {
          color: #d97706 !important;
        }
        /* Fix maps popup and details specifically */
        .bg-neutral-900\\/98, .bg-neutral-950\\/90 {
          background-color: rgba(255, 255, 255, 0.95) !important;
          border-color: #cbd5e1 !important;
        }
        /* Bottom nav hover style */
        nav button {
          color: #64748b !important;
        }
        nav button.text-white {
          color: #2563eb !important;
        }
        /* Scrollbar styles for light mode */
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, [theme]);

  // --- Profile Followers, Friends, Posts, Portfolio States ---
  const [profileActiveTab, setProfileActiveTab] = useState<'posts' | 'portfolio' | 'bookings' | 'followers' | 'friends'>('posts');

  const [profileFollowers, setProfileFollowers] = useState<Array<{
    id: number;
    name: string;
    username: string;
    avatar: string;
    isFollowingBack: boolean;
  }>>(() => {
    const saved = localStorage.getItem('profile_followers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, name: "Agus Dayak", username: "@agus_dayak", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80", isFollowingBack: true },
      { id: 2, name: "Rini Melak", username: "@rinimelak", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", isFollowingBack: false },
      { id: 3, name: "Putra Isuy", username: "@putraisuy", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", isFollowingBack: true },
      { id: 4, name: "Sari Benuaq", username: "@saribenuaq", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", isFollowingBack: true }
    ];
  });

  const [profileFriends, setProfileFriends] = useState<Array<{
    id: number;
    name: string;
    username: string;
    avatar: string;
    status: 'online' | 'offline';
    lastActive: string;
  }>>(() => {
    const saved = localStorage.getItem('profile_friends');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 10, name: "Yuda Sendawar", username: "@yudasendawar", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", status: 'online', lastActive: "Sekarang" },
      { id: 11, name: "Dewi Barong", username: "@dewibarong", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", status: 'offline', lastActive: "2 jam lalu" },
      { id: 12, name: "Hendrik Mahakam", username: "@hendrik_m", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80", status: 'online', lastActive: "Sekarang" }
    ];
  });

  const [profilePosts, setProfilePosts] = useState<Array<{
    id: number;
    title: string;
    caption: string;
    image: string;
    likes: number;
    comments: number;
    date: string;
  }>>(() => {
    const saved = localStorage.getItem('profile_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { 
        id: 201, 
        title: "Puncak Jantur Inar", 
        caption: "Menikmati sejuknya embun pagi di Air Terjun Jantur Inar, Kutai Barat. Keindahan alam yang tiada duanya! 🌿🌊 #KutaiBarat #JanturInar", 
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80", 
        likes: 248, 
        comments: 12, 
        date: "2 hari yang lalu" 
      },
      { 
        id: 202, 
        title: "Tenun Ulap Doyo", 
        caption: "Proses pembuatan kain tenun serat daun doyo khas suku Dayak Benuaq di Tanjung Isuy. Warisan leluhur yang penuh ketelitian. 🧵✨ #UlapDoyo #TanjungIsuy", 
        image: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=600&q=80", 
        likes: 412, 
        comments: 28, 
        date: "1 minggu yang lalu" 
      },
      { 
        id: 203, 
        title: "Lamin Mancong", 
        caption: "Mengunjungi Rumah Adat Lamin Mancong yang megah dan penuh dengan ukiran patung belian kuno. Berada di sini rasanya seperti melintasi waktu. 🪵🏹", 
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=600&q=80", 
        likes: 350, 
        comments: 19, 
        date: "2 minggu yang lalu" 
      }
    ];
  });

  const [profilePortfolio, setProfilePortfolio] = useState<Array<{
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    year: string;
    role: string;
    badges: string[];
  }>>(() => {
    const saved = localStorage.getItem('profile_portfolio');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { 
        id: 301, 
        title: "Pemandu Ekspedisi Hemaq Beniung", 
        category: "Ekowisata", 
        description: "Memimpin ekspedisi melintasi hutan adat Hemaq Beniung bersama peneliti botani internasional untuk mendokumentasikan keanekaragaman hayati anggrek hutan liar.", 
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80", 
        year: "2025", 
        role: "Ketua Tim Ekspedisi", 
        badges: ["Hutan Adat", "Sertifikasi Pramuwisata", "Ekowisata"] 
      },
      { 
        id: 302, 
        title: "Pemberdayaan Anyaman Tas Anjat", 
        category: "Pelestarian Budaya", 
        description: "Program pemberdayaan ibu-ibu suku Dayak Benuaq di Melak untuk memproduksi kerajinan anyaman tas Anjat berkualitas ekspor.", 
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80", 
        year: "2024", 
        role: "Inisiator Proyek", 
        badges: ["Kerajinan Tangan", "Pemberdayaan", "Suku Dayak"] 
      }
    ];
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [newPostForm, setNewPostForm] = useState({ title: '', caption: '', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80' });

  const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
  const [newPortfolioForm, setNewPortfolioForm] = useState({ title: '', category: 'Pelestarian Budaya', description: '', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80', year: '2026', role: '', badges: '' });

  const [selectedPostDetail, setSelectedPostDetail] = useState<any | null>(null);
  const [selectedPortfolioDetail, setSelectedPortfolioDetail] = useState<any | null>(null);

  useEffect(() => {
    localStorage.setItem('profile_followers', JSON.stringify(profileFollowers));
  }, [profileFollowers]);

  useEffect(() => {
    localStorage.setItem('profile_friends', JSON.stringify(profileFriends));
  }, [profileFriends]);

  useEffect(() => {
    localStorage.setItem('profile_posts', JSON.stringify(profilePosts));
  }, [profilePosts]);

  useEffect(() => {
    localStorage.setItem('profile_portfolio', JSON.stringify(profilePortfolio));
  }, [profilePortfolio]);

  // --- Shop Brand & Products State ---
  const [shopBrand, setShopBrand] = useState<string | null>(() => {
    return localStorage.getItem('kubar_shop_brand') || 'Toko Kerajinan Sentiyu';
  });
  const [shopProducts, setShopProducts] = useState<Array<{
    id: number;
    name: string;
    description: string;
    contact: string;
    price: string;
    image: string;
  }>>(() => {
    const saved = localStorage.getItem('kubar_shop_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 1,
        name: "Tas Anjat Rotan Asli",
        description: "Tas gendong anyaman rotan khas suku Dayak Benuaq. Kuat, artistik, dan awet untuk kegiatan outdoor maupun kasual.",
        contact: "0812-5555-8899",
        price: "185000",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80"
      },
      {
        id: 2,
        name: "Sarung Tenun Ulap Doyo",
        description: "Kain tenun ikat tradisional yang terbuat dari serat daun Doyo asli Kalimantan Timur. Pewarna alami dari tumbuhan hutan.",
        contact: "0812-5555-8899",
        price: "450000",
        image: "https://images.unsplash.com/photo-1584184924103-e310d9d8555e?w=600&q=80"
      },
      {
        id: 3,
        name: "Kalung Manik-manik Benuaq",
        description: "Aksesori manik khas Dayak dengan motif ornamen tradisional pembawa keberuntungan dan perlindungan.",
        contact: "0813-2244-1100",
        price: "65000",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80"
      }
    ];
  });

  useEffect(() => {
    if (shopBrand) {
      localStorage.setItem('kubar_shop_brand', shopBrand);
    } else {
      localStorage.removeItem('kubar_shop_brand');
    }
  }, [shopBrand]);

  useEffect(() => {
    localStorage.setItem('kubar_shop_products', JSON.stringify(shopProducts));
  }, [shopProducts]);

  // --- Shop Interaction States ---
  const [shopCart, setShopCart] = useState<Array<{
    id: number;
    productId: number;
    name: string;
    price: string;
    image: string;
    contact: string;
    quantity: number;
    brandName: string;
  }>>(() => {
    const saved = localStorage.getItem('kubar_shop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [shopOrders, setShopOrders] = useState<Array<{
    id: number;
    productId: number;
    name: string;
    price: string;
    image: string;
    quantity: number;
    brandName: string;
    shippingCost: number;
    totalPaid: number;
    date: string;
    status: 'Menunggu Pengiriman' | 'Dalam Perjalanan' | 'Selesai';
    contact: string;
  }>>(() => {
    const saved = localStorage.getItem('kubar_shop_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [walletTransactions, setWalletTransactions] = useState<Array<{
    label: string;
    val: string;
    date: string;
    isNegative: boolean;
  }>>(() => {
    const saved = localStorage.getItem('kubar_wallet_txs');
    return saved ? JSON.parse(saved) : [
      { label: 'Pembelian Kerajinan', val: '-Rp 360.000', date: 'Hari ini', isNegative: true },
      { label: 'Penjualan Karya Seni', val: '+Rp 2.100.000', date: 'Kemarin', isNegative: false },
      { label: 'Hadiah Kreator', val: '+Rp 82.500', date: '12 Jan', isNegative: false }
    ];
  });

  const [activeChatBrand, setActiveChatBrand] = useState<{
    brandName: string;
    productName?: string;
    contact: string;
    isGroup?: boolean;
  } | null>(null);

  const [chatMessages, setChatMessages] = useState<Record<string, Array<{
    sender: 'user' | 'owner' | 'other';
    senderName?: string;
    text: string;
    time: string;
  }>>>({
    'Toko Kerajinan Sentiyu': [
      { sender: 'owner', text: 'Halo Edo Erpani! Ada yang bisa kami bantu mengenai kerajinan tangan khas Kubar?', time: '09:00' }
    ],
    'Forum Komunitas Adat Kubar': [
      { sender: 'other', senderName: 'Budi Saputra', text: 'Halo kawan-kawan! Ada yang tahu kapan ritual adat Belian Sentiyu berikutnya diadakan di Melak?', time: '10:05' },
      { sender: 'other', senderName: 'Yuliana Dayak', text: 'Hai Budi! Biasanya diadakan akhir bulan Juli ini. Persiapannya sangat meriah dengan tarian gantar khas Suku Dayak Benuaq.', time: '10:12' },
      { sender: 'other', senderName: 'Saman Borneo', text: 'Betul sekali, kemarin saya lewat balai adat Melak dan dekorasi janur kuning sudah mulai dipasang. Jangan sampai kelewatan ya!', time: '10:15' }
    ]
  });

  const [selectedShopProductDetail, setSelectedShopProductDetail] = useState<any | null>(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<any | null>(null);
  const [paymentModalProduct, setPaymentModalProduct] = useState<any | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('kubar_shop_cart', JSON.stringify(shopCart));
  }, [shopCart]);

  useEffect(() => {
    localStorage.setItem('kubar_shop_orders', JSON.stringify(shopOrders));
  }, [shopOrders]);

  useEffect(() => {
    localStorage.setItem('kubar_wallet_txs', JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  useEffect(() => {
    localStorage.setItem('kubar_wallet_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('kubar_playlists', JSON.stringify(playlists));
  }, [playlists]);

  // --- Automatic Itinerary Event/Festival Notifications ---
  useEffect(() => {
    if (kubarItinerary.length === 0) return;

    const currentDate = new Date(simulatedDate.year, simulatedDate.month - 1, simulatedDate.day);

    KUBAR_EVENTS.forEach(ev => {
      if (kubarItinerary.includes(ev.destinationId)) {
        const eventDate = new Date(ev.year, ev.month - 1, ev.day);
        const diffTime = eventDate.getTime() - currentDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays <= 3) {
          const key = `notif_event_${ev.id}_${simulatedDate.day}_${simulatedDate.month}`;
          const alreadyNotified = sessionStorage.getItem(key);

          if (!alreadyNotified) {
            sessionStorage.setItem(key, 'true');
            const destName = KUBAR_DESTINATIONS.find(d => d.id === ev.destinationId)?.name || ev.location;
            const daysText = diffDays === 0 ? "hari ini!" : `dalam ${diffDays} hari (${ev.dateStr}).`;

            triggerPushNotification(
              "🔔 Pengingat Ritual Adat",
              `Destinasi "${destName}" di itinerary Anda akan menyelenggarakan festival sakral "${ev.name}" ${daysText}`,
              "success"
            );
          }
        }
      }
    });
  }, [kubarItinerary, simulatedDate]);

  // --- Traditional Sape Procedural Web Audio Synth ---
  useEffect(() => {
    if (!musicPlaying) return;

    const allTracks = KUBAR_TRACKS;

    const activePlaylist = playlists.find(p => p.id === activePlaylistId) || playlists[0];
    const playlistTracks = activePlaylist.trackIds.map(tid => allTracks.find(t => t.id === tid)).filter(Boolean) as typeof allTracks;

    if (playlistTracks.length === 0) return;

    const normalizedIdx = currentTrackIdx % playlistTracks.length;
    const currentNotes = playlistTracks[normalizedIdx]?.notes || [220, 275, 330];
    let audioCtx: AudioContext | null = null;

    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser:", e);
    }

    if (!audioCtx) return;

    let step = 0;
    const intervalTime = 450; // ms per note pluck

    const intervalId = setInterval(() => {
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (isMusicMuted) return;

      const noteFreq = currentNotes[step % currentNotes.length];

      // Occasional syncopation (skipping play for a note for a more organic rhythm)
      if (Math.random() < 0.15) {
        step++;
        return;
      }

      // 1. Woodwind-like string pluck sound (Sape')
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(noteFreq, audioCtx.currentTime);

      // Add warmth and vibrato
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.value = 6; // 6 Hz vibrato
      lfoGain.gain.value = 2; // Frequency deviation of 2Hz
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      // Deep double string resonance (sub-octave) on downbeats
      if (step % 4 === 0) {
        const subOsc = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();
        subOsc.type = "sine";
        subOsc.frequency.setValueAtTime(noteFreq / 2, audioCtx.currentTime);
        subGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        subGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        subOsc.connect(subGain);
        subGain.connect(audioCtx.destination);
        subOsc.start();
        subOsc.stop(audioCtx.currentTime + 1.3);
      }

      // Envelope simulation of a lute/Sape string pluck
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.85);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.9);

      step++;
    }, intervalTime);

    return () => {
      clearInterval(intervalId);
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [musicPlaying, currentTrackIdx, isMusicMuted, activePlaylistId, playlists]);

  // --- New Wallet States ---
  const [walletSendBank, setWalletSendBank] = useState('Bank Kaltimtara');
  const [walletSendAccountNo, setWalletSendAccountNo] = useState('');
  const [walletSendAmount, setWalletSendAmount] = useState('');
  const [walletDepositBank, setWalletDepositBank] = useState('Bank Kaltimtara');
  const [walletDepositAmount, setWalletDepositAmount] = useState('');
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);
  
  const [investmentHoldings, setInvestmentHoldings] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('kubar_investment_holdings');
    return saved ? JSON.parse(saved) : { 1: 10, 2: 2, 3: 5, 4: 20, 5: 0 };
  });

  useEffect(() => {
    localStorage.setItem('kubar_investment_holdings', JSON.stringify(investmentHoldings));
  }, [investmentHoldings]);

  const [investmentHistory, setInvestmentHistory] = useState<Record<number, Array<{ time: string; price: number }>>>(() => {
    const saved = localStorage.getItem('kubar_investment_history');
    if (saved) return JSON.parse(saved);

    const now = Date.now();
    const generateInitialHistory = (basePrice: number) => {
      const history = [];
      let currentPrice = basePrice * 0.92;
      for (let i = 0; i < 7; i++) {
        const timePoint = new Date(now - (7 - i) * 3600 * 1000);
        const label = timePoint.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const randChange = (Math.random() * 0.14 - 0.06) * currentPrice;
        currentPrice = Math.max(1000, Math.round(currentPrice + randChange));
        history.push({ time: label, price: currentPrice });
      }
      history.push({ time: 'Now', price: basePrice });
      return history;
    };

    return {
      1: generateInitialHistory(18750),
      2: generateInitialHistory(67500),
      3: generateInitialHistory(31500),
      4: generateInitialHistory(12750),
      5: generateInitialHistory(78000),
    };
  });

  useEffect(() => {
    localStorage.setItem('kubar_investment_history', JSON.stringify(investmentHistory));
  }, [investmentHistory]);

  const [chartViewMode, setChartViewMode] = useState<Record<number, 'daily' | 'weekly' | 'monthly'>>({});

  const getCandlestickData = (id: number, basePrice: number, period: 'weekly' | 'monthly') => {
    const seedRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const steps = period === 'weekly' ? 4 : 6;
    const labels = period === 'weekly' 
      ? ['W1', 'W2', 'W3', 'W4']
      : ['Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'];

    const data = [];
    let currentClose = basePrice;
    
    for (let i = steps - 1; i >= 0; i--) {
      const stepSeed = id * 100 + i * 17;
      const r1 = seedRandom(stepSeed);
      const r2 = seedRandom(stepSeed + 1);
      const r3 = seedRandom(stepSeed + 2);

      const changePct = (r1 * 0.16 - 0.07); // -7% to +9%
      const open = Math.round(currentClose / (1 + changePct));
      
      const minVal = Math.min(open, currentClose);
      const maxVal = Math.max(open, currentClose);
      
      const low = Math.round(minVal * (1 - r2 * 0.04 - 0.01));
      const high = Math.round(maxVal * (1 + r3 * 0.04 + 0.01));

      data.unshift({
        name: labels[i],
        open,
        close: currentClose,
        low,
        high,
        openClose: [minVal, maxVal],
        lowHigh: [low, high],
        profit: currentClose - open,
        isUp: currentClose >= open,
        percent: ((currentClose - open) / open) * 100
      });

      currentClose = open;
    }

    return data;
  };

  const [kubarInvestments, setKubarInvestments] = useState<Array<{
    id: number;
    name: string;
    bursa: string;
    price: number;
    change: number;
    isPositive: boolean;
    description: string;
    category: string;
    marketCap: number;
    unitsOutstanding: number;
  }>>(() => {
    const saved = localStorage.getItem('kubar_investments');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        name: "Bursa Anyaman Rotan Sentiyu",
        bursa: "Kutai Barat Artisan Exchange",
        price: 18750,
        change: 4.8,
        isPositive: true,
        description: "Komoditas anyaman rotan bermotif khas Suku Dayak Benuaq dari Kampung Sentiyu.",
        category: "Kerajinan",
        unitsOutstanding: 15000,
        marketCap: 281250000
      },
      {
        id: 2,
        name: "Koperasi Kayu Ulin Melak",
        bursa: "Borneo Timber Board",
        price: 67500,
        change: -1.2,
        isPositive: false,
        description: "Investasi pengelolaan ulin berkelanjutan untuk ukiran patung adat khas Kubar.",
        category: "Bahan Baku",
        unitsOutstanding: 8500,
        marketCap: 573750000
      },
      {
        id: 3,
        name: "Komoditas Madu Hutan Damai",
        bursa: "Kubar Forest Products",
        price: 31500,
        change: 8.5,
        isPositive: true,
        description: "Hasil panen madu hutan liar organik dari pepohonan tinggi di Kecamatan Damai.",
        category: "Hasil Alam",
        unitsOutstanding: 25000,
        marketCap: 787500000
      },
      {
        id: 4,
        name: "Bursa Karet Siluq Ngurai",
        bursa: "Kalimantan Rubber Trade",
        price: 12750,
        change: 0.4,
        isPositive: true,
        description: "Pengumpulan dan pengolahan getah karet mentah perkebunan rakyat Siluq Ngurai.",
        category: "Pertanian",
        unitsOutstanding: 40000,
        marketCap: 510000000
      },
      {
        id: 5,
        name: "Saham Tenun Doyo Muara Pahu",
        bursa: "Doyo Textile Index",
        price: 78000,
        change: 12.3,
        isPositive: true,
        description: "Tenunan serat daun doyo langka yang dikerjakan manual oleh pengrajin Muara Pahu.",
        category: "Tekstil",
        unitsOutstanding: 5000,
        marketCap: 390000000
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('kubar_investments', JSON.stringify(kubarInvestments));
  }, [kubarInvestments]);

  const [kubarReviews, setKubarReviews] = useState<Record<number, Array<{
    id: number;
    user: string;
    content: string;
    rating: number;
    timestamp: string;
  }>>>({
    1: [
      { id: 1, user: "Alex Rivera", content: "Sangat mengagumkan! Arsitektur ulinnya begitu luar biasa.", rating: 5, timestamp: "Yesterday" }
    ],
    3: [
      { id: 1, user: "Edo Erpani", content: "Airnya jernih banget, pas buat nyantai sore-sore!", rating: 5, timestamp: "2 days ago" }
    ]
  });
  const [newKubarReviewText, setNewKubarReviewText] = useState('');
  const [newKubarReviewRating, setNewKubarReviewRating] = useState(5);

  // --- Push Notification States & Helper ---
  const [pushPermission, setPushPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });
  const [activePushBanner, setActivePushBanner] = useState<{ title: string; body: string; type?: string } | null>(null);

  const triggerPushNotification = (title: string, body: string, type: string = 'info') => {
    // 1. Show elegant sliding in-app push banner
    setActivePushBanner({ title, body, type });
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setActivePushBanner(null);
    }, 4000);

    // 2. Add to in-app alerts (notifications tab)
    setNotifications(prev => [
      {
        id: Date.now() + Math.random(),
        type: type === 'payment' || type === 'success' ? 'follow' : 'like', // Map to existing Lucide styles
        user: title,
        content: body,
        timestamp: 'Baru saja',
        read: false
      },
      ...prev
    ]);

    // 3. Native browser HTML5 Push Notification if permitted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico' // Default app icon fallback
        });
      } catch (e) {
        console.error('Failed to trigger native HTML5 notification:', e);
      }
    }
  };

  const requestPushPermission = () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then(perm => {
        setPushPermission(perm);
        if (perm === 'granted') {
          triggerPushNotification(
            "🔔 Notifikasi Diaktifkan",
            "Anda sekarang akan menerima notifikasi instan untuk transaksi, pesanan, dan jadwal perjalanan!",
            "success"
          );
        }
      });
    } else {
      alert("Browser Anda tidak mendukung push notifications.");
    }
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // --- Price fluctuation simulation & Alerts (> 5% triggers alert) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setKubarInvestments(prevInvestments => {
        return prevInvestments.map(item => {
          // 40% chance of price change per tick
          if (Math.random() > 0.4) return item;

          // Random change between -12% and +12%
          const changePercent = parseFloat((Math.random() * 24 - 12).toFixed(1));
          if (changePercent === 0) return item;

          const multiplier = 1 + (changePercent / 100);
          const newPrice = Math.max(1000, Math.round(item.price * multiplier));

          // If change is >= 5% or <= -5%
          if (Math.abs(changePercent) >= 5.0) {
            triggerPushNotification(
              `${changePercent > 0 ? '📈' : '📉'} Alert Bursa Trade`,
              `Harga ${item.name} ${changePercent > 0 ? 'MELONJAK' : 'ANJLOK'} ${Math.abs(changePercent)}% menjadi Rp ${newPrice.toLocaleString('id-ID')} sesi ini!`,
              changePercent > 0 ? 'success' : 'payment'
            );
          }

          // Also update history!
          setInvestmentHistory(prevHistory => {
            const currentHistory = prevHistory[item.id] || [];
            const nowLabel = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const newHistory = [...currentHistory, { time: nowLabel, price: newPrice }].slice(-10);
            return {
              ...prevHistory,
              [item.id]: newHistory
            };
          });

          return {
            ...item,
            price: newPrice,
            change: changePercent,
            isPositive: changePercent >= 0,
            marketCap: Math.round(newPrice * (item.unitsOutstanding || 10000))
          };
        });
      });
    }, 12000); // Check every 12 seconds for an active demo experience

    return () => clearInterval(interval);
  }, []);

  // --- Splash Screen & Sape' Opening Chime Synthesis ---
  useEffect(() => {
    if (!showSplash) return;
    
    // Auto-dismiss splash screen after 3.2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3200);

    // Synthesize a premium ambient Sape' pentatonic pluck chord using the Web Audio API
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();
        const now = audioCtx.currentTime;
        
        const playSplashPluck = (frequency: number, delayTime: number, volume: number) => {
          const osc = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(frequency, now + delayTime);
          
          gainNode.gain.setValueAtTime(0, now + delayTime);
          gainNode.gain.linearRampToValueAtTime(volume, now + delayTime + 0.04);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + delayTime + 1.2);
          
          osc.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          osc.start(now + delayTime);
          osc.stop(now + delayTime + 1.4);
        };

        // Synthesize a majestic and mystical pentatonic chord of Kutai Sape':
        // E (220Hz), A (275Hz), B (330Hz), E (440Hz), F# (495Hz)
        playSplashPluck(220, 0.1, 0.12);
        playSplashPluck(275, 0.25, 0.12);
        playSplashPluck(330, 0.4, 0.12);
        playSplashPluck(440, 0.55, 0.15);
        playSplashPluck(495, 0.7, 0.15);
      }
    } catch (error) {
      console.warn("Could not play procedural opening audio:", error);
    }

    return () => clearTimeout(timer);
  }, [showSplash]);

  // --- Fetch API on Mount ---
  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories');
      if (!response.ok) throw new Error('Failed to load stories');
      const data = await response.json();
      setStories(data);
    } catch (err) {
      console.error("Failed to fetch stories:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to load posts from database');
      const data = await response.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while loading');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReflections = async () => {
    try {
      setIsLoadingReflections(true);
      const response = await fetch('/api/reflections');
      if (!response.ok) throw new Error('Failed to load reflections from database');
      const data = await response.json();
      setReflections(data);
    } catch (err: any) {
      console.error('Error fetching reflections:', err);
    } finally {
      setIsLoadingReflections(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchStories();
    fetchReflections();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const destIdParam = params.get('destId');
    if (destIdParam) {
      const destId = parseInt(destIdParam, 10);
      const found = KUBAR_DESTINATIONS.find(d => d.id === destId);
      if (found) {
        setCurrentPage('explore');
        setSelectedKubarDest(found);
      }
    }
  }, []);

  // --- Handlers ---
  const handleLike = async (id: number) => {
    const isLiked = likedPostIds[id];
    
    // Optimistically update
    setPosts(prevPosts => prevPosts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: isLiked ? Math.max(0, p.likes - 1) : p.likes + 1
        };
      }
      return p;
    }));
    setLikedPostIds(prev => ({
      ...prev,
      [id]: !isLiked
    }));

    try {
      const response = await fetch(`/api/posts/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ increment: !isLiked })
      });
      if (!response.ok) throw new Error('Failed to update like status');
      const result = await response.json();
      
      // Update with exact backend like count
      setPosts(prevPosts => prevPosts.map(p => p.id === id ? { ...p, likes: result.likes } : p));
    } catch (err) {
      console.error("Backend error liking post:", err);
      // Revert optimistic updates
      setPosts(prevPosts => prevPosts.map(p => {
        if (p.id === id) {
          return {
            ...p,
            likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
          };
        }
        return p;
      }));
      setLikedPostIds(prev => ({
        ...prev,
        [id]: isLiked
      }));
    }
  };

  const handleStartEdit = (postId: number, content: string) => {
    setEditingPostId(postId);
    setEditContentText(content);
  };

  const handleSaveEdit = async (postId: number) => {
    if (!editContentText.trim()) return;
    const oldContent = posts.find(p => p.id === postId)?.content || '';
    
    // Optimistically update
    setPosts(prevPosts => prevPosts.map(p => p.id === postId ? { ...p, content: editContentText.trim() } : p));
    setEditingPostId(null);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContentText.trim() })
      });
      if (!response.ok) throw new Error('Failed to save edited post');
    } catch (err) {
      console.error("Backend error saving edit:", err);
      // Revert optimism
      setPosts(prevPosts => prevPosts.map(p => p.id === postId ? { ...p, content: oldContent } : p));
    } finally {
      setEditContentText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditContentText('');
  };

  const toggleComments = (postId: number) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentSubmit = async (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    const draft = commentDrafts[postId];
    if (!draft || !draft.trim()) return;

    // Reset draft immediately
    setCommentDrafts(prev => ({
      ...prev,
      [postId]: ''
    }));

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: "Edo Erpani", content: draft.trim() })
      });
      if (!response.ok) throw new Error('Failed to post comment');
      const newComment = await response.json();
      
      setPosts(prevPosts => prevPosts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      }));
    } catch (err) {
      console.error("Backend error adding comment:", err);
      // Restore draft
      setCommentDrafts(prev => ({
        ...prev,
        [postId]: draft
      }));
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim() && !newPostImage && (!showPollCreator || !pollQuestion.trim())) return;
    
    const currentText = newPostText;
    const currentImage = newPostImage;
    const currentPoll = showPollCreator && pollQuestion.trim() && pollOptions.filter(o => o.trim() !== '').length >= 2
      ? { question: pollQuestion, options: pollOptions.filter(o => o.trim() !== '') }
      : null;

    setNewPostText('');
    setNewPostImage(null);
    setShowPollCreator(false);
    setPollQuestion('');
    setPollOptions(['', '']);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user: "Edo Erpani", 
          content: currentText || (currentPoll ? `📊 Jajak Pendapat: ${currentPoll.question}` : ''), 
          image: currentImage,
          poll: currentPoll
        })
      });
      if (!response.ok) throw new Error('Failed to create post on server');
      const newPost = await response.json();
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } catch (err) {
      console.error("Backend error creating post:", err);
      setNewPostText(currentText); // Restore text on failure
      setNewPostImage(currentImage); // Restore image on failure
      if (currentPoll) {
        setShowPollCreator(true);
        setPollQuestion(currentPoll.question);
        setPollOptions(currentPoll.options);
      }
    }
  };

  const handleVotePoll = async (postId: number, optionId: number) => {
    if (votedPollIds[postId] !== undefined) {
      alert("Anda sudah memberikan suara pada jajak pendapat ini!");
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}/poll/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId })
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, poll: data.poll } : p));
        const updatedVotes = { ...votedPollIds, [postId]: optionId };
        setVotedPollIds(updatedVotes);
        localStorage.setItem('kubar_voted_poll_ids', JSON.stringify(updatedVotes));
        triggerPushNotification(
          "🗳️ Suara Anda Tercatat",
          "Terima kasih telah berpartisipasi dalam jajak pendapat komunitas!",
          "success"
        );
      }
    } catch (err) {
      console.error("Failed to vote in poll:", err);
    }
  };

  // Portfolio Fluctuation Detector
  useEffect(() => {
    if (lastPurchasePortfolioValue <= 0) return;
    
    // Calculate current total value of investments
    const currentTotalValue = kubarInvestments.reduce((sum, inv) => {
      const owned = investmentHoldings[inv.id] || 0;
      return sum + owned * inv.price;
    }, 0);

    if (currentTotalValue <= 0) return;

    const changePercent = ((currentTotalValue - lastPurchasePortfolioValue) / lastPurchasePortfolioValue) * 100;

    if (Math.abs(changePercent) >= 10.0 && !hasAlertedSinceLastPurchase) {
      setHasAlertedSinceLastPurchase(true);
      localStorage.setItem('kubar_has_alerted_10percent', 'true');

      triggerPushNotification(
        `🚨 Alert Portofolio Bursa`,
        `Nilai total aset investasi Anda ${changePercent > 0 ? 'MENINGKAT' : 'MENURUN'} sebesar ${Math.abs(changePercent).toFixed(1)}% sejak pembelian terakhir (Skg: Rp ${currentTotalValue.toLocaleString('id-ID')} vs Rp ${lastPurchasePortfolioValue.toLocaleString('id-ID')}).`,
        changePercent > 0 ? 'success' : 'payment'
      );
    }
  }, [kubarInvestments, investmentHoldings, lastPurchasePortfolioValue, hasAlertedSinceLastPurchase]);

  // --- Music Playlist Helpers ---
  const toggleFavorite = (trackId: number) => {
    setPlaylists(prevPlaylists => {
      return prevPlaylists.map(p => {
        if (p.id === 'favorites') {
          const exists = p.trackIds.includes(trackId);
          const updatedTrackIds = exists 
            ? p.trackIds.filter(id => id !== trackId) 
            : [...p.trackIds, trackId];
          
          triggerPushNotification(
            exists ? "💔 Dihapus dari Favorit" : "💖 Ditambahkan ke Favorit",
            exists ? "Lagu berhasil dihapus dari daftar putar Lagu Favorit." : "Lagu berhasil ditambahkan ke daftar putar Lagu Favorit.",
            "success"
          );
          
          return { ...p, trackIds: updatedTrackIds };
        }
        return p;
      });
    });
  };

  // --- Story Actions & Effects ---
  const handlePublishStory = async () => {
    if (!newStoryImage) return;
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: "Edo Erpani",
          avatar: "https://placehold.co/100?text=Edo",
          image: newStoryImage,
          caption: newStoryCaption
        })
      });
      if (!response.ok) throw new Error('Failed to create story');
      await fetchStories();
      setShowStoryCreateModal(false);
      setNewStoryImage('');
      setNewStoryCaption('');
      triggerPushNotification(
        "✨ Cerita Dipublikasikan",
        "Cerita Anda berhasil dipublikasikan dan dapat dilihat oleh pengguna lain!",
        "success"
      );
    } catch (err) {
      console.error("Error creating story:", err);
    }
  };

  useEffect(() => {
    if (!activeStoryUser) return;
    const userStoriesCount = stories.filter(s => s.user === activeStoryUser).length;
    if (userStoriesCount === 0) return;

    const timer = setTimeout(() => {
      if (activeStoryIndex < userStoriesCount - 1) {
        setActiveStoryIndex(prev => prev + 1);
      } else {
        // Finish this user's stories
        setActiveStoryUser(null);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeStoryUser, activeStoryIndex, stories]);

  // --- Sub-components (Pages) ---

  const PageHeader = ({ title, showSettings = false }) => (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-black tracking-tight">{title}</h2>
      {showSettings && (
        <button className="p-3 rounded-2xl bg-neutral-800 neu-flat neu-button">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </div>
  );

  const COLLECTIBLE_BLESSINGS = [
    { name: "Tenun Ulap Doyo", rarity: "Sangat Langka", icon: "✨", desc: "Kain tenun serat daun khas suku Dayak Benuaq." },
    { name: "Mandau Pusaka", rarity: "Suku Legendaris", icon: "🗡️", desc: "Senjata sakral yang diwariskan turun-temurun." },
    { name: "Patung Belian", rarity: "Mistik", icon: "🗿", desc: "Patung kayu ulin untuk ritual penyembuhan Belian Sentiyu." },
    { name: "Minyak Bintang", rarity: "Legenda Dayak", icon: "🔮", desc: "Minyak mistik Kalimantan yang terkenal dengan tuah perlindungan." },
    { name: "Seraung Tradisional", rarity: "Unik", icon: "👒", desc: "Topi anyaman bambu lebar dengan hiasan manik-manik indah." },
    { name: "Kalung Manik Kebajikan", rarity: "Langka", icon: "📿", desc: "Kalung manik kuno pembawa keselamatan dan kedamaian." }
  ];

  const HomeView = () => {
    const [holdProgress, setHoldProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const [cooldownRemaining, setCooldownRemaining] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [unlockedAmulet, setUnlockedAmulet] = useState<typeof COLLECTIBLE_BLESSINGS[0] | null>(null);
    const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const soundTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Neumorphic playground and interactive widgets
    const [sapeEcho, setSapeEcho] = useState(false);
    const [sapeReverb, setSapeReverb] = useState(true);
    const [acousticDepth, setAcousticDepth] = useState(65);
    const [resonantAngle, setResonantAngle] = useState(45); // Knob angle (degrees)
    const [selectedMarketTab, setSelectedMarketTab] = useState<'rotan' | 'madu' | 'ulin'>('ulin');

    // Eunoia CSV Sync States
    const [csvParsedItems, setCsvParsedItems] = useState<any[] | null>(null);
    const [csvError, setCsvError] = useState<string | null>(null);
    const [syncMerge, setSyncMerge] = useState<boolean>(true);
    const [isSyncing, setIsSyncing] = useState<boolean>(false);
    const [csvDragOver, setCsvDragOver] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Filter and search
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
    const [selectedMoodFilter, setSelectedMoodFilter] = useState("all");

    // Inline add state
    const [manualTitle, setManualTitle] = useState("");
    const [manualContent, setManualContent] = useState("");
    const [manualCategory, setManualCategory] = useState("affirmation");
    const [manualMood, setManualMood] = useState("Calm");
    const [isAddingManual, setIsAddingManual] = useState(false);

    useEffect(() => {
      let cdTimer: NodeJS.Timeout | null = null;
      if (cooldownRemaining > 0) {
        cdTimer = setInterval(() => {
          setCooldownRemaining(prev => prev - 1);
        }, 1000);
      }
      return () => {
        if (cdTimer) clearInterval(cdTimer);
      };
    }, [cooldownRemaining]);

    useEffect(() => {
      return () => {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        if (soundTimerRef.current) clearInterval(soundTimerRef.current);
      };
    }, []);

    const playHoldPluck = (freq: number, gainVal: number) => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(gainVal, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.7);
      } catch (err) {
        console.error("Audio error during hold:", err);
      }
    };

    const playGongSound = () => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = audioCtxRef.current || new AudioContextClass();
        const now = ctx.currentTime;
        
        [110, 137.5, 165].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.25, now + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
          
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc.start(now);
          osc.stop(now + 3.0);
        });
      } catch (err) {
        console.error("Gong error:", err);
      }
    };

    const handleBlessingSuccess = () => {
      playGongSound();
      
      const randomIndex = Math.floor(Math.random() * COLLECTIBLE_BLESSINGS.length);
      const item = COLLECTIBLE_BLESSINGS[randomIndex];
      setUnlockedAmulet(item);
      setShowCelebration(true);
      
      setBalance(prev => prev + 50000);
      
      setBlessingsUnlocked(prev => {
        if (!prev.includes(item.name)) {
          return [...prev, item.name];
        }
        return prev;
      });
      
      setCooldownRemaining(45);
      
      triggerPushNotification(
        "✨ Berkat Adat Diterima!",
        `Selamat! Anda memperoleh "${item.name}" (Rarity: ${item.rarity}) & tambahan EunoiaPay Rp 50.000!`,
        "success"
      );
    };

    const startHold = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (cooldownRemaining > 0 || showCelebration) return;
      
      setIsHolding(true);
      setHoldProgress(0);
      
      playHoldPluck(220, 0.15);
      
      let currentProgress = 0;
      let soundStep = 0;
      const pentatonic = [220, 247.5, 275, 330, 371.25, 440, 495, 550, 660, 742.5, 880];
      
      soundTimerRef.current = setInterval(() => {
        soundStep++;
        const pitchIdx = Math.min(soundStep, pentatonic.length - 1);
        const freq = pentatonic[pitchIdx];
        const volume = 0.05 + (currentProgress / 100) * 0.2;
        playHoldPluck(freq, volume);
        
        if (settingsHaptic && typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(45);
        }
      }, 120);

      holdIntervalRef.current = setInterval(() => {
        currentProgress += 1;
        if (currentProgress >= 100) {
          currentProgress = 100;
          setHoldProgress(100);
          setIsHolding(false);
          
          if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
          if (soundTimerRef.current) clearInterval(soundTimerRef.current);
          
          handleBlessingSuccess();
        } else {
          setHoldProgress(currentProgress);
        }
      }, 15);
    };

    const stopHold = () => {
      setIsHolding(false);
      
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }
      if (soundTimerRef.current) {
        clearInterval(soundTimerRef.current);
        soundTimerRef.current = null;
      }
      
      const decayId = setInterval(() => {
        setHoldProgress(prev => {
          if (prev <= 0) {
            clearInterval(decayId);
            return 0;
          }
          return Math.max(0, prev - 4);
        });
      }, 15);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewPostImage(reader.result as string);
          setShowPostImagePicker(true);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleCSVFileSelected = (file: File) => {
      setCsvError(null);
      if (!file.name.endsWith(".csv")) {
        setCsvError("File harus berformat .csv");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const parsed = parseCSV(text);
          if (parsed.length === 0) {
            setCsvError("CSV kosong atau format header tidak sesuai (ID, Title, Content, Category, Mood, Created At)");
          } else {
            setCsvParsedItems(parsed);
            triggerPushNotification("📂 CSV Berhasil Dimuat", `${parsed.length} data refleksi terdeteksi. Silakan verifikasi sebelum sinkronisasi.`, "success");
          }
        } catch (err) {
          setCsvError("Gagal membaca atau mem-parse file CSV");
        }
      };
      reader.readAsText(file);
    };

    const handleCSVDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setCsvDragOver(true);
    };

    const handleCSVDragLeave = () => {
      setCsvDragOver(false);
    };

    const handleCSVDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setCsvDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleCSVFileSelected(file);
      }
    };

    const handlePushCSVSync = async () => {
      if (!csvParsedItems || csvParsedItems.length === 0) return;
      try {
        setIsSyncing(true);
        const res = await fetch("/api/reflections/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: csvParsedItems, merge: syncMerge })
        });
        if (!res.ok) throw new Error("Gagal melakukan sinkronisasi ke server");
        const result = await res.json();
        
        playHoldPluck(523, 0.15); // pleasant chime
        playHoldPluck(659, 0.15);
        
        triggerPushNotification(
          "🌟 Sinkronisasi Berhasil",
          `Berhasil mensinkronisasi ${csvParsedItems.length} data ke database server Eunoiaverse!`,
          "success"
        );
        
        setCsvParsedItems(null);
        fetchReflections(); // reload reflections list
      } catch (err: any) {
        setCsvError(err.message);
        triggerPushNotification("🚨 Sinkronisasi Gagal", err.message, "error");
      } finally {
        setIsSyncing(false);
      }
    };

    const handleManualAddReflection = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!manualTitle || !manualContent) {
        triggerPushNotification("⚠️ Validasi Gagal", "Judul dan isi refleksi wajib diisi", "info");
        return;
      }
      try {
        const res = await fetch("/api/reflections", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: manualTitle,
            content: manualContent,
            category: manualCategory,
            mood: manualMood
          })
        });
        if (!res.ok) throw new Error("Gagal menambahkan data");
        
        setManualTitle("");
        setManualContent("");
        setIsAddingManual(false);
        playHoldPluck(440, 0.1);
        triggerPushNotification("✨ Refleksi Ditambahkan", "Data refleksi/affirmasi baru berhasil ditambahkan!", "success");
        fetchReflections();
      } catch (err: any) {
        triggerPushNotification("🚨 Gagal Menambahkan", err.message, "error");
      }
    };

    const handleDeleteReflectionItem = async (id: string) => {
      try {
        const res = await fetch(`/api/reflections/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Gagal menghapus data");
        triggerPushNotification("🗑️ Refleksi Dihapus", "Satu data refleksi berhasil dihapus dari server.", "info");
        fetchReflections();
      } catch (err: any) {
        triggerPushNotification("🚨 Gagal Menghapus", err.message, "error");
      }
    };

    const handleDownloadReflectionsCSV = () => {
      try {
        const csvContent = stringifyCSV(reflections);
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `eunoia_reflections_${Date.now()}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        triggerPushNotification("📥 Ekspor CSV Sukses", "File CSV refleksi Anda berhasil diunduh.", "success");
      } catch (err: any) {
        triggerPushNotification("🚨 Ekspor Gagal", err.message, "error");
      }
    };

    return (
      <div className="animate-slide-up">
        {/* Stories */}
        <section className="mb-8 flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
          {/* Your Story */}
          <div className="flex-none flex flex-col items-center">
            {(() => {
              const myStories = stories.filter(s => s.user === "Edo Erpani");
              const hasMyStories = myStories.length > 0;
              return (
                <div 
                  onClick={() => {
                    if (hasMyStories) {
                      setActiveStoryUser("Edo Erpani");
                      setActiveStoryIndex(0);
                    } else {
                      setShowStoryCreateModal(true);
                    }
                  }}
                  className={`w-16 h-16 rounded-full border-2 ${hasMyStories ? 'border-emerald-500' : 'border-dashed border-blue-500'} flex items-center justify-center p-0.5 relative cursor-pointer transition-all active:scale-95`}
                >
                  {hasMyStories ? (
                    <img src={myStories[0].image} className="rounded-full w-full h-full object-cover" alt="" />
                  ) : (
                    <Plus className="text-blue-500 w-6 h-6" />
                  )}
                  {!hasMyStories && (
                    <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-0.5 text-[8px]">
                      <Plus className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              );
            })()}
            <span className="text-[10px] mt-1 text-gray-400 font-bold">Your Story</span>
          </div>

          {/* Users' Stories */}
          {Object.entries(
            stories.reduce((acc, story) => {
              if (story.user !== "Edo Erpani") {
                if (!acc[story.user]) acc[story.user] = [];
                acc[story.user].push(story);
              }
              return acc;
            }, {} as Record<string, typeof stories>)
          ).map(([username, userStories]) => (
            <div 
              key={username} 
              onClick={() => {
                setActiveStoryUser(username);
                setActiveStoryIndex(0);
              }}
              className="flex-none flex flex-col items-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full border-2 border-orange-500 p-0.5 transition-all hover:scale-105 active:scale-95">
                <img 
                  src={userStories[0].avatar || `https://placehold.co/100?text=${username.charAt(0)}`} 
                  className="rounded-full w-full h-full object-cover" 
                  alt={username} 
                />
              </div>
              <span className="text-[10px] mt-1 text-gray-400 font-medium truncate max-w-[70px]">{username}</span>
            </div>
          ))}
        </section>

        {/* DAYAK SACRED BLESSING TOUCHPAD (User Hold implementation) */}
        <div className="mb-8 p-5 rounded-3xl bg-neutral-900/90 border border-amber-500/10 hover:border-amber-500/20 shadow-xl relative overflow-hidden text-left">
          {/* Ambient flowing background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.06),transparent_60%)] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
            {/* Interactive Circle Progress Hold Button */}
            <div className="relative flex-shrink-0 select-none">
              <svg className="w-24 h-24 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  className="stroke-neutral-800 fill-neutral-950"
                  strokeWidth="6"
                />
                {/* Progress circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  className="stroke-amber-500 transition-all duration-75 ease-out"
                  strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - holdProgress / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Inner glowing touchpad button */}
              <button
                type="button"
                onMouseDown={startHold}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={startHold}
                onTouchEnd={stopHold}
                disabled={cooldownRemaining > 0 || showCelebration}
                className={`absolute top-3 left-3 w-18 h-18 rounded-full flex flex-col items-center justify-center transition-all ${
                  cooldownRemaining > 0 
                    ? 'bg-neutral-900 border border-neutral-800 text-gray-600 cursor-not-allowed'
                    : isHolding 
                      ? 'bg-amber-600 border-2 border-amber-400 text-white shadow-lg shadow-amber-500/30 scale-95 animate-pulse'
                      : 'bg-gradient-to-tr from-amber-950/80 to-neutral-900 border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:border-amber-400/50 hover:scale-105 active:scale-95'
                }`}
                style={{
                  transform: isHolding ? `scale(${0.95 + (holdProgress / 100) * 0.1})` : 'none',
                }}
              >
                {cooldownRemaining > 0 ? (
                  <span className="text-[11px] font-black font-mono text-gray-500">{cooldownRemaining}s</span>
                ) : (
                  <>
                    <Shield className={`w-7 h-7 ${isHolding ? 'animate-bounce text-white' : 'text-amber-500'}`} />
                    <span className="text-[8px] font-black uppercase tracking-widest mt-1">
                      {isHolding ? `${Math.round(holdProgress)}%` : 'TAHAN'}
                    </span>
                  </>
                )}
              </button>
            </div>
            
            {/* Descriptive Content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full font-black uppercase tracking-wider font-mono">
                  ✨ Ritual Harian: Belian Sentiyu
                </span>
                {blessingsUnlocked.length > 0 && (
                  <span className="text-[9px] text-gray-500 font-mono">
                    Koleksi: <strong>{blessingsUnlocked.length}</strong> / 6 Amulet
                  </span>
                )}
              </div>
              <h3 className="text-sm font-black text-white tracking-tight">Tekan & Tahan untuk Menerima Berkat Adat</h3>
              <p className="text-[10.5px] text-gray-400 leading-relaxed">
                Salurkan energi kehormatan virtual Anda. Sentuh dan tahan tombol Tameng Adat selama 1.5 detik. Dapatkan simfoni audio Sape, koin harian EunoiaPay <strong className="text-emerald-400">Rp 50.000</strong>, dan artefak Dayak sakral!
              </p>
              
              {/* Collected Badges gallery */}
              {blessingsUnlocked.length > 0 && (
                <div className="pt-1 space-y-1">
                  <span className="text-[8.5px] text-gray-500 font-black uppercase tracking-wider block">Dompet Artefak Adat Anda:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {blessingsUnlocked.map((name, bIdx) => {
                      const meta = COLLECTIBLE_BLESSINGS.find(c => c.name === name);
                      return (
                        <div 
                          key={bIdx} 
                          onClick={() => {
                            triggerPushNotification(
                              "🎒 Info Artefak",
                              `${meta?.icon} ${name}\nLangka: ${meta?.rarity}\n${meta?.desc}`,
                              "info"
                            );
                          }}
                          className="px-2 py-1 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded-lg flex items-center space-x-1 cursor-pointer transition-all active:scale-95"
                        >
                          <span className="text-xs">{meta?.icon || "🔮"}</span>
                          <span className="text-[9px] font-bold text-gray-300">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Interactive celebration popup inside the card */}
          {showCelebration && unlockedAmulet && (
            <div className="absolute inset-0 bg-neutral-950/95 z-20 p-4 flex flex-col items-center justify-center text-center space-y-2 animate-fade-in">
              <div className="text-4xl animate-bounce">{unlockedAmulet.icon}</div>
              <div className="space-y-0.5">
                <span className="text-[8px] bg-amber-500 text-black px-2 py-0.5 rounded font-black uppercase tracking-widest font-mono">
                  {unlockedAmulet.rarity}
                </span>
                <h4 className="text-sm font-black text-white">Mendapatkan {unlockedAmulet.name}</h4>
                <p className="text-[10px] text-gray-400 max-w-[250px] mx-auto italic">
                  "{unlockedAmulet.desc}"
                </p>
                <div className="text-[10px] text-emerald-400 font-black font-mono pt-1">
                  💰 + Rp 50.000 Ditambahkan ke Saldo EunoiaPay!
                </div>
              </div>
              
              <div className="flex space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowCelebration(false);
                    setUnlockedAmulet(null);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-[10px] font-black uppercase tracking-wider text-white transition-colors active:scale-95"
                >
                  Terima Kasih
                </button>
                {/* Instant developer bypass to reset cooldown */}
                <button
                  type="button"
                  onClick={() => {
                    setShowCelebration(false);
                    setUnlockedAmulet(null);
                    setCooldownRemaining(0);
                    setHoldProgress(0);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-[9px] font-bold text-gray-400 hover:text-white transition-colors"
                  title="Lewati Cooldown"
                >
                  Reset Cepat
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* NEUMORPHIC INTERACTIVE WIDGETS & GRADIENT CARD */}
        {/* ========================================== */}
        <div className="mb-8 p-6 rounded-3xl bg-neutral-900 border border-neutral-800/80 shadow-2xl space-y-6 text-left relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800/60 pb-4">
            <div>
              <span className="text-[9px] px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full font-black uppercase tracking-wider font-mono">
                🎛️ Eunoiaverse Command Center
              </span>
              <h3 className="text-base font-black text-white tracking-tight mt-1">
                Lamin Neumorphic Control Deck
              </h3>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* COLUMN 1: NEUMORPHIC AUDIO SYNTH WIDGET */}
            <div className="p-5 rounded-2xl bg-neutral-900 neu-flat space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                  Sape' Acoustics Widget
                </span>
                <span className="text-[9px] text-gray-500 font-mono font-bold">Neumorphic Panel</span>
              </div>

              {/* 3D Neumorphic Buttons Deck */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Button 1: Reverb Boost */}
                <button
                  type="button"
                  onClick={() => {
                    setSapeReverb(!sapeReverb);
                    playHoldPluck(sapeReverb ? 330 : 440, 0.12);
                    if (settingsHaptic && typeof navigator !== 'undefined' && navigator.vibrate) {
                      navigator.vibrate(35);
                    }
                    triggerPushNotification("🎚️ Reverb Diubah", `Akustik Sape reverb kini ${!sapeReverb ? 'Aktif (Katedral)' : 'Mati (Studio)'}`, "info");
                  }}
                  className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    sapeReverb 
                      ? 'bg-neutral-900 neu-pressed text-amber-400 font-bold scale-[0.97]' 
                      : 'bg-neutral-900 neu-flat text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg">🎪</span>
                  <span className="text-[10px] font-black tracking-tight mt-1">Reverb Katedral</span>
                  <span className="text-[8px] text-gray-500 font-mono mt-0.5">{sapeReverb ? "AKTIF" : "NON-AKTIF"}</span>
                </button>

                {/* Button 2: Echo */}
                <button
                  type="button"
                  onClick={() => {
                    setSapeEcho(!sapeEcho);
                    playHoldPluck(sapeEcho ? 275 : 550, 0.12);
                    if (settingsHaptic && typeof navigator !== 'undefined' && navigator.vibrate) {
                      navigator.vibrate(35);
                    }
                    triggerPushNotification("🎚️ Echo Diubah", `Penundaan gema Sape kini ${!sapeEcho ? 'Aktif' : 'Mati'}`, "info");
                  }}
                  className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    sapeEcho 
                      ? 'bg-neutral-900 neu-pressed text-teal-400 font-bold scale-[0.97]' 
                      : 'bg-neutral-900 neu-flat text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg">📢</span>
                  <span className="text-[10px] font-black tracking-tight mt-1">Gema Lembah</span>
                  <span className="text-[8px] text-gray-500 font-mono mt-0.5">{sapeEcho ? "AKTIF" : "NON-AKTIF"}</span>
                </button>
              </div>

              {/* Neumorphic Sliders and Knobs Deck */}
              <div className="flex items-center gap-4 p-3 bg-neutral-950/40 rounded-2xl border border-neutral-800/50">
                {/* 3D Knob Component */}
                <div className="flex flex-col items-center space-y-1 select-none">
                  <span className="text-[8px] text-gray-500 font-black uppercase tracking-wider">Resonansi</span>
                  <div 
                    onClick={() => {
                      const nextAngle = (resonantAngle + 45) % 360;
                      setResonantAngle(nextAngle);
                      playHoldPluck(300 + (nextAngle / 360) * 400, 0.1);
                      if (settingsHaptic && typeof navigator !== 'undefined' && navigator.vibrate) {
                        navigator.vibrate(30);
                      }
                    }}
                    className="w-12 h-12 rounded-full bg-neutral-900 neu-flat flex items-center justify-center cursor-pointer transition-all active:scale-95 relative"
                    style={{ transform: `rotate(${resonantAngle}deg)` }}
                  >
                    {/* Knob line indicator */}
                    <div className="absolute top-1 w-1 h-3.5 bg-amber-500 rounded-full" />
                    <div className="w-4 h-4 rounded-full bg-neutral-950 shadow-inner" />
                  </div>
                  <span className="text-[9px] font-mono text-amber-500 font-bold">{resonantAngle}°</span>
                </div>

                {/* Neumorphic Linear Slider */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between text-[8px] font-black uppercase tracking-wider text-gray-400">
                    <span>Kedalaman Akustik</span>
                    <span className="font-mono text-amber-400">{acousticDepth}%</span>
                  </div>
                  <div className="h-5 bg-neutral-950/80 rounded-full p-1 border border-neutral-800 flex items-center relative overflow-hidden">
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={acousticDepth} 
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setAcousticDepth(val);
                        if (val % 10 === 0) {
                          playHoldPluck(220 + (val / 100) * 330, 0.05);
                        }
                      }}
                      className="w-full h-full opacity-0 absolute inset-0 cursor-pointer z-10"
                    />
                    <div 
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-inner shadow-amber-500/20 transition-all pointer-events-none"
                      style={{ width: `${acousticDepth}%` }}
                    />
                    {/* Floating circular head */}
                    <div 
                      className="absolute w-4.5 h-4.5 rounded-full bg-neutral-900 neu-flat border border-amber-500/30 shadow transition-all pointer-events-none"
                      style={{ left: `calc(${acousticDepth}% - 12px)` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: GLOWING GRADIENT CARD & PRODUCT WIDGET */}
            <div className="flex flex-col space-y-4">
              {/* Premium Gradient Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-tr from-amber-600 via-rose-600 to-indigo-700 shadow-xl shadow-amber-950/20 text-white relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                {/* Mesh noise effect overlay */}
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-[8px] bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider border border-white/10">
                      VIP Investor Tier
                    </span>
                    <h4 className="text-base font-black tracking-tight mt-1.5">Lamin Golden Card</h4>
                  </div>
                  <span className="text-xl">🌟</span>
                </div>

                <div className="space-y-1 relative z-10">
                  <span className="text-[9px] text-white/75 font-semibold font-mono">ESTIMATED ASSET PORTFOLIO</span>
                  <div className="text-lg font-black font-mono flex items-baseline space-x-1.5">
                    <span>Rp</span>
                    <span className="text-xl">{(balance * 1.15).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] text-white/80 pt-2 border-t border-white/10 relative z-10">
                  <span>Hulu Sungai Mahakam</span>
                  <span className="font-mono font-bold tracking-widest">KUBAR-003-VIP</span>
                </div>
              </div>

              {/* Widget: Commodity Pricing with Gradient Tab Slider */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">
                    Kubar Komoditas Index
                  </span>
                  <span className="text-[9px] bg-neutral-950 border border-neutral-800 px-2 py-0.5 text-gray-500 font-mono rounded">
                    Simulated Live
                  </span>
                </div>

                {/* Gradient Pill Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800/80">
                  {(['ulin', 'rotan', 'madu'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setSelectedMarketTab(tab);
                        playHoldPluck(tab === 'ulin' ? 220 : tab === 'rotan' ? 275 : 330, 0.08);
                        if (settingsHaptic && typeof navigator !== 'undefined' && navigator.vibrate) {
                          navigator.vibrate(20);
                        }
                      }}
                      className={`py-1 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        selectedMarketTab === tab
                          ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow shadow-teal-500/20'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-neutral-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Active Tab Output with custom gradient display and rounded corners */}
                {selectedMarketTab === 'ulin' && (
                  <div className="flex items-center justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/60 animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🪵</span>
                      <div>
                        <p className="text-[10px] font-black text-white">Kayu Ulin Kubar</p>
                        <p className="text-[8px] text-gray-500">Keras, tahan air & bernilai tinggi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-teal-400 font-mono">Rp 4.500.000 / m³</p>
                      <p className="text-[8px] text-emerald-500 font-bold font-mono">+1.8% ↑</p>
                    </div>
                  </div>
                )}
                {selectedMarketTab === 'rotan' && (
                  <div className="flex items-center justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/60 animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🌿</span>
                      <div>
                        <p className="text-[10px] font-black text-white">Rotan Alami Jempang</p>
                        <p className="text-[8px] text-gray-500">Bahan kerajinan ramah lingkungan</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-indigo-400 font-mono">Rp 120.000 / kg</p>
                      <p className="text-[8px] text-rose-500 font-bold font-mono">-0.4% ↓</p>
                    </div>
                  </div>
                )}
                {selectedMarketTab === 'madu' && (
                  <div className="flex items-center justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/60 animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🍯</span>
                      <div>
                        <p className="text-[10px] font-black text-white">Madu Hutan Melak</p>
                        <p className="text-[8px] text-gray-500">Murni dari pohon ulin purba</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-amber-400 font-mono">Rp 350.000 / Liter</p>
                      <p className="text-[8px] text-emerald-500 font-bold font-mono">+3.2% ↑</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Neumorphic & Gradient Button Deck */}
          <div className="pt-2 border-t border-neutral-800/60">
            <div className="flex flex-col sm:flex-row gap-3.5">
              {/* Premium Gradient Button 1 */}
              <button
                type="button"
                onClick={() => {
                  setBalance(prev => prev + 100000);
                  playHoldPluck(523.25, 0.2); // C5 pluck
                  playHoldPluck(659.25, 0.2); // E5 pluck
                  if (settingsHaptic && typeof navigator !== 'undefined' && navigator.vibrate) {
                    navigator.vibrate([40, 50, 40]);
                  }
                  triggerPushNotification("💰 Dividen Harian Diterima", "Selamat! Anda mengklaim Dana Dividen Dayak virtual sebesar Rp 100.000!", "success");
                }}
                className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-[10.5px] font-black uppercase tracking-wider text-white shadow-lg shadow-orange-900/30 hover:shadow-orange-500/20 active:scale-95 transition-all text-center flex items-center justify-center space-x-2 border border-white/10 cursor-pointer font-bold"
              >
                <span>🎁</span>
                <span>Klaim Dividen Harian (+Rp 100.000)</span>
              </button>

              {/* Premium Gradient Button 2 */}
              <button
                type="button"
                onClick={() => {
                  playHoldPluck(330, 0.15);
                  if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                    triggerPushNotification("📳 Sensor Haptic Aktif", "Sensasi vibrasi sensor haptic disimulasikan sukses ke perangkat Anda!", "success");
                  } else {
                    triggerPushNotification("📳 Simulasi Haptic", "Vibrasi haptic disimulasikan secara visual karena browser tidak mendukung hardware API.", "info");
                  }
                }}
                className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-[10.5px] font-black uppercase tracking-wider text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-500/20 active:scale-95 transition-all text-center flex items-center justify-center space-x-2 border border-white/10 cursor-pointer font-bold"
              >
                <span>⚡</span>
                <span>Uji Sensor Haptic Perangkat</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* EUNOIA REFLECTION & AURA SYNC CENTER */}
        {/* ========================================== */}
        <div className="mb-8 p-6 rounded-3xl bg-neutral-900 border border-neutral-800/80 shadow-2xl text-left space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800/60 pb-4">
            <div>
              <span className="text-[9px] px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full font-black uppercase tracking-wider font-mono">
                ✨ Aura & Eunoia Syncer
              </span>
              <h3 className="text-base font-black text-white tracking-tight mt-1">
                Eunoia Mind & Aura CSV Sync Center
              </h3>
            </div>
            <button
              type="button"
              onClick={handleDownloadReflectionsCSV}
              className="p-2.5 rounded-xl bg-neutral-800 hover:text-amber-400 neu-button transition-colors flex items-center space-x-1"
              title="Unduh CSV Terkini"
            >
              <Download className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Ekspor</span>
            </button>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Sinkronisasikan afirmasi, refleksi, intensi, dan rasa syukur harian Anda menggunakan file CSV. 
            Kelola "Aura Indah" pikiran Anda (Eunoia) secara digital di database Eunoiaverse.
          </p>

          {/* DRAG AND DROP ZONE */}
          <div 
            onDragOver={handleCSVDragOver}
            onDragLeave={handleCSVDragLeave}
            onDrop={handleCSVDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
              csvDragOver 
                ? 'border-amber-500 bg-amber-500/10' 
                : 'border-neutral-700 hover:border-neutral-500 bg-neutral-950/40'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleCSVFileSelected(file);
              }}
              className="hidden" 
              accept=".csv"
            />
            <span className="text-3xl mb-2">📤</span>
            <p className="text-xs font-bold text-gray-200">
              {csvDragOver ? "Lepaskan file di sini" : "Tarik & lepas file .csv di sini, atau klik untuk memilih"}
            </p>
            <p className="text-[9px] text-gray-500 mt-1">
              Kolom wajib: ID, Title, Content, Category, Mood, Created At
            </p>
          </div>

          {/* ERROR STATUS */}
          {csvError && (
            <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-start space-x-2 animate-fade-in">
              <span className="text-base leading-none">⚠️</span>
              <div>
                <p className="font-bold">Gagal memproses file:</p>
                <p className="text-[10px] mt-0.5">{csvError}</p>
              </div>
            </div>
          )}

          {/* PREVIEW OF PARSED CSV ITEMS */}
          {csvParsedItems && csvParsedItems.length > 0 && (
            <div className="p-4 bg-neutral-950/60 rounded-2xl border border-neutral-800 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  📂 Pratinjau CSV ({csvParsedItems.length} item terdeteksi)
                </span>
                <button 
                  type="button"
                  onClick={() => setCsvParsedItems(null)}
                  className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-gray-400 hover:text-white transition-all text-[10px] uppercase font-black"
                >
                  Batal
                </button>
              </div>

              {/* Scrollable list */}
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {csvParsedItems.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 text-left space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-black font-mono text-gray-500">{item.id || `sync-${idx}`}</span>
                      <div className="flex space-x-1.5">
                        <span className="px-1.5 py-0.5 bg-neutral-800 text-gray-300 font-bold uppercase rounded">
                          {item.category || "affirmation"}
                        </span>
                        <span className="px-1.5 py-0.5 bg-indigo-950 text-indigo-400 font-bold uppercase rounded">
                          {item.mood || "Calm"}
                        </span>
                      </div>
                    </div>
                    <h5 className="text-xs font-black text-white">{item.title}</h5>
                    <p className="text-[10px] text-gray-400 italic">"{item.content}"</p>
                  </div>
                ))}
              </div>

              {/* Synchronization Mode Option */}
              <div className="p-3 bg-neutral-900 rounded-xl space-y-2 text-left border border-neutral-800">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Pilih Metode Sinkronisasi</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSyncMerge(true)}
                    className={`p-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                      syncMerge 
                        ? 'border-amber-500/50 bg-amber-500/10 text-amber-400 shadow-md' 
                        : 'border-neutral-800 bg-neutral-950 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span>🔄 Gabungkan (Merge)</span>
                    <span className="text-[8px] text-gray-500 mt-0.5 font-normal capitalize">Memperbarui & Menyisipkan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSyncMerge(false)}
                    className={`p-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                      !syncMerge 
                        ? 'border-rose-500/50 bg-rose-500/10 text-rose-400 shadow-md' 
                        : 'border-neutral-800 bg-neutral-950 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span>⚠️ Ganti Semua</span>
                    <span className="text-[8px] text-gray-500 mt-0.5 font-normal capitalize">Hapus database & timpa baru</span>
                  </button>
                </div>
              </div>

              {/* Action sync buttons */}
              <button
                type="button"
                disabled={isSyncing}
                onClick={handlePushCSVSync}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-950/20 active:scale-95 transition-all text-center flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isSyncing ? (
                  <>
                    <span className="animate-spin text-base">🔄</span>
                    <span>Mensinkronisasi...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Kirim & Sinkronisasi Ke Server</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ACTIVE SYNCHRONIZED ITEMS PREVIEW */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-black text-white uppercase tracking-widest flex items-center space-x-1.5">
                <span>✨</span>
                <span>Refleksi Pikiran Tersinkronisasi ({reflections.length})</span>
              </span>

              {/* Manual Add Button */}
              <button
                type="button"
                onClick={() => setIsAddingManual(!isAddingManual)}
                className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-[10px] font-black uppercase tracking-wider text-gray-300 hover:text-white transition-colors flex items-center space-x-1 self-start cursor-pointer"
              >
                <span>{isAddingManual ? "✕ Tutup Form" : "➕ Tambah Manual"}</span>
              </button>
            </div>

            {/* MANUAL INLINE FORM */}
            {isAddingManual && (
              <form onSubmit={handleManualAddReflection} className="p-4 bg-neutral-950/80 rounded-2xl border border-neutral-800 space-y-3.5 animate-slide-up">
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-500">➕ Tambah Refleksi Baru</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={manualTitle}
                    onChange={(e) => setManualTitle(e.target.value)}
                    placeholder="Judul Refleksi (cth: Keheningan Hati)"
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:border-neutral-700 text-xs text-white"
                  />
                  <textarea
                    value={manualContent}
                    onChange={(e) => setManualContent(e.target.value)}
                    placeholder="Isi afirmasi atau refleksi pikiran indah Anda..."
                    rows={2}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:border-neutral-700 text-xs text-white resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[8px] text-gray-500 font-bold uppercase block mb-1">Kategori</label>
                    <select
                      value={manualCategory}
                      onChange={(e) => setManualCategory(e.target.value)}
                      className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-gray-300 focus:outline-none"
                    >
                      <option value="affirmation">Affirmation</option>
                      <option value="reflection">Reflection</option>
                      <option value="intention">Intention</option>
                      <option value="gratitude">Gratitude</option>
                      <option value="reframed">Reframed</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[8px] text-gray-500 font-bold uppercase block mb-1">Mood Aura</label>
                    <select
                      value={manualMood}
                      onChange={(e) => setManualMood(e.target.value)}
                      className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-gray-300 focus:outline-none"
                    >
                      <option value="Calm">Calm (Teal)</option>
                      <option value="Inspired">Inspired (Amber)</option>
                      <option value="Reflective">Reflective (Purple)</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-[10px] font-black uppercase tracking-wider text-white rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  Simpan Refleksi
                </button>
              </form>
            )}

            {/* SEARCH AND FILTERS */}
            <div className="space-y-2">
              {/* Search text */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul atau isi afirmasi..."
                  className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none text-xs text-gray-300 placeholder-gray-600"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
                {['all', 'affirmation', 'reflection', 'intention', 'gratitude', 'reframed'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                      selectedCategoryFilter === cat
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                        : 'bg-neutral-950 border-neutral-850 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Mood Filter Pills */}
              <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
                {['all', 'Calm', 'Inspired', 'Reflective'].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMoodFilter(m)}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                      selectedMoodFilter === m
                        ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400'
                        : 'bg-neutral-950 border-neutral-850 text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {m === 'all' ? 'All Moods' : m}
                  </button>
                ))}
              </div>
            </div>

            {/* SYNCHRONIZED ITEMS GRID CONTAINER */}
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
              {isLoadingReflections ? (
                <div className="py-12 text-center text-xs text-gray-500 flex flex-col items-center justify-center space-y-2">
                  <span className="animate-spin text-xl">⏳</span>
                  <span>Memuat refleksi tersinkronisasi...</span>
                </div>
              ) : reflections.length === 0 ? (
                <div className="p-8 text-center bg-neutral-950/20 border border-neutral-800/40 rounded-2xl">
                  <p className="text-xs font-bold text-gray-500">Belum ada data refleksi pikiran.</p>
                  <p className="text-[10px] text-gray-600 mt-1">Gunakan drag & drop file CSV di atas untuk mensinkronisasi data afirmasi.</p>
                </div>
              ) : (() => {
                const filtered = reflections.filter(r => {
                  const matchSearch = 
                    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    r.content.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchCat = selectedCategoryFilter === 'all' || r.category === selectedCategoryFilter;
                  const matchMood = selectedMoodFilter === 'all' || r.mood === selectedMoodFilter;
                  return matchSearch && matchCat && matchMood;
                });

                if (filtered.length === 0) {
                  return (
                    <p className="text-center text-[10.5px] text-gray-600 py-6 font-bold italic">
                      Tidak ada hasil yang cocok dengan filter aktif.
                    </p>
                  );
                }

                return filtered.map((r) => {
                  // Determine visual mood colors
                  let moodColorClass = "from-teal-900/30 to-emerald-950/20 border-teal-800/30 text-teal-400";
                  let moodBadgeColor = "bg-teal-500/10 border-teal-500/30 text-teal-400";
                  if (r.mood === 'Inspired') {
                    moodColorClass = "from-amber-900/30 to-amber-950/20 border-amber-800/30 text-amber-400";
                    moodBadgeColor = "bg-amber-500/10 border-amber-500/30 text-amber-400";
                  } else if (r.mood === 'Reflective') {
                    moodColorClass = "from-purple-900/30 to-indigo-950/20 border-purple-800/30 text-purple-400";
                    moodBadgeColor = "bg-purple-500/10 border-purple-500/30 text-purple-400";
                  }

                  return (
                    <div 
                      key={r.id} 
                      className={`p-4 rounded-2xl bg-gradient-to-br ${moodColorClass} border shadow-inner flex justify-between items-start space-x-3.5 animate-fade-in`}
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-[8px] px-2 py-0.5 rounded-full border font-black uppercase tracking-wider font-mono ${moodBadgeColor}`}>
                            {r.mood}
                          </span>
                          <span className="text-[8px] px-2 py-0.5 bg-neutral-900/80 border border-neutral-800 text-gray-400 rounded-full font-black uppercase tracking-wider font-mono">
                            {r.category}
                          </span>
                          <span className="text-[8px] text-gray-500 font-mono font-bold">
                            {new Date(r.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-white tracking-tight">{r.title}</h4>
                          <p className="text-[11px] text-gray-300 leading-relaxed italic mt-1">"{r.content}"</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteReflectionItem(r.id)}
                        className="p-1.5 rounded-lg bg-neutral-900/80 hover:bg-red-950/40 border border-neutral-800 hover:border-red-900/40 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Hapus Refleksi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>

        {/* Post Box */}
        <form onSubmit={handlePostSubmit} className="mb-8 p-4 rounded-3xl bg-neutral-800 border border-neutral-700/20 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-black text-xs text-white">E</div>
            <span className="text-sm font-semibold">What's on your mind, Edo?</span>
          </div>
          
          <textarea 
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="Tuliskan cerita menarik tentang Kutai Barat hari ini..."
            className="w-full bg-transparent p-2 focus:outline-none text-gray-200 text-sm resize-none placeholder-gray-500"
            rows={3}
          />

          {/* New Post Image Preview */}
          {newPostImage && (
            <div className="relative mb-4 rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-900">
              <img src={newPostImage} className="w-full max-h-60 object-cover" alt="Preview post" />
              <button 
                type="button"
                onClick={() => setNewPostImage(null)}
                className="absolute top-3 right-3 p-2 bg-neutral-900/80 rounded-full text-white hover:bg-neutral-950 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Image Picker Expanded Section */}
          {showPostImagePicker && (
            <div className="p-3 mb-4 rounded-2xl bg-neutral-900/80 border border-neutral-700/50 space-y-3 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">Pilih atau Masukkan Foto</span>
                <button 
                  type="button" 
                  onClick={() => setShowPostImagePicker(false)}
                  className="text-gray-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct image URL input */}
              <input 
                type="text" 
                placeholder="Tempel URL Gambar di sini..."
                value={newPostImage || ''}
                onChange={(e) => setNewPostImage(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700/50 rounded-xl p-2 text-xs text-white focus:outline-none"
              />

              {/* Presets Gallery picker */}
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-black block">Preset Keindahan Kutai Barat</span>
                <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                  {KUBAR_PRESET_SCENERIES.map((preset, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setNewPostImage(preset.url)}
                      className="flex-none w-20 cursor-pointer group"
                    >
                      <div className="h-14 rounded-lg overflow-hidden border border-neutral-700 group-hover:border-blue-500 transition-colors">
                        <img src={preset.url} className="w-full h-full object-cover" alt="" />
                      </div>
                      <span className="text-[8px] text-gray-400 truncate block mt-0.5">{preset.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Poll Creator Section */}
          {showPollCreator && (
            <div className="p-4 mb-4 rounded-2xl bg-neutral-900 border border-neutral-700/50 space-y-3 animate-fade-in text-left">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5 font-mono">
                  <BarChart2 className="w-3.5 h-3.5 text-blue-500 animate-pulse" /> Buat Jajak Pendapat Komunitas
                </span>
                <button 
                  type="button" 
                  onClick={() => setShowPollCreator(false)}
                  className="p-1 rounded-lg bg-neutral-800 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Poll Question */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider font-mono">Pertanyaan Jajak Pendapat</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Pilih destinasi wisata alam terfavoritmu?"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700/50 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Poll Options */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider block font-mono">Pilihan Jawaban (Min 2 Pilihan)</label>
                {pollOptions.map((option, oIdx) => (
                  <div key={oIdx} className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 font-bold w-4 font-mono">{oIdx + 1}.</span>
                    <input 
                      type="text" 
                      required={oIdx < 2}
                      placeholder={oIdx === 0 ? "Contoh: Jembatan ATJ" : oIdx === 1 ? "Contoh: Air Terjun Jantur Inar" : `Pilihan ${oIdx + 1} (Opsional)`}
                      value={option}
                      onChange={(e) => {
                        const updated = [...pollOptions];
                        updated[oIdx] = e.target.value;
                        setPollOptions(updated);
                      }}
                      className="flex-1 bg-neutral-800 border border-neutral-700/50 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = pollOptions.filter((_, idx) => idx !== oIdx);
                          setPollOptions(updated);
                        }}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-950/20 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                
                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    className="mt-1 text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Pilihan Jawaban
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-3 border-t border-neutral-700/50 pt-3">
            <div className="flex space-x-3 items-center">
              <div className="flex space-x-3">
                <label className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors p-1.5 hover:bg-neutral-700/30 rounded-xl">
                  <Camera className="w-5 h-5" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                </label>
                <button 
                  type="button" 
                  onClick={() => setShowPostImagePicker(!showPostImagePicker)}
                  className={`transition-colors p-1.5 rounded-xl ${showPostImagePicker ? 'text-blue-500 bg-neutral-700/50' : 'text-gray-400 hover:text-purple-500 hover:bg-neutral-700/30'}`}
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowPollCreator(!showPollCreator);
                    if (!showPollCreator && pollOptions.length < 2) {
                      setPollOptions(['', '']);
                    }
                  }}
                  className={`transition-colors p-1.5 rounded-xl ${showPollCreator ? 'text-blue-500 bg-neutral-700/50' : 'text-gray-400 hover:text-emerald-500 hover:bg-neutral-700/30'}`}
                  title="Tambahkan Polling Jajak Pendapat"
                >
                  <BarChart2 className="w-5 h-5" />
                </button>
              </div>

              {/* Indicator: Draf disimpan otomatis */}
              {(newPostText.trim() !== '' || pollQuestion.trim() !== '' || (showPollCreator && pollOptions.some(o => o.trim() !== '')) || newPostImage) && (
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-1 rounded-full flex items-center gap-1.5 font-mono animate-fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Draf disimpan
                </span>
              )}
            </div>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm transition-all"
            >
              Post
            </button>
          </div>
        </form>

      {/* Feed */}
      <div className="space-y-6 pb-24">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="p-5 rounded-3xl bg-neutral-800 neu-flat animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-neutral-700 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-neutral-700 rounded w-1/4" />
                    <div className="h-2.5 bg-neutral-700 rounded w-1/6" />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-neutral-700 rounded w-full" />
                  <div className="h-3 bg-neutral-700 rounded w-5/6" />
                </div>
                <div className="h-32 bg-neutral-700/50 rounded-2xl w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-6 rounded-3xl bg-neutral-800 border border-red-500/20 text-center space-y-3">
            <p className="text-sm text-red-400 font-semibold">{error}</p>
            <button 
              onClick={fetchPosts}
              className="px-4 py-1.5 bg-neutral-700 hover:bg-neutral-600 rounded-full text-xs font-bold transition-colors"
            >
              Retry
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm italic">
            No posts found in the database.
          </div>
        ) : (
          posts.map(post => (
          <div key={post.id} className="p-5 rounded-3xl bg-neutral-800 neu-flat">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center font-bold text-xs">{post.user.charAt(0)}</div>
                <div>
                  <h4 className="font-bold text-sm flex items-center">
                    {post.user}
                    {post.user === "Edo Erpani" && (
                      <span className="ml-2 text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 font-extrabold px-1.5 py-0.5 rounded-md uppercase">You</span>
                    )}
                  </h4>
                  <p className="text-[10px] text-gray-500">{getRelativeTime(post.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {post.user === "Edo Erpani" && (
                  <button 
                    onClick={() => handleStartEdit(post.id, post.content)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-blue-500 hover:bg-neutral-700/50 transition-colors"
                    title="Edit Post"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
                <button className="text-gray-500 p-1.5"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
            </div>

            {editingPostId === post.id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(post.id); }} className="space-y-3 mb-4 animate-slide-up">
                <textarea
                  value={editContentText}
                  onChange={(e) => setEditContentText(e.target.value)}
                  className="w-full bg-neutral-900/60 p-3 rounded-2xl border border-neutral-700/50 focus:border-blue-500 focus:outline-none text-sm text-gray-200 resize-none"
                  rows={3}
                  autoFocus
                />
                <div className="flex justify-end space-x-2 text-xs">
                  <button 
                    type="button" 
                    onClick={handleCancelEdit}
                    className="px-3.5 py-1.5 rounded-xl border border-neutral-700 text-gray-400 hover:bg-neutral-700/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{post.content}</p>
            )}

            {post.image && <img src={post.image} className="rounded-2xl w-full mb-4 shadow-xl" alt="" />}

            {/* Interactive Poll Widget */}
            {post.poll && (
              <div className="p-4 mb-4 rounded-2xl bg-neutral-900/60 border border-neutral-700/10 space-y-3 text-left">
                <h5 className="text-xs font-black uppercase text-amber-500 tracking-wider flex items-center gap-1.5 font-mono">
                  <BarChart2 className="w-4 h-4 text-emerald-400" /> Jajak Pendapat Komunitas
                </h5>
                <p className="text-sm font-bold text-white mb-2">{post.poll.question}</p>
                
                {(() => {
                  const hasVoted = votedPollIds[post.id] !== undefined;
                  const userVotedOptionId = votedPollIds[post.id];
                  const totalVotes = post.poll.options.reduce((sum: number, o: any) => sum + (o.votes || 0), 0);

                  return (
                    <div className="space-y-2.5">
                      {post.poll.options.map((option: any) => {
                        const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                        const isUserChoice = userVotedOptionId === option.id;

                        return (
                          <div key={option.id} className="relative">
                            {hasVoted ? (
                              <div className="w-full min-h-[38px] p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between relative overflow-hidden">
                                {/* Percentage bar */}
                                <div 
                                  className={`absolute top-0 left-0 bottom-0 ${isUserChoice ? 'bg-blue-500/10' : 'bg-neutral-800/40'} transition-all duration-1000`} 
                                  style={{ width: `${pct}%` }}
                                />
                                <span className="text-xs text-gray-200 z-10 flex items-center gap-1.5 font-medium">
                                  {option.text}
                                  {isUserChoice && <span className="text-[9px] font-black uppercase tracking-wider text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded-md">Pilihanmu</span>}
                                </span>
                                <span className="text-xs font-mono font-bold text-gray-400 z-10">{pct}% ({option.votes || 0})</span>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleVotePoll(post.id, option.id)}
                                className="w-full p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800/80 border border-neutral-800 text-left text-xs font-bold text-gray-300 hover:text-white hover:border-blue-500/50 transition-all flex items-center justify-between group"
                              >
                                <span>{option.text}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-[10px] text-blue-400 font-black uppercase tracking-wider transition-opacity">PILIH</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                      <div className="text-[9px] text-gray-500 font-mono font-bold flex justify-between px-1 mt-1">
                        <span>{totalVotes.toLocaleString('id-ID')} suara terkumpul</span>
                        <span>{hasVoted ? '✓ SUDAH BERBAGI SUARA' : '🗳️ JANGAN LEWATKAN'}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
            
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => handleLike(post.id)} 
                className={`relative flex items-center space-x-2 transition-colors focus:outline-none ${likedPostIds[post.id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
              >
                <div className="relative flex items-center justify-center">
                  <motion.div
                    key={likedPostIds[post.id] ? 'liked' : 'unliked'}
                    animate={{ 
                      scale: likedPostIds[post.id] ? [1, 1.6, 0.9, 1.1, 1] : [1, 0.9, 1],
                      rotate: likedPostIds[post.id] ? [0, -15, 15, -5, 0] : 0
                    }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="flex items-center justify-center z-10"
                  >
                    <Heart className={`w-5 h-5 ${likedPostIds[post.id] ? 'fill-red-500 text-red-500' : ''}`} />
                  </motion.div>
                  
                  {/* Visual burst effect: rings and small heart sparks */}
                  {likedPostIds[post.id] && (
                    <>
                      {/* Expanding Ring */}
                      <motion.div
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute w-5 h-5 rounded-full border-2 border-red-500/60 pointer-events-none z-0"
                      />
                      
                      {/* Mini floating heart sparks shooting outwards */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
                        const rad = (angle * Math.PI) / 180;
                        const distance = 24 + Math.random() * 8;
                        const x = Math.cos(rad) * distance;
                        const y = Math.sin(rad) * distance;
                        return (
                          <motion.div
                            key={index}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{ x, y, scale: [0, 1, 0.6, 0], opacity: [1, 1, 0.8, 0] }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.01 }}
                            className="absolute pointer-events-none text-[8px] select-none text-red-500 font-sans z-0"
                          >
                            ❤️
                          </motion.div>
                        );
                      })}
                    </>
                  )}
                </div>
                <span className="text-xs font-bold">{post.likes}</span>
              </button>
              
              <button 
                onClick={() => toggleComments(post.id)} 
                className={`flex items-center space-x-2 transition-colors ${expandedComments[post.id] ? 'text-blue-500 font-bold' : 'text-gray-500 hover:text-blue-500'}`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-bold">{(post.comments || []).length}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Comments Section */}
            {expandedComments[post.id] && (
              <div className="mt-4 pt-4 border-t border-neutral-700/50 space-y-4 animate-slide-up">
                {/* Comments List */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {(!post.comments || post.comments.length === 0) ? (
                    <p className="text-xs text-gray-500 italic px-2 py-1">No comments yet. Be the first to comment!</p>
                  ) : (
                    post.comments.map(comment => (
                      <div key={comment.id} className="flex items-start space-x-3 text-sm p-3 rounded-2xl bg-neutral-900/30 border border-neutral-800">
                        <div className="w-7 h-7 bg-neutral-700 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 text-gray-200">
                          {comment.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="font-bold text-xs text-gray-300">{comment.user}</span>
                            <span className="text-[9px] text-gray-500">{getRelativeTime(comment.timestamp)}</span>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed break-words">{comment.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Input Form */}
                <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex items-center space-x-2 pt-2 border-t border-neutral-700/30">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs text-white">
                    E
                  </div>
                  <div className="flex-1 flex items-center rounded-2xl bg-neutral-900/60 px-3 py-2 border border-neutral-700/40">
                    <input
                      type="text"
                      value={commentDrafts[post.id] || ''}
                      onChange={(e) => setCommentDrafts({...commentDrafts, [post.id]: e.target.value})}
                      placeholder="Write a comment..."
                      className="bg-transparent w-full text-xs text-gray-200 focus:outline-none placeholder-gray-500"
                    />
                    <button 
                      type="submit" 
                      disabled={!(commentDrafts[post.id] || '').trim()}
                      className="ml-2 text-xs font-bold text-blue-500 hover:text-blue-400 disabled:opacity-40 disabled:hover:text-blue-500 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )))}
      </div>
    </div>
    );
  };

  const ExploreView = () => {
    const [showKubarMap, setShowKubarMap] = useState(true);
    const [hoveredMapDestId, setHoveredMapDestId] = useState<number | null>(null);
    const [highlightedDestId, setHighlightedDestId] = useState<number | null>(null);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const bookingHoldTimerRef = useRef<NodeJS.Timeout | null>(null);
    const bookingProgressTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      return () => {
        if (bookingProgressTimerRef.current) clearInterval(bookingProgressTimerRef.current);
        if (bookingHoldTimerRef.current) clearTimeout(bookingHoldTimerRef.current);
      };
    }, []);

    const startBookingHold = (dest: any) => {
      if (heldDestId !== null) return;
      setHeldDestId(dest.id);
      setHeldProgress(0);

      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass();
          const now = audioCtx.currentTime;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(330, now);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.4);
        }
      } catch (err) {}

      let currentProgress = 0;
      bookingProgressTimerRef.current = setInterval(() => {
        currentProgress += 2;
        if (currentProgress >= 100) {
          currentProgress = 100;
          setHeldProgress(100);
          setHeldDestId(null);
          if (bookingProgressTimerRef.current) clearInterval(bookingProgressTimerRef.current);
          if (bookingHoldTimerRef.current) clearTimeout(bookingHoldTimerRef.current);
          
          handleInstantBook(dest);
        } else {
          setHeldProgress(currentProgress);
        }
      }, 30);
    };

    const stopBookingHold = () => {
      setHeldDestId(null);
      setHeldProgress(0);
      if (bookingProgressTimerRef.current) {
        clearInterval(bookingProgressTimerRef.current);
        bookingProgressTimerRef.current = null;
      }
      if (bookingHoldTimerRef.current) {
        clearTimeout(bookingHoldTimerRef.current);
        bookingHoldTimerRef.current = null;
      }
    };

    // Full-screen interactive map states
    const [showFullScreenMap, setShowFullScreenMap] = useState(false);
    const [routeStartPoint, setRouteStartPoint] = useState<string>('sendawar');
    const [routeEndPoint, setRouteEndPoint] = useState<number | null>(null);
    const [mapZoom, setMapZoom] = useState<number>(1);
    const [mapPan, setMapPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [mapLayers, setMapLayers] = useState({ rivers: true, grid: true, terrain: true });
    const [mapSearchQuery, setMapSearchQuery] = useState('');
    const [mapSelectedCategory, setMapSelectedCategory] = useState('Semua');
    const [sidebarTab, setSidebarTab] = useState('route');
    const [activeModalTab, setActiveModalTab] = useState<'map' | 'guide'>('map');
    const [mapSelectedDest, setMapSelectedDest] = useState<Destination | null>(null);

    const [mapShowUmkm, setMapShowUmkm] = useState(true);
    const [selectedUmkmNearDest, setSelectedUmkmNearDest] = useState<number | null>(null);
    const [mapSelectedUmkm, setMapSelectedUmkm] = useState<CraftUMKM | null>(null);

    useEffect(() => {
      if (routeEndPoint) {
        setSelectedUmkmNearDest(routeEndPoint);
      }
    }, [routeEndPoint]);

    const getStartCoords = (point: string) => {
      if (point === 'sendawar') return { x: 50, y: 45, label: "Sendawar (Pusat)" };
      if (point === 'melak') return { x: 68, y: 38, label: "Melak (Dermaga)" };
      if (point === 'jempang') return { x: 78, y: 82, label: "Tanjung Isuy" };
      const destId = parseInt(point);
      const dest = KUBAR_DESTINATIONS.find(d => d.id === destId);
      if (dest) return { x: dest.mapX, y: dest.mapY, label: dest.name };
      return { x: 50, y: 45, label: "Sendawar (Pusat)" };
    };

    const getEndCoords = (id: number | null) => {
      if (!id) return null;
      const dest = KUBAR_DESTINATIONS.find(d => d.id === id);
      if (dest) return { x: dest.mapX, y: dest.mapY, label: dest.name };
      return null;
    };

    const getRouteInfo = (start: string, endId: number | null) => {
      const defaultRoute = {
        distance: 0,
        timeStr: "0 Menit",
        type: "Darat",
        vehicle: "N/A",
        steps: ["Pilih titik mulai dan titik tujuan untuk melihat rute panduan."],
        adventureScoring: 0
      };
      
      if (!endId) return defaultRoute;
      
      const dest = KUBAR_DESTINATIONS.find(d => d.id === endId);
      if (!dest) return defaultRoute;
      
      const startCoords = getStartCoords(start);
      const endCoords = { x: dest.mapX, y: dest.mapY };
      
      const dx = endCoords.x - startCoords.x;
      const dy = endCoords.y - startCoords.y;
      const rawDist = Math.sqrt(dx*dx + dy*dy);
      const distance = Math.max(5, Math.round(rawDist * 1.6));
      
      let timeInMinutes = Math.round(distance * 1.4 + 5);
      let vehicle = "Mobil SUV / Motor";
      let type = "Jalur Darat (Semen/Aspal)";
      let adventureScoring = 45 + Math.round(distance / 2.5);
      
      if (dest.category === "Danau" || (dest.category === "Budaya" && dest.location.includes("Jempang"))) {
        type = "Kombinasi Darat & Sungai";
        vehicle = "Mobil + Perahu Ketinting";
        timeInMinutes = Math.round(distance * 2.1);
        adventureScoring = Math.min(98, adventureScoring + 25);
      } else if (dest.category === "Air Terjun" || dest.category === "Hutan Adat") {
        type = "Darat + Trekking Hutan";
        vehicle = "Motor / Mobil + Jalan Kaki";
        timeInMinutes = Math.round(distance * 1.6 + 15);
        adventureScoring = Math.min(95, adventureScoring + 15);
      }
      
      const hours = Math.floor(timeInMinutes / 60);
      const mins = timeInMinutes % 60;
      const timeStr = hours > 0 ? `${hours} Jam ${mins} Menit` : `${mins} Menit`;
      
      const steps: string[] = [];
      const startLabel = startCoords.label;
      const endLabel = dest.name;
      
      steps.push(`Mulai keberangkatan dari [${startLabel}]. Pastikan kendaraan prima dan bahan bakar terisi penuh.`);
      
      if (start === 'sendawar') {
        if (dest.id === 1 || dest.id === 4) {
          steps.push("Ambil jalan utama Trans Kalimantan menuju arah timur (arah Tenggarong/Samarinda). Berjalan sejauh kurang lebih 60 km.");
          steps.push("Tiba di persimpangan Jempang, belok kanan memasuki jalan koridor perkampungan nelayan.");
          if (dest.id === 1) {
            steps.push("Lanjutkan perjalanan darat melintasi jalan semen cor sejauh 15 km menuju Kampung Tanjung Isuy.");
            steps.push("Dari Tanjung Isuy, ikuti papan petunjuk arah ke Lamin Mancong. Jalan masuk berupa tanah merah padat.");
            steps.push("Tiba di Lamin Mancong. Parkir kendaraan di area lamin adat.");
          } else {
            steps.push("Menuju dermaga tambatan perahu Tanjung Isuy.");
            steps.push("Sewa perahu kayu ces (ketinting) lokal untuk menyeberang dan berkeliling Danau Jempang.");
          }
        } else if (dest.id === 2) {
          steps.push("Berkendara santai ke arah selatan menyusuri rute Sekolaq Darat.");
          steps.push("Lewati kawasan pemukiman warga lokal dan kebun buah khas Kutai Barat.");
          steps.push("Masuk gerbang Cagar Alam Kersik Luway, ikuti jalan berbatu kerikil sejauh 2 km.");
          steps.push("Tiba di pos penjagaan cagar alam kersik luway anggrek hitam.");
        } else if (dest.id === 3 || dest.id === 6) {
          steps.push("Berkendara ke arah utara melintasi rute lingkar luar Sendawar menuju Kecamatan Linggang Bigung.");
          steps.push("Tiba di simpang tiga Linggang Bigung, ambil jalan ke arah perkampungan adat.");
          if (dest.id === 3) {
            steps.push("Ikuti petunjuk arah wisata alam Jantur Mecu. Akses berupa jalan aspal mulus dilanjutkan jalan setapak.");
            steps.push("Parkir kendaraan di area wisata, lalu berjalan kaki sekitar 100 meter menuruni anak tangga semen.");
          } else {
            steps.push("Masuki area Kampung Adat Linggang Bigung menuju kawasan hutan lindung.");
            steps.push("Lanjutkan berjalan kaki dipandu oleh tetua adat/pemandu lokal menyusuri jalur setapak Hutan Adat Hemaq Beniung.");
          }
        } else if (dest.id === 5) {
          steps.push("Ambil arah barat menuju Kampung Temula.");
          steps.push("Ikuti rute jalan raya yang berbukit landai sejauh sekitar 15 km.");
          steps.push("Tiba di gerbang masuk Jantur Inar di kiri jalan.");
          steps.push("Trekking menuruni kurang lebih 200 anak tangga kayu ulin yang kokoh.");
        }
      } else if (start === 'melak') {
        steps.push("Berkendara keluar dari area dermaga Melak menuju jalan protokol utama.");
        if (dest.id === 2) {
          steps.push("Ambil arah barat daya menuju Sekolaq Darat.");
          steps.push("Berkendara melintasi persimpangan polda sejauh 10 km.");
          steps.push("Masuk gerbang Kersik Luway di Sekolaq Darat.");
        } else if (dest.id === 1 || dest.id === 4) {
          steps.push("Ambil jalur luar lintas kota menuju simpang raya, kemudian belok kiri ke arah Trans Kalimantan timur.");
          steps.push("Lanjutkan perjalanan sejauh 70 km melintasi perkebunan kelapa sawit rakyat.");
          steps.push("Tiba di dermaga atau pos Jempang untuk akses wisata.");
        } else {
          steps.push("Berkendara melintasi jalan poros Melak - Sendawar sejauh 18 km.");
          steps.push(`Setibanya di Sendawar, ikuti panduan arah utara ke wilayah [${dest.location}].`);
        }
      } else if (start === 'jempang') {
        steps.push("Mulai dari Tanjung Isuy (Jempang).");
        if (dest.id === 4) {
          steps.push("Berjalan kaki ke dermaga Tanjung Isuy.");
          steps.push("Sewa perahu ces langsung meluncur ke tengah Danau Jempang.");
        } else if (dest.id === 1) {
          steps.push("Berkendara melewati jalur darat darurat yang menghubungkan Tanjung Isuy dan Lamin Mancong (sekitar 10 km).");
        } else {
          steps.push("Lakukan perjalanan darat jarak menengah-jauh menuju arah barat (arah Sendawar/Melak) via jalan Trans Kalimantan.");
          steps.push(`Tiba di wilayah Sendawar untuk melanjutkan rute ke [${endLabel}].`);
        }
      } else {
        steps.push(`Berkendara keluar dari area wisata [${startLabel}].`);
        steps.push("Ikuti jalan raya penghubung antar-kampung menuju jalan poros utama Kutai Barat.");
        steps.push(`Tiba di gerbang masuk utama [${endLabel}] dan ikuti petunjuk pemandu setempat.`);
      }
      
      steps.push(`Selamat sampai tujuan di [${endLabel}]! Selamat berwisata dan jaga kebersihan alam.`);

      return {
        distance,
        timeStr,
        type,
        vehicle,
        steps,
        adventureScoring: Math.min(99, adventureScoring)
      };
    };

    // Filter and sort destinations based on search, selected category, and sort option
    const filteredDestinations = KUBAR_DESTINATIONS.filter(dest => {
      const matchesCategory = selectedKubarCategory === 'Semua' || dest.category === selectedKubarCategory;
      const matchesSearch = dest.name.toLowerCase().includes(kubarSearchQuery.toLowerCase()) || 
                            dest.location.toLowerCase().includes(kubarSearchQuery.toLowerCase()) ||
                            dest.description.toLowerCase().includes(kubarSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (kubarSortOption === 'rating') {
        return b.rating - a.rating;
      } else if (kubarSortOption === 'price') {
        return a.ticketPrice - b.ticketPrice;
      } else if (kubarSortOption === 'distance') {
        return a.travelMinutes - b.travelMinutes;
      }
      return 0;
    });

    // Toggle itinerary
    const handleToggleItinerary = (id: number) => {
      setKubarItinerary(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    };

    // Calculate total cost and item list for itinerary
    const itineraryItems = KUBAR_DESTINATIONS.filter(d => kubarItinerary.includes(d.id));
    const totalTicketCost = itineraryItems.reduce((acc, item) => acc + item.ticketPrice, 0);

    const [copiedItinerary, setCopiedItinerary] = useState(false);

    const generateShareText = () => {
      const userName = localStorage.getItem('profile_name') || 'Edo Erpani';
      const userLocation = localStorage.getItem('profile_location') || 'Kalimantan, Indonesia';
      let text = `==================================================\n`;
      text += `       EUNOIAVERSE KUTAI BARAT ITINERARY\n`;
      text += `==================================================\n`;
      text += `Petualang: ${userName}\n`;
      text += `Asal: ${userLocation}\n`;
      text += `Dibuat Pada: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n\n`;
      text += `Daftar Destinasi Rencana Perjalanan:\n\n`;

      itineraryItems.forEach((item, index) => {
        text += `${index + 1}. ${item.name} (${item.category})\n`;
        text += `   📍 Lokasi: ${item.location}\n`;
        text += `   🚗 Waktu Tempuh: ${item.travelTime}\n`;
        text += `   🪙 Tiket Masuk: ${item.ticketPrice === 0 ? 'Gratis' : 'Rp ' + item.ticketPrice.toLocaleString('id-ID')}\n`;
        text += `   📝 Deskripsi: ${item.description}\n`;
        text += `   ✨ Paket Wisata: ${item.packagePriceStr} (${item.packageDescription})\n\n`;
      });

      text += `==================================================\n`;
      text += `Estimasi Total Tiket Masuk: Rp ${totalTicketCost.toLocaleString('id-ID')}\n`;
      text += `==================================================\n`;
      text += `Diproduksi secara otomatis via Eunoiaverse Kubar.\n`;
      return text;
    };

    const handleCopyShareText = () => {
      const text = generateShareText();
      navigator.clipboard.writeText(text).then(() => {
        setCopiedItinerary(true);
        triggerPushNotification(
          "📋 Itinerary Tersalin",
          "Rencana perjalanan Anda berhasil disalin ke clipboard.",
          "success"
        );
        setTimeout(() => setCopiedItinerary(false), 3000);
      }).catch(err => {
        console.error("Gagal menyalin teks: ", err);
      });
    };

    const handleDownloadText = () => {
      const userName = localStorage.getItem('profile_name') || 'Edo Erpani';
      const text = generateShareText();
      const element = document.createElement("a");
      const file = new Blob([text], {type: 'text/plain;charset=utf-8'});
      element.href = URL.createObjectURL(file);
      element.download = `Itinerary_Kubar_${userName.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      triggerPushNotification(
        "📝 Berkas Teks Diunduh",
        "Itinerary Anda berhasil diunduh sebagai file teks.",
        "success"
      );
    };

    const handleExportInvoicePDF = (ord: any) => {
      try {
        const doc = new jsPDF();
        const invoiceRef = `INV/KUBAR/${ord.id}`;
        
        // Premium Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(219, 39, 119); // pink-600
        doc.text("KUTAI BARAT ARTISANAL", 20, 25);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(115, 115, 115);
        doc.text("Faktur Penjualan Resmi Kerajinan Rakyat Kalimantan Timur", 20, 30);
        doc.line(20, 35, 190, 35);
        
        // Invoice Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(38, 38, 38);
        doc.text("FAKTUR PEMBELIAN (INVOICE)", 20, 45);
        
        // Status Stamp Text
        doc.setFontSize(10);
        if (ord.status === 'Selesai') {
          doc.setTextColor(16, 185, 129); // emerald-500
          doc.text("STATUS: LUNAS / SELESAI", 130, 45);
        } else {
          doc.setTextColor(245, 158, 11); // amber-500
          doc.text("STATUS: PROSES KIRIM", 130, 45);
        }
        
        // Order Box Border
        doc.setDrawColor(229, 229, 229);
        doc.setFillColor(250, 250, 250);
        doc.rect(20, 50, 170, 56, "FD");
        
        // Order metadata
        doc.setFontSize(8.5);
        doc.setTextColor(82, 82, 82);
        doc.setFont("helvetica", "normal");
        doc.text("No. Faktur:", 25, 58);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text(invoiceRef, 65, 58);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Tanggal Transaksi:", 25, 65);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text(ord.date || "Hari ini", 65, 65);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Penjual (UMKM):", 25, 72);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text(ord.brandName || "Sentra Kerajinan Dayak", 65, 72);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Pembeli (Customer):", 25, 79);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("Edo Erpani", 65, 79);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Alamat Pengiriman:", 25, 86);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("Jl. Sendawar Raya, Barong Tongkok, Kutai Barat, Kaltim", 65, 86);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Metode Pembayaran:", 25, 93);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text("Saldoku Wallet (Terverifikasi)", 65, 93);

        // Table Header
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.setFillColor(243, 244, 246);
        doc.rect(20, 112, 170, 8, "F");
        doc.setTextColor(31, 41, 55);
        doc.text("Item Kerajinan", 25, 117);
        doc.text("Harga Satuan", 100, 117);
        doc.text("Kuantitas", 140, 117);
        doc.text("Subtotal", 165, 117);

        // Table Row 1
        doc.setFont("helvetica", "normal");
        doc.setTextColor(55, 65, 81);
        doc.text(ord.name.substring(0, 35), 25, 126);
        doc.text(`Rp ${Number(ord.price).toLocaleString('id-ID')}`, 100, 126);
        doc.text(`${ord.quantity}`, 145, 126);
        const itemSubtotal = Number(ord.price) * ord.quantity;
        doc.text(`Rp ${itemSubtotal.toLocaleString('id-ID')}`, 165, 126);

        doc.line(20, 132, 190, 132);

        // Summary Calculations
        const shipping = ord.shippingCost || 12000;
        const service = ord.serviceFee || 1500;
        const community = ord.communitySupportFee || 2500;
        const total = ord.totalPaid || (itemSubtotal + shipping + service + community);

        doc.setFontSize(8.5);
        doc.setTextColor(107, 114, 128);
        doc.text("Subtotal Barang:", 110, 140);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(55, 65, 81);
        doc.text(`Rp ${itemSubtotal.toLocaleString('id-ID')}`, 165, 140);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(107, 114, 128);
        doc.text("Ongkos Kirim Flat:", 110, 146);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(55, 65, 81);
        doc.text(`Rp ${shipping.toLocaleString('id-ID')}`, 165, 146);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(107, 114, 128);
        doc.text("Biaya Layanan:", 110, 152);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(55, 65, 81);
        doc.text(`Rp ${service.toLocaleString('id-ID')}`, 165, 152);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(107, 114, 128);
        doc.text("Dukungan Adat Dayak:", 110, 158);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(55, 65, 81);
        doc.text(`Rp ${community.toLocaleString('id-ID')}`, 165, 158);

        doc.line(110, 163, 190, 163);

        doc.setFontSize(10.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(16, 185, 129); // emerald-500
        doc.text("TOTAL DIBAYAR:", 110, 170);
        doc.text(`Rp ${total.toLocaleString('id-ID')}`, 165, 170);

        // Seal / Footer
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(156, 163, 175);
        doc.text("Faktur ini sah diterbitkan secara elektronik oleh Asosiasi Digital Kerajinan Kutai Barat.", 20, 195);
        doc.text("Terima kasih telah mendukung pemberdayaan pengrajin lokal Dayak Kalimantan Timur!", 20, 200);

        // Simulated Stamp
        doc.setDrawColor(16, 185, 129);
        doc.rect(20, 210, 45, 18);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(16, 185, 129);
        doc.text("LUNAS", 28, 218);
        doc.setFontSize(6.5);
        doc.text("SISTEM INTEGRASI KUBAR", 22, 224);

        doc.save(`Faktur_Kubar_${ord.id}.pdf`);
        
        triggerPushNotification(
          "🧾 Berkas PDF Diunduh",
          `Faktur pembelian "${ord.name}" berhasil diunduh sebagai PDF.`,
          "success"
        );
      } catch (err: any) {
        console.error("PDF generation failed:", err);
        alert("Gagal mengunduh PDF: " + err.message);
      }
    };

    const handleExportTicketPDF = (booking: any) => {
      try {
        const doc = new jsPDF();
        
        // Premium Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(16, 185, 129); // emerald-500
        doc.text("Eunoiaverse Kutai Barat", 20, 25);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(115, 115, 115);
        doc.text("Pintu Gerbang Budaya & Wisata Kutai Barat", 20, 31);
        doc.line(20, 36, 190, 36);
        
        // Ticket Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(38, 38, 38);
        doc.text("OFFICIAL TRAVEL E-TICKET", 20, 48);
        
        // Ticket Box Border
        doc.setDrawColor(229, 229, 229);
        doc.setFillColor(250, 250, 250);
        doc.rect(20, 54, 170, 100, "FD");
        
        // Ticket details
        doc.setFontSize(10);
        doc.setTextColor(82, 82, 82);
        doc.text("Booking ID:", 25, 64);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text(`#EUN-${booking.id}`, 65, 64);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Destinasi:", 25, 72);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text(booking.destName, 65, 72);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Tanggal Perjalanan:", 25, 80);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text(booking.date, 65, 80);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Nama Pemesan:", 25, 88);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text(booking.name, 65, 88);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Kontak:", 25, 96);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text(booking.contact, 65, 96);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Jumlah Wisatawan:", 25, 104);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(23, 23, 23);
        doc.text(`${booking.qty} Orang`, 65, 104);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Total Pembayaran:", 25, 112);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(16, 185, 129);
        doc.text(`Rp ${booking.totalPrice.toLocaleString('id-ID')}`, 65, 112);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        doc.text("Status Tiket:", 25, 120);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(16, 185, 129);
        doc.text("LUNAS / CONFIRMED", 65, 120);

        // Security code
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Tunjukkan E-Tiket ini kepada pemandu adat atau loket masuk untuk verifikasi.", 25, 134);
        doc.text("Tiket ini sah secara hukum adat dan terdaftar secara elektronik di sistem Eunoiaverse.", 25, 138);

        // Footer lines / signature
        doc.line(20, 164, 190, 164);
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(120, 120, 120);
        doc.text("Terima kasih telah berkontribusi langsung pada ekonomi kreatif & pelestarian adat Kutai Barat.", 20, 172);
        doc.text("Eunoiaverse - Harmoni Sape & Pesona Alam Borneo.", 20, 177);

        doc.save(`E-Ticket-${booking.destName.replace(/\s+/g, '-')}.pdf`);
        triggerPushNotification("📄 PDF Diunduh", `E-Tiket ${booking.destName} berhasil diunduh ke perangkat Anda.`, "success");
      } catch (e) {
        console.error("PDF generation failed:", e);
        triggerPushNotification("⚠️ Gagal Mengunduh", "Terjadi kesalahan saat memproses file PDF E-Tiket.", "error");
      }
    };

    const handleExportPDF = () => {
      try {
        const userName = localStorage.getItem('profile_name') || 'Edo Erpani';
        const userLocation = localStorage.getItem('profile_location') || 'Kalimantan, Indonesia';
        const doc = new jsPDF();
        
        // Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(16, 185, 129); // emerald-500
        doc.text("Eunoiaverse Kutai Barat", 20, 20);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(82, 82, 82);
        doc.text("Rencana Perjalanan Wisata Budaya & Alam (Itinerary)", 20, 27);
        doc.line(20, 32, 190, 32);
        
        // Traveler Details
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(38, 38, 38);
        doc.text(`Petualang: ${userName}`, 20, 40);
        doc.text(`Asal: ${userLocation}`, 20, 45);
        doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, 50);
        
        doc.line(20, 55, 190, 55);
        
        // Destination List Header
        let y = 65;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(23, 23, 23);
        doc.text("Destinasi Pilihan Anda:", 20, y);
        y += 10;
        
        itineraryItems.forEach((item, index) => {
          if (y > 255) {
            doc.addPage();
            y = 20;
          }
          
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(16, 185, 129);
          doc.text(`${index + 1}. ${item.name}`, 20, y);
          y += 6;
          
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(64, 64, 64);
          doc.text(`Kategori: ${item.category} | Lokasi: ${item.location}`, 20, y);
          y += 5;
          
          doc.text(`Waktu Tempuh: ${item.travelTime} | Tiket Masuk: ${item.ticketPrice === 0 ? 'Gratis' : 'Rp ' + item.ticketPrice.toLocaleString('id-ID')}`, 20, y);
          y += 5;
          
          // Split description text
          doc.setFont("helvetica", "italic");
          doc.setTextColor(115, 115, 115);
          const splitDesc = doc.splitTextToSize(item.description, 170);
          doc.text(splitDesc, 20, y);
          y += splitDesc.length * 4.5 + 8;
        });
        
        if (y > 250) {
          doc.addPage();
          y = 20;
        }
        
        doc.line(20, y, 190, y);
        y += 8;
        
        // Cost Summary
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(23, 23, 23);
        doc.text(`Estimasi Total Tiket Masuk: Rp ${totalTicketCost.toLocaleString('id-ID')}`, 20, y);
        y += 6;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(115, 115, 115);
        doc.text("Gunakan Eunoiaverse Kutai Barat untuk menjelajahi keunikan budaya Tanaa Purai Ngeriman.", 20, y);
        
        doc.save(`Itinerary_Kubar_${userName.replace(/\s+/g, '_')}.pdf`);
        
        triggerPushNotification(
          "📄 Dokumen PDF Diunduh",
          "Itinerary Anda berhasil diekspor sebagai file PDF.",
          "success"
        );
      } catch (error) {
        console.error("PDF generation failed: ", error);
        triggerPushNotification(
          "⚠️ Gagal Ekspor PDF",
          "Terjadi kesalahan saat memproses ekspor PDF.",
          "error"
        );
      }
    };

    // Submit review
    const handleAddReview = (destId: number, e: React.FormEvent) => {
      e.preventDefault();
      if (!newKubarReviewText.trim()) return;

      const newReview = {
        id: Date.now() + Math.random(),
        user: "Edo Erpani",
        content: newKubarReviewText.trim(),
        rating: newKubarReviewRating,
        timestamp: "Baru saja"
      };

      setKubarReviews(prev => ({
        ...prev,
        [destId]: [newReview, ...(prev[destId] || [])]
      }));

      setNewKubarReviewText('');
      setNewKubarReviewRating(5);
    };

    return (
      <div className="animate-slide-up space-y-6 pb-28">
        {/* Banner Wisata */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-teal-600/95 to-emerald-800/95 overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-200 font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jelajahi Kutai Barat</span>
            </div>
            <h3 className="text-xl font-black text-white">Surga Budaya & Alam Kalimantan</h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed max-w-sm">
              Temukan keindahan cagar alam, air terjun tropis, dan warisan leluhur Dayak yang magis di Tanaa Purai Ngeriman.
            </p>
          </div>
          <Compass className="absolute right-[-24px] bottom-[-24px] w-36 h-36 text-white opacity-10 rotate-12" />
        </div>

        {/* Explore Sub-Tabs */}
        <div className="flex p-1 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 shadow-inner">
          <button
            onClick={() => setExploreSubTab('destinations')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all flex items-center justify-center space-x-2 ${
              exploreSubTab === 'destinations'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-[1.02]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>🌍 Destinasi Wisata</span>
          </button>
          <button
            onClick={() => setExploreSubTab('calendar')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all flex items-center justify-center space-x-2 ${
              exploreSubTab === 'calendar'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-[1.02]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>📅 Kalender Acara Adat</span>
          </button>
        </div>

        {exploreSubTab === 'destinations' ? (
          <>
            {/* Search & Categories */}
            <div className="space-y-4">
          <div className="relative p-1 rounded-full bg-neutral-800 neu-pressed flex items-center">
            <Search className="w-4 h-4 text-gray-500 ml-4 mr-2" />
            <input 
              type="text" 
              value={kubarSearchQuery}
              onChange={(e) => setKubarSearchQuery(e.target.value)}
              placeholder="Cari destinasi, lokasi, atau daya tarik..." 
              className="bg-transparent w-full focus:outline-none text-xs py-2 text-gray-200 placeholder-gray-500" 
            />
            {kubarSearchQuery && (
              <button 
                onClick={() => setKubarSearchQuery('')}
                className="text-xs text-gray-400 hover:text-white px-3"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips Scrollable */}
          <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar -mx-2 px-2">
            {["Semua", "Budaya", "Konservasi", "Air Terjun", "Danau", "Hutan Adat"].map((cat) => {
              const isActive = selectedKubarCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedKubarCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-105' 
                      : 'bg-neutral-800 text-gray-400 border border-neutral-700/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown & Results Counter */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-1 pt-1.5 border-t border-neutral-800/60 text-xs">
            <div className="text-gray-400 font-medium">
              Menampilkan <span className="text-emerald-400 font-bold">{filteredDestinations.length}</span> destinasi di Kutai Barat
            </div>
            <div className="flex items-center space-x-2 justify-between sm:justify-end">
              <span className="text-gray-400 font-bold text-[11px] flex items-center">
                <ArrowUpDown className="w-3 h-3 text-emerald-400 mr-1" /> Urutkan:
              </span>
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={kubarSortOption}
                  onChange={(e) => setKubarSortOption(e.target.value as any)}
                  className="w-full sm:w-auto appearance-none bg-neutral-900 border border-neutral-700/60 hover:border-emerald-500/50 text-gray-200 text-[11px] font-bold py-2 pl-3.5 pr-9 rounded-2xl focus:outline-none transition-all cursor-pointer shadow-lg"
                >
                  <option value="rating">★ Rating Tertinggi</option>
                  <option value="price">🪙 Tiket Termurah</option>
                  <option value="distance">🚗 Jarak Terdekat (Pusat)</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400">
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Map Component */}
        <div id="kubar-map-section" className="p-5 rounded-[32px] bg-neutral-800 neu-flat border border-neutral-700/20 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-2xl bg-emerald-950/40 border border-emerald-800/30 text-emerald-400">
                <Compass className="w-4 h-4 animate-spin-slow" />
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-200 uppercase tracking-wider">Navigasi Interaktif Kutai Barat</h4>
                <p className="text-[10px] text-gray-400">Peta & Pemandu Rute Terintegrasi Layar Penuh</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-400 border border-emerald-800/20 font-mono text-[8px] font-bold uppercase tracking-wider">
              GIS v2.5
            </span>
          </div>

          {/* Interactive Miniature map box displaying HUD features */}
          <div className="relative h-44 rounded-2xl bg-[#080e0b] border border-neutral-900 overflow-hidden flex flex-col justify-between p-4 group">
            {/* Topographic Lines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111d17_1px,transparent_1px),linear-gradient(to_bottom,#111d17_1px,transparent_1px)] bg-[size:6%_10%] opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/15 via-neutral-950/40 to-teal-950/15" />
            
            {/* Compass and grid values */}
            <div className="relative z-10 flex justify-between text-[7px] font-mono text-emerald-500/40">
              <span>0°35' S, 115°40' E</span>
              <span>SCALE: 25 KM</span>
            </div>

            {/* River SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 5,28 Q 28,32 42,48 T 58,54 T 75,70 T 95,78" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
            </svg>

            {/* Pulsing center node Sendawar */}
            <div className="absolute left-[50%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping absolute" />
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              <span className="text-[6px] font-bold text-amber-400 mt-1 uppercase tracking-wider bg-black/55 px-1 rounded-sm">Sendawar</span>
            </div>

            {/* Render tiny floating pins */}
            <div className="absolute left-[25%] top-[28%] w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
            <div className="absolute left-[78%] top-[76%] w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute left-[52%] top-[55%] w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 flex flex-col items-center space-y-1.5">
              <p className="text-[10px] font-medium text-gray-400 text-center max-w-xs">
                Mulai petualangan Anda melintasi situs adat Dayak, hutan lindung, dan air terjun tropis di Tanaa Purai Ngeriman dengan akurat.
              </p>
            </div>

            {/* Bottom mini status bar */}
            <div className="relative z-10 flex justify-between items-center text-[7px] text-gray-500 font-mono">
              <span>6 DESTINASI AKTIF</span>
              <span>PANDUAN DARAT & SUNGAI</span>
            </div>
          </div>

          <button
            onClick={() => {
              setShowFullScreenMap(true);
              if (!routeEndPoint && KUBAR_DESTINATIONS.length > 0) {
                setRouteEndPoint(KUBAR_DESTINATIONS[0].id);
              }
            }}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center space-x-2 border border-emerald-500/20"
          >
            <Maximize2 className="w-4 h-4 text-emerald-300" />
            <span>Buka Peta & Pemandu Rute Layar Penuh</span>
          </button>
        </div>

        {/* Full-Screen Map Navigation and Routing Modal Overlay */}
        {showFullScreenMap && (
          <div className="fixed inset-0 z-[150] bg-[#070c0a] text-white flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans">
            {/* Style sheet for animations & custom scrollbar */}
            <style>{`
              @keyframes routeDash {
                to {
                  stroke-dashoffset: -20;
                }
              }
              .animate-route-dash {
                animation: routeDash 1.2s linear infinite;
              }
              @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-up {
                animation: fade-in-up 0.3s ease-out forwards;
              }
            `}</style>

            {/* Sidebar Column: Route & Directory */}
            <div className={`w-full md:w-[380px] bg-[#0d1613] border-r border-emerald-950/40 flex flex-col h-full flex-shrink-0 ${activeModalTab === 'guide' ? 'flex' : 'hidden md:flex'}`}>
              {/* Sidebar Header */}
              <div className="p-4 bg-emerald-950/20 border-b border-emerald-950/40 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-emerald-900/30 text-emerald-400">
                    <Compass className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-100">Navigasi Kutai Barat</h3>
                    <p className="text-[9px] text-emerald-500/80 font-mono tracking-widest font-bold">TANAA PURAI NGERIMAN</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowFullScreenMap(false)}
                  className="p-1.5 rounded-lg bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white transition-all md:hidden"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sidebar Internal Tabs Selector */}
              <div className="p-1.5 bg-neutral-900/40 border-b border-neutral-950/60 flex space-x-1">
                {['route', 'directory', 'umkm', 'layers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSidebarTab(tab)}
                    className={`flex-1 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-tight transition-all ${
                      sidebarTab === tab
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-neutral-900/50 text-gray-400 hover:text-gray-200 hover:bg-neutral-900'
                    }`}
                  >
                    {tab === 'route' ? '📍 Rute' : tab === 'directory' ? '🌍 Daftar' : tab === 'umkm' ? '🛍️ UMKM' : '⚙️ Layer'}
                  </button>
                ))}
              </div>

              {/* Sidebar Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {sidebarTab === 'route' && (
                  <div className="space-y-4 animate-fade-up">
                    {/* Routing Form */}
                    <div className="space-y-3 bg-neutral-950/40 p-3.5 rounded-2xl border border-emerald-950/30">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                          <Navigation className="w-3 h-3 mr-1" /> Titik Keberangkatan
                        </label>
                        <select
                          value={routeStartPoint}
                          onChange={(e) => setRouteStartPoint(e.target.value)}
                          className="w-full bg-[#0d1613] border border-emerald-950/50 hover:border-emerald-500/40 text-gray-200 text-xs py-2 px-3 rounded-xl focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                        >
                          <optgroup label="Pusat Transportasi / Kota" className="bg-[#0d1613]">
                            <option value="sendawar">🚗 Sendawar (Pusat Kota)</option>
                            <option value="melak">🛳️ Melak (Dermaga Kapal)</option>
                            <option value="jempang">🛶 Tanjung Isuy (Jempang)</option>
                          </optgroup>
                          <optgroup label="Mulai dari Destinasi Wisata" className="bg-[#0d1613]">
                            {KUBAR_DESTINATIONS.map(d => (
                              <option key={d.id} value={d.id.toString()}>📍 {d.name}</option>
                            ))}
                          </optgroup>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                          <MapPin className="w-3 h-3 mr-1" /> Destinasi Wisata Tujuan
                        </label>
                        <select
                          value={routeEndPoint || ''}
                          onChange={(e) => setRouteEndPoint(Number(e.target.value) || null)}
                          className="w-full bg-[#0d1613] border border-emerald-950/50 hover:border-emerald-500/40 text-gray-200 text-xs py-2 px-3 rounded-xl focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                        >
                          <option value="">-- Pilih Destinasi --</option>
                          {KUBAR_DESTINATIONS.map(d => (
                            <option key={d.id} value={d.id}>🎯 {d.name} ({d.category})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Route Stats & Path Info */}
                    {routeEndPoint ? (
                      (() => {
                        const routeInfo = getRouteInfo(routeStartPoint, routeEndPoint);
                        const dest = KUBAR_DESTINATIONS.find(d => d.id === routeEndPoint);
                        return (
                          <div className="space-y-4">
                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-neutral-900/60 p-2.5 rounded-2xl border border-neutral-800/60 text-center space-y-0.5">
                                <span className="text-[8px] text-gray-400 font-extrabold uppercase tracking-widest block font-sans">Jarak Estimasi</span>
                                <span className="text-sm font-black text-white font-mono">{routeInfo.distance} km</span>
                              </div>
                              <div className="bg-neutral-900/60 p-2.5 rounded-2xl border border-neutral-800/60 text-center space-y-0.5">
                                <span className="text-[8px] text-gray-400 font-extrabold uppercase tracking-widest block font-sans">Waktu Tempuh</span>
                                <span className="text-xs font-black text-emerald-400">{routeInfo.timeStr}</span>
                              </div>
                              <div className="bg-neutral-900/60 p-2.5 rounded-2xl border border-neutral-800/60 text-center space-y-0.5">
                                <span className="text-[8px] text-gray-400 font-extrabold uppercase tracking-widest block font-sans">Media Transport</span>
                                <span className="text-[10px] font-bold text-gray-200 truncate">{routeInfo.vehicle}</span>
                              </div>
                              <div className="bg-neutral-900/60 p-2.5 rounded-2xl border border-neutral-800/60 text-center space-y-0.5">
                                <span className="text-[8px] text-gray-400 font-extrabold uppercase tracking-widest block font-sans">Tingkat Petualangan</span>
                                <span className="text-xs font-black text-amber-400">{routeInfo.adventureScoring}% 🔥</span>
                              </div>
                            </div>

                            {/* Fast Route Inclusions */}
                            {dest && (
                              <div className="p-3 bg-emerald-950/20 rounded-2xl border border-emerald-950/40 space-y-1.5">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-bold text-emerald-400 flex items-center">
                                    <Ticket className="w-3.5 h-3.5 mr-1" /> Tiket Masuk:
                                  </span>
                                  <span className="font-black text-white">{dest.ticketPrice === 0 ? "Gratis" : `Rp ${dest.ticketPrice.toLocaleString('id-ID')}`}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-bold text-emerald-400 flex items-center">
                                    <Clock className="w-3.5 h-3.5 mr-1" /> Waktu Terbaik:
                                  </span>
                                  <span className="font-bold text-gray-200 text-[9px]">{dest.bestSeason}</span>
                                </div>
                              </div>
                            )}

                            {/* Step-by-Step Directions */}
                            <div className="space-y-2">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block font-sans">Panduan Langkah Demi Langkah</span>
                              <div className="relative border-l border-emerald-950/60 ml-2.5 pl-4 space-y-3.5 pt-1">
                                {routeInfo.steps.map((step, idx) => {
                                  const isFirst = idx === 0;
                                  const isLast = idx === routeInfo.steps.length - 1;
                                  return (
                                    <div key={idx} className="relative text-[11px] leading-relaxed text-gray-300 text-left">
                                      {/* Bullet pin */}
                                      <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
                                        isFirst ? 'bg-sky-500 border-sky-400' : isLast ? 'bg-red-500 border-red-400 animate-pulse' : 'bg-emerald-600 border-emerald-500'
                                      }`} />
                                      <p className="font-medium">
                                        {(() => {
                                          const parts = step.split(/\[(.*?)\]/g);
                                          return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-emerald-400 font-extrabold">{part}</strong> : part);
                                        })()}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Add to itinerary directly from Map */}
                            {dest && (
                              <button
                                onClick={() => {
                                  handleToggleItinerary(dest.id);
                                  triggerPushNotification(
                                    kubarItinerary.includes(dest.id) ? "🗑️ Rencana Dihapus" : "📌 Rencana Ditambahkan",
                                    `${dest.name} ${kubarItinerary.includes(dest.id) ? 'dihapus dari' : 'ditambahkan ke'} rencana perjalanan Anda.`,
                                    "success"
                                  );
                                }}
                                className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                                  kubarItinerary.includes(dest.id)
                                    ? 'bg-red-950/20 text-red-400 border-red-500/20 hover:bg-red-950/40'
                                    : 'bg-emerald-900/40 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/60'
                                }`}
                              >
                                {kubarItinerary.includes(dest.id) ? 'Hapus dari Itinerary Perjalanan' : 'Tambahkan ke Itinerary Perjalanan'}
                              </button>
                            )}
                          </div>
                        );
                      })()
                    ) : (
                      <div className="p-8 text-center bg-neutral-900/20 rounded-2xl border border-neutral-800/40 space-y-3">
                        <Compass className="w-10 h-10 text-emerald-700 mx-auto animate-pulse" />
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                          Silakan pilih <strong className="text-emerald-400">titik mulai</strong> dan <strong className="text-emerald-400">destinasi tujuan</strong> Anda pada form di atas, atau ketuk pin destinasi mana saja di peta untuk menghitung rute langsung secara instan.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {sidebarTab === 'directory' && (
                  <div className="space-y-4 animate-fade-up">
                    {/* Map search box */}
                    <div className="relative p-1 rounded-full bg-neutral-950 flex items-center border border-emerald-950/40">
                      <Search className="w-4 h-4 text-emerald-600 ml-3 mr-2" />
                      <input 
                        type="text" 
                        value={mapSearchQuery}
                        onChange={(e) => setMapSearchQuery(e.target.value)}
                        placeholder="Cari destinasi wisata..." 
                        className="bg-transparent w-full focus:outline-none text-xs py-1.5 text-gray-200 placeholder-gray-600" 
                      />
                      {mapSearchQuery && (
                        <button 
                          onClick={() => setMapSearchQuery('')}
                          className="text-[10px] text-gray-500 hover:text-white px-2"
                        >
                          Batal
                        </button>
                      )}
                    </div>

                    {/* Map Categories Scrollable */}
                    <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar -mx-2 px-2">
                      {["Semua", "Budaya", "Konservasi", "Air Terjun", "Danau", "Hutan Adat"].map((cat) => {
                        const isActive = mapSelectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => setMapSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-[9px] font-extrabold whitespace-nowrap transition-all ${
                              isActive 
                                ? 'bg-emerald-600 text-white shadow-sm' 
                                : 'bg-neutral-900 text-gray-400 hover:text-white border border-neutral-800/50'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>

                    {/* List */}
                    <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                      {KUBAR_DESTINATIONS.filter(d => {
                        const matchesCat = mapSelectedCategory === 'Semua' || d.category === mapSelectedCategory;
                        const matchesSearch = d.name.toLowerCase().includes(mapSearchQuery.toLowerCase()) || 
                                              d.location.toLowerCase().includes(mapSearchQuery.toLowerCase());
                        return matchesCat && matchesSearch;
                      }).map(dest => {
                        const isSelected = routeEndPoint === dest.id;
                        return (
                          <div
                            key={dest.id}
                            onMouseEnter={() => setHoveredMapDestId(dest.id)}
                            onMouseLeave={() => setHoveredMapDestId(null)}
                            onClick={() => {
                              setRouteEndPoint(dest.id);
                              setSidebarTab('route');
                              // Focus/pan map to the destination coordinates
                              setMapPan({ x: -((dest.mapX - 50) * 4), y: -((dest.mapY - 45) * 4) });
                              setMapZoom(1.5);
                            }}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-3 text-left ${
                              isSelected 
                                ? 'bg-emerald-950/30 border-emerald-500/40 shadow-md shadow-emerald-500/5' 
                                : 'bg-neutral-900/40 border-neutral-800/40 hover:border-emerald-950/60 hover:bg-neutral-900/80'
                            }`}
                          >
                            <img src={dest.image} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" alt="" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">{dest.category}</span>
                                <span className="text-[9px] text-amber-400 font-bold flex items-center">★ {dest.rating}</span>
                              </div>
                              <h4 className="text-xs font-black text-gray-100 truncate mt-0.5">{dest.name}</h4>
                              <p className="text-[9px] text-gray-500 truncate">{dest.location}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {sidebarTab === 'umkm' && (
                  <div className="space-y-4 animate-fade-up text-left">
                    <div className="bg-neutral-950/40 p-3.5 rounded-2xl border border-emerald-950/30 space-y-2">
                      <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                        <ShoppingBag className="w-3.5 h-3.5 mr-1" /> UMKM di Sekitar Destinasi
                      </label>
                      <select
                        value={selectedUmkmNearDest || ''}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : null;
                          setSelectedUmkmNearDest(val);
                          if (val) {
                            // Find destination and pan map near it
                            const dest = KUBAR_DESTINATIONS.find(d => d.id === val);
                            if (dest) {
                              setMapPan({ x: -((dest.mapX - 50) * 4), y: -((dest.mapY - 45) * 4) });
                              setMapZoom(1.4);
                            }
                          }
                        }}
                        className="w-full bg-[#0d1613] border border-emerald-950/50 hover:border-emerald-500/40 text-gray-200 text-xs py-2 px-3 rounded-xl focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                      >
                        <option value="">-- Semua Destinasi (Semua UMKM) --</option>
                        {KUBAR_DESTINATIONS.map(d => (
                          <option key={d.id} value={d.id}>📍 Sekitar {d.name}</option>
                        ))}
                      </select>
                      <p className="text-[8px] text-gray-500 font-mono">
                        Menampilkan pengrajin lokal yang memproduksi kerajinan anyaman, tenun doyo, manik-manik, dan seni ukir ulin khas Dayak.
                      </p>
                    </div>

                    {/* UMKM List */}
                    <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                      {KUBAR_CRAFT_UMKMS.filter(umkm => {
                        return !selectedUmkmNearDest || umkm.associatedDestinationId === selectedUmkmNearDest;
                      }).map(umkm => {
                        const isSelected = mapSelectedUmkm?.id === umkm.id;
                        const destName = KUBAR_DESTINATIONS.find(d => d.id === umkm.associatedDestinationId)?.name || '';
                        
                        return (
                          <div
                            key={umkm.id}
                            onClick={() => {
                              setMapSelectedUmkm(umkm);
                              setMapSelectedDest(null); // Clear destination card if selected
                              // Pan to UMKM coordinates
                              setMapPan({ x: -((umkm.mapX - 50) * 4), y: -((umkm.mapY - 45) * 4) });
                              setMapZoom(1.55);
                            }}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col space-y-2 ${
                              isSelected 
                                ? 'bg-amber-950/30 border-amber-500/40 shadow-md shadow-amber-500/5' 
                                : 'bg-neutral-900/40 border-neutral-800/40 hover:border-amber-950/60 hover:bg-neutral-900/80'
                            }`}
                          >
                            <div className="flex items-start space-x-2.5">
                              <img src={umkm.image} className="w-10 h-10 object-cover rounded-lg flex-shrink-0" alt="" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-[8px] font-black uppercase tracking-widest text-amber-400">{umkm.category}</span>
                                  <span className="text-[8px] text-gray-400 font-mono">{umkm.distanceFromDest.split(' ')[0]} {umkm.distanceFromDest.split(' ')[1]}</span>
                                </div>
                                <h4 className="text-xs font-black text-gray-100 truncate mt-0.5">{umkm.name}</h4>
                                <p className="text-[9px] text-gray-400 font-bold">Pemilik: {umkm.owner}</p>
                              </div>
                            </div>

                            <p className="text-[9px] text-gray-500 line-clamp-1 leading-snug">{umkm.description}</p>
                            
                            <div className="flex justify-between items-center text-[9px] text-gray-400 pt-1 border-t border-neutral-900">
                              <span className="text-[8px] font-mono text-gray-500 uppercase">Produk: <strong className="text-gray-300 font-bold">{umkm.featuredProduct}</strong></span>
                              <span className="text-amber-500/90 font-black">{umkm.priceRange}</span>
                            </div>

                            <div className="flex justify-between items-center text-[8.5px] text-gray-500 bg-neutral-950/40 p-1.5 rounded-lg border border-neutral-800/40 mt-1">
                              <span className="flex items-center"><Clock className="w-3 h-3 text-pink-500 mr-1" /> Jam Buka:</span>
                              <span className="text-gray-300 font-bold font-mono">{umkm.operatingHours}</span>
                            </div>

                            {/* Actions inside list card */}
                            <div className="grid grid-cols-2 gap-1.5 pt-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMapSelectedUmkm(umkm);
                                  setMapSelectedDest(null);
                                  setMapPan({ x: -((umkm.mapX - 50) * 4), y: -((umkm.mapY - 45) * 4) });
                                  setMapZoom(1.7);
                                }}
                                className="py-1 bg-amber-600/10 hover:bg-amber-600/25 border border-amber-500/20 text-amber-400 text-[8px] font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 text-center"
                              >
                                Lihat Peta
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenChat(umkm.name, umkm.featuredProduct, umkm.phone);
                                }}
                                className="py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 text-center"
                              >
                                Tanya Seller
                              </button>

                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(umkm.name + ", " + umkm.location + ", Kutai Barat")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="col-span-2 py-1 bg-neutral-950 hover:bg-neutral-900 border border-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 text-center flex items-center justify-center space-x-1"
                              >
                                <MapPin className="w-3 h-3 text-emerald-500" />
                                <span>Petunjuk Rute Maps</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {sidebarTab === 'layers' && (
                  <div className="space-y-4 animate-fade-up">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block font-sans">Pengaturan Tampilan Peta</span>
                    <div className="space-y-2.5">
                      {[
                        { key: 'rivers', label: 'Aliran Sungai Mahakam & Tributari', desc: 'Tampilkan aliran sungai biru navigasi jalur air' },
                        { key: 'grid', label: 'Garis Koordinat Topografis', desc: 'Garis grid lintang dan bujur peta geopasial' },
                        { key: 'terrain', label: 'Relief Tekstur Hutan Hujan', desc: 'Bayangan glow topografi dataran tinggi Kalimantan' }
                      ].map(layer => (
                        <label key={layer.key} className="flex items-start space-x-3 p-3 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 cursor-pointer hover:bg-neutral-900/60 transition-colors text-left">
                          <input
                            type="checkbox"
                            checked={(mapLayers as any)[layer.key]}
                            onChange={(e) => setMapLayers({ ...mapLayers, [layer.key]: e.target.checked })}
                            className="mt-1 rounded border-neutral-700 text-emerald-600 focus:ring-emerald-500 bg-neutral-800 w-4 h-4"
                          />
                          <div>
                            <span className="text-xs font-bold text-gray-200 block">{layer.label}</span>
                            <span className="text-[9px] text-gray-500 leading-tight block mt-0.5">{layer.desc}</span>
                          </div>
                        </label>
                      ))}
                      {/* UMKM layer toggle */}
                      <label className="flex items-start space-x-3 p-3 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 cursor-pointer hover:bg-neutral-900/60 transition-colors text-left">
                        <input
                          type="checkbox"
                          checked={mapShowUmkm}
                          onChange={(e) => setMapShowUmkm(e.target.checked)}
                          className="mt-1 rounded border-neutral-700 text-pink-500 focus:ring-pink-500 bg-neutral-800 w-4 h-4"
                        />
                        <div>
                          <span className="text-xs font-bold text-gray-200 block">Peta Lokasi UMKM Kerajinan</span>
                          <span className="text-[9px] text-gray-500 leading-tight block mt-0.5">Tampilkan pin lokasi sentra kerajinan anyaman & tenun Dayak</span>
                        </div>
                      </label>
                    </div>

                    {/* Map Legend */}
                    <div className="p-3 bg-[#0d1613] rounded-2xl border border-emerald-950/30 space-y-2 text-left">
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block font-sans">Legenda Klasifikasi Pin</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-gray-300">
                        <div className="flex items-center space-x-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span>Situs Budaya</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                          <span>Konservasi</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                          <span>Air Terjun</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                          <span>Danau Purba</span>
                        </div>
                        <div className="flex items-center space-x-2 col-span-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span>Hutan Adat & Lindung</span>
                        </div>
                        <div className="flex items-center space-x-2 col-span-2 border-t border-neutral-900/50 pt-1.5 mt-0.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                          <span className="text-pink-400 font-black">🛍️ UMKM Kerajinan Rakyat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="p-3 bg-neutral-950 border-t border-emerald-950/40 text-center text-[9px] text-gray-500 font-mono flex items-center justify-between">
                <span>Kutai Barat GIS Engine v2.5</span>
                <span>0°35' S, 115°40' E</span>
              </div>
            </div>

            {/* Map Canvas Area */}
            <div className={`flex-1 h-full relative flex flex-col ${activeModalTab === 'map' ? 'flex' : 'hidden md:flex'}`}>
              {/* Map Control Bar (Header) */}
              <div className="absolute top-4 left-4 z-40 bg-neutral-950/90 border border-neutral-800/80 p-1.5 rounded-2xl flex items-center space-x-1.5 shadow-2xl backdrop-blur-md">
                <button
                  onClick={() => {
                    setShowFullScreenMap(false);
                  }}
                  className="py-1.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-black uppercase tracking-wider text-gray-200 transition-all flex items-center space-x-1.5"
                >
                  <X className="w-3.5 h-3.5 text-red-400" />
                  <span>Keluar Peta</span>
                </button>
                <span className="w-[1px] h-4 bg-neutral-800" />
                <span className="text-[10px] font-black uppercase text-gray-400 px-2 select-none tracking-widest hidden sm:inline font-sans">Peta Navigasi Geospasial</span>
              </div>

              {/* Map Layer Zoom / Pan Controls HUD */}
              <div className="absolute bottom-6 right-6 z-40 flex flex-col space-y-2">
                {/* Navigation D-pad controller */}
                <div className="bg-neutral-950/90 border border-neutral-800/80 p-2.5 rounded-[24px] shadow-2xl backdrop-blur-md flex flex-col items-center">
                  <button
                    onClick={() => setMapPan(prev => ({ ...prev, y: prev.y + 35 }))}
                    className="w-7 h-7 bg-neutral-900 hover:bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center transition-colors shadow border border-neutral-800/60 text-xs font-bold"
                    title="Geser Atas"
                  >
                    ▲
                  </button>
                  <div className="flex space-x-5 my-1">
                    <button
                      onClick={() => setMapPan(prev => ({ ...prev, x: prev.x + 35 }))}
                      className="w-7 h-7 bg-neutral-900 hover:bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center transition-colors shadow border border-neutral-800/60 text-xs font-bold"
                      title="Geser Kiri"
                    >
                      ◀
                    </button>
                    <button
                      onClick={() => setMapPan(prev => ({ ...prev, x: prev.x - 35 }))}
                      className="w-7 h-7 bg-neutral-900 hover:bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center transition-colors shadow border border-neutral-800/60 text-xs font-bold"
                      title="Geser Kanan"
                    >
                      ▶
                    </button>
                  </div>
                  <button
                    onClick={() => setMapPan(prev => ({ ...prev, y: prev.y - 35 }))}
                    className="w-7 h-7 bg-neutral-900 hover:bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center transition-colors shadow border border-neutral-800/60 text-xs font-bold"
                    title="Geser Bawah"
                  >
                    ▼
                  </button>
                </div>

                {/* Zoom Controls HUD */}
                <div className="bg-neutral-950/90 border border-neutral-800/80 p-1.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-center space-x-1.5">
                  <button
                    onClick={() => setMapZoom(prev => Math.min(3, prev + 0.25))}
                    className="w-8 h-8 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-emerald-400 text-sm font-black border border-neutral-800/60 transition-colors flex items-center justify-center"
                    title="Zoom In"
                  >
                    +
                  </button>
                  <span className="text-[10px] font-mono text-gray-400 w-10 text-center select-none">{Math.round(mapZoom * 100)}%</span>
                  <button
                    onClick={() => setMapZoom(prev => Math.max(0.75, prev - 0.25))}
                    className="w-8 h-8 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-emerald-400 text-sm font-black border border-neutral-800/60 transition-colors flex items-center justify-center"
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <span className="w-[1px] h-4 bg-neutral-800" />
                  <button
                    onClick={() => {
                      setMapZoom(1);
                      setMapPan({ x: 0, y: 0 });
                      setMapSelectedDest(null);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-emerald-950 text-[9px] font-black uppercase text-emerald-400 tracking-wider border border-neutral-800/60 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Floating HUD info for mobile switching */}
              <div className="absolute top-4 right-4 z-40 md:hidden flex bg-neutral-950/90 border border-neutral-800/80 p-1 rounded-2xl shadow-2xl backdrop-blur-md">
                <button
                  onClick={() => setActiveModalTab('map')}
                  className={`py-1.5 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center space-x-1 ${
                    activeModalTab === 'map' ? 'bg-emerald-600 text-white' : 'text-gray-400'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>🌍 Peta</span>
                </button>
                <button
                  onClick={() => setActiveModalTab('guide')}
                  className={`py-1.5 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center space-x-1 ${
                    activeModalTab === 'guide' ? 'bg-emerald-600 text-white' : 'text-gray-400'
                  }`}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>📋 Rute</span>
                </button>
              </div>

              {/* Interactive Map Board container */}
              <div 
                className="w-full h-full bg-[#09110d] overflow-hidden relative"
                onMouseMove={(e) => {
                  if (e.buttons === 1) { // Left mouse click held down -> Pan
                    setMapPan(prev => ({
                      x: prev.x + e.movementX / mapZoom,
                      y: prev.y + e.movementY / mapZoom
                    }));
                  }
                }}
              >
                {/* Scaleable zoom layer wrapper */}
                <div 
                  className="w-full h-full relative cursor-grab active:cursor-grabbing transition-transform duration-75"
                  style={{
                    transform: `scale(${mapZoom}) translate(${mapPan.x}px, ${mapPan.y}px)`,
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Topographic Lines Overlay */}
                  {mapLayers.grid && (
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#14241c_1px,transparent_1px),linear-gradient(to_bottom,#14241c_1px,transparent_1px)] bg-[size:4%_6%] opacity-35" />
                  )}

                  {/* Forest & Terrain shadows */}
                  {mapLayers.terrain && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-neutral-950/30 to-teal-950/20" />
                      {/* Highlight forest blobs */}
                      <div className="absolute top-[20%] left-[15%] w-60 h-60 bg-emerald-950/20 rounded-full filter blur-3xl opacity-60 animate-pulse-glow" />
                      <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-teal-950/25 rounded-full filter blur-3xl opacity-50" />
                      <div className="absolute top-[50%] right-[30%] w-48 h-48 bg-emerald-900/10 rounded-full filter blur-3xl opacity-40 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
                    </>
                  )}

                  {/* Rivers Draw Layer */}
                  {mapLayers.rivers && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path 
                        d="M 5,28 Q 28,32 42,48 T 58,54 T 75,70 T 95,78" 
                        fill="none" 
                        stroke="#0284c7" 
                        strokeWidth="1.6" 
                        strokeLinecap="round" 
                        opacity="0.5" 
                        className="filter drop-shadow-[0_0_2px_rgba(2,132,199,0.4)]"
                      />
                      <path 
                        d="M 42,48 Q 45,30 38,12" 
                        fill="none" 
                        stroke="#0284c7" 
                        strokeWidth="0.8" 
                        strokeLinecap="round" 
                        opacity="0.3" 
                      />
                      <path 
                        d="M 58,54 Q 65,40 70,25" 
                        fill="none" 
                        stroke="#0284c7" 
                        strokeWidth="0.8" 
                        strokeLinecap="round" 
                        opacity="0.35" 
                      />
                    </svg>
                  )}

                  {/* Active SVG Route Path Layer */}
                  {(() => {
                    const startCoords = getStartCoords(routeStartPoint);
                    const endCoords = getEndCoords(routeEndPoint);
                    if (!startCoords || !endCoords) return null;
                    return (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-35" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Underglow route trace */}
                        <path 
                          d={`M ${startCoords.x},${startCoords.y} Q ${(startCoords.x + endCoords.x)/2 + 7},${(startCoords.y + endCoords.y)/2 - 7} ${endCoords.x},${endCoords.y}`}
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          opacity="0.25" 
                          className="filter blur-[1px]"
                        />
                        {/* Active scrolling route dash */}
                        <path 
                          d={`M ${startCoords.x},${startCoords.y} Q ${(startCoords.x + endCoords.x)/2 + 7},${(startCoords.y + endCoords.y)/2 - 7} ${endCoords.x},${endCoords.y}`}
                          fill="none" 
                          stroke="#34d399" 
                          strokeWidth="1.2" 
                          strokeLinecap="round" 
                          strokeDasharray="4, 4"
                          opacity="1"
                          className="animate-route-dash"
                        />

                        {/* Draw Start Node */}
                        <g transform={`translate(${startCoords.x}, ${startCoords.y})`}>
                          <circle r="4.5" fill="#0ea5e9" stroke="#000" strokeWidth="1.2" className="animate-pulse" />
                          <circle r="2" fill="#fff" />
                        </g>

                        {/* Draw Destination Target Pointer */}
                        <g transform={`translate(${endCoords.x}, ${endCoords.y})`}>
                          <circle r="5" fill="#ef4444" stroke="#fff" strokeWidth="1" className="animate-ping" />
                        </g>
                      </svg>
                    );
                  })()}

                  {/* Capital City Indicator (Sendawar) */}
                  <div 
                    className="absolute z-10" 
                    style={{ left: "50%", top: "45%", transform: "translate(-50%, -50%)" }}
                  >
                    <div className="relative flex flex-col items-center justify-center">
                      <div className="absolute w-5 h-5 bg-amber-500/25 rounded-full animate-ping" />
                      <div className="w-3 h-3 bg-amber-500 rounded-full border-2 border-neutral-950 z-10" />
                      <span className="mt-1 whitespace-nowrap text-[8px] font-black text-amber-300 tracking-widest uppercase bg-neutral-950/90 px-2 py-0.5 rounded-md border border-amber-500/25 shadow-lg backdrop-blur-sm">
                        📌 Sendawar (Pusat)
                      </span>
                    </div>
                  </div>

                  {/* Start Point Pin (if destination-based or transport hub) */}
                  {(() => {
                    const startCoords = getStartCoords(routeStartPoint);
                    const isDefaultHub = routeStartPoint === 'sendawar' || routeStartPoint === 'melak' || routeStartPoint === 'jempang';
                    if (!isDefaultHub) return null;
                    return (
                      <div 
                        className="absolute z-30" 
                        style={{ left: `${startCoords.x}%`, top: `${startCoords.y}%`, transform: "translate(-50%, -100%)" }}
                      >
                        <div className="relative flex flex-col items-center justify-center">
                          <div className="px-2 py-0.5 rounded-lg bg-sky-600/90 border border-sky-400/40 text-[7px] font-black text-white uppercase tracking-wider backdrop-blur-sm shadow-xl">
                            🛫 Titik Mulai
                          </div>
                          <div className="w-2.5 h-4 bg-sky-500 rounded-full flex items-center justify-center border border-white/20 shadow-md transform translate-y-[-2px]" />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Destination Pin Markers */}
                  {KUBAR_DESTINATIONS.map((dest) => {
                    const isFilteredOut = mapSelectedCategory !== 'Semua' && dest.category !== mapSelectedCategory;
                    const isHovered = hoveredMapDestId === dest.id;
                    const isSelectedAsEnd = routeEndPoint === dest.id;
                    const isSelectedAsStart = routeStartPoint === dest.id.toString();

                    let pinColorClass = "text-emerald-400 bg-emerald-500";
                    let shadowGlow = "shadow-emerald-500/40";
                    if (dest.category === "Budaya") { 
                      pinColorClass = "text-amber-400 bg-amber-500"; 
                      shadowGlow = "shadow-amber-500/40"; 
                    } else if (dest.category === "Konservasi") { 
                      pinColorClass = "text-purple-400 bg-purple-500"; 
                      shadowGlow = "shadow-purple-500/40"; 
                    } else if (dest.category === "Air Terjun") { 
                      pinColorClass = "text-cyan-400 bg-cyan-500"; 
                      shadowGlow = "shadow-cyan-500/40"; 
                    } else if (dest.category === "Danau") { 
                      pinColorClass = "text-blue-400 bg-blue-500"; 
                      shadowGlow = "shadow-blue-500/40"; 
                    }

                    return (
                      <div
                        key={dest.id}
                        className={`absolute transition-all duration-300 ${isFilteredOut ? 'opacity-20 pointer-events-none scale-75' : 'opacity-100 scale-100 z-25'}`}
                        style={{ left: `${dest.mapX}%`, top: `${dest.mapY}%`, transform: "translate(-50%, -100%)" }}
                      >
                        <div
                          className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 rounded-xl"
                          tabIndex={0}
                          role="button"
                          aria-label={`Destinasi ${dest.name}, Kategori ${dest.category}`}
                          onMouseEnter={() => setHoveredMapDestId(dest.id)}
                          onMouseLeave={() => setHoveredMapDestId(null)}
                          onFocus={() => setHoveredMapDestId(dest.id)}
                          onBlur={() => setHoveredMapDestId(null)}
                          onTouchStart={(e) => {
                            e.stopPropagation();
                            if (hoveredMapDestId === dest.id) {
                              setMapSelectedDest(dest);
                            } else {
                              setHoveredMapDestId(dest.id);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setMapSelectedDest(dest);
                            }
                          }}
                          onClick={() => {
                            if (hoveredMapDestId === dest.id) {
                              setMapSelectedDest(dest);
                            } else {
                              setHoveredMapDestId(dest.id);
                            }
                          }}
                        >
                          {/* Outer glowing pulsing aura */}
                          <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-current opacity-60 animate-ping ${pinColorClass.split(' ')[0]}`} />

                          {isSelectedAsEnd && (
                            <div className="absolute -inset-4 rounded-full border-2 border-red-500 animate-pulse z-0" />
                          )}
                          {isSelectedAsStart && (
                            <div className="absolute -inset-4 rounded-full border-2 border-sky-500 animate-pulse z-0" />
                          )}

                          {/* Standard Map Pin Element */}
                          <div className={`relative flex items-center justify-center w-6.5 h-8.5 rounded-t-full rounded-br-full ${
                            isSelectedAsEnd ? 'bg-red-500 text-red-200' : isSelectedAsStart ? 'bg-sky-500 text-sky-200' : pinColorClass.split(' ')[1]
                          } shadow-xl ${shadowGlow} origin-bottom -rotate-45 border border-white/20 hover:scale-115 transition-all duration-150`}>
                            <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full rotate-45 flex items-center justify-center font-mono text-[6px] font-black text-white">
                              {dest.id}
                            </div>
                          </div>

                          {/* Floating Marker Label */}
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold text-gray-300 bg-neutral-950/85 border border-neutral-800/40 px-1 py-0.5 rounded backdrop-blur-xs select-none">
                            {dest.name.split(' ').slice(-1)[0] === 'Beniung' ? 'Hemaq Beniung' : dest.name.split(' ').slice(-2).join(' ')}
                          </span>

                          {/* Tiny Hover tooltip */}
                          {isHovered && (
                            <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-36 bg-neutral-900 border border-neutral-700 rounded-xl p-2 shadow-2xl backdrop-blur-md z-50 animate-fade-in text-left pointer-events-none">
                              <div className="text-[7px] font-extrabold uppercase text-emerald-400">{dest.category}</div>
                              <div className="text-[10px] font-black text-white truncate leading-tight mt-0.5">{dest.name}</div>
                              <div className="text-[8px] text-gray-400 mt-1">{dest.location}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Craft UMKM Pin Markers */}
                  {mapShowUmkm && KUBAR_CRAFT_UMKMS.map((umkm) => {
                    const isNearSelectedDest = !selectedUmkmNearDest || umkm.associatedDestinationId === selectedUmkmNearDest;
                    const isSelected = mapSelectedUmkm?.id === umkm.id;
                    const isHovered = hoveredMapDestId === umkm.id;

                    return (
                      <div
                        key={umkm.id}
                        className={`absolute transition-all duration-300 ${!isNearSelectedDest ? 'opacity-20 scale-75' : 'opacity-100 scale-100 z-35'}`}
                        style={{ left: `${umkm.mapX}%`, top: `${umkm.mapY}%`, transform: "translate(-50%, -100%)" }}
                      >
                        <div
                          className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 rounded-xl"
                          tabIndex={0}
                          role="button"
                          aria-label={`UMKM ${umkm.name}`}
                          onMouseEnter={() => setHoveredMapDestId(umkm.id)}
                          onMouseLeave={() => setHoveredMapDestId(null)}
                          onClick={() => {
                            setMapSelectedUmkm(umkm);
                            setMapSelectedDest(null); // Clear destination card if open
                          }}
                        >
                          {/* Pulsing ring */}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500/50 animate-ping" />

                          {isSelected && (
                            <div className="absolute -inset-4 rounded-full border-2 border-pink-500 animate-pulse z-0" />
                          )}

                          {/* Pin design */}
                          <div className={`relative flex items-center justify-center w-6 h-8 rounded-t-full rounded-br-full ${
                            isSelected ? 'bg-pink-500 text-white animate-bounce' : 'bg-rose-600 text-pink-100'
                          } shadow-xl shadow-pink-500/20 origin-bottom -rotate-45 border border-white/20 hover:scale-115 transition-all duration-150`}>
                            <div className="w-3 h-3 bg-neutral-900 rounded-full rotate-45 flex items-center justify-center text-[7px]">
                              🛍️
                            </div>
                          </div>

                          {/* Floating Marker Label */}
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] font-black text-pink-300 bg-neutral-950/90 border border-pink-900/30 px-1 py-0.5 rounded backdrop-blur-xs select-none">
                            {umkm.name.split(' ').slice(0, 2).join(' ')}
                          </span>

                          {/* Tiny Hover tooltip */}
                          {isHovered && (
                            <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-36 bg-neutral-900 border border-pink-700 rounded-xl p-2 shadow-2xl backdrop-blur-md z-50 animate-fade-in text-left pointer-events-none">
                              <div className="text-[7px] font-extrabold uppercase text-pink-400">{umkm.category}</div>
                              <div className="text-[10px] font-black text-white truncate leading-tight mt-0.5">{umkm.name}</div>
                              <div className="text-[8px] text-gray-400 mt-1">{umkm.distanceFromDest}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Destination Floating Popup Card OVERLAY on the MAP */}
                {mapSelectedDest && (
                  <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-neutral-950/95 border border-emerald-950/60 rounded-3xl p-4 shadow-2xl backdrop-blur-md z-45 animate-fade-up text-left">
                    <button 
                      onClick={() => setMapSelectedDest(null)}
                      className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-gray-400 hover:text-white border border-neutral-800/40 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-start space-x-3.5">
                      <img src={mapSelectedDest.image} className="w-16 h-16 object-cover rounded-2xl flex-shrink-0 border border-neutral-800" alt="" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[8px] font-black uppercase tracking-wider bg-emerald-950/40 text-emerald-400 border border-emerald-800/20 px-1.5 py-0.5 rounded-md">
                            {mapSelectedDest.category}
                          </span>
                          <span className="text-[9px] text-amber-400 font-bold flex items-center">★ {mapSelectedDest.rating}</span>
                        </div>
                        <h4 className="text-sm font-black text-white mt-1 leading-tight truncate">{mapSelectedDest.name}</h4>
                        <p className="text-[9px] text-gray-500 mt-0.5 truncate">{mapSelectedDest.location}</p>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-2.5 line-clamp-2 leading-relaxed italic">{mapSelectedDest.description}</p>

                    <div className="grid grid-cols-2 gap-1.5 mt-3 pt-3 border-t border-neutral-900 text-[9px] text-gray-500">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-500/80" />
                        <span>{mapSelectedDest.travelTime}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Ticket className="w-3.5 h-3.5 text-emerald-500/80" />
                        <span>{mapSelectedDest.ticketPrice === 0 ? "Gratis" : `Rp ${mapSelectedDest.ticketPrice.toLocaleString('id-ID')}`}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
                      <button
                        onClick={() => {
                          setRouteEndPoint(mapSelectedDest.id);
                          setSidebarTab('route');
                          triggerPushNotification(
                            "🎯 Navigasi Ditetapkan",
                            `Rute dihitung menuju ${mapSelectedDest.name}`,
                            "info"
                          );
                        }}
                        className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all text-center"
                      >
                        Jadikan Tujuan
                      </button>
                      <button
                        onClick={() => {
                          setRouteStartPoint(mapSelectedDest.id.toString());
                          setSidebarTab('route');
                          triggerPushNotification(
                            "🛫 Titik Mulai Ditetapkan",
                            `Rute dihitung dari ${mapSelectedDest.name}`,
                            "info"
                          );
                        }}
                        className="py-2 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all text-center"
                      >
                        Mulai Dari Sini
                      </button>
                    </div>
                  </div>
                )}

                {/* Selected UMKM Floating Popup Card OVERLAY on the MAP */}
                {mapSelectedUmkm && (
                  <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-neutral-950/95 border border-pink-950/60 rounded-3xl p-4 shadow-2xl backdrop-blur-md z-45 animate-fade-up text-left">
                    <button 
                      onClick={() => setMapSelectedUmkm(null)}
                      className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-gray-400 hover:text-white border border-neutral-800/40 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-start space-x-3.5">
                      <img src={mapSelectedUmkm.image} className="w-16 h-16 object-cover rounded-2xl flex-shrink-0 border border-neutral-800" alt="" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[8px] font-black uppercase tracking-wider bg-pink-950/40 text-pink-400 border border-pink-800/20 px-1.5 py-0.5 rounded-md">
                            {mapSelectedUmkm.category}
                          </span>
                          <span className="text-[8px] text-amber-400 font-mono font-bold">Produk Unggulan</span>
                        </div>
                        <h4 className="text-sm font-black text-white mt-1 leading-tight truncate">{mapSelectedUmkm.name}</h4>
                        <p className="text-[9px] text-gray-400 font-bold mt-0.5">Pemilik: {mapSelectedUmkm.owner}</p>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-2.5 line-clamp-2 leading-relaxed italic">{mapSelectedUmkm.description}</p>
                    
                    <div className="mt-2.5 p-2.5 bg-neutral-900 rounded-xl border border-neutral-800/80 text-[10px] space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Produk Terlaris:</span>
                        <span className="text-white font-bold">{mapSelectedUmkm.featuredProduct}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rentang Harga:</span>
                        <span className="text-amber-400 font-bold">{mapSelectedUmkm.priceRange}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5 border-t border-neutral-800/60 mt-1">
                        <span className="text-gray-500 flex items-center font-bold">
                          <Clock className="w-3.5 h-3.5 text-pink-500 mr-1" /> Jam Buka:
                        </span>
                        <span className="text-pink-300 font-bold font-mono text-[9px] bg-pink-950/20 px-1.5 py-0.5 rounded-md border border-pink-900/10">
                          {mapSelectedUmkm.operatingHours}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 mt-3 pt-3 border-t border-neutral-900 text-[9px] text-gray-500">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-pink-500/80" />
                        <span className="truncate">{mapSelectedUmkm.location.split(',').slice(-1)[0]}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Compass className="w-3.5 h-3.5 text-pink-500/80" />
                        <span className="truncate">{mapSelectedUmkm.distanceFromDest.split(' ')[0]} {mapSelectedUmkm.distanceFromDest.split(' ')[1]} {mapSelectedUmkm.distanceFromDest.split(' ')[2]}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
                      <button
                        onClick={() => {
                          handleOpenChat(mapSelectedUmkm.name, mapSelectedUmkm.featuredProduct, mapSelectedUmkm.phone);
                        }}
                        className="py-2 px-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all text-center"
                      >
                        Tanya Seller (Chat)
                      </button>
                      <button
                        onClick={() => {
                          // Focus/pan to associated destination
                          const dest = KUBAR_DESTINATIONS.find(d => d.id === mapSelectedUmkm.associatedDestinationId);
                          if (dest) {
                            setMapSelectedDest(dest);
                            setMapSelectedUmkm(null);
                            setMapPan({ x: -((dest.mapX - 50) * 4), y: -((dest.mapY - 45) * 4) });
                            setMapZoom(1.55);
                          }
                        }}
                        className="py-2 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all text-center"
                      >
                        Lihat Wisata Dekat
                      </button>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapSelectedUmkm.name + ", " + mapSelectedUmkm.location + ", Kutai Barat")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 py-2 px-3 bg-neutral-900/90 hover:bg-neutral-800 border border-emerald-500/30 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all text-center flex items-center justify-center space-x-1.5"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Petunjuk Arah Maps</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Itinerary / Perencana Perjalanan Widget */}
        {kubarItinerary.length > 0 && (
          <div className="p-4 rounded-3xl bg-neutral-900/40 border border-emerald-500/10 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-300 font-sans">Rencana Perjalanan ({kubarItinerary.length})</h4>
              </div>
              <button 
                onClick={() => setKubarItinerary([])}
                className="text-[10px] text-red-400 font-bold hover:underline"
              >
                Kosongkan
              </button>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {itineraryItems.map(item => (
                <div key={item.id} className="flex items-center space-x-1.5 bg-emerald-950/40 border border-emerald-800/30 rounded-xl px-2.5 py-1 text-[10px] text-emerald-300">
                  <span>{item.name}</span>
                  <button 
                    onClick={() => handleToggleItinerary(item.id)}
                    className="text-emerald-500 hover:text-red-400 font-bold ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-neutral-800 text-[11px] text-gray-400">
              <span className="flex items-center"><Ticket className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Estimasi Tiket Masuk:</span>
              <span className="font-bold text-white">{totalTicketCost === 0 ? "Gratis" : `Rp ${totalTicketCost.toLocaleString('id-ID')}`}</span>
            </div>

            {/* Upcoming Indigenous Festivals / Rituals Alert Section */}
            {(() => {
              const currentDate = new Date(simulatedDate.year, simulatedDate.month - 1, simulatedDate.day);
              const upcomingAlerts = KUBAR_EVENTS.map(ev => {
                if (!kubarItinerary.includes(ev.destinationId)) return null;
                const eventDate = new Date(ev.year, ev.month - 1, ev.day);
                const diffTime = eventDate.getTime() - currentDate.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return { event: ev, diffDays };
              }).filter(item => item !== null && item.diffDays >= 0 && item.diffDays <= 3) as Array<{ event: KubarEvent; diffDays: number }>;

              if (upcomingAlerts.length === 0) return null;

              return (
                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <div className="flex items-center space-x-1 text-[9.5px] text-amber-400 font-extrabold uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span>⚠️ Peringatan Festival Adat Mendatang</span>
                  </div>
                  <div className="space-y-1.5">
                    {upcomingAlerts.map(({ event, diffDays }) => (
                      <div key={event.id} className="p-2.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-[10.5px] text-gray-200 text-left space-y-1">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-amber-300 leading-tight">{event.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-md font-black bg-amber-950 text-amber-400 border border-amber-500/30">
                            {diffDays === 0 ? "HARI INI!" : `${diffDays} Hari Lagi`}
                          </span>
                        </div>
                        <p className="text-[9.5px] text-gray-400 leading-normal">{event.description}</p>
                        <div className="flex items-center space-x-3 text-[8.5px] text-gray-500 pt-0.5">
                          <span>📍 {event.location}</span>
                          <span>📅 {event.dateStr}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Date Simulator Control */}
            <div className="p-2.5 bg-neutral-950/60 rounded-2xl border border-neutral-800/80 space-y-2 pt-2 border-t border-neutral-800">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-400 flex items-center">
                  <Clock className="w-3 h-3 text-pink-500 mr-1" /> Tanggal Simulasi:
                </span>
                <span className="font-extrabold text-pink-400 font-mono">
                  {simulatedDate.day} {simulatedDate.month === 7 ? "Juli" : "Agustus"} 2026
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    setSimulatedDate(prev => {
                      if (prev.day > 1) {
                        return { ...prev, day: prev.day - 1 };
                      } else if (prev.month === 8) {
                        return { day: 31, month: 7, year: 2026 };
                      }
                      return prev;
                    });
                  }}
                  className="p-1 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-gray-400 hover:text-white text-[9px] min-w-[20px] text-center"
                  title="Hari Sebelumnya"
                >
                  ◀
                </button>
                
                <input
                  type="range"
                  min="1"
                  max="62"
                  value={simulatedDate.month === 7 ? simulatedDate.day : simulatedDate.day + 31}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (val <= 31) {
                      setSimulatedDate({ day: val, month: 7, year: 2026 });
                    } else {
                      setSimulatedDate({ day: val - 31, month: 8, year: 2026 });
                    }
                  }}
                  className="flex-1 h-1 bg-neutral-850 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />

                <button
                  onClick={() => {
                    setSimulatedDate(prev => {
                      if (prev.month === 7 && prev.day < 31) {
                        return { ...prev, day: prev.day + 1 };
                      } else if (prev.month === 7 && prev.day === 31) {
                        return { day: 1, month: 8, year: 2026 };
                      } else if (prev.month === 8 && prev.day < 31) {
                        return { ...prev, day: prev.day + 1 };
                      }
                      return prev;
                    });
                  }}
                  className="p-1 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-gray-400 hover:text-white text-[9px] min-w-[20px] text-center"
                  title="Hari Berikutnya"
                >
                  ▶
                </button>
              </div>
              <div className="text-[8px] text-gray-500 text-center leading-tight">
                Geser slider untuk simulasi tanggal & menguji notifikasi festival adat (cth: set ke 9 Juli untuk ingatkan Belian Sentiyu tanggal 12 Juli).
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleExportPDF}
                className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh PDF Itinerary</span>
              </button>
              
              <div className="flex gap-2 flex-1">
                <button
                  onClick={handleCopyShareText}
                  className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center space-x-1.5 border border-neutral-700/40"
                >
                  {copiedItinerary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{copiedItinerary ? "Tersalin!" : "Salin Teks"}</span>
                </button>
                
                <button
                  onClick={handleDownloadText}
                  className="py-2.5 px-3.5 bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center border border-neutral-700/40"
                  title="Unduh File Teks (.txt)"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Destinations List */}
        <div className="space-y-4">
          {filteredDestinations.length === 0 ? (
            <div className="p-12 text-center bg-neutral-800/30 rounded-3xl border border-neutral-800 space-y-2">
              <p className="text-sm text-gray-500 italic">Destinasi wisata tidak ditemukan.</p>
              <p className="text-xs text-gray-600">Coba ubah filter kategori atau kata kunci pencarian Anda.</p>
            </div>
          ) : (
            filteredDestinations.map((dest, index) => {
              const isSaved = kubarItinerary.includes(dest.id);
              const reviewsCount = (kubarReviews[dest.id] || []).length;
              const activeBooking = kubarBookings.find(b => b.destId === dest.id);
              const isVisited = visitedDestIds.includes(dest.id);

              // Check if there is an upcoming event within 3 days for this destination
              const currentDate = new Date(simulatedDate.year, simulatedDate.month - 1, simulatedDate.day);
              const destEvent = KUBAR_EVENTS.find(e => e.destinationId === dest.id);
              let upcomingEventText = "";
              let isUpcomingEvent = false;
              let eventDiffDays = 0;
              if (destEvent) {
                const eventDate = new Date(destEvent.year, destEvent.month - 1, destEvent.day);
                const diffTime = eventDate.getTime() - currentDate.getTime();
                eventDiffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (eventDiffDays >= 0 && eventDiffDays <= 3) {
                  isUpcomingEvent = true;
                  upcomingEventText = eventDiffDays === 0 ? `HARI INI: ${destEvent.name}` : `${eventDiffDays} hari lagi: ${destEvent.name}`;
                }
              }

              return (
                <motion.div 
                  key={dest.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2), ease: "easeOut" }}
                  className="p-4 rounded-[28px] bg-neutral-800 neu-flat flex flex-col space-y-4 overflow-hidden border border-neutral-700/20"
                >
                  {/* Photo with overlay details */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-inner">
                    <img 
                      src={dest.image} 
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" 
                      alt={dest.name} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Category Label */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-[9px] font-extrabold uppercase tracking-widest text-emerald-400 border border-emerald-500/30">
                      {dest.category}
                    </span>

                    {isUpcomingEvent && (
                      <span className="absolute top-11 left-3 px-2.5 py-1 rounded-xl bg-amber-500 text-black text-[9px] font-extrabold uppercase tracking-wider flex items-center space-x-1 shadow-lg border border-amber-400">
                        <AlertCircle className="w-3.5 h-3.5 text-black flex-shrink-0" />
                        <span className="font-sans font-black">{upcomingEventText}</span>
                      </span>
                    )}

                    {/* Booked Badge Overlay */}
                    {activeBooking && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-emerald-950/95 border border-emerald-500/40 text-[9px] font-black uppercase tracking-widest text-emerald-400 flex items-center space-x-1 shadow-lg shadow-emerald-950/85">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse mr-1" />
                        <span>Booked</span>
                      </span>
                    )}

                    {/* Visited Badge Overlay */}
                    {isVisited && !activeBooking && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-cyan-950/95 border border-cyan-500/40 text-[9px] font-black uppercase tracking-widest text-cyan-400 flex items-center space-x-1 shadow-lg shadow-cyan-950/85">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse mr-1" />
                        <span>Visited</span>
                      </span>
                    )}

                    {/* Rating Tag */}
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-yellow-500/20">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] font-black text-white">{dest.rating}</span>
                    </div>

                    {/* Quick Cost / Location on Overlay */}
                    <div className="absolute bottom-3 left-3 space-y-0.5">
                      <div className="flex items-center text-xs text-white font-bold tracking-tight">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                        <span>{dest.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="space-y-1.5 px-1">
                    <h4 className="text-base font-black text-white tracking-tight flex items-center justify-between">
                      {dest.name}
                      {dest.location.includes("Linggang Bigung") && (
                        <span className="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded uppercase font-black tracking-wider">Lokasi Anda</span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{dest.description}</p>
                  </div>

                  {/* Tourist Package Info (Makan + Penginapan/Tidur) */}
                  <div className="bg-neutral-900/50 border border-emerald-500/10 p-3 rounded-2xl flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1" /> Paket Wisata All-In
                      </span>
                      <span className="text-[10px] font-black text-white bg-emerald-950/80 border border-emerald-800/30 px-2 py-0.5 rounded-lg">
                        {dest.packagePriceStr}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed italic">
                      "{dest.packageDescription}"
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-neutral-800/50">
                      <span className="flex items-center text-[8px] font-bold text-gray-300 bg-neutral-800/80 px-2 py-0.5 rounded-lg">
                        <Utensils className="w-3 h-3 text-emerald-400 mr-1" /> Termasuk Makan
                      </span>
                      <span className="flex items-center text-[8px] font-bold text-gray-300 bg-neutral-800/80 px-2 py-0.5 rounded-lg">
                        <Bed className="w-3 h-3 text-emerald-400 mr-1" /> Termasuk Penginapan (Tidur)
                      </span>
                    </div>
                  </div>

                  {/* Booking & Visit Now Action Row */}
                  <div className="bg-neutral-900/40 border border-neutral-800 p-2.5 rounded-2xl flex flex-col space-y-2">
                    {activeBooking ? (
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[9px] uppercase font-extrabold tracking-wider text-emerald-400 flex items-center">
                            <Check className="w-3.5 h-3.5 mr-1" /> Terjadwal (Booking Aktif)
                          </span>
                          <div className="text-[10px] text-gray-300 font-bold">
                            {activeBooking.date} • {activeBooking.qty} Orang ({activeBooking.name})
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (visitedDestIds.includes(dest.id)) {
                              setVisitedDestIds(prev => prev.filter(id => id !== dest.id));
                            } else {
                              setVisitedDestIds(prev => [...prev, dest.id]);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                            isVisited
                              ? 'bg-cyan-950/40 border-cyan-800/50 text-cyan-400'
                              : 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white shadow-md active:scale-95'
                          }`}
                        >
                          {isVisited ? "🟢 Sedang Dikunjungi" : "Kunjungi Sekarang"}
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col w-full">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setBookingForm(prev => ({ ...prev, date: '2026-07-12' }));
                              setShowBookingModal(dest);
                            }}
                            onMouseDown={(e) => { e.preventDefault(); startBookingHold(dest); }}
                            onMouseUp={stopBookingHold}
                            onMouseLeave={stopBookingHold}
                            onTouchStart={(e) => { e.preventDefault(); startBookingHold(dest); }}
                            onTouchEnd={stopBookingHold}
                            className="flex-1 py-2 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 rounded-xl text-[10px] font-black uppercase tracking-wider text-white shadow-md active:scale-95 transition-all flex items-center justify-center space-x-1 relative overflow-hidden select-none"
                          >
                            {/* Visual hold progress indicator */}
                            {heldDestId === dest.id && (
                              <div 
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-90 transition-all duration-75 pointer-events-none" 
                                style={{ width: `${heldProgress}%` }}
                              />
                            )}
                            <div className="relative z-10 flex items-center justify-center space-x-1">
                              <Ticket className="w-3.5 h-3.5" />
                              <span>{heldDestId === dest.id ? `Instant Book (${Math.round(heldProgress)}%)` : "Pesan Paket Wisata"}</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (visitedDestIds.includes(dest.id)) {
                                setVisitedDestIds(prev => prev.filter(id => id !== dest.id));
                              } else {
                                setVisitedDestIds(prev => [...prev, dest.id]);
                                const newNotif = {
                                  id: Date.now() + Math.random(),
                                  type: 'visit',
                                  user: 'Eunoiaverse',
                                  content: `Anda telah menandai kunjungan aktif di ${dest.name}!`,
                                  timestamp: 'Baru saja',
                                  read: false
                                };
                                setNotifications(prev => [newNotif, ...prev]);
                              }
                            }}
                            className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                              isVisited
                                ? 'bg-cyan-950/40 border-cyan-800/40 text-cyan-400'
                                : 'bg-neutral-800 border-neutral-700/60 text-gray-300 hover:text-white hover:bg-neutral-700/80'
                            }`}
                          >
                            {isVisited ? "🟢 Dikunjungi" : "Visit Now"}
                          </button>
                        </div>
                        <p className="text-[8.5px] text-gray-500 font-semibold tracking-wide mt-1.5 text-center font-mono">
                          💡 TAHAN tombol Pesan selama 1.5 detik untuk Instant Book virtual!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex items-center space-x-2 pt-1 border-t border-neutral-700/30">
                    <button
                      onClick={() => setSelectedKubarDest(dest)}
                      className="flex-1 py-2.5 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/80 text-xs font-bold text-gray-200 hover:text-white transition-colors border border-neutral-700/40 flex items-center justify-center space-x-1.5"
                    >
                      <Info className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Detail & Ulasan ({reviewsCount})</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowKubarMap(true);
                        setHighlightedDestId(dest.id);
                        setTimeout(() => {
                          setHighlightedDestId(null);
                        }, 3000);
                        const mapElem = document.getElementById("kubar-map-section");
                        if (mapElem) {
                          mapElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className="p-2.5 rounded-2xl bg-neutral-900/40 border border-neutral-700/40 text-gray-400 hover:text-emerald-400 hover:bg-neutral-900/80 transition-colors"
                      title="Lihat di Peta"
                    >
                      <Map className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleToggleItinerary(dest.id)}
                      className={`p-2.5 rounded-2xl transition-all border ${
                        isSaved 
                          ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-400 shadow-inner' 
                          : 'bg-neutral-900/40 border-neutral-700/40 text-gray-400 hover:text-white hover:bg-neutral-900/80'
                      }`}
                      title={isSaved ? "Hapus dari Itinerary" : "Simpan ke Itinerary"}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </>
    ) : (
      <div className="space-y-6 animate-slide-up">
        {/* Calendar Widget Card */}
        <div className="p-5 rounded-[32px] bg-neutral-800 border border-neutral-700/20 shadow-xl space-y-4">
          {/* Calendar Month Selector Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/30 text-emerald-400 rounded-2xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white tracking-wide uppercase">Kalender Adat Kubar</h4>
                <p className="text-[10px] text-gray-400">Upacara tradisi & festival budaya 2026</p>
              </div>
            </div>

            {/* Month navigation controls */}
            <div className="flex items-center space-x-2 bg-neutral-900/60 p-1 rounded-2xl border border-neutral-800">
              <button
                onClick={() => {
                  if (calendarMonth.month === 8) {
                    setCalendarMonth({ month: 7, year: 2026 });
                    setSelectedCalendarEventId(1); // auto select first event in July
                  }
                }}
                disabled={calendarMonth.month === 7}
                className={`p-1.5 rounded-xl transition-all ${
                  calendarMonth.month === 7
                    ? 'text-gray-600 cursor-not-allowed opacity-50'
                    : 'text-gray-300 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-black text-gray-200 px-2 min-w-[85px] text-center uppercase tracking-wider">
                {calendarMonth.month === 7 ? "Juli 2026" : "Agustus 2026"}
              </span>
              <button
                onClick={() => {
                  if (calendarMonth.month === 7) {
                    setCalendarMonth({ month: 8, year: 2026 });
                    setSelectedCalendarEventId(3); // auto select first event in August
                  }
                }}
                disabled={calendarMonth.month === 8}
                className={`p-1.5 rounded-xl transition-all ${
                  calendarMonth.month === 8
                    ? 'text-gray-600 cursor-not-allowed opacity-50'
                    : 'text-gray-300 hover:text-white hover:bg-neutral-850'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cultural Respect Information Bar */}
          <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/20 flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-[9px] uppercase font-extrabold text-amber-400 tracking-wider">Informasi Kunjungan Acara Adat</span>
              <p className="text-[10px] text-gray-300 leading-relaxed font-medium">
                Ritual Belian & Kwangkey adalah sakral. Wisatawan wajib berpakaian sopan, dilarang melintasi tali pembatas sesaji, dan wajib menghormati tetua adat setempat.
              </p>
            </div>
          </div>

          {/* Day of the week headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-gray-500 uppercase tracking-widest pt-1 border-t border-neutral-700/20">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
              <span key={day} className="py-1">{day}</span>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: calendarMonth.month === 7 ? 3 : 6 }).map((_, idx) => (
              <div key={`blank-${idx}`} className="aspect-square bg-transparent" />
            ))}
            {Array.from({ length: 31 }, (_, idx) => {
              const day = idx + 1;
              const matchingEvents = KUBAR_EVENTS.filter(e => e.month === calendarMonth.month && e.daysRange.includes(day));
              const hasEvent = matchingEvents.length > 0;
              const isSelectedEventDay = selectedCalendarEventId && KUBAR_EVENTS.find(e => e.id === selectedCalendarEventId)?.daysRange.includes(day) && KUBAR_EVENTS.find(e => e.id === selectedCalendarEventId)?.month === calendarMonth.month;

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => {
                    if (hasEvent) {
                      setSelectedCalendarEventId(matchingEvents[0].id);
                    }
                  }}
                  disabled={!hasEvent}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1.5 transition-all relative ${
                    hasEvent
                      ? isSelectedEventDay
                        ? 'bg-emerald-600 text-white font-extrabold shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 ring-offset-2 ring-offset-neutral-800 scale-[1.08] z-10'
                        : 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-extrabold hover:bg-emerald-900/60 scale-100 hover:scale-[1.04]'
                      : 'text-gray-500 bg-neutral-900/20 cursor-default'
                  }`}
                >
                  <span className="text-[11px]">{day}</span>
                  {hasEvent && (
                    <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isSelectedEventDay ? 'bg-white animate-ping' : 'bg-emerald-400'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Day indicator legend */}
          <div className="flex items-center space-x-4 pt-2.5 border-t border-neutral-700/20 text-[10px] text-gray-400 font-medium justify-center">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-emerald-950/70 border border-emerald-500/30" />
              <span>Ada Acara Adat</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-emerald-600 ring-2 ring-emerald-400" />
              <span>Acara Terpilih</span>
            </div>
          </div>
        </div>

        {/* Event Spotlight Detail Section */}
        {selectedCalendarEventId && (() => {
          const selectedEvent = KUBAR_EVENTS.find(e => e.id === selectedCalendarEventId);
          if (!selectedEvent) return null;
          const eventDest = KUBAR_DESTINATIONS.find(d => d.id === selectedEvent.destinationId);
          const activeBooking = kubarBookings.find(b => b.destId === selectedEvent.destinationId);
          const isVisited = visitedDestIds.includes(selectedEvent.destinationId);

          return (
            <div className="p-5 rounded-[32px] bg-neutral-800 border border-neutral-700/20 shadow-xl space-y-4 animate-fade-in">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-[9px] font-black uppercase tracking-widest text-emerald-400">
                    {selectedEvent.month === 7 ? "Ritual Adat Juli" : "Ritual Adat Agustus"}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-900/20 px-2 py-0.5 rounded-lg border border-emerald-800/10">
                    🗓️ {selectedEvent.dateStr}
                  </span>
                </div>
                <h3 className="text-base font-black text-white tracking-tight leading-snug">{selectedEvent.name}</h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-normal bg-neutral-900/30 p-3 rounded-2xl border border-neutral-800/50">
                {selectedEvent.description}
              </p>

              {/* Info Meta List */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-neutral-900/20 p-2.5 rounded-2xl border border-neutral-800/30">
                <div className="space-y-0.5">
                  <span className="text-gray-500 uppercase font-black text-[8px] tracking-wider block">📍 Lokasi Adat</span>
                  <span className="text-gray-200 font-bold leading-normal block">{selectedEvent.location}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-gray-500 uppercase font-black text-[8px] tracking-wider block">🕒 Waktu Pelaksanaan</span>
                  <span className="text-gray-200 font-bold leading-normal block">{selectedEvent.time}</span>
                </div>
                <div className="space-y-0.5 col-span-2 pt-2 border-t border-neutral-800/40">
                  <span className="text-gray-500 uppercase font-black text-[8px] tracking-wider block">🪙 Ketentuan Tiket / Adat</span>
                  <span className="text-emerald-400 font-black leading-normal block">{selectedEvent.priceStr}</span>
                </div>
              </div>

              {/* Connected Destination Link Preview */}
              {eventDest && (
                <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center space-x-3 hover:bg-neutral-900/80 transition-colors">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={eventDest.image} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt={eventDest.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] uppercase font-extrabold text-emerald-400 tracking-wider">Destinasi Terkait</span>
                    <h5 className="text-[11px] font-black text-white truncate leading-tight">{eventDest.name}</h5>
                    <p className="text-[10px] text-gray-400 truncate flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{eventDest.rating} • {eventDest.location}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedKubarDest(eventDest)}
                    className="p-1.5 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700/50 text-emerald-400 hover:text-white transition-all"
                    title="Lihat Detail Destinasi"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Actions Pre-filled Booking / Visit Now */}
              {eventDest && (
                <div className="flex flex-col space-y-2 pt-1">
                  {activeBooking ? (
                    <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-2xl flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-extrabold text-emerald-400 tracking-wider block">Sudah Membooking Acara Ini!</span>
                        <span className="text-[11px] text-gray-300 font-bold block">{activeBooking.date} • {activeBooking.qty} Orang</span>
                      </div>
                      <button
                        onClick={() => {
                          if (visitedDestIds.includes(eventDest.id)) {
                            setVisitedDestIds(prev => prev.filter(id => id !== eventDest.id));
                          } else {
                            setVisitedDestIds(prev => [...prev, eventDest.id]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                          isVisited
                            ? 'bg-cyan-950/40 border-cyan-800/50 text-cyan-400'
                            : 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white shadow-md active:scale-95'
                        }`}
                      >
                        {isVisited ? "🟢 Sedang Dikunjungi" : "Kunjungi Sekarang"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setBookingForm({
                            name: 'Edo Erpani',
                            date: `${selectedEvent.year}-${String(selectedEvent.month).padStart(2, '0')}-${String(selectedEvent.day).padStart(2, '0')}`,
                            qty: 2,
                            contact: '0812-3456-7890'
                          });
                          setShowBookingModal(eventDest);
                        }}
                        className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-[11px] font-black uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>Booking Acara & Paket Wisata</span>
                      </button>
                      <button
                        onClick={() => {
                          if (visitedDestIds.includes(eventDest.id)) {
                            setVisitedDestIds(prev => prev.filter(id => id !== eventDest.id));
                          } else {
                            setVisitedDestIds(prev => [...prev, eventDest.id]);
                            const newNotif = {
                              id: Date.now(),
                              type: 'visit',
                              user: 'Eunoiaverse',
                              content: `Anda telah menandai kunjungan aktif di ${eventDest.name}!`,
                              timestamp: 'Baru saja',
                              read: false
                            };
                            setNotifications(prev => [newNotif, ...prev]);
                          }
                        }}
                        className={`px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border ${
                          isVisited
                            ? 'bg-cyan-950/40 border-cyan-800/40 text-cyan-400'
                            : 'bg-neutral-900 border border-neutral-700/60 text-gray-300 hover:text-white'
                        }`}
                      >
                        {isVisited ? "🟢 Dikunjungi" : "Visit Now"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })()}

        {/* List of other events of the month */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Daftar Acara {calendarMonth.month === 7 ? "Juli" : "Agustus"} 2026</h4>
          <div className="grid grid-cols-1 gap-2.5">
            {KUBAR_EVENTS.filter(e => e.month === calendarMonth.month).map(e => {
              const isSelected = selectedCalendarEventId === e.id;
              return (
                <button
                  key={`list-item-${e.id}`}
                  onClick={() => setSelectedCalendarEventId(e.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-neutral-800 border-emerald-600 shadow-md ring-1 ring-emerald-800/50'
                      : 'bg-neutral-900/30 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-1 min-w-0">
                      <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">📍 {e.location}</span>
                      <h5 className="text-xs font-bold text-white truncate">{e.name}</h5>
                      <p className="text-[10px] text-gray-400 line-clamp-1">{e.description}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 font-extrabold bg-neutral-900 px-2 py-1 rounded-lg border border-neutral-800/60 whitespace-nowrap">
                      {e.dateStr.split(' ')[0]} {calendarMonth.month === 7 ? "Juli" : "Agustus"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    )}

        {/* Destination Detail Modal */}
        {selectedKubarDest && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-end justify-center p-0 md:p-4 overflow-y-auto animate-fade-in" onClick={() => setSelectedKubarDest(null)}>
            <div 
              className="bg-[#171717] w-full max-w-lg rounded-t-[40px] md:rounded-[40px] border-t md:border border-neutral-800 shadow-2xl p-6 space-y-6 animate-slide-up max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image & Title */}
              <div className="relative">
                <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
                  <img src={selectedKubarDest.image} referrerPolicy="no-referrer" className="object-cover w-full h-full" alt={selectedKubarDest.name} />
                </div>
                <button 
                  onClick={() => setSelectedKubarDest(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md flex items-center justify-center font-bold text-white transition-colors text-sm z-10"
                >
                  ×
                </button>
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-[10px] font-black text-white uppercase tracking-widest">
                  {selectedKubarDest.category}
                </span>

                {selectedKubarDest.gallery && selectedKubarDest.gallery.length > 0 && (
                  <button 
                    onClick={() => {
                      setGalleryIndex(0);
                      setShowGalleryModal(true);
                    }}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-[10px] font-bold text-emerald-400 hover:text-white transition-all flex items-center space-x-1 border border-neutral-700/50 backdrop-blur-md shadow-lg"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Lihat Galeri ({selectedKubarDest.gallery.length + 1})</span>
                  </button>
                )}
              </div>

              {/* Title Block */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-black text-white">{selectedKubarDest.name}</h3>
                  <div className="flex items-center space-x-1 text-sm font-bold text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{selectedKubarDest.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  <span>{selectedKubarDest.location}</span>
                </div>
              </div>

              {/* Key Specs Card */}
              <div className="grid grid-cols-3 gap-2 bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800 text-[10px] text-gray-400">
                <div className="space-y-0.5 border-r border-neutral-800 pr-1">
                  <span className="text-[9px] uppercase font-black text-gray-500 block">Tiket Masuk</span>
                  <span className="font-bold text-white block truncate">{selectedKubarDest.ticketPriceStr}</span>
                </div>
                <div className="space-y-0.5 border-r border-neutral-800 px-2">
                  <span className="text-[9px] uppercase font-black text-gray-500 block">Waktu Terbaik</span>
                  <span className="font-bold text-emerald-400 block truncate">{selectedKubarDest.bestSeason}</span>
                </div>
                <div className="space-y-0.5 pl-2">
                  <span className="text-[9px] uppercase font-black text-gray-500 block">Estimasi Jarak</span>
                  <span className="font-bold text-white block truncate">{selectedKubarDest.travelTime}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-300">Tentang Destinasi</h4>
                <p className="text-xs text-gray-400 leading-relaxed text-justify">{selectedKubarDest.longDescription}</p>
              </div>

              {/* Tag/Features list */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-300">Fasilitas / Kegiatan</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedKubarDest.features.map((feat, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-neutral-800 rounded-xl text-[10px] font-bold text-gray-300 border border-neutral-700/30 flex items-center">
                      <Sparkles className="w-3 h-3 text-emerald-500 mr-1" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed Tourist Package (Include Eat & Sleep) */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-950/30 to-neutral-900/50 border border-emerald-500/20 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-black tracking-wider text-emerald-400 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1.5 animate-pulse" /> Paket Wisata All-In (Makan & Tidur)
                  </span>
                  <span className="text-xs font-black text-white bg-emerald-950/80 border border-emerald-800/30 px-2.5 py-1 rounded-xl">
                    {selectedKubarDest.packagePriceStr}
                  </span>
                </div>
                
                <p className="text-xs text-gray-400 leading-relaxed italic text-justify bg-black/20 p-2.5 rounded-xl border border-neutral-800/50">
                  "{selectedKubarDest.packageDescription}"
                </p>

                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-black uppercase tracking-wider text-gray-500">Fasilitas Paket Termasuk:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedKubarDest.packageInclusions.map((inc, idx) => {
                      const isEat = inc.toLowerCase().includes("makan") || inc.toLowerCase().includes("kuliner") || inc.toLowerCase().includes("bbq");
                      const isSleep = inc.toLowerCase().includes("tidur") || inc.toLowerCase().includes("menginap") || inc.toLowerCase().includes("guesthouse") || inc.toLowerCase().includes("homestay") || inc.toLowerCase().includes("camping") || inc.toLowerCase().includes("glamping");
                      return (
                        <div key={idx} className="flex items-start space-x-1.5 text-[10px] text-gray-300">
                          {isEat ? (
                            <Utensils className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          ) : isSleep ? (
                            <Bed className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          )}
                          <span className="leading-tight font-medium">{inc}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Premium Booking & Checkout CTA */}
              <button
                onClick={() => {
                  setBookingForm({
                    name: profileName || "Edo Erpani",
                    contact: "0812-3456-7890",
                    date: "2026-07-24", // some default realistic date
                    qty: 2
                  });
                  setShowBookingModal(selectedKubarDest);
                }}
                className="w-full py-4 rounded-[22px] bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center space-x-2 shadow-xl shadow-emerald-950/40 border border-emerald-400/20"
              >
                <Ticket className="w-4 h-4 text-emerald-100 animate-pulse" />
                <span>Pesan & Bayar Paket Wisata ({selectedKubarDest.packagePriceStr})</span>
              </button>

              {/* Actions row: Rencana & Share Link */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleToggleItinerary(selectedKubarDest.id)}
                  className={`flex-[3] py-3 rounded-2xl font-black text-xs transition-all border flex items-center justify-center space-x-1.5 ${
                    kubarItinerary.includes(selectedKubarDest.id)
                      ? 'bg-emerald-950/40 border-emerald-800/30 text-emerald-400'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-transparent shadow-lg shadow-emerald-600/10'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                  <span>
                    {kubarItinerary.includes(selectedKubarDest.id) 
                      ? "✓ Sudah di Rencana" 
                      : "Tambah ke Rencana"}
                  </span>
                </button>

                <button
                  onClick={() => {
                    const encodedName = encodeURIComponent(selectedKubarDest.name);
                    const shareUrl = `${window.location.origin}${window.location.pathname}?destId=${selectedKubarDest.id}&name=${encodedName}`;
                    navigator.clipboard.writeText(shareUrl);
                    setCopiedShareLink(true);
                    setTimeout(() => setCopiedShareLink(false), 2000);
                  }}
                  id="copy-shareable-link-btn"
                  className={`flex-[2] py-3 rounded-2xl font-black text-xs transition-all border flex items-center justify-center space-x-1.5 ${
                    copiedShareLink
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700/50'
                  }`}
                >
                  {copiedShareLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>Link Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Bagikan Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* FAQ Eunoiaverse Section */}
              <div className="space-y-4 pt-4 border-t border-neutral-800">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-emerald-950/50 text-emerald-400 rounded-xl border border-emerald-900/30">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-300">FAQ Eunoiaverse</h4>
                    <p className="text-[9px] text-gray-500">Pertanyaan umum seputar wisata & transaksi adat</p>
                  </div>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {/* Q1: Akses Transportasi */}
                  <details className="group bg-neutral-900/40 rounded-2xl border border-neutral-800 p-3 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex justify-between items-center font-bold text-[11px] text-gray-200 cursor-pointer list-none">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        Akses Transportasi ke {selectedKubarDest.name}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-open:rotate-90 transition-transform duration-200" />
                    </summary>
                    <p className="text-[10px] text-gray-400 mt-2 leading-relaxed text-justify">
                      Menuju ke {selectedKubarDest.name} ({selectedKubarDest.location}) dari ibu kota kabupaten (Sendawar) memakan waktu sekitar {selectedKubarDest.travelTime}. Anda dapat menggunakan kendaraan roda dua atau roda empat. Untuk daerah sungai/danau, tersedia sewa perahu kayu ces tradisional masyarakat setempat.
                    </p>
                  </details>

                  {/* Q2: Pemandu Lokal */}
                  <details className="group bg-neutral-900/40 rounded-2xl border border-neutral-800 p-3 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex justify-between items-center font-bold text-[11px] text-gray-200 cursor-pointer list-none">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Opsi Sewa Pemandu Lokal
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-open:rotate-90 transition-transform duration-200" />
                    </summary>
                    <p className="text-[10px] text-gray-400 mt-2 leading-relaxed text-justify">
                      Sewa pemandu lokal (local guide) sangat disarankan untuk menjaga keselamatan dan mempelajari kearifan adat setempat. Anda dapat menyewa pemandu berpengalaman langsung dari kampung adat terdekat dengan biaya berkisar Rp 100.000 - Rp 250.000 per hari.
                    </p>
                  </details>

                  {/* Q3: Perlengkapan Pendakian */}
                  <details className="group bg-neutral-900/40 rounded-2xl border border-neutral-800 p-3 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex justify-between items-center font-bold text-[11px] text-gray-200 cursor-pointer list-none">
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-emerald-400" />
                        Tips Perlengkapan Kunjungan & Pendakian
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-open:rotate-90 transition-transform duration-200" />
                    </summary>
                    <p className="text-[10px] text-gray-400 mt-2 leading-relaxed text-justify">
                      Disarankan menggunakan sepatu outdoor/anti-slip, membawa obat-obatan pribadi, jas hujan ringan (mengingat cuaca tropis Kalimantan yang tidak menentu), tas anti-air untuk peralatan elektronik, serta pakaian cadangan yang nyaman untuk beraktivitas luar ruangan.
                    </p>
                  </details>

                  {/* Q4: Shop UMKM Product */}
                  <details className="group bg-neutral-900/40 rounded-2xl border border-neutral-800 p-3 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex justify-between items-center font-bold text-[11px] text-gray-200 cursor-pointer list-none">
                      <span className="flex items-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                        Beli Produk Kerajinan & Kuliner UMKM
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-open:rotate-90 transition-transform duration-200" />
                    </summary>
                    <p className="text-[10px] text-gray-400 mt-2 leading-relaxed text-justify">
                      Anda dapat menjelajahi menu <strong className="text-emerald-400">Shop</strong> untuk membeli kerajinan tangan otentik langsung dari pengrajin lokal (misalnya anyaman rotan, tenun doyo, manik-manik, patung kayu ulin). Setiap pembelian berkontribusi langsung pada ekonomi kreatif masyarakat adat Kutai Barat.
                    </p>
                  </details>

                  {/* Q5: Sosial Media Komunitas */}
                  <details className="group bg-neutral-900/40 rounded-2xl border border-neutral-800 p-3 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex justify-between items-center font-bold text-[11px] text-gray-200 cursor-pointer list-none">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        Sosial Media yang Berfokus pada Komunitas
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-open:rotate-90 transition-transform duration-200" />
                    </summary>
                    <p className="text-[10px] text-gray-400 mt-2 leading-relaxed text-justify">
                      Eunoiaverse memiliki platform sosial media komunitas di halaman utama (<strong className="text-emerald-400">Beranda</strong>). Di sana Anda bisa membagikan momen perjalanan Anda (post foto & tulisan), menyukai postingan traveler lain, berdiskusi di kolom komentar, serta melihat cerita/story harian dari warga lokal dan wisatawan.
                    </p>
                  </details>

                  {/* Q6: Wallet Integrasi Tradisional */}
                  <details className="group bg-neutral-900/40 rounded-2xl border border-neutral-800 p-3 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex justify-between items-center font-bold text-[11px] text-gray-200 cursor-pointer list-none">
                      <span className="flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                        Integrasi Wallet & Sistem Trade Tradisional
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-open:rotate-90 transition-transform duration-200" />
                    </summary>
                    <p className="text-[10px] text-gray-400 mt-2 leading-relaxed text-justify">
                      Kubar Pay mengintegrasikan dompet digital modern (untuk beli produk kriya dan pembayaran QRIS merchant lokal) dengan <strong className="text-emerald-400">Bursa Trade Tradisional</strong>. Di Bursa Trade, Anda bisa berinvestasi atau melakukan trading komoditas lokal riil seperti Anyaman Rotan, Kayu Ulin, Madu Hutan, Karet rakyat, hingga Tenun Ulap Doyo yang berfluktuasi secara real-time.
                    </p>
                  </details>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="space-y-4 pt-4 border-t border-neutral-800">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-300">Ulasan Pengunjung ({ (kubarReviews[selectedKubarDest.id] || []).length })</h4>
                
                {/* Submit review form */}
                <form onSubmit={(e) => handleAddReview(selectedKubarDest.id, e)} className="p-3 bg-neutral-900/40 rounded-2xl border border-neutral-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 font-bold">Beri Rating Anda:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewKubarReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star className={`w-4 h-4 ${star <= newKubarReviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      value={newKubarReviewText}
                      onChange={(e) => setNewKubarReviewText(e.target.value)}
                      placeholder="Tulis ulasan pengalaman Anda..."
                      className="bg-neutral-800 text-xs text-gray-200 placeholder-gray-500 rounded-xl px-3 py-2 w-full focus:outline-none focus:border-emerald-500 border border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!newKubarReviewText.trim()}
                      className="px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 transition-colors text-white font-bold text-xs rounded-xl"
                    >
                      Kirim
                    </button>
                  </div>
                </form>

                {/* Reviews list */}
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {(!kubarReviews[selectedKubarDest.id] || kubarReviews[selectedKubarDest.id].length === 0) ? (
                    <p className="text-[10px] text-gray-500 italic">Belum ada ulasan. Jadilah yang pertama memberikan ulasan!</p>
                  ) : (
                    kubarReviews[selectedKubarDest.id].map(rev => (
                      <div key={rev.id} className="p-3 rounded-xl bg-neutral-900/20 border border-neutral-800 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-gray-200">{rev.user}</span>
                          <span className="text-[9px] text-gray-500">{rev.timestamp}</span>
                        </div>
                        <div className="flex space-x-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-400">{rev.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Photo Gallery Modal with swipeable photo carousel */}
        {showGalleryModal && selectedKubarDest && (() => {
          const imagesList = [selectedKubarDest.image, ...(selectedKubarDest.gallery || [])];
          
          const handleNext = () => {
            setGalleryIndex((prev) => (prev + 1) % imagesList.length);
          };
          const handlePrev = () => {
            setGalleryIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
          };

          return (
            <div 
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in animate-duration-300" 
              onClick={() => setShowGalleryModal(false)}
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowGalleryModal(false)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center text-2xl font-bold border border-neutral-800/60 z-50 transition-colors"
                title="Tutup Galeri"
              >
                ×
              </button>

              <div 
                className="relative w-full max-w-3xl aspect-[16/10] md:aspect-[16/9] bg-neutral-950 rounded-[32px] overflow-hidden border border-neutral-800 flex items-center justify-center shadow-2xl" 
                onClick={(e) => e.stopPropagation()}
              >
                {/* Photo container */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <motion.div 
                    key={galleryIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    <img 
                      src={imagesList[galleryIndex]} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none"
                      alt={`${selectedKubarDest.name} - Foto ${galleryIndex + 1}`}
                    />
                  </motion.div>
                </div>

                {/* Overlay detail card */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/45 to-transparent p-6 pt-16 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                        {selectedKubarDest.category} • Foto {galleryIndex + 1} dari {imagesList.length}
                      </span>
                      <h4 className="text-base font-black text-white">{selectedKubarDest.name}</h4>
                    </div>
                    {/* Location badge */}
                    <div className="flex items-center text-[10px] text-gray-400 bg-neutral-900/65 border border-neutral-800/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <MapPin className="w-3 h-3 text-emerald-400 mr-1" />
                      <span className="font-medium truncate max-w-[120px]">{selectedKubarDest.location}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {galleryIndex === 0 
                      ? selectedKubarDest.description 
                      : `Detail sudut pandang alternatif eksotis dari keindahan ${selectedKubarDest.name} Kutai Barat.`}
                  </p>
                </div>

                {/* Left Arrow Navigation */}
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 hover:scale-105 active:scale-95 text-white flex items-center justify-center border border-neutral-800/80 backdrop-blur-sm transition-all z-20 group"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </button>

                {/* Right Arrow Navigation */}
                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 hover:scale-105 active:scale-95 text-white flex items-center justify-center border border-neutral-800/80 backdrop-blur-sm transition-all z-20 group"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </button>

                {/* Position Indicator Dots */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-neutral-900/85 border border-neutral-800/80 px-3 py-1.5 rounded-full backdrop-blur-md z-20">
                  {imagesList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === galleryIndex 
                          ? 'bg-emerald-400 w-4 scale-110' 
                          : 'bg-neutral-600 hover:bg-neutral-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  const ShopView = () => {
    const [shopTab, setShopTab] = useState<'katalog' | 'keranjang' | 'pesanan'>('katalog');
    const [isEditingBrand, setIsEditingBrand] = useState(false);
    const [tempBrandName, setTempBrandName] = useState(shopBrand || '');
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    // Product form fields
    const [newProdName, setNewProdName] = useState('');
    const [newProdDesc, setNewProdDesc] = useState('');
    const [newProdContact, setNewProdContact] = useState('');
    const [newProdPrice, setNewProdPrice] = useState('');
    const [selectedImagePreset, setSelectedImagePreset] = useState(0);

    const PRESET_IMAGES = [
      { name: "Anyaman Rotan", url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80" },
      { name: "Kain Tenun", url: "https://images.unsplash.com/photo-1584184924103-e310d9d8555e?w=600&q=80" },
      { name: "Manik-manik", url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80" },
      { name: "Patung Kayu", url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80" },
      { name: "Topi Tradisional", url: "https://images.unsplash.com/photo-1566954979172-eaba308acdf0?w=600&q=80" }
    ];

    const handleCreateOrUpdateBrand = (e: React.FormEvent) => {
      e.preventDefault();
      if (!tempBrandName.trim()) return;
      setShopBrand(tempBrandName.trim());
      setIsEditingBrand(false);
    };

    const handleAddProductSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newProdName.trim() || !newProdPrice.trim() || !newProdContact.trim()) return;

      const newProduct = {
        id: Date.now(),
        name: newProdName.trim(),
        description: newProdDesc.trim() || 'Tidak ada deskripsi.',
        contact: newProdContact.trim(),
        price: newProdPrice.trim(),
        image: PRESET_IMAGES[selectedImagePreset].url
      };

      setShopProducts(prev => [newProduct, ...prev]);

      // Reset form
      setNewProdName('');
      setNewProdDesc('');
      setNewProdContact('');
      setNewProdPrice('');
      setSelectedImagePreset(0);
      setIsAddingProduct(false);

      // Trigger a beautiful in-app notification
      const newNotif = {
        id: Date.now(),
        type: 'follow',
        user: shopBrand || 'Toko',
        content: `telah menambahkan produk baru: "${newProduct.name}"!`,
        timestamp: 'Baru saja',
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    };

    const handleDeleteProduct = (id: number) => {
      setShopProducts(prev => prev.filter(p => p.id !== id));
    };

    // --- Cart Actions ---
    const handleAddToCart = (product: any, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setShopCart(prev => {
        const existing = prev.find(item => item.productId === product.id);
        if (existing) {
          return prev.map(item =>
            item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, {
          id: Date.now() + Math.random(),
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          contact: product.contact || "0812-5555-8899",
          quantity: 1,
          brandName: shopBrand || "Toko Kerajinan Sentiyu"
        }];
      });
      alert(`"${product.name}" berhasil dimasukkan ke keranjang belanja!`);
    };

    const updateCartQty = (productId: number, delta: number) => {
      setShopCart(prev => prev.map(item => {
        if (item.productId === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0));
    };

    const removeFromCart = (productId: number) => {
      setShopCart(prev => prev.filter(item => item.productId !== productId));
    };

    // --- Purchase and Order Flow ---
    const [authWalletPayment, setAuthWalletPayment] = useState(true);
    const [shippingCost] = useState(25000); // flat shipping fee in Rupiah (ongkir)
    const [checkoutMode, setCheckoutMode] = useState<'single' | 'cart'>('single');

    const handleOpenDirectCheckout = (product: any, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCheckoutMode('single');
      setPaymentModalProduct(product);
      setSelectedShopProductDetail(null); // Close detail modal if open
    };

    const handleOpenCartCheckout = () => {
      if (shopCart.length === 0) return;
      setCheckoutMode('cart');
      const totalCartPrice = shopCart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
      setPaymentModalProduct({
        id: 9999,
        name: `${shopCart.length} Produk Kerajinan`,
        price: totalCartPrice.toString(),
        image: shopCart[0].image,
        description: shopCart.map(i => `${i.name} (x${i.quantity})`).join(', '),
        contact: shopCart[0].contact
      });
    };

    const handleConfirmPayment = () => {
      if (!paymentModalProduct) return;
      
      const priceVal = Number(paymentModalProduct.price);
      // Detailed breakdown calculations
      const serviceFee = 1500;
      const communitySupportFee = 2500;
      const totalRp = priceVal + shippingCost + serviceFee + communitySupportFee;

      if (authWalletPayment && balance < totalRp) {
        alert(`Saldo Wallet Anda (Rp ${balance.toLocaleString('id-ID')}) tidak mencukupi untuk pembayaran sebesar Rp ${totalRp.toLocaleString('id-ID')}! Silakan lakukan Deposit saldo terlebih dahulu di menu Wallet.`);
        return;
      }

      // Deduct balance
      if (authWalletPayment) {
        setBalance(prev => prev - totalRp);
        setWalletTransactions(prev => [
          {
            label: `Pembelian: ${paymentModalProduct.name}`,
            val: `-Rp ${totalRp.toLocaleString('id-ID')}`,
            date: 'Baru saja',
            isNegative: true
          },
          ...prev
        ]);
      }

      // Record Orders
      const orderDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      
      if (checkoutMode === 'cart') {
        const newOrders = shopCart.map(item => ({
          id: Date.now() + Math.random(),
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          brandName: item.brandName,
          shippingCost: Math.round(shippingCost / shopCart.length),
          serviceFee: Math.round(serviceFee / shopCart.length),
          communitySupportFee: Math.round(communitySupportFee / shopCart.length),
          totalPaid: (Number(item.price) * item.quantity) + Math.round((shippingCost + serviceFee + communitySupportFee) / shopCart.length),
          date: orderDate,
          status: 'Menunggu Pengiriman' as const,
          contact: item.contact
        }));
        setShopOrders(prev => [...newOrders, ...prev]);
        setShopCart([]); // empty cart
      } else {
        const newOrder = {
          id: Date.now(),
          productId: paymentModalProduct.id,
          name: paymentModalProduct.name,
          price: paymentModalProduct.price,
          image: paymentModalProduct.image,
          quantity: 1,
          brandName: shopBrand || 'Toko Kerajinan Sentiyu',
          shippingCost: shippingCost,
          serviceFee: serviceFee,
          communitySupportFee: communitySupportFee,
          totalPaid: totalRp,
          date: orderDate,
          status: 'Menunggu Pengiriman' as const,
          contact: paymentModalProduct.contact || '0812-5555-8899'
        };
        setShopOrders(prev => [newOrder, ...prev]);
      }

      // Trigger push notification & app alerts
      triggerPushNotification(
        "🛍️ Pembayaran Sukses",
        `Berhasil membayar Rp ${totalRp.toLocaleString('id-ID')} untuk "${paymentModalProduct.name}".`,
        "success"
      );

      alert(`Pembayaran Rp ${totalRp.toLocaleString('id-ID')} berhasil divalidasi! Pesanan Anda akan segera diproses.`);
      setPaymentModalProduct(null);
      setShopTab('pesanan');
    };

    // --- Interactive Live Chat Simulation ---
    const [chatInputText, setChatInputText] = useState('');
    const [isTypingReply, setIsTypingReply] = useState(false);

    const handleOpenChat = (brandName: string, productName?: string, contact?: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setActiveChatBrand({
        brandName,
        productName,
        contact: contact || '0812-5555-8899'
      });
      if (!chatMessages[brandName]) {
        setChatMessages(prev => ({
          ...prev,
          [brandName]: [
            { sender: 'owner', text: `Halo Kak Edo! Ada yang bisa kami bantu mengenai kerajinan tangan di brand "${brandName}"?`, time: 'Baru saja' }
          ]
        }));
      }
      setSelectedShopProductDetail(null);
    };

    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!chatInputText.trim() || !activeChatBrand) return;

      const brand = activeChatBrand.brandName;
      const userMsgText = chatInputText.trim();
      const userMsg = { sender: 'user' as const, text: userMsgText, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) };

      setChatMessages(prev => ({
        ...prev,
        [brand]: [...(prev[brand] || []), userMsg]
      }));
      setChatInputText('');
      setIsTypingReply(true);

      setTimeout(() => {
        if (activeChatBrand.isGroup) {
          let replyText = "Wah, setuju sekali kawan! Budaya luhur Kutai Barat memang harus terus kita lestarikan dan pelajari bersama. Ada yang berencana berkunjung ke balai adat dekat sini?";
          let randomName = "Dewi Mayasari";

          if (userMsgText.toLowerCase().includes('tari') || userMsgText.toLowerCase().includes('gantar')) {
            replyText = "Tari Gantar itu sangat sakral lho, menggunakan tongkat kayu melambangkan menanam padi. Anak-anak muda di tempat saya masih giat sekali latihan setiap minggu sore!";
            randomName = "Darsa Sentiyu";
          } else if (userMsgText.toLowerCase().includes('sape') || userMsgText.toLowerCase().includes('musik')) {
            replyText = "Betul sekali! Petikan senar alat musik Sape' benar-benar membawa kedamaian jiwa. Saya paling suka mendengar nada 'Leleng' di sore hari.";
            randomName = "Rian Melak";
          } else if (userMsgText.toLowerCase().includes('festival') || userMsgText.toLowerCase().includes('adat') || userMsgText.toLowerCase().includes('acara') || userMsgText.toLowerCase().includes('belian')) {
            replyText = "Jangan lupa juga upacara Dahau! Festival HUT Kubar juga biasanya menampilkan pawai adat yang megah sekali di Sendawar.";
            randomName = "Saman Borneo";
          }

          const groupReply = {
            sender: 'other' as const,
            senderName: randomName,
            text: replyText,
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
          };

          setChatMessages(prev => ({
            ...prev,
            [brand]: [...(prev[brand] || []), groupReply]
          }));
          setIsTypingReply(false);
          return;
        }

        let replyText = `Halo Kak Edo! Pesanan kakak untuk ${activeChatBrand.productName || 'kerajinan'} sedang kami siapkan ya. Kami selalu memastikan anyaman dikerjakan dengan rapi khas budaya Kutai Barat. Ada yang ingin ditanyakan lagi?`;
        
        if (userMsgText.toLowerCase().includes('harga') || userMsgText.toLowerCase().includes('diskon')) {
          replyText = `Tentu Kak Edo! Untuk produk ${activeChatBrand.productName || 'kerajinan'} ini harganya sudah nett sesuai kualitas bahan serat alami pilihan. Tapi jika kakak ambil lebih dari 3 buah, kami beri diskon khusus!`;
        } else if (userMsgText.toLowerCase().includes('kirim') || userMsgText.toLowerCase().includes('ongkir')) {
          replyText = `Pengiriman akan dilakukan dari Kutai Barat ke alamat kakak menggunakan kurir pilihan. Ongkos kirimnya standard Rp 25.000 saja kak. Sudah include bubble wrap tebal!`;
        }

        const ownerReply = {
          sender: 'owner' as const,
          text: replyText,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages(prev => ({
          ...prev,
          [brand]: [...(prev[brand] || []), ownerReply]
        }));
        setIsTypingReply(false);
      }, 1200);
    };

    return (
      <div className="space-y-6 animate-slide-up pb-24">
        <PageHeader title="Pasar Kerajinan Kubar" />

        {/* Dynamic sub-tabs */}
        <div className="flex bg-neutral-900/60 p-1.5 rounded-2xl border border-neutral-700/20">
          <button
            onClick={() => setShopTab('katalog')}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
              shopTab === 'katalog'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Katalog</span>
          </button>
          
          <button
            onClick={() => setShopTab('keranjang')}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 relative ${
              shopTab === 'keranjang'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Keranjang</span>
            {shopCart.length > 0 && (
              <span className="absolute -top-1 right-2 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-neutral-800">
                {shopCart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          <button
            onClick={() => setShopTab('pesanan')}
            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 relative ${
              shopTab === 'pesanan'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Pesanan Saya</span>
            {shopOrders.length > 0 && (
              <span className="absolute -top-1 right-2 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-neutral-800">
                {shopOrders.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: CATALOGUE VIEW */}
        {shopTab === 'katalog' && (
          <div className="space-y-6">
            {/* Brand Registration */}
            {!shopBrand ? (
              <div className="p-6 rounded-[32px] bg-neutral-800 border border-neutral-700/20 shadow-xl space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-amber-950/40 border border-amber-800/30 text-amber-400 rounded-2xl">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white tracking-wide uppercase">Daftarkan Brand Toko Anda</h4>
                    <p className="text-[10px] text-gray-400">Mulai jual kerajinan tangan khas Kutai Barat</p>
                  </div>
                </div>

                <form onSubmit={handleCreateOrUpdateBrand} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1">Nama Brand Toko</label>
                    <input
                      type="text"
                      placeholder="Contoh: Sentiyu Artisan Handwoven"
                      value={tempBrandName}
                      onChange={(e) => setTempBrandName(e.target.value)}
                      className="w-full bg-neutral-900/60 p-3 rounded-2xl border border-neutral-700/50 focus:border-emerald-500 focus:outline-none text-sm text-gray-200"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-[11px] font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Buat Brand Toko
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-5 rounded-[32px] bg-neutral-800 border border-neutral-700/20 shadow-xl space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/30 text-emerald-400 rounded-2xl">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">Brand Toko Terdaftar</span>
                      {isEditingBrand ? (
                        <form onSubmit={handleCreateOrUpdateBrand} className="flex items-center space-x-2 mt-1">
                          <input
                            type="text"
                            value={tempBrandName}
                            onChange={(e) => setTempBrandName(e.target.value)}
                            className="bg-neutral-900/80 px-2 py-1 rounded-xl border border-neutral-700 text-xs text-white focus:outline-none"
                            autoFocus
                          />
                          <button type="submit" className="p-1.5 bg-emerald-600 rounded-lg text-white"><Check className="w-3 h-3" /></button>
                          <button type="button" onClick={() => setIsEditingBrand(false)} className="p-1.5 bg-neutral-700 rounded-lg text-gray-400"><X className="w-3 h-3" /></button>
                        </form>
                      ) : (
                        <h3 className="text-base font-black text-white tracking-tight">{shopBrand}</h3>
                      )}
                    </div>
                  </div>

                  {!isEditingBrand && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setTempBrandName(shopBrand);
                          setIsEditingBrand(true);
                        }}
                        className="p-2 rounded-xl bg-neutral-900/50 border border-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-900/80 transition-all"
                        title="Ubah Nama Brand"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Hapus brand toko? Semua produk Anda tetap disimpan.")) {
                            setShopBrand(null);
                          }
                        }}
                        className="p-2 rounded-xl bg-neutral-900/50 border border-red-950/20 text-red-400/80 hover:text-red-400 hover:bg-red-950/10 transition-all"
                        title="Hapus Brand"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsAddingProduct(!isAddingProduct)}
                    className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 border ${
                      isAddingProduct
                        ? 'bg-neutral-950/60 border-neutral-700/40 text-gray-400'
                        : 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white shadow-md active:scale-95'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAddingProduct ? "Batal Tambah" : "Tambah Produk Baru"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Form Drawer / Add product */}
            {shopBrand && isAddingProduct && (
              <div className="p-5 rounded-[32px] bg-neutral-800 border border-neutral-700/20 shadow-xl space-y-4 animate-slide-up">
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Formulir Tambah Produk</h4>

                <form onSubmit={handleAddProductSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider block mb-1">Nama Produk</label>
                    <input
                      type="text"
                      placeholder="Contoh: Mandau Ukiran Kayu Ulin"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-700/50 focus:border-emerald-500 focus:outline-none text-xs text-gray-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider block mb-1">Deskripsi</label>
                    <textarea
                      placeholder="Jelaskan detail bahan, ukuran, keunikan motif adat..."
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      className="w-full bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-700/50 focus:border-emerald-500 focus:outline-none text-xs text-gray-200 resize-none"
                      rows={2.5}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider block mb-1">Harga (Rp)</label>
                      <input
                        type="number"
                        placeholder="Harga dalam Rupiah"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        className="w-full bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-700/50 focus:border-emerald-500 focus:outline-none text-xs text-gray-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider block mb-1">No. HP / WA Kontak</label>
                      <input
                        type="text"
                        placeholder="Contoh: 0812345678"
                        value={newProdContact}
                        onChange={(e) => setNewProdContact(e.target.value)}
                        className="w-full bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-700/50 focus:border-emerald-500 focus:outline-none text-xs text-gray-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider block mb-1.5">Pilih Ilustrasi Gambar Produk</label>
                    <div className="grid grid-cols-5 gap-2">
                      {PRESET_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedImagePreset(idx)}
                          className={`aspect-square rounded-xl overflow-hidden relative border-2 transition-all ${
                            selectedImagePreset === idx
                              ? 'border-emerald-500 ring-2 ring-emerald-400 ring-offset-2 ring-offset-neutral-800 scale-[1.04]'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                          title={preset.name}
                        >
                          <img src={preset.url} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt={preset.name} />
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 py-0.5 text-[7px] text-white text-center font-bold truncate">
                            {preset.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simpan & Tayangkan Produk</span>
                  </button>
                </form>
              </div>
            )}

            {/* List Headers */}
            <div className="flex items-center justify-between px-1">
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Katalog Produk Kerajinan</h4>
                <p className="text-[10px] text-gray-500">Ketuk produk untuk melihat detail</p>
              </div>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-900/30">
                {shopProducts.length} Produk
              </span>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 gap-4">
              {shopProducts.length === 0 ? (
                <div className="p-8 text-center bg-neutral-800/40 rounded-3xl border border-neutral-700/10 text-gray-500 text-xs italic">
                  Belum ada produk terdaftar di katalog.
                </div>
              ) : (
                shopProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedShopProductDetail(prod)}
                    className="p-4 rounded-[28px] bg-neutral-800 border border-neutral-700/15 hover:border-emerald-500/40 cursor-pointer shadow-md flex items-start gap-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-900 flex-shrink-0 relative">
                      <img src={prod.image} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt={prod.name} />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-emerald-950/90 text-emerald-400 text-[8px] font-bold tracking-wider border border-emerald-800/40 uppercase">
                        Handmade
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-start justify-between gap-1">
                        <h5 className="text-xs font-black text-white leading-snug tracking-tight truncate">{prod.name}</h5>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Hapus produk "${prod.name}"?`)) {
                              handleDeleteProduct(prod.id);
                            }
                          }}
                          className="text-gray-500 hover:text-red-400 p-0.5 transition-colors"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] text-gray-400 leading-normal line-clamp-2">{prod.description}</p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-black text-emerald-400">
                          Rp {Number(prod.price).toLocaleString('id-ID')}
                        </span>

                        <div className="flex space-x-1.5">
                          {/* Chat Owner Button */}
                          <button
                            onClick={(e) => handleOpenChat(shopBrand || 'Toko Kerajinan Sentiyu', prod.name, prod.contact, e)}
                            className="p-1.5 rounded-lg bg-neutral-900/60 hover:bg-neutral-900 text-gray-400 hover:text-emerald-400 border border-neutral-700/40 transition-colors"
                            title="Chat Owner"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          {/* Save Cart Button */}
                          <button
                            onClick={(e) => handleAddToCart(prod, e)}
                            className="p-1.5 rounded-lg bg-neutral-900/60 hover:bg-neutral-900 text-gray-400 hover:text-emerald-400 border border-neutral-700/40 transition-colors"
                            title="Masukkan Keranjang"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>

                          {/* Buy Now Button */}
                          <button
                            onClick={(e) => handleOpenDirectCheckout(prod, e)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider flex items-center space-x-1 transition-all"
                          >
                            <span>Beli</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SHOPPING CART VIEW */}
        {shopTab === 'keranjang' && (
          <div className="space-y-4 animate-slide-up">
            <div className="space-y-0.5 px-1">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest font-mono">Daftar Keranjang Belanja</h4>
              <p className="text-[10px] text-gray-500">Kelola kuantitas produk sebelum checkout</p>
            </div>

            {shopCart.length === 0 ? (
              <div className="p-12 text-center bg-neutral-800/40 rounded-[32px] border border-neutral-700/10 space-y-3">
                <ShoppingCart className="w-8 h-8 text-gray-600 mx-auto" />
                <p className="text-xs text-gray-400 italic">Keranjang belanja Anda kosong.</p>
                <button
                  onClick={() => setShopTab('katalog')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                >
                  Jelajahi Katalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {shopCart.map((item) => (
                    <div key={item.id} className="p-3 rounded-2xl bg-neutral-800 border border-neutral-700/10 shadow-sm flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                        <p className="text-[8px] text-gray-400 uppercase tracking-widest">{item.brandName}</p>
                        <p className="text-xs font-black text-emerald-400 mt-1">
                          Rp {Number(item.price).toLocaleString('id-ID')}
                        </p>
                      </div>

                      {/* Quantity Editor */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartQty(item.productId, -1)}
                          className="p-1 rounded-md bg-neutral-900 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black text-white w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.productId, 1)}
                          className="p-1 rounded-md bg-neutral-900 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-1 rounded-md text-red-400 hover:bg-red-950/20 ml-1"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Shipping Cost (Ongkir) */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-700/30 space-y-2">
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Subtotal Produk ({shopCart.reduce((s, i) => s + i.quantity, 0)} item)</span>
                    <span className="font-bold text-gray-200">
                      Rp {shopCart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Biaya Pengiriman (Ongkir Flat)</span>
                    <span className="font-bold text-gray-200">Rp {shippingCost.toLocaleString('id-ID')}</span>
                  </div>
                  <hr className="border-neutral-800" />
                  <div className="flex justify-between text-xs font-black text-white pt-1">
                    <span>Total Pembayaran</span>
                    <span className="text-emerald-400 text-sm">
                      Rp {(shopCart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0) + shippingCost).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleOpenCartCheckout}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Lanjutkan ke Pembayaran Wallet</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS VIEW */}
        {shopTab === 'pesanan' && (
          <div className="space-y-4 animate-slide-up">
            <div className="space-y-0.5 px-1">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest font-mono">Daftar Transaksi Pesanan Saya</h4>
              <p className="text-[10px] text-gray-500">Pantau proses pengiriman kerajinan Anda</p>
            </div>

            {shopOrders.length === 0 ? (
              <div className="p-12 text-center bg-neutral-800/40 rounded-[32px] border border-neutral-700/10 space-y-3">
                <Receipt className="w-8 h-8 text-gray-600 mx-auto" />
                <p className="text-xs text-gray-400 italic">Belum ada transaksi pembelian.</p>
                <button
                  onClick={() => setShopTab('katalog')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                >
                  Belanja Sekarang
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {shopOrders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-[24px] bg-neutral-800 border border-neutral-700/15 shadow-sm space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-400 font-mono">ID: #{Math.floor(ord.id / 1000000)}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-950/50 text-amber-400 border border-amber-900/30 font-bold uppercase tracking-wider text-[8px]">
                        {ord.status}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0">
                        <img src={ord.image} className="w-full h-full object-cover" alt={ord.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-black text-white truncate leading-tight">{ord.name}</h5>
                        <p className="text-[9px] text-gray-400">{ord.brandName}</p>
                        <p className="text-[10px] text-gray-300 mt-1">
                          {ord.quantity} item x Rp {Number(ord.price).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-700/30 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] text-gray-500 block uppercase font-mono">Total Dibayar (Wallet)</span>
                        <span className="text-xs font-black text-emerald-400">
                          Rp {ord.totalPaid.toLocaleString('id-ID')}
                        </span>
                      </div>

                      <div className="flex space-x-1.5">
                        <button
                          onClick={() => setSelectedOrderForInvoice(ord)}
                          className="px-2.5 py-1 bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-lg text-[9px] font-black flex items-center space-x-1 transition-all"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>Lihat Faktur</span>
                        </button>

                        <button
                          onClick={() => handleOpenChat(ord.brandName, ord.name, ord.contact)}
                          className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-950 text-gray-300 hover:text-white border border-neutral-700/50 rounded-lg text-[9px] font-black flex items-center space-x-1 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-400" />
                          <span>Chat Seller</span>
                        </button>

                        {ord.status !== 'Selesai' && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Konfirmasi penerimaan barang untuk "${ord.name}"? Status pesanan akan diubah menjadi Selesai.`)) {
                                setShopOrders(prev => prev.map(o => o.id === ord.id ? { ...o, status: 'Selesai' } : o));
                                triggerPushNotification(
                                  "📦 Pesanan Selesai",
                                  `Terima kasih! Pesanan "${ord.name}" telah dikonfirmasi selesai.`,
                                  "success"
                                );
                              }
                            }}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[9px] font-black flex items-center space-x-1 transition-all"
                          >
                            <Check className="w-3 h-3" />
                            <span>Selesai</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODAL 1: PRODUCT DETAIL MODAL */}
        {selectedShopProductDetail && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-800 rounded-[36px] overflow-hidden border border-neutral-700/30 shadow-2xl animate-scale-up">
              {/* Product Large Image */}
              <div className="h-60 w-full relative bg-neutral-900">
                <img src={selectedShopProductDetail.image} className="w-full h-full object-cover" alt={selectedShopProductDetail.name} />
                <button
                  onClick={() => setSelectedShopProductDetail(null)}
                  className="absolute top-4 right-4 p-2 bg-black/75 hover:bg-black text-white rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[9px] font-black tracking-widest uppercase">
                    100% KUTAI BARAT ARTISANAL
                  </span>
                </div>
              </div>

              {/* Product Information */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">
                    Brand: {shopBrand || "Toko Kerajinan Sentiyu"}
                  </span>
                  <h3 className="text-base font-black text-white tracking-tight">{selectedShopProductDetail.name}</h3>
                  <p className="text-lg font-black text-emerald-400">
                    Rp {Number(selectedShopProductDetail.price).toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-wider">Deskripsi Produk</h4>
                  <p className="text-[11px] text-gray-300 leading-relaxed max-h-24 overflow-y-auto pr-1">
                    {selectedShopProductDetail.description}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => handleOpenChat(shopBrand || 'Toko Kerajinan Sentiyu', selectedShopProductDetail.name, selectedShopProductDetail.contact)}
                    className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-950 text-gray-300 font-bold text-[10px] uppercase tracking-wider rounded-xl border border-neutral-700/50 flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Chat Owner</span>
                  </button>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedShopProductDetail);
                      setSelectedShopProductDetail(null);
                    }}
                    className="flex-1 py-2.5 bg-neutral-700 hover:bg-neutral-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Keranjang</span>
                  </button>

                  <button
                    onClick={() => handleOpenDirectCheckout(selectedShopProductDetail)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[10px] uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: WALLET PAYMENT AUTHORIZATION MODAL */}
        {paymentModalProduct && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-neutral-800 rounded-[32px] p-6 border border-neutral-700/40 shadow-2xl space-y-4 animate-scale-up">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Otorisasi Pembayaran</h4>
                <button
                  onClick={() => setPaymentModalProduct(null)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Order Detail Summary */}
              <div className="p-3 bg-neutral-900/60 rounded-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={paymentModalProduct.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-[11px] font-bold text-white truncate">{paymentModalProduct.name}</h5>
                  <p className="text-[10px] text-gray-400">Rp {Number(paymentModalProduct.price).toLocaleString('id-ID')}</p>
                </div>
              </div>

              {/* Billing Breakdown */}
              <div className="space-y-2 text-[10px] text-gray-400">
                <div className="flex justify-between">
                  <span>Harga Barang</span>
                  <span className="font-bold text-gray-200">Rp {Number(paymentModalProduct.price).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkir (Kutai Barat Flat)</span>
                  <span className="font-bold text-gray-200">Rp {shippingCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Layanan</span>
                  <span className="font-bold text-gray-200">Rp 1.500</span>
                </div>
                <div className="flex justify-between">
                  <span>Dukungan Komunitas Adat</span>
                  <span className="font-bold text-gray-200">Rp 2.500</span>
                </div>
                <hr className="border-neutral-700/50" />
                <div className="flex justify-between text-xs font-black text-white">
                  <span>Total Tagihan</span>
                  <span className="text-emerald-400">
                    Rp {(Number(paymentModalProduct.price) + shippingCost + 1500 + 2500).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Wallet Info Checkbox */}
              <div className="p-3.5 bg-neutral-900/80 rounded-2xl border border-neutral-700/30 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest block">Saldo Dompet</span>
                      <span className="text-xs font-black text-white">Rp {balance.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={authWalletPayment}
                    onChange={(e) => setAuthWalletPayment(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-500 bg-neutral-900 focus:ring-emerald-500 border-neutral-700"
                  />
                  <span className="text-[9px] text-gray-300 leading-tight">
                    Izinkan pemotongan saldo wallet secara otomatis sebesar <strong className="text-emerald-400">Rp {(Number(paymentModalProduct.price) + shippingCost + 1500 + 2500).toLocaleString('id-ID')}</strong>.
                  </span>
                </label>
              </div>

              <button
                onClick={handleConfirmPayment}
                disabled={authWalletPayment && balance < (Number(paymentModalProduct.price) + shippingCost + 1500 + 2500)}
                className={`w-full py-3 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all ${
                  authWalletPayment && balance < (Number(paymentModalProduct.price) + shippingCost + 1500 + 2500)
                    ? 'bg-neutral-700 text-gray-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
                }`}
              >
                {authWalletPayment && balance < (Number(paymentModalProduct.price) + shippingCost + 1500 + 2500) ? "Saldo Tidak Cukup" : "Konfirmasi & Bayar Sekarang"}
              </button>
            </div>
          </div>
        )}

        {/* MODAL: FAKTUR PEMBELIAN KERAJINAN (INVOICE MODAL) */}
        {selectedOrderForInvoice && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-[32px] overflow-hidden shadow-2xl relative animate-scale-up my-8">
              {/* Header Controls */}
              <div className="p-4 bg-neutral-950 border-b border-neutral-800/60 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Receipt className="w-4 h-4 text-pink-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-400">FAKTUR DIGITAL ASLI • KUTAI BARAT</span>
                </div>
                <button
                  onClick={() => setSelectedOrderForInvoice(null)}
                  className="p-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white border border-neutral-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Invoice Main Body (Paper-like container inside dark app) */}
              <div className="p-6 bg-white text-neutral-900 font-sans space-y-6 max-h-[70vh] overflow-y-auto">
                
                {/* Invoice Header */}
                <div className="flex justify-between items-start border-b border-neutral-200 pb-5">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black tracking-tight text-pink-600 font-sans">KUTAI BARAT ARTISANAL</span>
                    </div>
                    <p className="text-[9px] text-neutral-500 leading-tight">
                      Asosiasi Pengrajin Digital Kutai Barat<br />
                      Dinas Perindustrian & Koperasi Kaltim
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest font-mono">FAKTUR PENJUALAN</h3>
                    <span className="text-[10px] font-black text-neutral-800 font-mono block">
                      #INV/KUBAR/{Math.floor(selectedOrderForInvoice.id / 1000000)}
                    </span>
                    <span className="text-[9px] text-neutral-500 block">{selectedOrderForInvoice.date || 'Hari Ini'}</span>
                  </div>
                </div>

                {/* Profiles & Shipping details */}
                <div className="grid grid-cols-2 gap-6 text-[10px] border-b border-neutral-100 pb-5 text-left">
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-black uppercase text-neutral-400 block tracking-wider font-mono">PENGIRIM (PENJUAL):</span>
                    <div className="font-bold text-neutral-900">{selectedOrderForInvoice.brandName}</div>
                    <div className="text-neutral-500">Sentra Kerajinan Rakyat</div>
                    <div className="text-neutral-500">Kutai Barat, Kalimantan Timur</div>
                    <div className="text-pink-600 font-bold font-mono">{selectedOrderForInvoice.contact}</div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-black uppercase text-neutral-400 block tracking-wider font-mono">PENERIMA (PEMBELI):</span>
                    <div className="font-bold text-neutral-900">Edo Erpani (Customer)</div>
                    <div className="text-neutral-500">Jl. Sendawar Raya, Barong Tongkok</div>
                    <div className="text-neutral-500">Kutai Barat, Kalimantan Timur</div>
                    <div className="text-neutral-400 font-mono">Kurir: POS Borneo Flat-Rate</div>
                  </div>
                </div>

                {/* Status Stamp overlay (realistic graphic effect) */}
                <div className="relative">
                  {/* Watermark / Stamp decoration */}
                  <div className="absolute right-4 -top-3 z-10 pointer-events-none select-none">
                    {selectedOrderForInvoice.status === 'Selesai' ? (
                      <div className="border-4 border-emerald-500/80 text-emerald-500/80 rounded-xl px-4 py-1.5 text-xs font-black uppercase tracking-widest font-sans rotate-12 scale-110 shadow-sm flex flex-col items-center justify-center bg-white/40 backdrop-blur-xs">
                        <span>LUNAS</span>
                        <span className="text-[7px] mt-0.5 font-mono">VERIFIED BY KUBAR</span>
                      </div>
                    ) : (
                      <div className="border-4 border-amber-500/80 text-amber-500/80 rounded-xl px-3 py-1.5 text-xs font-black uppercase tracking-widest font-sans -rotate-6 scale-105 shadow-sm flex flex-col items-center justify-center bg-white/40 backdrop-blur-xs">
                        <span>DIPROSES</span>
                        <span className="text-[7px] mt-0.5 font-mono">PROSES PENGIRIMAN</span>
                      </div>
                    )}
                  </div>

                  {/* Order Line Item Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] text-left">
                      <thead>
                        <tr className="bg-neutral-50 text-neutral-500 uppercase text-[8px] font-black tracking-wider border-b border-neutral-200">
                          <th className="py-2 px-3">Item Kerajinan</th>
                          <th className="py-2 px-3 text-right">Harga</th>
                          <th className="py-2 px-3 text-center">Qty</th>
                          <th className="py-2 px-3 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        <tr>
                          <td className="py-3 px-3">
                            <div className="flex items-center space-x-2.5 text-left">
                              <img src={selectedOrderForInvoice.image} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" alt="" />
                              <div>
                                <span className="font-black text-neutral-900 block leading-tight">{selectedOrderForInvoice.name}</span>
                                <span className="text-[8px] text-neutral-400 uppercase font-bold tracking-widest font-mono">{selectedOrderForInvoice.brandName}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-neutral-800">
                            Rp {Number(selectedOrderForInvoice.price).toLocaleString('id-ID')}
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-neutral-800">
                            {selectedOrderForInvoice.quantity}
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-neutral-900">
                            Rp {(Number(selectedOrderForInvoice.price) * selectedOrderForInvoice.quantity).toLocaleString('id-ID')}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Subtotal Calculation details */}
                <div className="border-t border-neutral-200 pt-4 flex justify-end text-[10px]">
                  <div className="w-64 space-y-2 font-sans text-left">
                    <div className="flex justify-between text-neutral-500">
                      <span>Subtotal Barang:</span>
                      <span className="font-bold text-neutral-800 font-mono">
                        Rp {(Number(selectedOrderForInvoice.price) * selectedOrderForInvoice.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Ongkos Kirim Flat:</span>
                      <span className="font-bold text-neutral-800 font-mono">
                        Rp {(selectedOrderForInvoice.shippingCost || 12000).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Biaya Layanan Aplikasi:</span>
                      <span className="font-bold text-neutral-800 font-mono">
                        Rp {(selectedOrderForInvoice.serviceFee || 1500).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Dukungan Budaya Dayak:</span>
                      <span className="font-bold text-neutral-800 font-mono">
                        Rp {(selectedOrderForInvoice.communitySupportFee || 2500).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="border-t border-neutral-200 pt-2 flex justify-between text-xs font-black">
                      <span className="text-pink-600">Total Pembayaran:</span>
                      <span className="text-emerald-600 font-mono">
                        Rp {selectedOrderForInvoice.totalPaid.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simulated Barcode & Legal footer */}
                <div className="border-t border-neutral-200 pt-5 flex items-center justify-between text-left">
                  <div className="space-y-1">
                    <p className="text-[8px] text-neutral-400 leading-tight">
                      * Pembayaran dipotong secara otomatis dari Saldoku Wallet melalui tanda tangan enkripsi aman.<br />
                      * Faktur ini merupakan bukti bayar yang sah berdasarkan ketentuan perdagangan adat elektronik.<br />
                      * Transaksi ini mendukung <strong>Dana Pelestarian Budaya Suku Dayak</strong> Kalimantan Barat.
                    </p>
                  </div>
                  
                  {/* Decorative Barcode */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-end h-8 space-x-[1px] opacity-80">
                      <div className="w-[3px] h-full bg-neutral-900" />
                      <div className="w-[1px] h-full bg-neutral-900" />
                      <div className="w-[4px] h-full bg-neutral-900" />
                      <div className="w-[1px] h-full bg-neutral-900" />
                      <div className="w-[2px] h-full bg-neutral-900" />
                      <div className="w-[3px] h-full bg-neutral-900" />
                      <div className="w-[1px] h-full bg-neutral-900" />
                      <div className="w-[4px] h-full bg-neutral-900" />
                      <div className="w-[2px] h-full bg-neutral-900" />
                      <div className="w-[1px] h-full bg-neutral-900" />
                      <div className="w-[3px] h-full bg-neutral-900" />
                    </div>
                    <span className="text-[7px] font-mono text-neutral-400 mt-1">INV-KUBAR-{Math.floor(selectedOrderForInvoice.id / 1000000)}</span>
                  </div>
                </div>

              </div>

              {/* Action Toolbar */}
              <div className="p-4 bg-neutral-950 border-t border-neutral-800/60 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleExportInvoicePDF(selectedOrderForInvoice)}
                  className="py-2.5 px-3 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh PDF</span>
                </button>

                <button
                  onClick={() => {
                    window.print();
                    triggerPushNotification(
                      "🖨️ Cetak Faktur",
                      "Membuka antarmuka pencetak sistem browser Anda.",
                      "info"
                    );
                  }}
                  className="py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`INV/KUBAR/${Math.floor(selectedOrderForInvoice.id / 1000000)}`);
                    triggerPushNotification(
                      "📋 Faktur Disalin",
                      "ID Faktur resmi berhasil disalin ke clipboard Anda.",
                      "success"
                    );
                  }}
                  className="py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin ID</span>
                </button>

                {selectedOrderForInvoice.status !== 'Selesai' ? (
                  <button
                    onClick={() => {
                      if (window.confirm("Apakah Anda yakin telah menerima pesanan kerajinan tradisional ini?")) {
                        // Update status
                        setShopOrders(prev => prev.map(o => o.id === selectedOrderForInvoice.id ? { ...o, status: 'Selesai' } : o));
                        setSelectedOrderForInvoice(prev => prev ? { ...prev, status: 'Selesai' } : null);
                        triggerPushNotification(
                          "📦 Pesanan Selesai",
                          "Pesanan dikonfirmasi selesai langsung dari halaman faktur.",
                          "success"
                        );
                      }
                    }}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all active:scale-95 col-span-2 sm:col-span-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Selesaikan</span>
                  </button>
                ) : (
                  <div className="py-2.5 px-3 bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 col-span-2 sm:col-span-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Terverifikasi</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* MODAL 3: IN-APP LIVE CHAT MODAL WITH SELLER */}
        {activeChatBrand && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-neutral-800 rounded-[32px] overflow-hidden border border-neutral-700/40 shadow-2xl flex flex-col h-[480px] animate-scale-up">
              {/* Chat Header */}
              <div className="p-4 bg-neutral-900 border-b border-neutral-700/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-950/40 text-emerald-400 rounded-xl border border-emerald-900/40">
                    {activeChatBrand.isGroup ? (
                      <Users className="w-4 h-4" />
                    ) : (
                      <Store className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white truncate max-w-[160px]">{activeChatBrand.brandName}</h4>
                    {activeChatBrand.isGroup ? (
                      <span className="text-[8px] text-emerald-400 block font-mono">● 182 Anggota • 12 Online</span>
                    ) : activeChatBrand.productName ? (
                      <span className="text-[8px] text-gray-400 block truncate max-w-[160px]">Tanya: {activeChatBrand.productName}</span>
                    ) : (
                      <span className="text-[8px] text-emerald-400 block font-mono">● Online / Siap Melayani</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setActiveChatBrand(null)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-900/40">
                {(chatMessages[activeChatBrand.brandName] || []).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-3 text-xs space-y-1 ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : msg.sender === 'other'
                        ? 'bg-neutral-900 text-gray-200 rounded-tl-none border border-emerald-950/40'
                        : 'bg-neutral-800 text-gray-200 rounded-tl-none border border-neutral-700/30'
                    }`}>
                      {msg.sender === 'other' && msg.senderName && (
                        <p className="text-[9px] font-black text-emerald-400 font-sans tracking-wide mb-1">{msg.senderName}</p>
                      )}
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <span className="text-[8px] text-gray-400 block text-right font-mono">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {isTypingReply && (
                  <div className="flex justify-start">
                    <div className="bg-neutral-800 text-gray-400 rounded-2xl rounded-tl-none p-3 text-[10px] italic border border-neutral-700/30 flex items-center space-x-1">
                      <span className="animate-bounce font-black text-emerald-400">●</span>
                      <span className="animate-bounce delay-100 font-black text-emerald-400">●</span>
                      <span className="animate-bounce delay-200 font-black text-emerald-400">●</span>
                      <span>{activeChatBrand.isGroup ? "Seseorang sedang mengetik tanggapan..." : "Owner sedang mengetik jawaban..."}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Send Form */}
              <form onSubmit={handleSendMessage} className="p-3 bg-neutral-900 border-t border-neutral-700/30 flex gap-2">
                <input
                  type="text"
                  placeholder={activeChatBrand.isGroup ? "Tulis pesan diskusi ke forum..." : "Ketik pesan Anda ke penjual..."}
                  value={chatInputText}
                  onChange={(e) => setChatInputText(e.target.value)}
                  className="flex-1 bg-neutral-800 p-2.5 rounded-xl border border-neutral-700 focus:border-emerald-500 focus:outline-none text-xs text-white"
                  required
                />
                <button
                  type="submit"
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const WalletView = () => {
    const [walletTab, setWalletTab] = useState<'utama' | 'kirim' | 'deposit' | 'investasi'>('utama');
    
    // Send form states
    const [sendBank, setSendBank] = useState('Bank Kaltimtara');
    const [sendAcc, setSendAcc] = useState('');
    const [sendAmt, setSendAmt] = useState('');
    const [sendSuccessReceipt, setSendSuccessReceipt] = useState<any | null>(null);

    // Deposit states
    const [depBank, setDepBank] = useState('Bank Kaltimtara');
    const [depAmt, setDepAmt] = useState('');
    const [depSuccessMsg, setDepSuccessMsg] = useState<string | null>(null);
    const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

    // QR Payment states
    const [showQrPay, setShowQrPay] = useState(false);
    const [qrMerchant, setQrMerchant] = useState('Kedai Kopi Anyaman Melak');
    const [qrAmt, setQrAmt] = useState('45000'); // Rp 45.000 ($3)
    const [qrSuccess, setQrSuccess] = useState(false);

    // Investment states
    const [selectedTradeIndex, setSelectedTradeIndex] = useState<number | null>(null);
    const [tradeQty, setTradeQty] = useState('10');
    const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy');

    const exportTransactionsToPDF = () => {
      try {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const primaryColor = [16, 185, 129]; // Emerald (#10b981)
        const darkColor = [31, 41, 55]; // Gray-800
        const lightGray = [243, 244, 246]; // Gray-100

        // Header Border
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setLineWidth(1);
        doc.line(14, 15, 196, 15);

        // Header Text
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(22);
        doc.text("KUBAR DIGITAL PAY", 14, 26);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text("Aplikasi Layanan Wisata & Kriya Kutai Barat", 14, 31);

        // Right side of Header
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.text("RESI / LAPORAN MUTASI DOMPET", 120, 24);
        
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(75, 85, 99);
        const currentDate = new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        doc.text(`Tanggal Cetak: ${currentDate}`, 120, 29);
        doc.text(`Nama Pengguna: EDO ERPANI`, 120, 34);
        doc.text(`Saldo Saat Ini: Rp ${balance.toLocaleString('id-ID')}`, 120, 39);

        // Line separator
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.5);
        doc.line(14, 45, 196, 45);

        // Section Title: Daftar Transaksi
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Riwayat Transaksi Dompet Digital", 14, 54);

        // Table Header
        let currentY = 62;
        doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.rect(14, currentY, 182, 8, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(9);
        doc.text("No", 17, currentY + 5.5);
        doc.text("Keterangan Transaksi", 30, currentY + 5.5);
        doc.text("Tanggal", 110, currentY + 5.5);
        doc.text("Nominal (Rp)", 160, currentY + 5.5);

        // Table Rows
        doc.setFont("Helvetica", "normal");
        doc.setTextColor(75, 85, 99);
        
        if (walletTransactions.length === 0) {
          currentY += 8;
          doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
          doc.rect(14, currentY, 182, 10, "F");
          doc.setTextColor(156, 163, 175);
          doc.setFont("Helvetica", "italic");
          doc.text("Tidak ada riwayat transaksi saat ini.", 30, currentY + 6);
        } else {
          walletTransactions.forEach((tx, idx) => {
            currentY += 8;
            if (currentY > 260) {
              doc.addPage();
              currentY = 20;
              // Table Header again on next page
              doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
              doc.rect(14, currentY, 182, 8, "F");
              doc.setTextColor(255, 255, 255);
              doc.setFont("Helvetica", "bold");
              doc.setFontSize(9);
              doc.text("No", 17, currentY + 5.5);
              doc.text("Keterangan Transaksi", 30, currentY + 5.5);
              doc.text("Tanggal", 110, currentY + 5.5);
              doc.text("Nominal (Rp)", 160, currentY + 5.5);
              currentY += 8;
            }

            // Zebra striping
            if (idx % 2 === 1) {
              doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
              doc.rect(14, currentY, 182, 8, "F");
            }

            doc.setDrawColor(243, 244, 246);
            doc.line(14, currentY + 8, 196, currentY + 8);

            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(9);
            // Index
            doc.text(`${idx + 1}`, 17, currentY + 5.5);
            // Label
            doc.text(tx.label, 30, currentY + 5.5);
            // Date
            doc.text(tx.date, 110, currentY + 5.5);
            
            if (tx.isNegative) {
              doc.setTextColor(185, 28, 28); // Red
            } else {
              doc.setTextColor(4, 120, 87); // Emerald/Green
            }
            doc.setFont("Helvetica", "bold");
            doc.text(tx.val, 160, currentY + 5.5);
          });
        }

        // Footer block
        currentY += 20;
        if (currentY > 260) {
          doc.addPage();
          currentY = 30;
        }

        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.5);
        doc.line(14, currentY, 196, currentY);

        doc.setTextColor(156, 163, 175);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8);
        doc.text("Laporan mutasi ini sah diproduksi oleh sistem aplikasi Kubar Digital Pay.", 14, currentY + 6);
        doc.text("Harap hubungi Koperasi Kerajinan atau Pengelola Pariwisata Kutai Barat jika ada kendala.", 14, currentY + 10);

        doc.save(`Kubar_Wallet_Statement_${new Date().toISOString().slice(0, 10)}.pdf`);
      } catch (err) {
        console.error("Gagal mengekspor PDF:", err);
        alert("Terjadi kesalahan saat mengekspor PDF.");
      }
    };

    // Using top-level kubarInvestments state instead of hardcoded array

    const APPLICATION_BANKS = [
      { name: "Bank Kaltimtara", account: "002-88-29472", owner: "KUBAR DIGITAL APP", icon: "🏦" },
      { name: "Bank Mandiri", account: "148-00-5555-8899", owner: "KUBAR DIGITAL APP", icon: "💳" },
      { name: "Bank BCA (Virtual Account)", account: "8809-0812-5555-8899", owner: "KUBAR DIGITAL APP", icon: "📱" }
    ];

    const getRecipientName = (bank: string, accNo: string) => {
      if (!accNo || accNo.length < 8) return null;
      const digitsOnly = accNo.replace(/[^0-9]/g, '');
      if (digitsOnly.length < 8) return null;
      
      const num = parseInt(digitsOnly.slice(-4)) || 0;
      if (bank.includes("Kaltimtara")) {
        if (num % 3 === 0) return "Toko Adat Sentiyu (Ibu Mariana)";
        if (num % 3 === 1) return "Koperasi Seni Ukir Melak";
        return "Edo Erpani (Akun Pribadi)";
      } else if (bank.includes("Mandiri")) {
        if (num % 2 === 0) return "Bapak Joni (Pengrajin Mandau)";
        return "Kreator Anyaman Serat Doyo";
      } else if (bank.includes("BCA")) {
        if (num % 2 === 0) return "CV. Mahakam Crafting Utama";
        return "Yayasan Kerajinan Dayak Melak";
      } else if (bank.includes("BRI")) {
        return "Komunitas Pengrajin Rotan Muara Pahu";
      } else {
        return "Merchant Terverifikasi Kutai Barat";
      }
    };

    const handleCopy = (acc: string) => {
      navigator.clipboard.writeText(acc);
      setCopiedAccount(acc);
      setTimeout(() => setCopiedAccount(null), 2000);
    };

    const handleSendSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const amountRp = Number(sendAmt);
      if (isNaN(amountRp) || amountRp <= 0) {
        alert("Jumlah transfer tidak valid!");
        return;
      }
      if (balance < amountRp) {
        alert(`Saldo tidak mencukupi! Anda membutuhkan Rp ${amountRp.toLocaleString('id-ID')} namun saldo Anda adalah Rp ${balance.toLocaleString('id-ID')}.`);
        return;
      }

      const verifiedName = getRecipientName(sendBank, sendAcc) || "Penerima Terverifikasi";

      // Deduct balance
      setBalance(prev => prev - amountRp);
      
      const txLabel = `Transfer ke ${sendBank} - ${verifiedName}`;
      const newTx = {
        label: txLabel,
        val: `-Rp ${amountRp.toLocaleString('id-ID')}`,
        date: 'Hari ini',
        isNegative: true
      };

      setWalletTransactions(prev => [newTx, ...prev]);

      setSendSuccessReceipt({
        id: 'TX-' + Math.floor(Math.random() * 9000000 + 1000000),
        bank: sendBank,
        account: sendAcc,
        recipient: verifiedName,
        amountUSD: amountRp / 15000,
        amountRp: amountRp,
        date: new Date().toLocaleString('id-ID')
      });

      // Trigger push notification & alerts
      triggerPushNotification(
        "💸 Transfer Berhasil",
        `Berhasil mentransfer Rp ${amountRp.toLocaleString('id-ID')} ke ${verifiedName} via ${sendBank}.`,
        "success"
      );

      // Clear form
      setSendAcc('');
      setSendAmt('');
    };

    const handleDepositSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const amountRp = Number(depAmt);
      if (isNaN(amountRp) || amountRp <= 0) {
        alert("Jumlah deposit tidak valid!");
        return;
      }

      // Add to balance
      setBalance(prev => prev + amountRp);

      const txLabel = `Deposit Bank via ${depBank}`;
      const newTx = {
        label: txLabel,
        val: `+Rp ${amountRp.toLocaleString('id-ID')}`,
        date: 'Hari ini',
        isNegative: false
      };

      setWalletTransactions(prev => [newTx, ...prev]);
      
      // Trigger push notification
      triggerPushNotification(
        "💰 Top Up Berhasil",
        `Deposit sebesar Rp ${amountRp.toLocaleString('id-ID')} telah sukses diverifikasi.`,
        "success"
      );

      setDepSuccessMsg(`Sukses! Saldo Anda telah bertambah Rp ${amountRp.toLocaleString('id-ID')} melalui transfer ke rekening ${depBank}.`);
      setDepAmt('');
    };

    const handleQrPayment = () => {
      const rpVal = Number(qrAmt);
      if (isNaN(rpVal) || rpVal <= 0) {
        alert("Jumlah pembayaran QRIS tidak valid!");
        return;
      }
      
      if (balance < rpVal) {
        alert(`Saldo tidak mencukupi untuk melakukan pembayaran QRIS sebesar Rp ${rpVal.toLocaleString('id-ID')}! Silakan top-up terlebih dahulu.`);
        return;
      }

      setBalance(prev => prev - rpVal);

      const newTx = {
        label: `QRIS: ${qrMerchant}`,
        val: `-Rp ${rpVal.toLocaleString('id-ID')}`,
        date: 'Hari ini',
        isNegative: true
      };

      setWalletTransactions(prev => [newTx, ...prev]);
      
      triggerPushNotification(
        "📱 Pembayaran QRIS Berhasil",
        `Berhasil membayar Rp ${rpVal.toLocaleString('id-ID')} ke "${qrMerchant}" via QRIS.`,
        "success"
      );

      setQrSuccess(true);
      setTimeout(() => {
        setQrSuccess(false);
        setShowQrPay(false);
      }, 2500);
    };

    const handleTradeSubmit = (item: any) => {
      const qty = parseInt(tradeQty);
      if (isNaN(qty) || qty <= 0) {
        alert("Kuantitas transaksi tidak valid!");
        return;
      }

      const totalCostRp = qty * item.price;

      if (tradeMode === 'buy') {
        if (balance < totalCostRp) {
          alert(`Saldo Anda (Rp ${balance.toLocaleString('id-ID')}) tidak cukup untuk membeli ${qty} unit ${item.name} seharga Rp ${totalCostRp.toLocaleString('id-ID')}!`);
          return;
        }

        // Deduct balance and update holdings
        setBalance(prev => prev - totalCostRp);
        
        const updatedHoldings = {
          ...investmentHoldings,
          [item.id]: (investmentHoldings[item.id] || 0) + qty
        };

        setInvestmentHoldings(updatedHoldings);

        // Update portfolio baseline for Alerts
        const newTotalValue = kubarInvestments.reduce((sum, inv) => {
          const owned = updatedHoldings[inv.id] || 0;
          return sum + owned * inv.price;
        }, 0);

        setLastPurchasePortfolioValue(newTotalValue);
        localStorage.setItem('kubar_last_purchase_portfolio_value', String(newTotalValue));
        setHasAlertedSinceLastPurchase(false);
        localStorage.setItem('kubar_has_alerted_10percent', 'false');

        const newTx = {
          label: `Beli Investasi: ${qty} Unit ${item.name}`,
          val: `-Rp ${totalCostRp.toLocaleString('id-ID')}`,
          date: 'Hari ini',
          isNegative: true
        };
        setWalletTransactions(prev => [newTx, ...prev]);

        triggerPushNotification(
          "📈 Pembelian Unit Investasi",
          `Berhasil membeli ${qty} unit ${item.name} seharga Rp ${totalCostRp.toLocaleString('id-ID')}.`,
          "success"
        );

        alert(`Pembelian Berhasil! Anda telah membeli ${qty} unit ${item.name} seharga Rp ${totalCostRp.toLocaleString('id-ID')}.`);
      } else {
        const owned = investmentHoldings[item.id] || 0;
        if (owned < qty) {
          alert(`Anda hanya memiliki ${owned} unit ${item.name}. Tidak cukup untuk menjual ${qty} unit!`);
          return;
        }

        // Add to balance and update holdings
        setBalance(prev => prev + totalCostRp);
        setInvestmentHoldings(prev => ({
          ...prev,
          [item.id]: owned - qty
        }));

        const newTx = {
          label: `Jual Investasi: ${qty} Unit ${item.name}`,
          val: `+Rp ${totalCostRp.toLocaleString('id-ID')}`,
          date: 'Hari ini',
          isNegative: false
        };
        setWalletTransactions(prev => [newTx, ...prev]);

        triggerPushNotification(
          "📉 Penjualan Unit Investasi",
          `Berhasil menjual ${qty} unit ${item.name} seharga Rp ${totalCostRp.toLocaleString('id-ID')}.`,
          "success"
        );

        alert(`Penjualan Berhasil! Anda telah menjual ${qty} unit ${item.name} seharga Rp ${totalCostRp.toLocaleString('id-ID')}.`);
      }

      setSelectedTradeIndex(null);
    };

    const getSpendingBreakdown = () => {
      let shopping = 0;
      let travel = 0;
      let investments = 0;

      walletTransactions.forEach(tx => {
        if (tx.isNegative) {
          const numStr = tx.val.replace(/[^0-9]/g, '');
          const amount = Number(numStr) || 0;

          const labelLower = tx.label.toLowerCase();
          if (labelLower.includes('investasi') || labelLower.includes('reksadana') || labelLower.includes('bursa') || labelLower.includes('saham') || labelLower.includes('obligasi') || labelLower.includes('holdings')) {
            investments += amount;
          } else if (labelLower.includes('wisata') || labelLower.includes('tiket') || labelLower.includes('perahu') || labelLower.includes('sungai') || labelLower.includes('travel') || labelLower.includes('destinasi') || labelLower.includes('tour') || labelLower.includes('pemandu') || labelLower.includes('booking')) {
            travel += amount;
          } else {
            shopping += amount;
          }
        }
      });

      // Realistic fallback so the pie chart is never empty on load
      if (shopping === 0 && travel === 0 && investments === 0) {
        shopping = 360000;
        travel = 150000;
        investments = 500000;
      }

      return [
        { name: 'Shopping', value: shopping, color: '#10B981' }, // Emerald
        { name: 'Travel', value: travel, color: '#3B82F6' }, // Blue
        { name: 'Investments', value: investments, color: '#F59E0B' } // Amber/Gold
      ];
    };

    const detectedRecipient = getRecipientName(sendBank, sendAcc);

    return (
      <div className="animate-slide-up space-y-6">
        <PageHeader title="Kubar Digital Wallet" />

        {/* Sub Navigation Bar */}
        <div className="flex bg-neutral-900/60 p-1.5 rounded-2xl border border-neutral-700/20 shadow-inner">
          <button
            onClick={() => { setWalletTab('utama'); setSendSuccessReceipt(null); setDepSuccessMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
              walletTab === 'utama' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Utama</span>
          </button>
          <button
            onClick={() => { setWalletTab('kirim'); setSendSuccessReceipt(null); setDepSuccessMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
              walletTab === 'kirim' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim</span>
          </button>
          <button
            onClick={() => { setWalletTab('deposit'); setSendSuccessReceipt(null); setDepSuccessMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
              walletTab === 'deposit' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deposit</span>
          </button>
          <button
            onClick={() => { setWalletTab('investasi'); setSendSuccessReceipt(null); setDepSuccessMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
              walletTab === 'investasi' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Bursa Trade</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD (UTAMA) */}
        {walletTab === 'utama' && (
          <div className="space-y-6">
            {/* Elegant Virtual Debit Card */}
            <div className="relative p-6 rounded-[32px] bg-gradient-to-br from-neutral-800 via-neutral-900 to-emerald-950 border border-emerald-900/40 shadow-xl overflow-hidden min-h-[200px] flex flex-col justify-between">
              {/* Card Hologram Chip */}
              <div className="absolute top-6 right-6 w-12 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 opacity-80 shadow-md border border-amber-300 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-0.5 w-8 h-6 opacity-30">
                  <div className="border border-black"></div><div className="border border-black"></div><div className="border border-black"></div>
                  <div className="border border-black"></div><div className="border border-black"></div><div className="border border-black"></div>
                </div>
              </div>

              {/* Background Art - Wave */}
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

              {/* Card Header */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-mono">Kubar Pay Platinum Card</span>
                <p className="text-2xl font-black text-white font-mono tracking-tight">
                  Rp {balance.toLocaleString('id-ID')}
                </p>
                <p className="text-[11px] text-gray-400 font-mono">
                  Kutai Barat Digital Currency
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-end pt-8">
                <div>
                  <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block">Card Holder</span>
                  <p className="text-xs font-black text-gray-200 uppercase font-mono tracking-wider">EDO ERPANI</p>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block">Exp Date</span>
                  <p className="text-xs font-black text-gray-200 font-mono">12/31</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => setWalletTab('kirim')}
                className="p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/20 flex flex-col items-center justify-center space-y-1.5 transition-all hover:scale-[1.03] active:scale-95"
              >
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/30 text-emerald-400 rounded-xl">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black uppercase text-gray-300">Kirim</span>
              </button>

              <button
                onClick={() => setWalletTab('deposit')}
                className="p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/20 flex flex-col items-center justify-center space-y-1.5 transition-all hover:scale-[1.03] active:scale-95"
              >
                <div className="p-2.5 bg-blue-950/40 border border-blue-800/30 text-blue-400 rounded-xl">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black uppercase text-gray-300">Deposit</span>
              </button>

              <button
                onClick={() => setShowQrPay(true)}
                className="p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/20 flex flex-col items-center justify-center space-y-1.5 transition-all hover:scale-[1.03] active:scale-95"
              >
                <div className="p-2.5 bg-purple-950/40 border border-purple-800/30 text-purple-400 rounded-xl">
                  <QrCode className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black uppercase text-gray-300">Bayar QR</span>
              </button>

              <button
                onClick={() => setWalletTab('investasi')}
                className="p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/20 flex flex-col items-center justify-center space-y-1.5 transition-all hover:scale-[1.03] active:scale-95"
              >
                <div className="p-2.5 bg-amber-950/40 border border-amber-800/30 text-amber-400 rounded-xl">
                  <Coins className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black uppercase text-gray-300">Investasi</span>
              </button>
            </div>

            {/* Spending Breakdown Pie Chart using recharts */}
            <div className="p-6 rounded-[32px] bg-neutral-800 border border-neutral-700/10 shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-700/20 pb-3">
                <div className="flex items-center space-x-2">
                  <PieIcon className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-black text-white uppercase tracking-wider font-mono">Spending Breakdown</h4>
                </div>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-full font-black uppercase tracking-widest font-mono">
                  Bulan Ini
                </span>
              </div>

              {(() => {
                const spendingData = getSpendingBreakdown();
                const totalSpending = spendingData.reduce((sum, item) => sum + item.value, 0);

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* Recharts Pie Chart Canvas */}
                    <div className="h-44 relative flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={spendingData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {spendingData.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: any) => `Rp ${Number(value).toLocaleString('id-ID')}`}
                            contentStyle={{
                              backgroundColor: '#171717',
                              borderColor: '#262626',
                              borderRadius: '16px',
                              padding: '8px 12px',
                            }}
                            itemStyle={{ color: '#fff', fontSize: '11px', fontFamily: 'monospace' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      
                      {/* Inner Text Center of Pie */}
                      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
                        <span className="text-xs font-black text-white font-mono">
                          Rp {totalSpending.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    {/* Styled Legend Details with Percentages */}
                    <div className="space-y-3">
                      {spendingData.map((item, idx) => {
                        const percent = totalSpending > 0 ? Math.round((item.value / totalSpending) * 100) : 0;
                        return (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-2xl bg-neutral-900/60 border border-neutral-700/10 hover:bg-neutral-900 transition-colors">
                            <div className="flex items-center space-x-2">
                              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                              <span className="text-xs font-bold text-gray-200">{item.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black text-white font-mono block">
                                Rp {item.value.toLocaleString('id-ID')}
                              </span>
                              <span className="text-[9px] font-mono text-gray-500 font-bold">
                                {percent}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Quick QR Payment Interactive Window */}
            {showQrPay && (
              <div className="p-5 rounded-[32px] bg-neutral-800 border border-purple-900/30 shadow-xl space-y-4 animate-slide-up">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-4 h-4 text-purple-400" />
                    <h4 className="text-xs font-black text-white uppercase tracking-widest font-mono">Scan & Bayar QRIS</h4>
                  </div>
                  <button onClick={() => setShowQrPay(false)} className="p-1 rounded-lg bg-neutral-900 text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {qrSuccess ? (
                  <div className="py-6 text-center space-y-2">
                    <div className="w-12 h-12 bg-purple-950 text-purple-400 rounded-full flex items-center justify-center mx-auto border border-purple-800 animate-bounce">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-black text-white">Pembayaran QRIS Berhasil!</p>
                    <p className="text-xs text-gray-400">Dana ditransfer ke {qrMerchant}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Simulated QR Visual */}
                    <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto flex flex-col justify-between items-center shadow-md relative border-4 border-purple-900/30">
                      <div className="w-full h-1 bg-red-500 absolute top-1/2 left-0 animate-pulse"></div>
                      {/* Top bar simulating QRIS Logo */}
                      <div className="w-full text-[8px] bg-teal-800 text-white font-black text-center py-0.5 rounded uppercase tracking-widest">
                        QRIS GPN KUBAR PAY
                      </div>
                      <div className="w-28 h-28 opacity-90 relative">
                        {/* Elegant custom pure-CSS vector QR-code mock */}
                        <div className="w-full h-full border-4 border-black p-1 flex flex-wrap gap-1 bg-white">
                          <div className="w-7 h-7 border-4 border-black bg-white"></div>
                          <div className="w-7 h-7 border-4 border-black bg-white ml-auto"></div>
                          <div className="w-full h-4 bg-black/80"></div>
                          <div className="w-7 h-7 border-4 border-black bg-white mt-auto"></div>
                          <div className="w-7 h-7 bg-black mt-auto ml-auto"></div>
                        </div>
                      </div>
                      <span className="text-[7px] text-gray-500 font-bold tracking-tight">NMID: ID2026778102</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-black uppercase text-gray-500 block mb-1">Nama Merchant</label>
                        <select
                          value={qrMerchant}
                          onChange={(e) => setQrMerchant(e.target.value)}
                          className="w-full bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-700/40 text-xs text-white focus:outline-none"
                        >
                          <option value="Kedai Kopi Anyaman Melak">Kedai Kopi Anyaman Melak</option>
                          <option value="Tiket Wisata Jantur Inar">Tiket Wisata Jantur Inar</option>
                          <option value="Sewa Perahu Dayak Mahakam">Sewa Perahu Dayak Mahakam</option>
                          <option value="Toko Cinderamata Manik Barong">Toko Cinderamata Manik Barong</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-black uppercase text-gray-500 block mb-1">Nominal (Rp)</label>
                        <input
                          type="number"
                          value={qrAmt}
                          onChange={(e) => setQrAmt(e.target.value)}
                          className="w-full bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-700/40 text-xs text-white focus:outline-none font-mono"
                          required
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center font-mono">
                      Biaya Administrasi: Gratis (Kubar Pay QRIS)
                    </p>

                    <button
                      onClick={handleQrPayment}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
                    >
                      Bayar QR Sekarang
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Riwayat Transaksi */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold flex items-center gap-2">
                  <History className="w-5 h-5 text-emerald-400" />
                  <span>Riwayat Transaksi</span>
                </h4>
                {walletTransactions.length > 0 && (
                  <button
                    onClick={exportTransactionsToPDF}
                    id="export-statement-pdf-btn"
                    className="py-1.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-gray-200 hover:text-white rounded-xl border border-neutral-700/50 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                    title="Ekspor PDF"
                  >
                    <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Unduh PDF</span>
                  </button>
                )}
              </div>
              <div className="space-y-3.5">
                {walletTransactions.map((t, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-neutral-800 flex justify-between items-center border border-neutral-700/10 shadow-sm hover:border-neutral-700/30 transition-all">
                    <div>
                      <p className="text-xs font-bold text-gray-100">{t.label}</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-0.5">{t.date}</p>
                    </div>
                    <span className={`text-xs font-black ${!t.isNegative ? 'text-emerald-400' : 'text-red-400'}`}>
                      {t.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SEND FUNDS (KIRIM) */}
        {walletTab === 'kirim' && (
          <div className="p-6 rounded-[32px] bg-neutral-800 border border-neutral-700/20 shadow-xl space-y-6">
            <div className="flex items-center space-x-2.5 border-b border-neutral-700/30 pb-3">
              <div className="p-2 bg-emerald-950 text-emerald-400 rounded-xl">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Kirim Dana ke Rekening Bank</h4>
                <p className="text-[9px] text-gray-400">Transfer instan ke seluruh Bank di Indonesia</p>
              </div>
            </div>

            {sendSuccessReceipt ? (
              /* Success Receipt */
              <div className="space-y-4 animate-scale-up">
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 text-center space-y-2">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h5 className="text-xs font-black text-white uppercase tracking-wider">Transfer Berhasil Divalidasi</h5>
                  <p className="text-[10px] text-gray-400">Resi Transaksi Resmi Aplikasi</p>
                </div>

                <div className="p-4 bg-neutral-900/60 rounded-2xl border border-neutral-700/10 font-mono text-[10px] space-y-2 text-gray-300">
                  <div className="flex justify-between"><span>No. Referensi:</span><span className="text-white font-bold">{sendSuccessReceipt.id}</span></div>
                  <div className="flex justify-between"><span>Waktu:</span><span>{sendSuccessReceipt.date}</span></div>
                  <div className="flex justify-between"><span>Bank Penerima:</span><span className="text-white">{sendSuccessReceipt.bank}</span></div>
                  <div className="flex justify-between"><span>No. Rekening:</span><span className="text-white">{sendSuccessReceipt.account}</span></div>
                  <div className="flex justify-between"><span>Nama Penerima:</span><span className="text-emerald-400 font-bold">{sendSuccessReceipt.recipient}</span></div>
                  <hr className="border-neutral-800" />
                  <div className="flex justify-between text-xs pt-1">
                    <span className="font-sans font-bold">Total Transfer:</span>
                    <span className="text-emerald-400 font-black">${sendSuccessReceipt.amountUSD.toFixed(2)} (Rp {sendSuccessReceipt.amountRp.toLocaleString('id-ID')})</span>
                  </div>
                </div>

                <button
                  onClick={() => setSendSuccessReceipt(null)}
                  className="w-full py-3 bg-neutral-700 hover:bg-neutral-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                >
                  Kirim Uang Baru
                </button>
              </div>
            ) : (
              /* Send Form */
              <form onSubmit={handleSendSubmit} className="space-y-4">
                <div>
                  <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">Pilih Bank Tujuan</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['Bank Kaltimtara', 'Bank Mandiri', 'Bank BCA', 'Bank BRI', 'Bank BNI'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSendBank(b)}
                        className={`py-2 px-1 rounded-xl border text-[8px] font-black text-center transition-all ${
                          sendBank === b
                            ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                            : 'bg-neutral-900/60 border-neutral-700/50 text-gray-400 hover:text-white'
                        }`}
                      >
                        {b.replace("Bank ", "")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider block mb-1">Nomor Rekening (Numerik)</label>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Contoh: 1480029381 (Min 8 digit)"
                    value={sendAcc}
                    onChange={(e) => setSendAcc(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-neutral-900/60 p-3 rounded-2xl border border-neutral-700/50 focus:border-emerald-500 focus:outline-none text-xs text-white font-mono"
                    required
                  />

                  {/* Recipient verification box ("if valid result name placeholder") */}
                  <div className="mt-2 transition-all">
                    {detectedRecipient ? (
                      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-900/40 flex items-center space-x-2 text-emerald-400 animate-slide-up">
                        <Check className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black">
                          Penerima Terdeteksi: <strong className="text-white underline">{detectedRecipient}</strong>
                        </span>
                      </div>
                    ) : (
                      <p className="text-[9px] text-gray-500 italic pl-1">
                        {sendAcc.length >= 1 ? "Ketik minimal 8 angka rekening untuk memvalidasi nama..." : "Nama penerima akan terdeteksi otomatis."}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider block mb-1">Jumlah Transfer (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-sans text-xs">Rp</span>
                    <input
                      type="number"
                      step="any"
                      placeholder="Contoh: 150000"
                      value={sendAmt}
                      onChange={(e) => setSendAmt(e.target.value)}
                      className="w-full bg-neutral-900/60 p-3 pl-9 rounded-2xl border border-neutral-700/50 focus:border-emerald-500 focus:outline-none text-xs text-white font-mono"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Uang Sekarang</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: DEPOSIT BANK APPLICATION */}
        {walletTab === 'deposit' && (
          <div className="p-6 rounded-[32px] bg-neutral-800 border border-neutral-700/20 shadow-xl space-y-6">
            <div className="flex items-center space-x-2.5 border-b border-neutral-700/30 pb-3">
              <div className="p-2 bg-blue-950 text-blue-400 rounded-xl">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Deposit Dana Bank Aplikasi</h4>
                <p className="text-[9px] text-gray-400">Silakan transfer ke nomor rekening aplikasi resmi di bawah</p>
              </div>
            </div>

            {depSuccessMsg && (
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-900/40 space-y-3 animate-scale-up">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-300 font-bold leading-relaxed">{depSuccessMsg}</p>
                </div>
                <button
                  onClick={() => setDepSuccessMsg(null)}
                  className="px-3 py-1.5 bg-neutral-800 text-[9px] font-bold text-white uppercase tracking-wide rounded-lg"
                >
                  Selesai / Deposit Baru
                </button>
              </div>
            )}

            {/* List of Application Bank Accounts */}
            <div className="space-y-3">
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Rekening Bank Resmi Aplikasi</span>
              {APPLICATION_BANKS.map((b) => (
                <div key={b.name} className="p-3 bg-neutral-900/60 rounded-2xl border border-neutral-700/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-lg">{b.icon}</span>
                    <div>
                      <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block">{b.name}</span>
                      <strong className="text-xs text-white font-mono tracking-wider">{b.account}</strong>
                      <span className="text-[8px] text-gray-500 block uppercase font-bold">a/n {b.owner}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(b.account)}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-gray-400 hover:text-white transition-all flex items-center space-x-1"
                    title="Salin Rekening"
                  >
                    {copiedAccount === b.account ? (
                      <span className="text-[8px] font-black text-emerald-400 uppercase">Tersalin!</span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Simulated Confirm Form */}
            <form onSubmit={handleDepositSubmit} className="space-y-4 pt-2 border-t border-neutral-700/20">
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider block">Konfirmasi Deposit</span>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black uppercase text-gray-500 block mb-1">Transfer ke Bank</label>
                  <select
                    value={depBank}
                    onChange={(e) => setDepBank(e.target.value)}
                    className="w-full bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-700/40 text-xs text-white focus:outline-none"
                  >
                    <option value="Bank Kaltimtara">Bank Kaltimtara</option>
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BCA (Virtual Account)">Bank BCA (VA)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-gray-500 block mb-1">Jumlah (Rp)</label>
                  <input
                    type="number"
                    placeholder="Contoh: 100000"
                    value={depAmt}
                    onChange={(e) => setDepAmt(e.target.value)}
                    className="w-full bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-700/40 text-xs text-white focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-700 hover:from-blue-500 hover:to-teal-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1"
              >
                <Check className="w-4 h-4" />
                <span>Konfirmasi Saya Sudah Transfer</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: BURSA INVESTASI TRADE */}
        {walletTab === 'investasi' && (
          <div className="space-y-4">
            <div className="space-y-0.5 px-1">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest font-mono">Bursa Investasi Kerajinan & Hasil Bumi</h4>
              <p className="text-[10px] text-gray-500 font-sans">Jual beli (trade) saham komoditas kriya lokal Kutai Barat</p>
            </div>

            {/* Realtime Alert & Portfolio Valuation Monitor */}
            <div className="p-4 rounded-[24px] bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Monitor Otomatis Fluktuasi Portofolio
                </span>
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase">Trigger: ±10%</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Nilai Portofolio Saat Ini</span>
                  <strong className="text-sm font-mono text-emerald-400 font-bold block">
                    Rp {(() => {
                      const val = kubarInvestments.reduce((sum, inv) => {
                        const owned = investmentHoldings[inv.id] || 0;
                        return sum + owned * inv.price;
                      }, 0);
                      return val.toLocaleString('id-ID');
                    })()}
                  </strong>
                </div>
                
                <div className="space-y-0.5 border-l border-neutral-800 pl-3">
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider block">
                    Baseline Pembelian Terakhir
                  </span>
                  <strong className="text-sm font-mono text-gray-300 font-bold block">
                    Rp {lastPurchasePortfolioValue.toLocaleString('id-ID')}
                  </strong>
                </div>
              </div>

              {(() => {
                const currentVal = kubarInvestments.reduce((sum, inv) => {
                  const owned = investmentHoldings[inv.id] || 0;
                  return sum + owned * inv.price;
                }, 0);

                if (currentVal <= 0) {
                  return (
                    <div className="text-[10px] text-gray-500 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/60 text-center italic font-medium leading-relaxed">
                      Anda belum memiliki aset investasi. Lakukan pembelian di bursa bawah ini untuk mulai memantau pergerakan portofolio Anda.
                    </div>
                  );
                }

                const changePct = ((currentVal - lastPurchasePortfolioValue) / lastPurchasePortfolioValue) * 100;
                const isWarning = Math.abs(changePct) >= 10.0;

                return (
                  <div className={`p-2.5 rounded-xl ${isWarning ? 'bg-red-950/20 border border-red-900/30 text-red-300' : 'bg-neutral-950 border border-neutral-800/60 text-gray-400'} text-[10px] flex items-center justify-between`}>
                    <div className="flex items-center gap-1.5 text-left">
                      <span className="text-xs font-mono font-black">
                        {changePct >= 0 ? '▲' : '▼'} {changePct > 0 ? '+' : ''}{changePct.toFixed(1)}%
                      </span>
                      <span>sejak pembelian terakhir</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${isWarning ? 'bg-red-500 animate-ping' : 'bg-emerald-500'} block`} />
                      <span className="text-[9px] font-bold uppercase tracking-wider font-mono">
                        {isWarning ? 'ALERT AKTIF' : 'STABIL'}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* List of Investments */}
            <div className="space-y-3">
              {kubarInvestments.map((item, idx) => {
                const owned = investmentHoldings[item.id] || 0;
                const valueRp = owned * item.price;

                return (
                  <div key={item.id} className="p-4 rounded-[24px] bg-neutral-800 border border-neutral-700/15 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest block">{item.category}</span>
                        <h5 className="text-xs font-black text-white">{item.name}</h5>
                        <span className="text-[8px] text-gray-500 font-mono uppercase">{item.bursa}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-black text-white">Rp {item.price.toLocaleString('id-ID')}</span>
                        <span className={`text-[8px] font-mono font-bold block ${item.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                          {item.isPositive ? '+' : ''}{item.change}%
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 leading-relaxed font-sans">{item.description}</p>

                    {/* Interactive Historical Price Chart using Recharts */}
                    <div className="p-3 bg-neutral-900/40 rounded-2xl border border-neutral-700/10 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Tren Harga Investasi</span>
                        </span>
                        
                        {/* Period Selector Tabs */}
                        <div className="flex bg-neutral-850 p-0.5 rounded-lg border border-neutral-750 self-start">
                          {(['daily', 'weekly', 'monthly'] as const).map((mode) => {
                            const currentMode = chartViewMode[item.id] || 'daily';
                            return (
                              <button
                                key={mode}
                                type="button"
                                onClick={() => setChartViewMode(prev => ({ ...prev, [item.id]: mode }))}
                                className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                                  currentMode === mode
                                    ? 'bg-emerald-600 text-white shadow'
                                    : 'text-gray-400 hover:text-gray-200'
                                }`}
                              >
                                {mode === 'daily' ? 'Harian' : mode === 'weekly' ? 'Mingguan' : 'Bulanan'}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Info header for Profit/Loss / Candlestick info */}
                      {(() => {
                        const currentMode = chartViewMode[item.id] || 'daily';
                        if (currentMode === 'daily') {
                          return (
                            <div className="flex justify-between items-center text-[8px] text-gray-500 font-mono px-1">
                              <span>Tipe: Line Chart (Harga Live)</span>
                              <span className="text-emerald-500 bg-emerald-950/40 border border-emerald-900/30 px-1.5 py-0.5 rounded">LIVE 10-POINT TREND</span>
                            </div>
                          );
                        } else {
                          const candleData = getCandlestickData(item.id, item.price, currentMode === 'weekly' ? 'weekly' : 'monthly');
                          const totalGain = candleData[candleData.length - 1].close - candleData[0].open;
                          const totalGainPct = (totalGain / candleData[0].open) * 100;
                          return (
                            <div className="flex justify-between items-center text-[8px] font-mono px-1">
                              <span className="text-gray-500">Tipe: Candlestick (P&L Trend)</span>
                              <span className={`px-1.5 py-0.5 rounded font-bold ${
                                totalGain >= 0 
                                  ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/30' 
                                  : 'text-red-400 bg-red-950/40 border border-red-900/30'
                              }`}>
                                Perubahan: {totalGain >= 0 ? '+' : ''}Rp {totalGain.toLocaleString('id-ID')} ({totalGain >= 0 ? '+' : ''}{totalGainPct.toFixed(1)}%)
                              </span>
                            </div>
                          );
                        }
                      })()}

                      <div className="w-full h-28 overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                          {(() => {
                            const currentMode = chartViewMode[item.id] || 'daily';
                            if (currentMode === 'daily') {
                              return (
                                <LineChart data={investmentHistory[item.id] || []}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                                  <XAxis 
                                    dataKey="time" 
                                    stroke="#525252" 
                                    fontSize={8} 
                                    tickLine={false} 
                                    axisLine={false}
                                  />
                                  <YAxis 
                                    domain={['auto', 'auto']} 
                                    stroke="#525252" 
                                    fontSize={8} 
                                    tickLine={false} 
                                    axisLine={false}
                                    tickFormatter={(value) => `Rp ${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                                  />
                                  <Tooltip 
                                    contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', borderRadius: '12px' }}
                                    labelClassName="text-white text-[10px] font-bold"
                                    itemStyle={{ color: item.isPositive ? '#34d399' : '#f87171', fontSize: '10px', fontWeight: 'bold' }}
                                    formatter={(value: any) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Harga']}
                                  />
                                  <Line 
                                    type="monotone" 
                                    dataKey="price" 
                                    stroke={item.isPositive ? '#10b981' : '#f43f5e'} 
                                    strokeWidth={2} 
                                    dot={{ r: 2, strokeWidth: 1 }} 
                                    activeDot={{ r: 4 }}
                                  />
                                </LineChart>
                              );
                            } else {
                              const candleData = getCandlestickData(item.id, item.price, currentMode === 'weekly' ? 'weekly' : 'monthly');
                              return (
                                <ComposedChart data={candleData} barGap="-100%">
                                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                                  <XAxis 
                                    dataKey="name" 
                                    stroke="#525252" 
                                    fontSize={8} 
                                    tickLine={false} 
                                    axisLine={false}
                                  />
                                  <YAxis 
                                    domain={['auto', 'auto']} 
                                    stroke="#525252" 
                                    fontSize={8} 
                                    tickLine={false} 
                                    axisLine={false}
                                    tickFormatter={(value) => `Rp ${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                                  />
                                  <Tooltip 
                                    content={({ active, payload }) => {
                                      if (active && payload && payload.length) {
                                        const d = payload[0].payload;
                                        return (
                                          <div className="bg-neutral-900 border border-neutral-700/60 p-2.5 rounded-xl text-[9px] font-mono space-y-1 text-gray-300 shadow-xl">
                                            <p className="font-bold text-white mb-1 text-center font-sans border-b border-neutral-800 pb-1">{d.name}</p>
                                            <div className="flex justify-between gap-4"><span>Buka (Open):</span><span className="text-white font-bold">Rp {d.open.toLocaleString('id-ID')}</span></div>
                                            <div className="flex justify-between gap-4"><span>Tutup (Close):</span><span className="text-white font-bold">Rp {d.close.toLocaleString('id-ID')}</span></div>
                                            <div className="flex justify-between gap-4"><span>Tertinggi (High):</span><span className="text-emerald-400 font-bold">Rp {d.high.toLocaleString('id-ID')}</span></div>
                                            <div className="flex justify-between gap-4"><span>Terendah (Low):</span><span className="text-red-400 font-bold">Rp {d.low.toLocaleString('id-ID')}</span></div>
                                            <div className="flex justify-between gap-4 border-t border-neutral-800 pt-1">
                                              <span>P&L:</span>
                                              <span className={`font-bold ${d.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {d.isUp ? '▲ +' : '▼ '}Rp {d.profit.toLocaleString('id-ID')} ({d.isUp ? '+' : ''}{d.percent.toFixed(1)}%)
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      }
                                      return null;
                                    }}
                                  />
                                  
                                  {/* Candle Wick (Low to High Range) */}
                                  <Bar dataKey="lowHigh" barSize={1.5} animationDuration={400}>
                                    {candleData.map((entry, index) => (
                                      <Cell 
                                        key={`wick-${index}`} 
                                        fill={entry.isUp ? '#34d399' : '#f87171'} 
                                        opacity={0.7}
                                      />
                                    ))}
                                  </Bar>

                                  {/* Candle Body (Open to Close Range) */}
                                  <Bar dataKey="openClose" barSize={10} radius={1} animationDuration={500}>
                                    {candleData.map((entry, index) => (
                                      <Cell 
                                        key={`body-${index}`} 
                                        fill={entry.isUp ? '#10b981' : '#f43f5e'} 
                                      />
                                    ))}
                                  </Bar>
                                </ComposedChart>
                              );
                            }
                          })()}
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Market Cap and Supply Row */}
                    <div className="grid grid-cols-2 gap-2 py-2 px-2.5 bg-neutral-900/40 rounded-xl border border-neutral-700/10 text-[9px] font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 uppercase tracking-wider text-[8px]">Market Cap</span>
                        <span className="text-amber-400 font-bold">Rp {item.marketCap ? item.marketCap.toLocaleString('id-ID') : (item.price * item.unitsOutstanding).toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between items-center pl-2 border-l border-neutral-700/30">
                        <span className="text-gray-500 uppercase tracking-wider text-[8px]">Sirkulasi</span>
                        <span className="text-gray-300 font-bold">{item.unitsOutstanding?.toLocaleString('id-ID')} Unit</span>
                      </div>
                    </div>

                    {/* Holdings and Valuation */}
                    <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-700/10 flex justify-between items-center text-[10px]">
                      <div>
                        <span className="text-gray-500 uppercase tracking-wider block text-[8px]">Kepemilikan</span>
                        <strong className="text-white font-mono">{owned} Unit</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500 uppercase tracking-wider block text-[8px]">Estimasi Nilai</span>
                        <strong className="text-emerald-400 font-mono">Rp {valueRp.toLocaleString('id-ID')}</strong>
                      </div>
                    </div>

                    {/* Trade Trigger Button */}
                    <button
                      onClick={() => {
                        setSelectedTradeIndex(idx);
                        setTradeQty('10');
                        setTradeMode('buy');
                      }}
                      className="w-full py-2 bg-neutral-900 hover:bg-neutral-950 text-[10px] font-black uppercase text-gray-200 hover:text-emerald-400 rounded-xl border border-neutral-700/30 flex items-center justify-center space-x-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Buka Menu Transaksi (Trade)</span>
                    </button>

                    {/* Nested Expandable Trade Box */}
                    {selectedTradeIndex === idx && (
                      <div className="mt-3 p-4 rounded-xl bg-neutral-900 border border-emerald-900/30 space-y-4 animate-slide-up">
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                          <span className="text-[9px] font-black uppercase text-gray-400">Order Tiket Bursa</span>
                          <div className="flex space-x-1">
                            <button
                              type="button"
                              onClick={() => setTradeMode('buy')}
                              className={`px-3 py-1 rounded text-[8px] font-black uppercase tracking-wider ${
                                tradeMode === 'buy' ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-gray-400'
                              }`}
                            >
                              Beli
                            </button>
                            <button
                              type="button"
                              onClick={() => setTradeMode('sell')}
                              className={`px-3 py-1 rounded text-[8px] font-black uppercase tracking-wider ${
                                tradeMode === 'sell' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-gray-400'
                              }`}
                            >
                              Jual
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[8px] font-black uppercase text-gray-500 block mb-1">Jumlah Unit</label>
                            <input
                              type="number"
                              min="1"
                              value={tradeQty}
                              onChange={(e) => setTradeQty(e.target.value)}
                              className="w-full bg-neutral-800 p-2 rounded-lg border border-neutral-700 text-xs text-white font-mono text-center"
                              required
                            />
                          </div>
                          <div>
                            <span className="text-[8px] font-black uppercase text-gray-500 block mb-1">Estimasi Total</span>
                            <div className="text-xs font-mono font-black text-white pt-1">
                              Rp {(Number(tradeQty) * item.price).toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleTradeSubmit(item)}
                          className={`w-full py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-md text-white ${
                            tradeMode === 'buy' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'
                          }`}
                        >
                          Eksekusi {tradeMode === 'buy' ? 'Pembelian' : 'Penjualan'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const ProfileView = () => {
    const [followerSearch, setFollowerSearch] = useState('');
    const [friendSearch, setFriendSearch] = useState('');

    const filteredFollowers = profileFollowers.filter(f => 
      f.name.toLowerCase().includes(followerSearch.toLowerCase()) || 
      f.username.toLowerCase().includes(followerSearch.toLowerCase())
    );

    const filteredFriends = profileFriends.filter(f => 
      f.name.toLowerCase().includes(friendSearch.toLowerCase()) || 
      f.username.toLowerCase().includes(friendSearch.toLowerCase())
    );

    return (
      <div className="animate-slide-up text-center pb-24">
        {/* Profile Avatar & Details Header */}
        <div className="relative inline-block mb-6">
          <div className="w-28 h-28 rounded-full bg-neutral-800 neu-flat p-1 mx-auto">
            <img src={profilePhoto} className="rounded-full w-full h-full object-cover" alt="" />
          </div>
          <button className="absolute bottom-1 right-1 p-2 bg-blue-600 rounded-full border-4 border-neutral-900 shadow-xl cursor-pointer" onClick={() => setShowSettingsModal(true)}>
            <Edit3 className="w-3 h-3 text-white" />
          </button>
        </div>
        <h2 className="text-2xl font-black mb-1 text-white">{profileName}</h2>
        <p className="text-gray-400 text-sm mb-6 flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 mr-1 text-blue-500 animate-pulse" /> {profileLocation}
        </p>
        
        {/* Follow & Message Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button 
            onClick={() => {
              setIsFollowing(!isFollowing);
              triggerPushNotification(
                isFollowing ? "👋 Batal Mengikuti" : "✨ Mulai Mengikuti",
                isFollowing ? `Anda batal mengikuti ${profileName}.` : `Anda sekarang mengikuti ${profileName}.`,
                "success"
              );
            }}
            className={`px-8 py-2.5 rounded-full font-black text-sm transition-all active:scale-95 cursor-pointer ${
              isFollowing 
                ? 'border-2 border-neutral-700 text-gray-400 hover:text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/10'
            }`}
          >
            {isFollowing ? 'Mengikuti' : 'Ikuti'}
          </button>
          <button 
            className="p-2.5 rounded-full bg-neutral-800 border border-neutral-700/30 text-gray-300 hover:text-white hover:bg-neutral-750 transition-all active:scale-95 cursor-pointer" 
            onClick={() => setShowInboxModal(true)}
            title="Kirim Pesan"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Count Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8 bg-neutral-900/60 p-4 rounded-3xl border border-neutral-800/40">
          <button 
            onClick={() => setProfileActiveTab('posts')}
            className={`p-2 rounded-2xl transition-all cursor-pointer ${profileActiveTab === 'posts' ? 'bg-neutral-800 border border-neutral-700/20 text-white' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <p className="text-xl font-black font-mono text-blue-500">{profilePosts.length}</p>
            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-0.5">Postingan</p>
          </button>
          <button 
            onClick={() => setProfileActiveTab('followers')}
            className={`p-2 rounded-2xl transition-all cursor-pointer ${profileActiveTab === 'followers' ? 'bg-neutral-800 border border-neutral-700/20 text-white' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <p className="text-xl font-black font-mono text-emerald-400">{profileFollowers.length}</p>
            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-0.5">Pengikut</p>
          </button>
          <button 
            onClick={() => setProfileActiveTab('friends')}
            className={`p-2 rounded-2xl transition-all cursor-pointer ${profileActiveTab === 'friends' ? 'bg-neutral-800 border border-neutral-700/20 text-white' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <p className="text-xl font-black font-mono text-amber-500">{profileFriends.length}</p>
            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-0.5">Teman</p>
          </button>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800 mb-6 space-x-1">
          {[
            { id: 'posts', label: 'Galeri', icon: ImageIcon },
            { id: 'portfolio', label: 'Karya', icon: Briefcase },
            { id: 'bookings', label: 'Tiket', icon: Ticket },
            { id: 'followers', label: 'Pengikut', icon: User },
            { id: 'friends', label: 'Teman', icon: UserCheck }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = profileActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setProfileActiveTab(tab.id as any)}
                className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="space-y-6 text-left">
          {/* ================= POST TAB ================= */}
          {profileActiveTab === 'posts' && (
            <div className="space-y-4 animate-slide-up">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Galeri Foto & Petualangan</h3>
                <button 
                  onClick={() => setShowAddPostModal(true)}
                  className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-[10px] font-black uppercase text-white tracking-wider flex items-center space-x-1 transition-all active:scale-95 cursor-pointer"
                >
                  <span>+ Post Baru</span>
                </button>
              </div>

              {profilePosts.length === 0 ? (
                <div className="p-8 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800/40">
                  <ImageIcon className="w-10 h-10 text-neutral-700 mx-auto mb-3 animate-pulse" />
                  <p className="text-xs text-gray-400">Belum ada postingan foto. Buat postingan pertamamu!</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {profilePosts.map(post => (
                    <div 
                      key={post.id}
                      onClick={() => setSelectedPostDetail(post)}
                      className="relative aspect-square rounded-2xl bg-neutral-950 overflow-hidden border border-neutral-800/40 cursor-pointer group"
                    >
                      <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={post.title} />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 text-white z-10">
                        <span className="flex items-center text-xs font-black"><Heart className="w-4 h-4 mr-1 text-red-500 fill-current" /> {post.likes}</span>
                        <span className="flex items-center text-xs font-black"><MessageCircle className="w-4 h-4 mr-1 text-blue-400" /> {post.comments}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= PORTFOLIO TAB ================= */}
          {profileActiveTab === 'portfolio' && (
            <div className="space-y-4 animate-slide-up">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Portofolio & Kontribusi Budaya</h3>
                <button 
                  onClick={() => setShowAddPortfolioModal(true)}
                  className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-[10px] font-black uppercase text-white tracking-wider flex items-center space-x-1 transition-all active:scale-95 cursor-pointer"
                >
                  <span>+ Portofolio Baru</span>
                </button>
              </div>

              {profilePortfolio.length === 0 ? (
                <div className="p-8 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800/40">
                  <Briefcase className="w-10 h-10 text-neutral-700 mx-auto mb-3 animate-pulse" />
                  <p className="text-xs text-gray-400">Belum ada portofolio kontribusi budaya. Tambahkan karya barumu!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {profilePortfolio.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedPortfolioDetail(item)}
                      className="p-4 rounded-3xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700/20 flex items-start space-x-4 cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      <img src={item.image} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl flex-shrink-0 border border-neutral-700/20" alt="" />
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-900/20">{item.category}</span>
                          <span className="text-[9px] font-black text-gray-500 font-mono">{item.year}</span>
                        </div>
                        <h4 className="text-xs font-black text-white truncate">{item.title}</h4>
                        <p className="text-[10px] text-gray-400 line-clamp-2">{item.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.badges.slice(0, 2).map((b, idx) => (
                            <span key={idx} className="text-[8px] font-bold text-gray-500 bg-neutral-900 px-1.5 py-0.5 rounded-md">#{b}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= BOOKINGS / TICKETS TAB ================= */}
          {profileActiveTab === 'bookings' && (
            <div className="space-y-4 animate-slide-up">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Tiket Perjalanan & Booking</h3>
                <span className="text-[9px] font-black font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-900/20">
                  {kubarBookings.length} Tiket Aktif
                </span>
              </div>

              {kubarBookings.length === 0 ? (
                <div className="p-10 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800/40">
                  <Ticket className="w-10 h-10 text-neutral-700 mx-auto mb-3 animate-bounce" />
                  <p className="text-xs text-gray-400">Belum ada pemesanan tiket aktif.</p>
                  <button 
                    onClick={() => {
                      setCurrentPage('explore');
                      setExploreSubTab('destinations');
                    }}
                    className="mt-3.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-[10px] font-black uppercase text-white tracking-widest transition-all active:scale-95 cursor-pointer"
                  >
                    Jelajahi Destinasi Wisata
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {kubarBookings.map((b) => {
                    const destObj = KUBAR_DESTINATIONS.find(d => d.name === b.destName);
                    const imageSrc = destObj ? destObj.image : "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80";
                    const locationName = destObj ? destObj.location : "Kutai Barat";

                    return (
                      <div 
                        key={b.id}
                        className="p-4 rounded-[24px] bg-neutral-900 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-neutral-700/50"
                      >
                        <div className="flex items-center space-x-3.5">
                          <img src={imageSrc} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl flex-shrink-0" alt="" />
                          <div className="space-y-1.5">
                            <div className="flex items-center space-x-2">
                              <span className="text-[8px] font-mono font-black bg-emerald-950 text-emerald-400 border border-emerald-900/20 px-2 py-0.5 rounded-md">
                                LUNAS
                              </span>
                              <span className="text-[9px] font-mono text-gray-500">
                                ID: #EUN-{b.id}
                              </span>
                            </div>
                            <h4 className="text-xs font-black text-white mt-1">{b.destName}</h4>
                            <p className="text-[10px] text-gray-500 font-medium font-mono">{locationName}</p>
                            
                            <div className="flex items-center space-x-3 pt-1 text-[9px] text-gray-400">
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1 text-emerald-400" /> {b.date}
                              </span>
                              <span className="flex items-center">
                                <User className="w-3 h-3 mr-1 text-blue-400" /> {b.qty} Orang
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t border-neutral-850 sm:border-t-0">
                          <div className="text-left sm:text-right font-mono">
                            <p className="text-[8px] text-gray-500 uppercase">Total Dibayar</p>
                            <p className="text-xs font-black text-emerald-400">Rp {b.totalPrice.toLocaleString('id-ID')}</p>
                          </div>

                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleExportTicketPDF(b)}
                              title="Unduh E-Tiket PDF"
                              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white transition-all cursor-pointer border border-neutral-750"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                triggerPushNotification(
                                  "📞 Kontak Pemandu",
                                  "Pemandu Adat (Bapak Yohanes) akan mengirimkan instruksi detail trip Anda via WhatsApp ke " + b.contact + " dalam waktu 1 jam.",
                                  "success"
                                );
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                            >
                              Pemandu Wisata
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================= FOLLOWERS TAB ================= */}
          {profileActiveTab === 'followers' && (
            <div className="space-y-4 animate-slide-up">
              <div className="relative p-1.5 rounded-full bg-neutral-900 flex items-center border border-neutral-800">
                <Search className="w-4 h-4 text-gray-500 ml-3 mr-2" />
                <input 
                  type="text" 
                  value={followerSearch}
                  onChange={(e) => setFollowerSearch(e.target.value)}
                  placeholder="Cari pengikut..." 
                  className="bg-transparent w-full focus:outline-none text-xs py-1 text-gray-200 placeholder-gray-600" 
                />
              </div>

              {filteredFollowers.length === 0 ? (
                <div className="p-8 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800/40">
                  <User className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
                  <p className="text-xs text-gray-400">Tidak ada pengikut yang cocok.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredFollowers.map(f => (
                    <div key={f.id} className="p-3 rounded-2xl bg-neutral-800/60 border border-neutral-700/10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={f.avatar} className="w-10 h-10 rounded-full object-cover border border-neutral-800" alt="" />
                        <div>
                          <p className="text-xs font-black text-white leading-tight">{f.name}</p>
                          <p className="text-[9px] text-gray-500 font-bold font-mono mt-0.5">{f.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => {
                            setProfileFollowers(prev => prev.map(item => item.id === f.id ? { ...item, isFollowingBack: !item.isFollowingBack } : item));
                            triggerPushNotification(
                              f.isFollowingBack ? "🗑️ Batal Ikuti" : "🤝 Mengikuti Balik",
                              f.isFollowingBack ? `Anda batal mengikuti ${f.name}.` : `Anda sekarang mengikuti balik ${f.name}.`,
                              "success"
                            );
                          }}
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                            f.isFollowingBack 
                              ? 'bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white' 
                              : 'bg-blue-600 text-white hover:bg-blue-500 active:scale-95 shadow-md'
                          }`}
                        >
                          {f.isFollowingBack ? 'Mengikuti' : 'Ikuti Balik'}
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus ${f.name} dari pengikut Anda?`)) {
                              setProfileFollowers(prev => prev.filter(item => item.id !== f.id));
                              triggerPushNotification("🗑️ Pengikut Dihapus", `${f.name} telah dihapus dari daftar pengikut Anda.`, "error");
                            }
                          }}
                          className="p-1.5 rounded-full bg-neutral-900 hover:bg-red-950/20 text-gray-500 hover:text-red-400 transition-all cursor-pointer"
                          title="Hapus Pengikut"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= FRIENDS TAB ================= */}
          {profileActiveTab === 'friends' && (
            <div className="space-y-4 animate-slide-up">
              <div className="relative p-1.5 rounded-full bg-neutral-900 flex items-center border border-neutral-800">
                <Search className="w-4 h-4 text-gray-500 ml-3 mr-2" />
                <input 
                  type="text" 
                  value={friendSearch}
                  onChange={(e) => setFriendSearch(e.target.value)}
                  placeholder="Cari teman..." 
                  className="bg-transparent w-full focus:outline-none text-xs py-1 text-gray-200 placeholder-gray-600" 
                />
              </div>

              {filteredFriends.length === 0 ? (
                <div className="p-8 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800/40">
                  <UserCheck className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
                  <p className="text-xs text-gray-400">Tidak ada teman yang cocok.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredFriends.map(f => (
                    <div key={f.id} className="p-3 rounded-2xl bg-neutral-800/60 border border-neutral-700/10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img src={f.avatar} className="w-10 h-10 rounded-full object-cover border border-neutral-800" alt="" />
                          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-neutral-900 ${f.status === 'online' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-white leading-tight">{f.name}</p>
                          <div className="flex items-center space-x-1.5 mt-0.5">
                            <span className="text-[9px] text-gray-500 font-bold font-mono">{f.username}</span>
                            <span className="text-[8px] text-gray-600 font-semibold">• {f.status === 'online' ? 'Aktif' : `${f.lastActive}`}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => {
                            setShowInboxModal(true);
                          }}
                          className="px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-500 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center space-x-1 transition-all active:scale-95 shadow-md cursor-pointer"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Pesan</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus ${f.name} dari pertemanan Anda?`)) {
                              setProfileFriends(prev => prev.filter(item => item.id !== f.id));
                              triggerPushNotification("🗑️ Teman Dihapus", `${f.name} tidak lagi berteman dengan Anda.`, "error");
                            }
                          }}
                          className="p-1.5 rounded-full bg-neutral-900 hover:bg-red-950/20 text-gray-500 hover:text-red-400 transition-all cursor-pointer"
                          title="Hapus Teman"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= UTILITY MENUS DRAWER ================= */}
          <div className="pt-6 border-t border-neutral-800">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-3.5">Aplikasi & Menu Pintar</h3>
            <div className="grid grid-cols-1 gap-3.5">
              {/* Chat Button */}
              <button 
                onClick={() => setShowInboxModal(true)}
                className="p-4 rounded-2xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/20 flex items-center space-x-3.5 transition-all hover:scale-[1.01] text-left active:scale-95 shadow-md cursor-pointer"
              >
                <div className="p-2.5 bg-blue-950/40 border border-blue-800/30 text-blue-400 rounded-xl">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-white">Hubungi Penjual & Live Chat</p>
                  <p className="text-[9px] text-gray-400 font-medium">Buka kotak pesan interaktif dengan pengrajin lokal</p>
                </div>
              </button>

              {/* Music Button */}
              <button 
                onClick={() => setShowMusicPlayerModal(true)}
                className={`p-4 rounded-2xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/20 flex items-center space-x-3.5 transition-all hover:scale-[1.01] text-left active:scale-95 shadow-md relative overflow-hidden cursor-pointer`}
              >
                {musicPlaying && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
                <div className={`p-2.5 rounded-xl border transition-all ${musicPlaying ? 'bg-emerald-950/40 border-emerald-800/30 text-emerald-400 animate-pulse' : 'bg-amber-950/40 border-amber-800/30 text-amber-400'}`}>
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-white font-sans">Pemutar Sape' Tradisional</p>
                  <p className="text-[9px] text-gray-400 font-medium">{musicPlaying ? 'Sedang Memutar Melodi Adat...' : 'Putar instrumen tradisional Dayak Kalimantan'}</p>
                </div>
              </button>

              {/* Settings Button */}
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="p-4 rounded-2xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/20 flex items-center space-x-3.5 transition-all hover:scale-[1.01] text-left active:scale-95 shadow-md cursor-pointer"
              >
                <div className="p-2.5 bg-neutral-900 text-gray-400 rounded-xl border border-neutral-800">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-white font-sans">Pengaturan Aplikasi</p>
                  <p className="text-[9px] text-gray-400 font-medium">Ubah nama profil, kelola notifikasi & keamanan dompet</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotificationsView = () => (
    <div className="animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black">Alerts</h2>
        <button className="text-xs font-bold text-blue-500 uppercase tracking-tighter" onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}>Mark all read</button>
      </div>
      <div className="space-y-4 pb-24">
        {notifications.map(n => (
          <div key={n.id} className={`p-4 rounded-3xl flex items-center space-x-4 transition-all ${n.read ? 'bg-neutral-800/40 opacity-60' : 'bg-neutral-800 neu-flat border-l-4 border-blue-500'}`}>
            <div className={`p-3 rounded-2xl ${n.type === 'like' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
              {n.type === 'like' ? <Heart className="w-5 h-5 fill-current" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-200"><span className="font-bold text-white">{n.user}</span> {n.content}</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">{n.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AdminView = () => (
    <div className="animate-slide-up">
      <PageHeader title="Admin" />
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Active Users', val: '12.4k', color: 'text-green-500' },
          { label: 'Daily Posts', val: '840', color: 'text-blue-500' },
          { label: 'Reports', val: '14', color: 'text-red-500' },
          { label: 'Server Load', val: '24%', color: 'text-emerald-500' }
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-3xl bg-neutral-800 neu-flat">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{stat.label}</p>
            <h3 className={`text-xl font-black ${stat.color}`}>{stat.val}</h3>
          </div>
        ))}
      </div>
      <h4 className="text-lg font-bold mb-4">Moderation Queue</h4>
      <div className="space-y-3">
        {[
          { name: "User_88", reason: "Spam Link" },
          { name: "AlphaBot", reason: "AI Generated" }
        ].map((m, i) => (
          <div key={i} className="p-4 rounded-2xl bg-neutral-800 flex justify-between items-center neu-flat">
            <div>
              <p className="text-sm font-bold">{m.name}</p>
              <p className="text-[10px] text-red-400 font-bold italic">{m.reason}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-xl bg-neutral-700 hover:text-red-500 neu-button transition-colors"><Slash className="w-4 h-4" /></button>
              <button className="p-2 rounded-xl bg-neutral-700 hover:text-green-500 neu-button transition-colors"><Check className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsView = () => {
    // Local copy state for editing profile
    const [localName, setLocalName] = useState(profileName);
    const [localLocation, setLocalLocation] = useState(profileLocation);
    const [localPhoto, setLocalPhoto] = useState(profilePhoto);

    const handleSaveAll = (e: React.FormEvent) => {
      e.preventDefault();
      setProfileName(localName);
      setProfileLocation(localLocation);
      setProfilePhoto(localPhoto);
      localStorage.setItem('profile_name', localName);
      localStorage.setItem('profile_location', localLocation);
      localStorage.setItem('profile_photo', localPhoto);
      
      triggerPushNotification(
        "⚙️ Pengaturan Disimpan",
        "Semua preferensi dan informasi profil Anda berhasil disimpan secara lokal.",
        "success"
      );
    };

    return (
      <div className="animate-slide-up pb-24 text-left">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black tracking-tight">Pengaturan</h2>
          <button 
            onClick={() => setCurrentPage('profile')} 
            className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-xl uppercase hover:bg-blue-500/20 transition-all active:scale-95"
          >
            Kembali ke Profil
          </button>
        </div>

        <div className="space-y-6">
          {/* THEME SWITCHER (LIGHT & DARK) */}
          <div className="p-5 rounded-3xl bg-neutral-800 border border-neutral-700/20 shadow-sm neu-flat">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-4 font-mono">Tampilan Aplikasi</h3>
            
            <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-neutral-900 border border-neutral-800 text-amber-500 rounded-xl flex items-center justify-center">
                  {theme === 'light' ? <Sun className="w-5 h-5 text-amber-500 animate-pulse" /> : <Moon className="w-5 h-5 text-indigo-400" />}
                </div>
                <div>
                  <p className="text-xs font-black text-white">Mode Tema</p>
                  <p className="text-[10px] text-gray-400">{theme === 'light' ? 'Mode Terang (Light Mode) Aktif' : 'Mode Gelap (Dark Mode) Aktif'}</p>
                </div>
              </div>

              {/* Switch Buttons */}
              <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setTheme('light');
                    triggerPushNotification("☀️ Mode Terang", "Aplikasi dialihkan ke tampilan terang.", "success");
                  }}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${theme === 'light' ? 'bg-amber-500 text-neutral-900 font-extrabold shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  Terang
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTheme('dark');
                    triggerPushNotification("🌙 Mode Gelap", "Aplikasi dialihkan ke tampilan gelap.", "success");
                  }}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${theme === 'dark' ? 'bg-blue-600 text-white font-extrabold shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  Gelap
                </button>
              </div>
            </div>
          </div>

          {/* PROFILE SETTINGS */}
          <form onSubmit={handleSaveAll} className="p-5 rounded-3xl bg-neutral-800 border border-neutral-700/20 shadow-sm neu-flat space-y-4">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider font-mono">Profil Pengguna</h3>
            
            {/* Avatar Selector */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 block uppercase font-mono">Pilih Foto Profil</label>
              <div className="flex items-center space-x-3 bg-neutral-950 p-3 rounded-2xl border border-neutral-800/80">
                <img src={localPhoto} className="w-12 h-12 rounded-full object-cover border border-neutral-700 p-0.5" alt="Preview" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-white truncate">Pratinjau Foto</p>
                  <p className="text-[10px] text-gray-500">Gunakan foto adat kustom di bawah</p>
                </div>
              </div>

              {/* Presets */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {[
                  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', label: 'Dayak' },
                  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', label: 'Sape' },
                  { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', label: 'Rimba' },
                  { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', label: 'Kenyah' },
                  { url: 'https://placehold.co/200?text=EDO', label: 'Edo' }
                ].map((avatar, aIdx) => (
                  <button
                    key={aIdx}
                    type="button"
                    onClick={() => setLocalPhoto(avatar.url)}
                    className={`relative rounded-full aspect-square overflow-hidden border-2 p-0.5 transition-all ${
                      localPhoto === avatar.url ? 'border-blue-500 scale-105' : 'border-neutral-800 hover:border-neutral-750'
                    }`}
                    title={avatar.label}
                  >
                    <img src={avatar.url} className="w-full h-full rounded-full object-cover" alt={avatar.label} />
                    {localPhoto === avatar.url && (
                      <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Upload Custom */}
              <div className="pt-2">
                <div className="relative border border-dashed border-neutral-700 rounded-xl p-3 bg-neutral-950/50 text-center hover:bg-neutral-950 transition-all cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') {
                            setLocalPhoto(reader.result);
                            triggerPushNotification("📸 Foto Profil Dimuat", "Berkas foto berhasil diunggah.", "success");
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <p className="text-[10px] font-black text-gray-400">Pilih Berkas Foto Kustom</p>
                  <p className="text-[8px] text-gray-500">Seret berkas atau klik untuk memuat foto baru</p>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase font-mono">Nama Pengguna</label>
                <input 
                  type="text"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="Nama lengkap..."
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase font-mono">Lokasi Wilayah</label>
                <input 
                  type="text"
                  value={localLocation}
                  onChange={(e) => setLocalLocation(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="Lokasi wilayah..."
                  required
                />
              </div>
            </div>

            {/* Action Buttons for Form */}
            <div className="flex space-x-3 pt-4 border-t border-neutral-850">
              <button
                type="button"
                onClick={() => {
                  setLocalName(profileName);
                  setLocalLocation(profileLocation);
                  setLocalPhoto(profilePhoto);
                }}
                className="flex-1 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-850 text-xs text-gray-400 font-black uppercase tracking-wider transition-all active:scale-95 text-center shadow-md border border-neutral-800"
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 text-xs text-white font-black uppercase tracking-wider transition-all active:scale-95 text-center shadow-lg"
              >
                Simpan Profil
              </button>
            </div>
          </form>

          {/* SYSTEM PREFERENCES */}
          <div className="p-5 rounded-3xl bg-neutral-800 border border-neutral-700/20 shadow-sm neu-flat space-y-4">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider font-mono">Preferensi Sistem</h3>
            
            <div className="space-y-3">
              {/* Language */}
              <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
                <div className="flex items-center space-x-2.5">
                  <Compass className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-[10px] font-black text-white">Bahasa Aplikasi</p>
                    <p className="text-[8px] text-gray-500">Ubah bahasa antarmuka sistem</p>
                  </div>
                </div>
                <select
                  value={settingsLanguage}
                  onChange={(e) => {
                    setSettingsLanguage(e.target.value as any);
                    triggerPushNotification("🌐 Bahasa Diubah", `Aplikasi dialihkan ke Bahasa ${e.target.value === 'ID' ? 'Indonesia' : 'Inggris'}.`, "success");
                  }}
                  className="bg-neutral-900 border border-neutral-800 text-[10px] text-white p-1 rounded-lg focus:outline-none focus:border-blue-500 uppercase font-bold"
                >
                  <option value="ID">ID (Indonesia)</option>
                  <option value="EN">EN (English)</option>
                </select>
              </div>

              {/* Sape Background Audio */}
              <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
                <div className="flex items-center space-x-2.5">
                  <Volume2 className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="text-[10px] font-black text-white">Suara Musik Sape'</p>
                    <p className="text-[8px] text-gray-500">Mute / unmute audio latar adat</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsMusicMuted(!isMusicMuted)}
                  className={`px-3 py-1.5 text-[8px] font-black uppercase tracking-wider rounded-lg transition-all ${!isMusicMuted ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50' : 'bg-red-900/30 text-red-400 border border-red-900/50'}`}
                >
                  {!isMusicMuted ? "Mute Off" : "Mute On"}
                </button>
              </div>

              {/* Haptic vibration */}
              <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
                <div className="flex items-center space-x-2.5">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-[10px] font-black text-white">Vibrasi Umpan Balik</p>
                    <p className="text-[8px] text-gray-500">Gunakan getaran simulasi hibrid</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setSettingsHaptic(!settingsHaptic);
                    triggerPushNotification("⚙️ Haptic Diperbarui", `Umpan balik sentuhan sekarang ${!settingsHaptic ? 'Aktif' : 'Non-aktif'}.`, "success");
                  }}
                  className={`px-3 py-1.5 text-[8px] font-black uppercase tracking-wider rounded-lg transition-all ${settingsHaptic ? 'bg-blue-900/30 text-blue-400 border border-blue-900/50' : 'bg-neutral-800 text-gray-400 border border-neutral-700/50'}`}
                >
                  {settingsHaptic ? "Aktif" : "Mati"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AuthView = () => {
    // Register states
    const [regName, setRegName] = useState('');
    const [regLocation, setRegLocation] = useState('Barong Tongkok, Kutai Barat');
    const [regPhoto, setRegPhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
    const [customPhotoUrl, setCustomPhotoUrl] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeContribute, setAgreeContribute] = useState(false);
    const [infoTab, setInfoTab] = useState<'tentang' | 'fitur' | 'privasi'>('tentang');

    // Login states
    const [loginName, setLoginName] = useState('');
    const [savedAccounts, setSavedAccounts] = useState<any[]>(() => {
      try {
        const saved = localStorage.getItem('eunoia_saved_accounts');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    });

    const handleRegisterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!regName.trim()) {
        window.alert("Harap masukkan nama lengkap Anda!");
        return;
      }
      if (!agreeTerms) {
        window.alert("Harap setujui kebijakan privasi dan ketentuan komunitas Eunoiaverse!");
        return;
      }

      const finalPhoto = customPhotoUrl.trim() || regPhoto;
      
      // Save to local storage
      localStorage.setItem('profile_name', regName);
      localStorage.setItem('profile_location', regLocation);
      localStorage.setItem('profile_photo', finalPhoto);
      localStorage.setItem('is_registered', 'true');
      
      // Save default balance
      const initialBalance = 18682500;
      localStorage.setItem('kubar_wallet_balance', initialBalance.toString());

      // Save to device history of accounts
      try {
        const updatedAccounts = [
          { name: regName, location: regLocation, avatar: finalPhoto, balance: initialBalance },
          ...savedAccounts.filter((acc: any) => acc.name.toLowerCase() !== regName.toLowerCase())
        ];
        localStorage.setItem('eunoia_saved_accounts', JSON.stringify(updatedAccounts));
        setSavedAccounts(updatedAccounts);
      } catch (err) {}

      // Update state
      setProfileName(regName);
      setProfileLocation(regLocation);
      setProfilePhoto(finalPhoto);
      setBalance(initialBalance);
      setIsRegistered(true);

      triggerPushNotification(
        "✨ Pendaftaran Berhasil",
        `Selamat datang di Eunoiaverse, ${regName}! Mari lestarikan kebudayaan Kutai Barat bersama-sama.`,
        "success"
      );
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedName = loginName.trim();
      if (!trimmedName) {
        window.alert("Harap masukkan nama lengkap Anda untuk masuk!");
        return;
      }

      // Check if this account is in saved accounts
      const matchedAccount = savedAccounts.find(
        (acc: any) => acc.name.toLowerCase() === trimmedName.toLowerCase()
      );

      const finalName = matchedAccount ? matchedAccount.name : trimmedName;
      const finalLocation = matchedAccount ? matchedAccount.location : "Barong Tongkok, Kutai Barat";
      const finalPhoto = matchedAccount ? matchedAccount.avatar : "https://placehold.co/200?text=" + encodeURIComponent(trimmedName);
      const finalBalance = matchedAccount ? matchedAccount.balance : 18682500;

      // Save to current session
      localStorage.setItem('profile_name', finalName);
      localStorage.setItem('profile_location', finalLocation);
      localStorage.setItem('profile_photo', finalPhoto);
      localStorage.setItem('kubar_wallet_balance', finalBalance.toString());
      localStorage.setItem('is_registered', 'true');

      // Update history
      try {
        const updatedAccounts = [
          { name: finalName, location: finalLocation, avatar: finalPhoto, balance: finalBalance },
          ...savedAccounts.filter((acc: any) => acc.name.toLowerCase() !== finalName.toLowerCase())
        ];
        localStorage.setItem('eunoia_saved_accounts', JSON.stringify(updatedAccounts));
        setSavedAccounts(updatedAccounts);
      } catch (err) {}

      // Update state
      setProfileName(finalName);
      setProfileLocation(finalLocation);
      setProfilePhoto(finalPhoto);
      setBalance(finalBalance);
      setIsRegistered(true);

      triggerPushNotification(
        "✨ Masuk Berhasil",
        `Selamat datang kembali di Eunoiaverse, ${finalName}!`,
        "success"
      );
    };

    const handleSelectSavedAccount = (acc: any) => {
      localStorage.setItem('profile_name', acc.name);
      localStorage.setItem('profile_location', acc.location);
      localStorage.setItem('profile_photo', acc.avatar);
      localStorage.setItem('kubar_wallet_balance', (acc.balance || 18682500).toString());
      localStorage.setItem('is_registered', 'true');

      // Refresh list ordering to put this on top
      try {
        const updatedAccounts = [
          acc,
          ...savedAccounts.filter((a: any) => a.name !== acc.name)
        ];
        localStorage.setItem('eunoia_saved_accounts', JSON.stringify(updatedAccounts));
        setSavedAccounts(updatedAccounts);
      } catch (err) {}

      setProfileName(acc.name);
      setProfileLocation(acc.location);
      setProfilePhoto(acc.avatar);
      setBalance(acc.balance || 18682500);
      setIsRegistered(true);

      triggerPushNotification(
        "✨ Masuk Berhasil",
        `Selamat datang kembali di Eunoiaverse, ${acc.name}!`,
        "success"
      );
    };

    const handleDeleteSavedAccount = (e: React.MouseEvent, nameToDelete: string) => {
      e.stopPropagation(); // Don't log in
      if (window.confirm(`Hapus riwayat akun "${nameToDelete}" dari perangkat ini?`)) {
        try {
          const updated = savedAccounts.filter((acc: any) => acc.name !== nameToDelete);
          localStorage.setItem('eunoia_saved_accounts', JSON.stringify(updated));
          setSavedAccounts(updated);
          triggerPushNotification(
            "🗑️ Akun Dihapus",
            "Riwayat akun berhasil dibersihkan dari perangkat.",
            "info"
          );
        } catch (err) {}
      }
    };

    return (
      <div className="w-full max-w-md min-h-screen flex flex-col justify-between py-6 px-4 mx-auto animate-fade-in text-left">
        <div className="space-y-6">
          {/* Hero Header */}
          <div className="text-center space-y-2 pt-4">
            <div className="inline-flex p-3 rounded-3xl bg-blue-600/10 border border-blue-500/20 shadow-inner mb-2">
              <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
              EUNOIAVERSE
            </h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 font-mono">
              Tanaa Purai Ngeriman • Kutai Barat
            </p>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed mt-2">
              Platform jejaring sosial terintegrasi untuk eksplorasi wisata, pasar kerajinan khas, dan kemandirian finansial lokal Kutai Barat.
            </p>
          </div>

          {/* Switch Tab between Login and Register */}
          <div className="flex bg-neutral-900 border border-neutral-800 p-1.5 rounded-2xl shadow-md">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Masuk Akun
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Daftar Baru
            </button>
          </div>

          {/* Interactive App Info Tabs */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-neutral-800/80 pb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-300 flex items-center">
                <Info className="w-4 h-4 mr-1.5 text-blue-400" /> Informasi Aplikasi
              </span>
              <div className="flex space-x-1">
                {(['tentang', 'fitur', 'privasi'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setInfoTab(tab)}
                    className={`px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all ${
                      infoTab === tab 
                        ? 'bg-neutral-800 text-white' 
                        : 'text-gray-500 hover:text-gray-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content with animations */}
            {infoTab === 'tentang' && (
              <div className="space-y-2 text-xs text-gray-400 leading-relaxed animate-fade-in">
                <p>
                  <strong className="text-white">Eunoiaverse Kubar</strong> adalah gerbang digital interaktif yang dirancang khusus untuk mengangkat pariwisata adat dan kerajinan lokal Kutai Barat, Kalimantan Timur ke kancah global.
                </p>
                <p>
                  Aplikasi ini memadukan interaksi sosial komunitas dengan kemudahan transaksi pariwisata dan pelestarian seni tradisional lewat audio musik Sape' interaktif.
                </p>
              </div>
            )}

            {infoTab === 'fitur' && (
              <div className="grid grid-cols-2 gap-2.5 animate-fade-in text-xs text-gray-400">
                <div className="bg-neutral-950 p-2.5 rounded-2xl border border-neutral-800/50 space-y-1">
                  <span className="font-bold text-gray-200 flex items-center text-[10px]">
                    <Compass className="w-3.5 h-3.5 mr-1 text-blue-400" /> Sosial & Wisata
                  </span>
                  <p className="text-[10px] leading-snug">Bagikan cerita perjalanan, ikuti event adat, & peta rute.</p>
                </div>
                <div className="bg-neutral-950 p-2.5 rounded-2xl border border-neutral-800/50 space-y-1">
                  <span className="font-bold text-gray-200 flex items-center text-[10px]">
                    <ShoppingBag className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Pasar Kerajinan
                  </span>
                  <p className="text-[10px] leading-snug">Pesan anyaman Ulap Doyo, Mandau, manik secara langsung.</p>
                </div>
                <div className="bg-neutral-950 p-2.5 rounded-2xl border border-neutral-800/50 space-y-1">
                  <span className="font-bold text-gray-200 flex items-center text-[10px]">
                    <Wallet className="w-3.5 h-3.5 mr-1 text-indigo-400" /> Dompet Digital
                  </span>
                  <p className="text-[10px] leading-snug">Simulasikan kepemilikan aset batu belian & tukar komoditas.</p>
                </div>
                <div className="bg-neutral-950 p-2.5 rounded-2xl border border-neutral-800/50 space-y-1">
                  <span className="font-bold text-gray-200 flex items-center text-[10px]">
                    <Music className="w-3.5 h-3.5 mr-1 text-red-400" /> Melodi Sape'
                  </span>
                  <p className="text-[10px] leading-snug">Synthesizer audio instrumen Dayak interaktif bawaan.</p>
                </div>
              </div>
            )}

            {infoTab === 'privasi' && (
              <div className="space-y-2 text-xs text-gray-400 leading-relaxed animate-fade-in">
                <div className="flex items-start space-x-2 bg-blue-950/20 border border-blue-900/30 p-2.5 rounded-2xl">
                  <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed">
                    <strong className="text-white">Kedaulatan Data Lokal:</strong> Seluruh profil, foto, postingan, saldo dompet, serta portofolio karya Anda disimpan 100% secara lokal di perangkat Anda melalui media sandboxed browser (localStorage). Tidak ada data Anda yang dikirim ke server eksternal, menjamin privasi absolut.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Form and Content switcher depending on authMode */}
          {authMode === 'login' ? (
            <div className="space-y-6">
              {/* Saved accounts list */}
              {savedAccounts.length > 0 && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-3 shadow-xl">
                  <div className="border-b border-neutral-800/80 pb-2 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-300 flex items-center">
                      <UserCheck className="w-4 h-4 mr-1.5 text-blue-500" /> Masuk Instan Cepat
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono font-bold">{savedAccounts.length} Akun</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                    {savedAccounts.map((acc, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectSavedAccount(acc)}
                        className="flex items-center justify-between p-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800/60 border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group animate-fade-in"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-full object-cover border border-neutral-800" />
                          <div className="text-left">
                            <h4 className="text-xs font-black text-gray-100 group-hover:text-blue-400 transition-colors">{acc.name}</h4>
                            <p className="text-[10px] text-gray-400 flex items-center mt-0.5">
                              <MapPin className="w-3 h-3 mr-0.5 text-indigo-400 flex-shrink-0" /> {acc.location.split(',')[0]}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSavedAccount(e, acc.name)}
                          className="p-1.5 rounded-xl bg-neutral-900/80 hover:bg-red-950/40 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Hapus akun dari perangkat ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Login form for username input */}
              <form onSubmit={handleLoginSubmit} className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-6 space-y-4 shadow-xl">
                <div className="border-b border-neutral-800/80 pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-300 flex items-center">
                    <User className="w-4 h-4 mr-1.5 text-blue-500" /> Masuk dengan Username
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Nama Lengkap / Username Anda</label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="Masukkan nama Anda (cth: Edo Erpani)"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-blue-500 rounded-2xl p-3 text-xs text-white focus:outline-none transition-colors"
                  />
                  <p className="text-[10px] text-gray-500 leading-relaxed pt-1 italic">
                    *Jika nama Anda belum terdaftar, Anda akan terdaftar secara otomatis sebagai akun petualang baru.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:brightness-110 text-white text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-indigo-500/20 cursor-pointer mt-2"
                >
                  Masuk Sekarang
                </button>
              </form>
            </div>
          ) : (
            /* Registration Form Card */
            <form onSubmit={handleRegisterSubmit} className="bg-neutral-900 border border-neutral-800 rounded-[32px] p-6 space-y-4 shadow-xl">
              <div className="border-b border-neutral-800/80 pb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-300 flex items-center">
                  <UserPlus className="w-4 h-4 mr-1.5 text-blue-500 animate-pulse" /> Buat Identitas Petualang
                </span>
              </div>

              {/* Nama Lengkap */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Nama Lengkap / Username</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Contoh: Edo Erpani"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-blue-500 rounded-2xl p-3 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Asal Daerah / Lokasi */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Asal Daerah / Lokasi Tinggal</label>
                <select
                  value={regLocation}
                  onChange={(e) => setRegLocation(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-blue-500 rounded-2xl p-3 text-xs text-white focus:outline-none transition-colors"
                >
                  <optgroup label="16 Kecamatan Kutai Barat">
                    <option value="Barong Tongkok, Kutai Barat">Kec. Barong Tongkok</option>
                    <option value="Bentian Besar, Kutai Barat">Kec. Bentian Besar</option>
                    <option value="Bongan, Kutai Barat">Kec. Bongan</option>
                    <option value="Damai, Kutai Barat">Kec. Damai</option>
                    <option value="Jempang, Kutai Barat">Kec. Jempang</option>
                    <option value="Linggang Bigung, Kutai Barat">Kec. Linggang Bigung</option>
                    <option value="Long Iram, Kutai Barat">Kec. Long Iram</option>
                    <option value="Melak, Kutai Barat">Kec. Melak</option>
                    <option value="Mook Manaar Bulatn, Kutai Barat">Kec. Mook Manaar Bulatn</option>
                    <option value="Muara Lawa, Kutai Barat">Kec. Muara Lawa</option>
                    <option value="Muara Pahu, Kutai Barat">Kec. Muara Pahu</option>
                    <option value="Nyuatan, Kutai Barat">Kec. Nyuatan</option>
                    <option value="Penyinggahan, Kutai Barat">Kec. Penyinggahan</option>
                    <option value="Sekolaq Darat, Kutai Barat">Kec. Sekolaq Darat</option>
                    <option value="Siluq Ngurai, Kutai Barat">Kec. Siluq Ngurai</option>
                    <option value="Tering, Kutai Barat">Kec. Tering</option>
                  </optgroup>
                  <optgroup label="Luar Kutai Barat">
                    <option value="Samarinda, Kalimantan Timur">Samarinda, Kaltim</option>
                    <option value="Balikpapan, Kalimantan Timur">Balikpapan, Kaltim</option>
                    <option value="Luar Kalimantan Timur">Luar Kalimantan Timur</option>
                  </optgroup>
                </select>
              </div>

              {/* Choose Avatar */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">Pilih Karakter Avatar Adat</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', label: 'Dayak' },
                    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', label: 'Sape' },
                    { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', label: 'Rimba' },
                    { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', label: 'Kenyah' },
                    { url: 'https://placehold.co/200?text=EDO', label: 'Edo' }
                  ].map((avatar, aIdx) => (
                    <button
                      key={aIdx}
                      type="button"
                      onClick={() => {
                        setRegPhoto(avatar.url);
                        setCustomPhotoUrl('');
                      }}
                      className={`relative rounded-full aspect-square overflow-hidden border-2 p-0.5 transition-all cursor-pointer ${
                        (customPhotoUrl === '' && regPhoto === avatar.url) ? 'border-blue-500 scale-105' : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <img src={avatar.url} className="w-full h-full rounded-full object-cover" alt={avatar.label} />
                      {customPhotoUrl === '' && regPhoto === avatar.url && (
                        <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom Photo URL */}
                <div className="pt-1">
                  <span className="text-[9px] text-gray-500 font-medium">Atau gunakan URL foto kustom:</span>
                  <input
                    type="url"
                    value={customPhotoUrl}
                    onChange={(e) => {
                      setCustomPhotoUrl(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-[10px] text-gray-300 focus:outline-none focus:border-blue-500 mt-1"
                  />
                </div>
              </div>

              {/* Checkboxes Agreement */}
              <div className="space-y-2.5 pt-1">
                <label className="flex items-start space-x-2.5 cursor-pointer text-left">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-800 text-blue-600 focus:ring-0 bg-neutral-950"
                  />
                  <span className="text-[10px] text-gray-400 leading-normal select-none">
                    Saya setuju untuk menyimpan profil lokal secara privat di browser dan mematuhi ketentuan adat & komunitas Eunoiaverse.
                  </span>
                </label>

                <label className="flex items-start space-x-2.5 cursor-pointer text-left">
                  <input
                    type="checkbox"
                    checked={agreeContribute}
                    onChange={(e) => setAgreeContribute(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-800 text-blue-600 focus:ring-0 bg-neutral-950"
                  />
                  <span className="text-[10px] text-gray-400 leading-normal select-none">
                    Saya berkomitmen untuk melestarikan dan menghormati kearifan lokal Tanaa Purai Ngeriman (Kutai Barat). <span className="text-emerald-400 font-bold">(Sangat direkomendasikan)</span>
                  </span>
                </label>
              </div>

              {/* Submit Register */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:brightness-110 text-white text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-indigo-500/20 cursor-pointer mt-2"
              >
                Mulai Petualangan Adat
              </button>
            </form>
          )}
        </div>

        {/* Footer Credit */}
        <p className="text-[9px] text-center text-gray-600 font-medium font-mono mt-8">
          Eunoiaverse-Kubar v2.4.0 • Didukung oleh Web LocalStorage Sandbox
        </p>
      </div>
    );
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-neutral-950 z-[999] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden font-sans">
        <style>{`
          @keyframes blob-pivot {
            0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
            33% { transform: translate(45px, -60px) scale(1.25) rotate(120deg); }
            66% { transform: translate(-35px, 35px) scale(0.75) rotate(240deg); }
          }
          @keyframes blob-wobble {
            0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
            40% { transform: translate(-55px, 45px) scale(1.3) rotate(-120deg); }
            70% { transform: translate(40px, -40px) scale(0.8) rotate(120deg); }
          }
          @keyframes blob-float {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-40px) rotate(180deg) scale(1.2); }
          }
          .animate-blob-pivot {
            animation: blob-pivot 10s infinite ease-in-out;
          }
          .animate-blob-wobble {
            animation: blob-wobble 12s infinite ease-in-out;
          }
          .animate-blob-float {
            animation: blob-float 14s infinite ease-in-out;
          }
        `}</style>

        {/* SVG Liquid Filter Definition */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="liquid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        {/* Liquid Blob & Logo Container */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Liquid filter applied to floating background balls */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ filter: "url(#liquid-goo)" }}>
            {/* Center anchor blob */}
            <div className="w-32 h-32 bg-gradient-to-tr from-blue-600 to-amber-500 rounded-full blur-[1px] opacity-90" />
            
            {/* Orbiting liquid droplets */}
            <div className="absolute w-16 h-16 bg-blue-500 rounded-full animate-blob-pivot blur-[1px] opacity-80" />
            <div className="absolute w-20 h-20 bg-amber-500 rounded-full animate-blob-wobble blur-[1px] opacity-85" />
            <div className="absolute w-14 h-14 bg-emerald-500 rounded-full animate-blob-float blur-[1px] opacity-80" />
            <div className="absolute w-24 h-24 bg-yellow-400 rounded-full animate-blob-pivot [animation-delay:2.5s] blur-[1px] opacity-85" />
            <div className="absolute w-12 h-12 bg-pink-500 rounded-full animate-blob-wobble [animation-delay:4.5s] blur-[1px] opacity-75" />
          </div>

          {/* Foreground Crisp Logo - Layered cleanly on top of the liquid merging background */}
          <div className="absolute w-24 h-24 rounded-3xl bg-neutral-900/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl shadow-blue-500/20 animate-scale-up z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-amber-500/20 animate-pulse" />
            <span className="text-5xl font-black italic text-white relative z-10 tracking-tighter drop-shadow-md select-none">
              E
            </span>
          </div>

          {/* Liquid ripples expanding outwards */}
          <div className="absolute w-36 h-36 border border-blue-500/30 rounded-full animate-ping [animation-duration:3s]" />
          <div className="absolute w-44 h-44 border border-amber-500/10 rounded-full animate-ping [animation-duration:4.5s]" />
        </div>

        {/* Splash Info and Branding */}
        <div className="space-y-4 max-w-sm mt-6 relative z-20">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase font-sans">
              Eunoiaverse
            </h1>
            <p className="text-[10px] text-amber-400 font-black tracking-widest uppercase font-mono">
              Pintu Gerbang Budaya & Wisata Kutai Barat
            </p>
          </div>
          
          <p className="text-xs text-gray-400 leading-relaxed font-sans font-medium px-4">
            Menyintesis harmoni sape' tradisional dan keindahan alam eksotis Kalimantan Timur.
          </p>

          <div className="pt-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
              <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">Menghubungkan Adat & Budaya...</span>
            </div>

            <button
              onClick={() => setShowSplash(false)}
              className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/50 text-white rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-black/40"
            >
              Masuk Aplikasi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isRegistered) {
    return (
      <div className="w-full max-w-lg min-h-screen flex flex-col mx-auto px-4 py-8">
        <AuthView />
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg min-h-screen flex flex-col mx-auto px-4 py-8">
      {/* Platform Header */}
      <header className="flex justify-between items-center mb-8 sticky top-0 bg-[#171717]/80 backdrop-blur-lg z-30 py-4 -mx-4 px-4 border-b border-neutral-800/50">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">E</div>
          <h1 className="text-xl font-black tracking-tighter">Eunoiaverse</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setCurrentPage('admin')}
            className={`p-3 rounded-2xl bg-neutral-800 neu-flat neu-button ${currentPage === 'admin' ? 'text-blue-500' : 'text-gray-500'}`}
            title="Panel Admin"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentPage('notifications')}
            className={`p-3 rounded-2xl bg-neutral-800 neu-flat neu-button relative ${currentPage === 'notifications' ? 'text-blue-500' : 'text-gray-500'}`}
            title="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-4 border-neutral-800"></span>}
          </button>
          <button 
            onClick={() => setCurrentPage('settings')}
            className={`p-3 rounded-2xl bg-neutral-800 neu-flat neu-button ${currentPage === 'settings' ? 'text-blue-500' : 'text-gray-500'}`}
            title="Pengaturan Aplikasi"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <HomeView />
          </motion.div>
        )}
        {currentPage === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ExploreView />
          </motion.div>
        )}
        {currentPage === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ShopView />
          </motion.div>
        )}
        {currentPage === 'wallet' && (
          <motion.div
            key="wallet"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <WalletView />
          </motion.div>
        )}
        {currentPage === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ProfileView />
          </motion.div>
        )}
        {currentPage === 'notifications' && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <NotificationsView />
          </motion.div>
        )}
        {currentPage === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <AdminView />
          </motion.div>
        )}
        {currentPage === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SettingsView />
          </motion.div>
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-6 z-40">
        <div className="bg-neutral-800/90 backdrop-blur-xl p-4 flex justify-between items-center rounded-[32px] border border-neutral-700/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]">
          <button onClick={() => setCurrentPage('explore')} className={`p-2 transition-all ${currentPage === 'explore' ? 'text-white scale-110' : 'text-gray-500 hover:text-gray-300'}`}><Compass className="w-6 h-6" /></button>
          <button onClick={() => setCurrentPage('shop')} className={`p-2 transition-all ${currentPage === 'shop' ? 'text-white scale-110' : 'text-gray-500 hover:text-gray-300'}`}><ShoppingBag className="w-6 h-6" /></button>
          
          <button onClick={() => setCurrentPage('home')} className="w-14 h-14 -mt-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 shadow-2xl flex items-center justify-center border-4 border-neutral-900 group active:scale-95 transition-transform">
            <Home className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          
          <button onClick={() => setCurrentPage('wallet')} className={`p-2 transition-all ${currentPage === 'wallet' ? 'text-white scale-110' : 'text-gray-500 hover:text-gray-300'}`}><Wallet className="w-6 h-6" /></button>
          <button onClick={() => setCurrentPage('profile')} className={`p-2 transition-all ${currentPage === 'profile' ? 'text-white scale-110' : 'text-gray-500 hover:text-gray-300'}`}><User className="w-6 h-6" /></button>
        </div>
      </nav>

      {/* Story Viewer Overlay */}
      {activeStoryUser && currentStory && (
        <div className="fixed inset-0 bg-neutral-950/98 z-50 flex flex-col justify-between p-4 select-none">
          {/* Top Bar Indicators & User Details */}
          <div className="w-full z-10 space-y-3">
            {/* Dash Progress Bar */}
            <div className="flex space-x-1 w-full px-1">
              {activeStories.map((s, idx) => (
                <div key={s.id} className="h-1 flex-1 bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-100 ease-linear"
                    style={{
                      width: idx < activeStoryIndex ? '100%' : idx === activeStoryIndex ? '100%' : '0%',
                      transitionProperty: idx === activeStoryIndex ? 'width' : 'none',
                      transitionDuration: idx === activeStoryIndex ? '5000ms' : '0ms'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* User Info & Time */}
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full border border-neutral-700 overflow-hidden">
                  <img src={currentStory.avatar || "https://placehold.co/100?text=U"} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{currentStory.user}</h4>
                  <span className="text-[10px] text-gray-500">{currentStory.timestamp}</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveStoryUser(null)}
                className="p-2 rounded-full bg-neutral-900/60 hover:bg-neutral-800 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tap Interaction Areas & Main Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 w-full">
            {/* Invisible Left Tap Zone */}
            <div 
              onClick={() => {
                if (activeStoryIndex > 0) {
                  setActiveStoryIndex(activeStoryIndex - 1);
                }
              }}
              className="absolute left-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
            />
            
            {/* Invisible Right Tap Zone */}
            <div 
              onClick={() => {
                if (activeStoryIndex < activeStories.length - 1) {
                  setActiveStoryIndex(activeStoryIndex + 1);
                } else {
                  setActiveStoryUser(null);
                }
              }}
              className="absolute right-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
            />

            {/* Main Image */}
            <img 
              src={currentStory.image} 
              className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl" 
              alt="Story" 
            />
          </div>

          {/* Bottom Caption Overlay & Quick Reactions */}
          <div className="w-full px-4 pb-8 space-y-4 text-center z-30 max-w-sm mx-auto flex flex-col items-center">
            {currentStory.caption && (
              <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800/80 p-3.5 rounded-2xl w-full shadow-lg">
                <p className="text-xs text-gray-200 leading-relaxed font-medium">
                  {currentStory.caption}
                </p>
              </div>
            )}

            {/* Quick Reactions Bar */}
            <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800/80 p-2.5 rounded-full flex items-center justify-around w-full shadow-2xl relative">
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest text-indigo-400 uppercase font-mono">
                Reaksi Cepat
              </span>
              {['❤️', '🔥', '👏', '😂', '😮', '🙌'].map((emoji) => {
                const count = currentStory.reactions?.[emoji] || 0;
                return (
                  <button
                    key={emoji}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent advancing the story
                      handleReactToStory(currentStory.id, emoji);
                    }}
                    className="group relative flex flex-col items-center p-2 rounded-full hover:bg-neutral-800/60 active:scale-90 transition-all cursor-pointer"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-200">{emoji}</span>
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1.5 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full min-w-[14px] text-center border border-neutral-900 shadow-sm">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floating Emoji Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
            <style>{`
              @keyframes emojiFloat {
                0% {
                  transform: translateY(0) scale(0.5) rotate(0deg);
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                  transform: translateY(-20px) scale(1.3) rotate(-10deg);
                }
                50% {
                  transform: translateY(-120px) scale(1) rotate(10deg);
                }
                100% {
                  transform: translateY(-280px) scale(0.7) rotate(-15deg);
                  opacity: 0;
                }
              }
              .animate-emoji-float {
                position: absolute;
                bottom: 80px;
                animation: emojiFloat 1.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
              }
            `}</style>
            {floatingReactions.map((react) => (
              <span
                key={react.id}
                className="text-4xl animate-emoji-float select-none"
                style={{
                  left: `${react.left}%`,
                }}
              >
                {react.char}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Story Create Modal */}
      {showStoryCreateModal && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] w-full max-w-sm p-6 space-y-5 shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <h3 className="text-lg font-black text-white">Buat Cerita Baru</h3>
              <button 
                onClick={() => {
                  setShowStoryCreateModal(false);
                  setNewStoryImage('');
                  setNewStoryCaption('');
                }}
                className="p-1.5 rounded-xl bg-neutral-800 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Source Input */}
            <div className="space-y-4">
              {/* Live Preview of image */}
              {newStoryImage ? (
                <div className="relative h-40 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
                  <img src={newStoryImage} className="w-full h-full object-cover" alt="Story Preview" />
                  <button 
                    type="button"
                    onClick={() => setNewStoryImage('')}
                    className="absolute top-2.5 right-2.5 p-2 bg-neutral-900/80 rounded-full text-white hover:bg-neutral-950 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="h-40 border border-dashed border-neutral-800 rounded-2xl flex flex-col items-center justify-center text-center p-4 bg-neutral-950/50">
                  <Camera className="w-8 h-8 text-neutral-600 mb-2" />
                  <p className="text-[10px] text-gray-500 uppercase font-black">Unggah atau Pilih Gambar Cerita</p>
                  
                  {/* File Upload Trigger */}
                  <label className="mt-3 px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-gray-300 rounded-lg cursor-pointer transition-colors">
                    Pilih File Foto
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewStoryImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden" 
                    />
                  </label>
                </div>
              )}

              {/* Presets Gallery inside Story Creation */}
              <div className="space-y-2">
                <span className="text-[10px] text-gray-500 uppercase font-black block">Pilih Keindahan Kutai Barat</span>
                <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                  {KUBAR_PRESET_SCENERIES.map((preset, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setNewStoryImage(preset.url)}
                      className="flex-none w-20 cursor-pointer group"
                    >
                      <div className="h-14 rounded-lg overflow-hidden border border-neutral-800 group-hover:border-blue-500 transition-colors">
                        <img src={preset.url} className="w-full h-full object-cover" alt="" />
                      </div>
                      <span className="text-[8px] text-gray-500 truncate block mt-0.5">{preset.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Area for Caption */}
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-black block">Keterangan Cerita</span>
                <textarea 
                  value={newStoryCaption}
                  onChange={(e) => setNewStoryCaption(e.target.value)}
                  placeholder="Ceritakan sesuatu tentang foto ini..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none"
                  rows={2}
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex space-x-3 pt-2">
              <button 
                type="button"
                onClick={() => {
                  setShowStoryCreateModal(false);
                  setNewStoryImage('');
                  setNewStoryCaption('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-gray-400 font-bold transition-colors"
              >
                Batal
              </button>
              <button 
                type="button"
                onClick={handlePublishStory}
                disabled={!newStoryImage}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-all ${
                  newStoryImage ? 'bg-blue-600 hover:bg-blue-500' : 'bg-neutral-800 text-gray-600 cursor-not-allowed'
                }`}
              >
                Bagikan Cerita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 1. KUBAR INBOX & LIVE CHAT SELECTION MODAL */}
      {/* ========================================== */}
      {showInboxModal && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] w-full max-w-sm p-6 space-y-4 shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-black text-white">Kotak Masuk Kubar</h3>
              </div>
              <button 
                onClick={() => setShowInboxModal(false)}
                className="p-1.5 rounded-xl bg-neutral-800 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Pilih Kontak Terverifikasi</p>
            
            <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1 no-scrollbar">
              {[
                { name: "Forum Komunitas Adat Kubar", desc: "Diskusi & obrolan real-time seputar pelestarian budaya Kutai Barat", phone: "Forum Publik", welcome: "Halo! Selamat datang di Forum Budaya Kubar kawan-kawan.", isGroup: true },
                { name: "Toko Kerajinan Sentiyu", desc: "Sedia tas anjat, kain doyo, ukiran kayu asli Suku Dayak", phone: "0812-5555-8899", welcome: "Halo Edo Erpani! Ada yang bisa kami bantu mengenai kerajinan tangan khas Kubar?" },
                { name: "Koperasi Seni Ukir Melak", desc: "Pusat seni patung ulin dan ukiran tameng mandau tradisional", phone: "0813-2244-1100", welcome: "Selamat datang di Koperasi Melak! Silakan jika ada pesanan patung ulin." },
                { name: "Dinas Pariwisata Kubar", desc: "Layanan informasi tiket pariwisata resmi Kabupaten Kutai Barat", phone: "0811-9922-3344", welcome: "Halo! Terima kasih telah menghubungi Dinas Pariwisata. Ada pertanyaan seputar destinasi?" },
                { name: "Sape' Master Suar", desc: "Pemain instrumen sape legendaris dan pengrajin alat musik tradisional", phone: "0815-7788-9900", welcome: "Halo kawan! Sape' buatan saya murni dari kayu ulin pilihan. Mau tanya detail?" }
              ].map((contact, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    // Pre-fill welcome message if not already present
                    if (!chatMessages[contact.name]) {
                      setChatMessages(prev => ({
                        ...prev,
                        [contact.name]: [{ sender: contact.isGroup ? 'other' : 'owner', text: contact.welcome, time: 'Sekarang' }]
                      }));
                    }
                    setShowInboxModal(false);
                    setActiveChatBrand({
                      brandName: contact.name,
                      contact: contact.phone,
                      isGroup: contact.isGroup || false
                    });
                  }}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group ${contact.isGroup ? 'bg-emerald-950/25 border-emerald-900/30 hover:bg-emerald-950/40' : 'bg-neutral-800/60 hover:bg-neutral-800 border-neutral-700/20'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center font-black text-xs text-blue-400 font-mono relative">
                      {contact.isGroup ? <Users className="w-4 h-4 text-emerald-400 animate-pulse" /> : contact.name.charAt(0)}
                      {contact.isGroup && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-xs font-black text-white group-hover:text-blue-400 transition-colors">{contact.name}</h4>
                        {contact.isGroup && (
                          <span className="text-[7px] font-black uppercase text-emerald-400 bg-emerald-950 border border-emerald-900/30 px-1 py-0.5 rounded">Grup</span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 truncate max-w-[190px]">{contact.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>

            <p className="text-[9px] text-center text-gray-600 font-mono">
              Live chat terenkripsi dan langsung terhubung dengan merchant lokal.
            </p>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. TRADITIONAL SAPE' MUSIC PLAYER MODAL    */}
      {/* ========================================== */}
      {showMusicPlayerModal && (() => {
        const activePlaylist = playlists.find(p => p.id === activePlaylistId) || playlists[0];
        const playlistTracks = activePlaylist.trackIds.map(tid => KUBAR_TRACKS.find(t => t.id === tid)).filter(Boolean) as typeof KUBAR_TRACKS;
        const hasTracks = playlistTracks.length > 0;
        const currentTrack = hasTracks ? playlistTracks[currentTrackIdx % playlistTracks.length] : null;

        return (
          <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] w-full max-w-md p-6 space-y-4 shadow-2xl animate-scale-up text-center">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Music className="w-5 h-5 text-amber-500 animate-pulse" />
                  <h3 className="text-sm font-black uppercase text-white tracking-wider">Sape' Studio</h3>
                </div>
                <button 
                  onClick={() => setShowMusicPlayerModal(false)}
                  className="p-1.5 rounded-xl bg-neutral-800 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-neutral-950 p-1 rounded-2xl border border-neutral-800/80">
                <button 
                  type="button"
                  onClick={() => setMusicPlayerTab('playing')}
                  className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${musicPlayerTab === 'playing' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Pemutar
                </button>
                <button 
                  type="button"
                  onClick={() => setMusicPlayerTab('playlists')}
                  className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${musicPlayerTab === 'playlists' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Daftar Putar
                </button>
              </div>

              {musicPlayerTab === 'playing' ? (
                <div className="space-y-4 animate-fade-in">
                  {/* Rotating Mandala Visualizer */}
                  <div className="relative py-2 flex justify-center">
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-tr from-amber-600/20 to-yellow-600/10 p-1.5 border-4 border-dashed ${musicPlaying && !isMusicMuted && hasTracks ? 'border-amber-500 animate-spin [animation-duration:15s]' : 'border-neutral-800'} flex items-center justify-center transition-all duration-700`}>
                      <div className="w-24 h-24 rounded-full bg-neutral-950 flex items-center justify-center shadow-inner relative border-2 border-neutral-800">
                        <Music className={`w-10 h-10 ${musicPlaying && !isMusicMuted && hasTracks ? 'text-amber-400 animate-pulse' : 'text-neutral-700'}`} />
                        {musicPlaying && !isMusicMuted && hasTracks && (
                          <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-ping"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Track Information */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-white">
                      {currentTrack ? currentTrack.name : "Tidak ada lagu aktif"}
                    </h4>
                    <p className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">
                      {currentTrack ? `${activePlaylist.name} • ${currentTrack.category}` : "Pilih playlist dengan lagu"}
                    </p>
                    {currentTrack && (
                      <p className="text-[9px] text-gray-500 font-mono">
                        Durasi: {currentTrack.duration}
                      </p>
                    )}
                    {currentTrack && (currentTrack as any).description && (
                      <p className="text-[10.5px] text-gray-400 italic max-w-xs mx-auto pt-1.5 leading-relaxed">
                        "{ (currentTrack as any).description }"
                      </p>
                    )}
                  </div>

                  {/* Simulated Seek Bar */}
                  <div className="space-y-1">
                    <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-1000 ${musicPlaying && hasTracks ? 'w-3/4' : 'w-0'}`}
                      />
                    </div>
                    <div className="flex justify-between text-[8px] text-gray-500 font-mono">
                      <span>{musicPlaying && hasTracks ? "01:12" : "00:00"}</span>
                      <span>{musicPlaying && hasTracks ? "Synthetic Realtime Loop" : "00:00"}</span>
                    </div>
                  </div>

                  {/* Favorite Toggle Button */}
                  {currentTrack && (
                    <button
                      type="button"
                      onClick={() => toggleFavorite(currentTrack.id)}
                      className="text-xs font-bold font-mono tracking-wider text-gray-400 hover:text-amber-500 flex items-center justify-center gap-1.5 mx-auto bg-neutral-950 px-4 py-1.5 rounded-full border border-neutral-800 transition-colors"
                    >
                      {playlists.find(p => p.id === 'favorites')?.trackIds.includes(currentTrack.id) ? (
                        <>
                          <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                          <span>Disimpan di Favorit</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-3.5 h-3.5 text-gray-400 hover:text-red-500 transition-colors" />
                          <span>Simpan ke Favorit</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Controls Bar */}
                  <div className="flex justify-center items-center space-x-6">
                    <button 
                      onClick={() => {
                        if (!hasTracks) return;
                        setCurrentTrackIdx(prev => (prev - 1 + playlistTracks.length) % playlistTracks.length);
                      }}
                      disabled={!hasTracks}
                      className={`p-3 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white rounded-full transition-all active:scale-90 ${!hasTracks ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button 
                      onClick={() => {
                        if (!hasTracks) {
                          triggerPushNotification("⚠️ Playlist Kosong", "Tambahkan lagu ke playlist ini terlebih dahulu.", "success");
                          return;
                        }
                        setMusicPlaying(!musicPlaying);
                        if(!musicPlaying) {
                          triggerPushNotification("🎵 Musik Dimulai", `Menyintesis melodi Sape' "${currentTrack?.name}" tradisional Kutai Barat via Web Audio API.`, "success");
                        }
                      }}
                      className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all border-4 border-neutral-900"
                    >
                      {musicPlaying && hasTracks ? <Pause className="w-6 h-6 fill-current text-white" /> : <Play className="w-6 h-6 fill-current text-white translate-x-0.5" />}
                    </button>

                    <button 
                      onClick={() => {
                        if (!hasTracks) return;
                        setCurrentTrackIdx(prev => (prev + 1) % playlistTracks.length);
                      }}
                      disabled={!hasTracks}
                      className={`p-3 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white rounded-full transition-all active:scale-90 ${!hasTracks ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mute and Info block */}
                  <div className="flex justify-between items-center bg-neutral-950 p-3 rounded-2xl border border-neutral-800 text-left">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-gray-400" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Suara Melodi</span>
                    </div>
                    <button 
                      onClick={() => setIsMusicMuted(!isMusicMuted)}
                      className={`px-3 py-1 text-[8px] font-black uppercase tracking-wider rounded-lg transition-all ${isMusicMuted ? 'bg-red-900/30 text-red-400 border border-red-900/50' : 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50'}`}
                    >
                      {isMusicMuted ? "Muted" : "Active"}
                    </button>
                  </div>

                  <p className="text-[9px] text-gray-600 leading-relaxed font-mono">
                    Melodi ini dihasilkan secara dinamis menggunakan gelombang segitiga browser Anda untuk mensimulasikan petikan instrumen tradisional Sape'.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-left animate-fade-in">
                  {/* Active Playlist Selection Badges */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block font-mono">Pilih Playlist</span>
                    <div className="flex space-x-1.5 overflow-x-auto pb-1.5 no-scrollbar">
                      {playlists.map((playlist) => (
                        <div key={playlist.id} className="relative flex-none">
                          <button
                            type="button"
                            onClick={() => {
                              setActivePlaylistId(playlist.id);
                              setCurrentTrackIdx(0);
                            }}
                            className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                              activePlaylistId === playlist.id 
                                ? 'bg-amber-600 text-white shadow-md' 
                                : 'bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700/80'
                            }`}
                          >
                            {playlist.id === 'favorites' ? (
                              <Heart className={`w-3 h-3 ${activePlaylistId === playlist.id ? 'text-white' : 'text-red-500'} fill-current`} />
                            ) : (
                              <ListMusic className="w-3 h-3" />
                            )}
                            <span>{playlist.name}</span>
                            <span className="text-[8px] font-mono opacity-80">({playlist.trackIds.length})</span>
                            
                            {/* Delete button for custom playlists */}
                            {!playlist.isSystem && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPlaylists(playlists.filter(p => p.id !== playlist.id));
                                  if (activePlaylistId === playlist.id) {
                                    setActivePlaylistId('all');
                                    setCurrentTrackIdx(0);
                                  }
                                  triggerPushNotification("🗑️ Playlist Dihapus", `Playlist "${playlist.name}" berhasil dihapus.`, "success");
                                }}
                                className="p-0.5 rounded-md hover:bg-red-900/40 text-gray-400 hover:text-red-400 transition-colors"
                                title="Hapus Playlist"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Playlist Creator Form */}
                  <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider block font-mono">Buat Playlist Baru</span>
                      <button 
                        type="button"
                        onClick={() => setShowCreatePlaylistForm(!showCreatePlaylistForm)}
                        className="text-[9px] text-amber-500 hover:text-amber-400 font-bold uppercase font-mono"
                      >
                        {showCreatePlaylistForm ? "Tutup" : "Buka"}
                      </button>
                    </div>
                    
                    {showCreatePlaylistForm && (
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="Nama Playlist Baru..."
                          value={newPlaylistName}
                          onChange={(e) => setNewPlaylistName(e.target.value)}
                          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newPlaylistName.trim()) return;
                            const pid = 'playlist_' + Date.now();
                            setPlaylists([...playlists, { id: pid, name: newPlaylistName.trim(), trackIds: [] }]);
                            setNewPlaylistName('');
                            setShowCreatePlaylistForm(false);
                            setActivePlaylistId(pid);
                            setCurrentTrackIdx(0);
                            triggerPushNotification("📂 Playlist Dibuat", `Playlist "${newPlaylistName.trim()}" berhasil dibuat!`, "success");
                          }}
                          className="bg-amber-600 hover:bg-amber-500 text-white rounded-xl px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all"
                        >
                          Buat
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Track list inside active playlist */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block font-mono">Lagu di dalam Playlist Ini</span>
                    <div className="bg-neutral-950/40 rounded-2xl border border-neutral-800/60 max-h-48 overflow-y-auto p-1.5 space-y-1.5 no-scrollbar">
                      {playlistTracks.length === 0 ? (
                        <div className="p-6 text-center text-gray-600 text-[10px] italic font-medium leading-relaxed">
                          Belum ada lagu di dalam playlist ini. Silakan tambahkan lagu dari daftar di bawah.
                        </div>
                      ) : (
                        playlistTracks.map((track, idx) => {
                          const isCurrent = currentTrack?.id === track.id;
                          const isFav = playlists.find(p => p.id === 'favorites')?.trackIds.includes(track.id);

                          return (
                            <div 
                              key={track.id} 
                              className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                                isCurrent 
                                  ? 'bg-amber-950/20 border-amber-800/50' 
                                  : 'bg-neutral-900/80 border-neutral-800/40 hover:bg-neutral-800/60'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5 min-w-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCurrentTrackIdx(idx);
                                    setMusicPlaying(true);
                                  }}
                                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                    isCurrent && musicPlaying 
                                      ? 'bg-amber-600 text-white animate-pulse' 
                                      : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white'
                                  }`}
                                >
                                  {isCurrent && musicPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-0.5" />}
                                </button>
                                <div className="min-w-0">
                                  <p className={`text-[11px] font-black truncate ${isCurrent ? 'text-amber-400' : 'text-gray-200'}`}>
                                    {track.name}
                                  </p>
                                  <p className="text-[8px] font-mono text-gray-500 uppercase">
                                    {track.category} • {track.duration}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-1">
                                {/* Favorite toggle */}
                                <button
                                  type="button"
                                  onClick={() => toggleFavorite(track.id)}
                                  className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-neutral-800 transition-colors"
                                  title={isFav ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                                </button>

                                {/* Remove from custom playlist button */}
                                {activePlaylistId !== 'all' && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPlaylists(playlists.map(p => {
                                        if (p.id === activePlaylistId) {
                                          return { ...p, trackIds: p.trackIds.filter(id => id !== track.id) };
                                        }
                                        return p;
                                      }));
                                      setCurrentTrackIdx(0);
                                      triggerPushNotification("🗑️ Lagu Dihapus", `Lagu dihapus dari playlist "${activePlaylist.name}".`, "success");
                                    }}
                                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                                    title="Keluarkan dari Playlist"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Add songs from other available songs to this custom playlist */}
                  {activePlaylistId !== 'all' && (
                    <div className="space-y-2 pt-1.5 border-t border-neutral-800/60">
                      <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block font-mono">Tambah Lagu Tradisional Lainnya</span>
                      <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto no-scrollbar">
                        {KUBAR_TRACKS.filter(t => !activePlaylist.trackIds.includes(t.id)).length === 0 ? (
                          <p className="text-[9px] text-gray-600 italic text-center py-2">Semua lagu sudah ada di dalam playlist ini.</p>
                        ) : (
                          KUBAR_TRACKS.filter(t => !activePlaylist.trackIds.includes(t.id)).map(track => (
                            <div key={track.id} className="p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between text-left">
                              <div>
                                <p className="text-[10px] font-black text-gray-300">{track.name}</p>
                                <p className="text-[8px] font-mono text-gray-500 uppercase">{track.category} • {track.duration}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setPlaylists(playlists.map(p => {
                                    if (p.id === activePlaylistId) {
                                      return { ...p, trackIds: [...p.trackIds, track.id] };
                                    }
                                    return p;
                                  }));
                                  triggerPushNotification("🎵 Lagu Ditambahkan", `"${track.name}" ditambahkan ke "${activePlaylist.name}".`, "success");
                                }}
                                className="px-2 py-1 bg-amber-950/40 text-amber-400 hover:bg-amber-600 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors"
                              >
                                + Tambah
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ========================================== */}
      {/* 3. EUNOIAVERSE SYSTEM & PROFILE SETTINGS MODAL */}
      {/* ========================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] w-full max-w-md p-6 space-y-4 shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-black uppercase tracking-wider text-white font-sans">Pengaturan Aplikasi</h3>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-xl bg-neutral-800 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Horizontal Tabs Menu */}
            <div className="flex space-x-1.5 overflow-x-auto pb-2 border-b border-neutral-800/60 no-scrollbar">
              {[
                { id: 'profile', label: 'Profil & Foto' },
                { id: 'info', label: 'Info Akun' },
                { id: 'assets', label: 'Media & Galeri' },
                { id: 'general', label: 'Umum' },
                { id: 'privacy', label: 'Privasi' },
                { id: 'faq', label: 'FAQ' },
                { id: 'logout', label: 'Keluar' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSettingsTab(tab.id as any)}
                  className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-xl transition-all whitespace-nowrap ${
                    activeSettingsTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-neutral-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: PROFILE & PHOTO */}
            {activeSettingsTab === 'profile' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem('profile_name', profileName);
                localStorage.setItem('profile_location', profileLocation);
                localStorage.setItem('profile_photo', profilePhoto);
                setShowSettingsModal(false);
                triggerPushNotification(
                  "⚙️ Profil Diperbarui",
                  "Nama, lokasi, dan foto profil Anda berhasil disimpan secara lokal.",
                  "success"
                );
              }} className="space-y-4 pt-1">
                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block border-b border-neutral-800/50 pb-1">Ubah Foto & Identitas</span>
                
                {/* Profile Photo Custom Selector */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-gray-400 block uppercase font-mono">Pilih Foto Adat & Karakter</label>
                  <div className="flex items-center space-x-3 bg-neutral-950 p-2.5 rounded-2xl border border-neutral-800/80">
                    <img src={profilePhoto} className="w-12 h-12 rounded-full object-cover border border-neutral-700 p-0.5" alt="Preview" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-white truncate">Foto Profil Saat Ini</p>
                      <p className="text-[8px] text-gray-500">Pilih preset di bawah atau unggah berkas</p>
                    </div>
                  </div>
                  
                  {/* Preset Grid */}
                  <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {[
                      { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', label: 'Dayak' },
                      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', label: 'Sape' },
                      { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', label: 'Rimba' },
                      { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', label: 'Kenyah' },
                      { url: 'https://placehold.co/200?text=EDO', label: 'Edo' }
                    ].map((avatar, aIdx) => (
                      <button
                        key={aIdx}
                        type="button"
                        onClick={() => setProfilePhoto(avatar.url)}
                        className={`relative rounded-full aspect-square overflow-hidden border-2 p-0.5 transition-all ${
                          profilePhoto === avatar.url ? 'border-blue-500 scale-105' : 'border-neutral-800 hover:border-neutral-700'
                        }`}
                        title={avatar.label}
                      >
                        <img src={avatar.url} className="w-full h-full rounded-full object-cover" alt={avatar.label} />
                        {profilePhoto === avatar.url && (
                          <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Manual File Uploader (Click/Drag-and-drop compatible) */}
                  <div className="pt-1.5">
                    <label className="text-[9px] font-bold text-gray-500 block mb-1 uppercase font-mono">Unggah Foto Perangkat (Click / Drop)</label>
                    <div className="relative border border-dashed border-neutral-700 rounded-xl p-2.5 bg-neutral-950/50 text-center hover:bg-neutral-950 transition-all cursor-pointer">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') {
                                setProfilePhoto(reader.result);
                                triggerPushNotification("📸 Foto Profil Dimuat", "Berkas foto berhasil diunggah.", "success");
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <p className="text-[9px] font-black text-gray-400">Pilih Berkas Foto Kustom</p>
                      <p className="text-[7px] text-gray-500">Mendukung JPEG, PNG, GIF</p>
                    </div>
                  </div>
                </div>

                {/* Identity Input fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase font-mono">Nama Pengguna</label>
                    <input 
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                      placeholder="Nama lengkap..."
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase font-mono">Lokasi Pengguna</label>
                    <input 
                      type="text"
                      value={profileLocation}
                      onChange={(e) => setProfileLocation(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                      placeholder="Lokasi wilayah..."
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex space-x-2.5 pt-2 border-t border-neutral-800/50">
                  <button 
                    type="button"
                    onClick={() => setShowSettingsModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-gray-400 font-bold transition-all active:scale-95"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs text-white font-black uppercase tracking-wider transition-all active:scale-95 shadow-md"
                  >
                    Simpan Profil
                  </button>
                </div>
              </form>
            )}

            {/* TAB CONTENT: LIST INFO */}
            {activeSettingsTab === 'info' && (
              <div className="space-y-3 pt-1 animate-fade-in text-left">
                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block border-b border-neutral-800/50 pb-1">Informasi Klien & Statistik</span>
                
                <div className="grid grid-cols-1 gap-2 max-h-[280px] overflow-y-auto pr-1 no-scrollbar">
                  {[
                    { label: "Identitas Klien", val: "Eunoiaverse-Kubar v2.4.0", type: "system" },
                    { label: "Keamanan Dompet", val: "Lokal AES-256 (Terenkripsi)", type: "security" },
                    { label: "Saldo Dompet Aktif", val: `Rp ${balance.toLocaleString()}`, type: "finance" },
                    { label: "Total Kunjungan Wisata", val: `${visitedDestIds.length} Lokasi Wisata Budaya`, type: "travel" },
                    { label: "Aset Komoditas Terdaftar", val: `${Object.values(investmentHoldings || {}).reduce((a, b) => a + b, 0)} Unit`, type: "finance" },
                    { label: "Status Jaringan Server", val: "Aktif & Terhubung (0.0.0.0:3000)", type: "status" },
                    { label: "Protokol Enkripsi", val: "Zero-Knowledge Proof (ZKP)", type: "security" },
                    { label: "Zonasi Waktu", val: "WITA - UTC+8 (Kutai Barat)", type: "system" }
                  ].map((info, iIdx) => (
                    <div key={iIdx} className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80 flex items-center justify-between">
                      <div>
                        <p className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">{info.label}</p>
                        <p className="text-[10px] font-black text-white mt-0.5">{info.val}</p>
                      </div>
                      <div className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[8px] text-gray-400 uppercase font-mono font-black">
                        {info.type}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-gray-300 font-bold transition-all active:scale-95 text-center mt-2 block"
                >
                  Tutup Info
                </button>
              </div>
            )}

            {/* TAB CONTENT: ASSETS & MEDIA VAULT */}
            {activeSettingsTab === 'assets' && (
              <div className="space-y-3 pt-1 animate-fade-in text-left">
                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block border-b border-neutral-800/50 pb-1">Direktori & Galeri Media Sistem</span>
                
                <div className="bg-neutral-950 rounded-2xl border border-neutral-800/60 p-3 space-y-3 max-h-[300px] overflow-y-auto no-scrollbar">
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Struktur direktori aset statis sistem yang berhasil didaftarkan dan diunggah ke server:
                  </p>

                  <div className="space-y-2.5">
                    {[
                      {
                        category: "🏞️ Galeri & Destinasi",
                        files: [
                          { name: "name_destination.jpg", path: "src/assets/images/destinations/subdistrict/name_destination.jpg", size: "1.2 KB", type: "Gambar JPG" },
                          { name: "name_destination_alt.jpg", path: "src/assets/images/destinations/subdistrict/name_destination_alt.jpg", size: "1.2 KB", type: "Gambar JPG" }
                        ]
                      },
                      {
                        category: "🎵 Musik & Playlist",
                        files: [
                          { name: ".mp3", path: "src/assets/music/playlist/.mp3", size: "0.8 KB", type: "Audio MP3" }
                        ]
                      },
                      {
                        category: "🎨 Ikon & Logo",
                        files: [
                          { name: ".png", path: "src/assets/icons/PNG/Black or White icon folder/.png", size: "0.1 KB", type: "Ikon PNG" },
                          { name: ".svg", path: "src/assets/icons/SVG/Black or White icon folder/.svg", size: "0.2 KB", type: "Ikon SVG" },
                          { name: "name_logo-size.png", path: "src/assets/logos/name_logo-size.png", size: "0.1 KB", type: "Logo PNG" }
                        ]
                      },
                      {
                        category: "👥 Profil, Toko & Produk",
                        files: [
                          { name: ".png", path: "src/assets/images/profile/.png", size: "0.1 KB", type: "Foto Profil PNG" },
                          { name: "profile_name_shop.png", path: "src/assets/media/shop/profile_name_shop.png", size: "0.1 KB", type: "Gambar Toko PNG" },
                          { name: "product_detail.png", path: "src/images/product/product_detail.png", size: "0.1 KB", type: "Gambar Produk PNG" }
                        ]
                      }
                    ].map((grp, gIdx) => (
                      <div key={gIdx} className="space-y-1">
                        <div className="text-[9px] font-extrabold text-blue-400 uppercase tracking-wider bg-neutral-900/60 px-2.5 py-1 rounded-lg border border-neutral-800/40">
                          {grp.category}
                        </div>
                        <div className="pl-1.5 space-y-1">
                          {grp.files.map((file, fIdx) => (
                            <div key={fIdx} className="p-2 bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-800/30 rounded-xl flex items-center justify-between transition-all">
                              <div className="min-w-0 flex-1 pr-2">
                                <div className="flex items-center space-x-1.5">
                                  <span className="text-[10px] font-bold text-white truncate">{file.name}</span>
                                  <span className="text-[8px] px-1 py-0.2 bg-neutral-850 border border-neutral-800 text-gray-400 rounded-md font-mono">{file.size}</span>
                                </div>
                                <p className="text-[8.5px] text-gray-500 truncate font-mono mt-0.5">{file.path}</p>
                              </div>
                              <button
                                onClick={() => {
                                  triggerPushNotification(
                                    "📁 Info Aset",
                                    `Aset: ${file.name}\nDirektori: ${file.path}\nTipe: ${file.type}`,
                                    "info"
                                  );
                                }}
                                className="px-2 py-1 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-[8px] font-black text-blue-400 transition-all uppercase tracking-wider whitespace-nowrap active:scale-95"
                              >
                                Periksa
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-gray-300 font-bold transition-all active:scale-95 text-center mt-2 block"
                >
                  Selesai
                </button>
              </div>
            )}

            {/* TAB CONTENT: GENERAL */}
            {activeSettingsTab === 'general' && (
              <div className="space-y-4 pt-1 text-left">
                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block border-b border-neutral-800/50 pb-1">Preferensi Sistem</span>
                
                <div className="space-y-3">
                  {/* Push Notification Toggle */}
                  <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
                    <div className="flex items-center space-x-2.5">
                      <Bell className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-[10px] font-black text-white">Notifikasi Browser</p>
                        <p className="text-[8px] text-gray-500">Izin push banner sistem</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={requestPushPermission}
                      className={`px-3 py-1 text-[8px] font-black uppercase tracking-wider rounded-lg transition-all ${pushPermission === 'granted' ? 'bg-blue-900/30 text-blue-400 border border-blue-900/50' : 'bg-neutral-800 text-gray-400 border border-neutral-700/50'}`}
                    >
                      {pushPermission === 'granted' ? "Aktif" : "Aktifkan"}
                    </button>
                  </div>

                  {/* Sape Background Audio Toggle */}
                  <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
                    <div className="flex items-center space-x-2.5">
                      <Volume2 className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="text-[10px] font-black text-white">Audio Sape' Latar</p>
                        <p className="text-[8px] text-gray-500">Auto-mute musik sape'</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsMusicMuted(!isMusicMuted)}
                      className={`px-3 py-1 text-[8px] font-black uppercase tracking-wider rounded-lg transition-all ${!isMusicMuted ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50' : 'bg-red-900/30 text-red-400 border border-red-900/50'}`}
                    >
                      {!isMusicMuted ? "Bersuara" : "Senyap"}
                    </button>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
                    <div className="flex items-center space-x-2.5">
                      <Compass className="w-4 h-4 text-purple-500" />
                      <div>
                        <p className="text-[10px] font-black text-white">Bahasa Aplikasi</p>
                        <p className="text-[8px] text-gray-500">Pilih bahasa interface</p>
                      </div>
                    </div>
                    <select
                      value={settingsLanguage}
                      onChange={(e) => {
                        setSettingsLanguage(e.target.value as any);
                        triggerPushNotification("🌐 Bahasa Diubah", `Aplikasi dialihkan ke Bahasa ${e.target.value === 'ID' ? 'Indonesia' : 'Inggris'}.`, "success");
                      }}
                      className="bg-neutral-900 border border-neutral-800 text-[10px] text-white p-1 rounded-lg focus:outline-none focus:border-blue-500 uppercase font-bold"
                    >
                      <option value="ID">ID (Indonesia)</option>
                      <option value="EN">EN (English)</option>
                    </select>
                  </div>

                  {/* Haptic Toggles */}
                  <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
                    <div className="flex items-center space-x-2.5">
                      <Lock className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-[10px] font-black text-white">Vibrasi Sentuhan</p>
                        <p className="text-[8px] text-gray-500">Simulasi haptic hibrid</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        setSettingsHaptic(!settingsHaptic);
                        triggerPushNotification("⚙️ Haptic Diperbarui", `Umpan balik sentuhan sekarang ${!settingsHaptic ? 'Aktif' : 'Non-aktif'}.`, "success");
                      }}
                      className={`px-3 py-1 text-[8px] font-black uppercase tracking-wider rounded-lg transition-all ${settingsHaptic ? 'bg-blue-900/30 text-blue-400 border border-blue-900/50' : 'bg-neutral-800 text-gray-400 border border-neutral-700/50'}`}
                    >
                      {settingsHaptic ? "Aktif" : "Non-aktif"}
                    </button>
                  </div>

                  {/* Replay Splash Screen */}
                  <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
                    <div className="flex items-center space-x-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <div>
                        <p className="text-[10px] font-black text-white">Putar Ulang Intro</p>
                        <p className="text-[8px] text-gray-500">Lihat intro liquid opening & logo</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        setShowSettingsModal(false);
                        setShowSplash(true);
                      }}
                      className="px-3 py-1 bg-amber-600/20 hover:bg-amber-600 text-amber-400 hover:text-white border border-amber-500/30 text-[8px] font-black uppercase tracking-wider rounded-lg transition-all"
                    >
                      Putar
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setShowSettingsModal(false);
                    triggerPushNotification("⚙️ Pengaturan Disimpan", "Preferensi sistem Anda berhasil disinkronkan secara lokal.", "success");
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs text-white font-black uppercase transition-all active:scale-95 text-center shadow-md"
                >
                  Simpan Preferensi
                </button>
              </div>
            )}

            {/* TAB CONTENT: PRIVACY POLICY */}
            {activeSettingsTab === 'privacy' && (
              <div className="space-y-3 pt-1 text-left">
                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block border-b border-neutral-800/50 pb-1">Kebijakan Privasi Eunoiaverse</span>
                
                <div className="bg-neutral-950 border border-neutral-800/80 p-3 rounded-2xl h-[220px] overflow-y-auto text-xs text-gray-400 space-y-3 leading-relaxed no-scrollbar">
                  <div>
                    <h4 className="font-black text-white text-[10px] uppercase font-mono tracking-wider">1. Kedaulatan Data</h4>
                    <p className="text-[9px] mt-0.5">Eunoiaverse berkomitmen penuh untuk melindungi privasi pengguna di wilayah Kutai Barat. Seluruh data profil Anda (nama, lokasi, foto profil, dan catatan kunjungan) disimpan sepenuhnya secara lokal di dalam browser Anda menggunakan media penyimpanan terenkripsi sandbox (localStorage).</p>
                  </div>
                  <div>
                    <h4 className="font-black text-white text-[10px] uppercase font-mono tracking-wider">2. Transaksi & Dompet Keamanan</h4>
                    <p className="text-[9px] mt-0.5">Saldo keuangan dompet lokal Anda, portofolio investasi komoditas, dan histori pertukaran transaksi murni disimpan secara sandboxed. Eunoiaverse tidak pernah membagikan atau menjual data aset finansial Anda kepada pihak ketiga.</p>
                  </div>
                  <div>
                    <h4 className="font-black text-white text-[10px] uppercase font-mono tracking-wider">3. Geolokasi & Navigasi Peta</h4>
                    <p className="text-[9px] mt-0.5">Kami memproses data koordinat geografis lokal hanya untuk menyelaraskan marker peta pariwisata Kutai Barat pada tab Jelajah. Data lokasi fisik waktu-nyata Anda diproses di sisi klien tanpa dikirimkan ke server pelacak eksternal.</p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-gray-300 font-bold transition-all active:scale-95 text-center mt-1"
                >
                  Saya Mengerti
                </button>
              </div>
            )}

            {/* TAB CONTENT: ABOUT FAQ */}
            {activeSettingsTab === 'faq' && (
              <div className="space-y-3 pt-1 text-left">
                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block border-b border-neutral-800/50 pb-1">FAQ & Bantuan Pengguna</span>
                
                <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 no-scrollbar">
                  {[
                    {
                      q: "Apa itu Eunoiaverse Kutai Barat?",
                      a: "Platform digital terpadu pariwisata, budaya, dan bursa komoditas lokal Kabupaten Kutai Barat (Kubar) untuk melestarikan kearifan lokal Dayak dan memberdayakan ekonomi warga."
                    },
                    {
                      q: "Bagaimana cara transaksi bursa komoditas?",
                      a: "Gunakan saldo dompet Kubar Anda untuk membeli unit komoditas (Rotan, Madu, Karet). Fluktuasi harga ditentukan oleh simulasi permintaan pasar lokal waktu nyata."
                    },
                    {
                      q: "Mengapa ada fitur Sape' Player?",
                      a: "Sape' Player menyintesis instrumen tradisional khas Suku Dayak secara organik lewat Web Audio API browser Anda untuk menciptakan pengalaman eksplorasi budaya yang imersif."
                    },
                    {
                      q: "Bagaimana mendaftarkan usaha lokal saya?",
                      a: "Anda dapat menghubungi tim kami di tab Komunitas atau mendaftarkan toko kerajinan Anda secara gratis melalui menu Dinas Koperasi di Melak."
                    }
                  ].map((faq, fIdx) => (
                    <div key={fIdx} className="bg-neutral-950 rounded-2xl border border-neutral-800/80 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setFaqExpandedIdx(faqExpandedIdx === fIdx ? null : fIdx)}
                        className="w-full p-3 flex justify-between items-center text-left hover:bg-neutral-900 transition-colors"
                      >
                        <span className="text-[10px] font-black text-white leading-tight">{faq.q}</span>
                        <ChevronRight className={`w-3.5 h-3.5 text-gray-500 transition-transform flex-shrink-0 ml-1.5 ${faqExpandedIdx === fIdx ? 'rotate-90' : ''}`} />
                      </button>
                      {faqExpandedIdx === fIdx && (
                        <div className="px-3 pb-3 pt-1 border-t border-neutral-900 text-[9px] text-gray-400 leading-relaxed font-sans">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-gray-300 font-bold transition-all active:scale-95 text-center mt-1"
                >
                  Kembali
                </button>
              </div>
            )}

            {/* TAB CONTENT: LOGOUT */}
            {activeSettingsTab === 'logout' && (
              <div className="space-y-4 pt-1 text-center">
                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block border-b border-neutral-800/50 pb-1 text-left">Konfirmasi Keluar Sesi</span>
                
                <div className="py-2.5 flex flex-col items-center">
                  <div className="w-14 h-14 bg-red-950/40 border border-red-900/50 text-red-500 rounded-full flex items-center justify-center mb-3">
                    <LogOut className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-black text-white">Keluar dari Eunoiaverse?</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed max-w-[280px] mt-1.5">
                    Tindakan ini akan menghapus data profil lokal Anda dari cache perangkat (localStorage) dan mengembalikan preferensi Anda ke bawaan pabrik.
                  </p>
                </div>

                <div className="flex space-x-2.5 pt-2 border-t border-neutral-800/50">
                  <button 
                    type="button"
                    onClick={() => setActiveSettingsTab('profile')}
                    className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-gray-400 font-bold transition-all active:scale-95"
                  >
                    Batal
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      // Perform logout logic: clear local identity and cache
                      localStorage.removeItem('profile_name');
                      localStorage.removeItem('profile_location');
                      localStorage.removeItem('profile_photo');
                      localStorage.removeItem('kubar_wallet_balance');
                      localStorage.removeItem('is_registered');
                      
                      // Reset to factory defaults
                      setProfileName('Edo Erpani');
                      setProfileLocation('Kalimantan, Indonesia');
                      setProfilePhoto('https://placehold.co/200?text=EDO');
                      setBalance(1500000);
                      setIsRegistered(false);
                      
                      setShowSettingsModal(false);
                      setActiveSettingsTab('profile');
                      setFaqExpandedIdx(null);
                      
                      // Force redirect to home page
                      setCurrentPage('home');
                      
                      triggerPushNotification(
                        "🚪 Berhasil Keluar",
                        "Sesi lokal Anda berhasil diakhiri dan data cache telah dibersihkan.",
                        "error"
                      );
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs text-white font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg"
                  >
                    Keluar Sesi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* 4. PROFILE TAB INTERACTIVE MODALS (ADD POST, ADD PORTFOLIO, DETAIL VIEWS) */}
      {/* ======================================================= */}

      {/* MODAL: ADD POST */}
      {showAddPostModal && (
        <div className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] w-full max-w-md p-6 space-y-4 shadow-2xl animate-scale-up text-left">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-blue-500 animate-pulse" />
                <h3 className="text-sm font-black uppercase tracking-wider text-white font-sans">Tambah Post Baru</h3>
              </div>
              <button 
                onClick={() => setShowAddPostModal(false)}
                className="p-1.5 rounded-xl bg-neutral-800 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newPostForm.title || !newPostForm.caption) {
                window.alert("Harap isi semua bidang!");
                return;
              }
              const post = {
                id: Date.now(),
                title: newPostForm.title,
                caption: newPostForm.caption,
                image: newPostForm.image,
                likes: 0,
                comments: 0,
                date: "Baru saja"
              };
              setProfilePosts([post, ...profilePosts]);
              setNewPostForm({ title: '', caption: '', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80' });
              setShowAddPostModal(false);
              triggerPushNotification("✨ Postingan Dibuat", "Foto petualangan Anda berhasil diposting di Galeri Eunoiaverse.", "success");
            }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Judul Postingan</label>
                <input 
                  type="text" 
                  value={newPostForm.title}
                  onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
                  placeholder="Contoh: Senja di Danau Jempang" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Teks Caption / Cerita</label>
                <textarea 
                  value={newPostForm.caption}
                  onChange={(e) => setNewPostForm({ ...newPostForm, caption: e.target.value })}
                  placeholder="Ceritakan keindahan destinasi, produk kerajinan, atau adat setempat..." 
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 resize-none font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider font-sans block mb-1">Pilih Gambar Inspiratif</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80"
                  ].map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewPostForm({ ...newPostForm, image: imgUrl })}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative cursor-pointer ${newPostForm.image === imgUrl ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/20' : 'border-neutral-800 opacity-60'}`}
                    >
                      <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
                <div className="mt-2.5">
                  <span className="text-[9px] text-gray-500 font-medium">Atau masukkan URL gambar kustom:</span>
                  <input 
                    type="url" 
                    value={newPostForm.image}
                    onChange={(e) => setNewPostForm({ ...newPostForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-[10px] text-gray-300 focus:outline-none mt-1"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer mt-2"
              >
                Kirim Postingan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PORTFOLIO */}
      {showAddPortfolioModal && (
        <div className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] w-full max-w-md p-6 space-y-4 shadow-2xl animate-scale-up text-left">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-black uppercase tracking-wider text-white font-sans">Tambah Portofolio Karya</h3>
              </div>
              <button 
                onClick={() => setShowAddPortfolioModal(false)}
                className="p-1.5 rounded-xl bg-neutral-800 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newPortfolioForm.title || !newPortfolioForm.description || !newPortfolioForm.role) {
                window.alert("Harap isi bidang judul, peran, dan deskripsi!");
                return;
              }
              const item = {
                id: Date.now(),
                title: newPortfolioForm.title,
                category: newPortfolioForm.category,
                description: newPortfolioForm.description,
                image: newPortfolioForm.image,
                year: newPortfolioForm.year,
                role: newPortfolioForm.role,
                badges: newPortfolioForm.badges ? newPortfolioForm.badges.split(',').map(b => b.trim()) : ["Karya Lokal"]
              };
              setProfilePortfolio([item, ...profilePortfolio]);
              setNewPortfolioForm({ title: '', category: 'Pelestarian Budaya', description: '', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80', year: '2026', role: '', badges: '' });
              setShowAddPortfolioModal(false);
              triggerPushNotification("💼 Portofolio Diperbarui", "Karya kontribusi budaya Anda berhasil dipublikasikan.", "success");
            }} className="space-y-3.5">
              
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Judul Karya / Proyek</label>
                  <input 
                    type="text" 
                    value={newPortfolioForm.title}
                    onChange={(e) => setNewPortfolioForm({ ...newPortfolioForm, title: e.target.value })}
                    placeholder="Nama karya" 
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Peran / Posisi Anda</label>
                  <input 
                    type="text" 
                    value={newPortfolioForm.role}
                    onChange={(e) => setNewPortfolioForm({ ...newPortfolioForm, role: e.target.value })}
                    placeholder="Contoh: Pengrajin Utama" 
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Kategori</label>
                  <select 
                    value={newPortfolioForm.category}
                    onChange={(e) => setNewPortfolioForm({ ...newPortfolioForm, category: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Pelestarian Budaya">Pelestarian Budaya</option>
                    <option value="Kerajinan Tangan">Kerajinan Tangan</option>
                    <option value="Ekowisata">Ekowisata</option>
                    <option value="Seni Adat">Seni Adat</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Tahun</label>
                  <input 
                    type="text" 
                    value={newPortfolioForm.year}
                    onChange={(e) => setNewPortfolioForm({ ...newPortfolioForm, year: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Deskripsi Karya</label>
                <textarea 
                  value={newPortfolioForm.description}
                  onChange={(e) => setNewPortfolioForm({ ...newPortfolioForm, description: e.target.value })}
                  placeholder="Detail karya, teknik pembuatan, bahan, atau manfaat proyek..." 
                  rows={2}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none resize-none font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Tag / Badges (pisahkan dengan koma)</label>
                <input 
                  type="text" 
                  value={newPortfolioForm.badges}
                  onChange={(e) => setNewPortfolioForm({ ...newPortfolioForm, badges: e.target.value })}
                  placeholder="Belian, Manik, Rotan, Anyaman" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider font-sans">Pilih Gambar Karya</label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {[
                    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
                  ].map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewPortfolioForm({ ...newPortfolioForm, image: imgUrl })}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative cursor-pointer ${newPortfolioForm.image === imgUrl ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/20' : 'border-neutral-800 opacity-60'}`}
                    >
                      <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-emerald-500/20 cursor-pointer mt-1"
              >
                Simpan ke Portofolio
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BOOKING & CHECKOUT PAYMENT FOR TRAVEL DESTINATION PACKAGES */}
      {showBookingModal && (() => {
        const dest = showBookingModal;
        const totalCost = bookingForm.qty * (dest.packagePrice || 450000);
        const hasSufficientWalletBalance = balance >= totalCost;

        const handleProceedToPayment = () => {
          if (!bookingForm.name || !bookingForm.contact || !bookingForm.date) {
            window.alert("Harap lengkapi semua bidang detail pemesanan!");
            return;
          }
          setBookingStep(2);
        };

        const handleConfirmPayment = () => {
          setIsProcessingBookingPayment(true);
          
          // Simulate payment network processing
          setTimeout(() => {
            setIsProcessingBookingPayment(false);

            if (selectedPaymentMethod === 'wallet') {
              if (!hasSufficientWalletBalance) {
                window.alert("Saldo wallet Anda tidak mencukupi!");
                return;
              }
              // Deduct wallet balance
              setBalance(prev => prev - totalCost);
              
              // Add wallet transaction
              const newTx = {
                label: `Booking ${dest.name} All-In`,
                val: `-Rp ${totalCost.toLocaleString('id-ID')}`,
                date: 'Hari ini',
                isNegative: true
              };
              setWalletTransactions([newTx, ...walletTransactions]);
            }

            // Create new booking object
            const bookingId = Math.floor(100000 + Math.random() * 900000);
            const newBooking = {
              id: bookingId,
              destId: dest.id,
              destName: dest.name,
              date: bookingForm.date,
              qty: bookingForm.qty,
              name: bookingForm.name,
              contact: bookingForm.contact,
              status: 'confirmed' as const,
              totalPrice: totalCost
            };

            setKubarBookings([newBooking, ...kubarBookings]);
            setBookingStep(3);
            triggerPushNotification("✨ Booking Sukses!", `Pemesanan paket ${dest.name} berhasil terkonfirmasi.`, "success");
          }, 1800);
        };

        return (
          <div className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] w-full max-w-md p-6 space-y-4 shadow-2xl animate-scale-up text-left relative overflow-hidden">
              {/* Modal Banner decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3.5">
                <div className="flex items-center space-x-2.5">
                  <Ticket className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">Checkout Paket Wisata</h3>
                    <p className="text-[9px] text-gray-500 font-bold font-mono">STEP {bookingStep} OF 3</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowBookingModal(null);
                    setBookingStep(1);
                  }}
                  className="p-1.5 rounded-xl bg-neutral-800 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step indicator pills */}
              <div className="flex space-x-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800/60">
                {[
                  { step: 1, label: "Data Pemesan" },
                  { step: 2, label: "Pembayaran" },
                  { step: 3, label: "E-Tiket Wisata" }
                ].map((s) => (
                  <div 
                    key={s.step}
                    className={`flex-1 py-1.5 text-center rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${bookingStep === s.step ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-500'}`}
                  >
                    {s.label}
                  </div>
                ))}
              </div>

              {/* STEP 1: BOOKING FORM */}
              {bookingStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center space-x-3 p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80">
                    <img src={dest.image} referrerPolicy="no-referrer" className="w-12 h-12 rounded-xl object-cover animate-pulse" alt="" />
                    <div>
                      <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">{dest.category}</span>
                      <h4 className="text-xs font-black text-white mt-1">{dest.name}</h4>
                      <p className="text-[10px] text-gray-500 font-medium font-mono">{dest.location}</p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Nama Lengkap Pemesan (Sesuai KTP)</label>
                      <input 
                        type="text"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white focus:outline-none transition-colors"
                        placeholder="Masukkan nama pemesan"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">No. Telepon / WhatsApp Kontak</label>
                      <input 
                        type="text"
                        value={bookingForm.contact}
                        onChange={(e) => setBookingForm({ ...bookingForm, contact: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white focus:outline-none transition-colors font-mono"
                        placeholder="Contoh: 0812-3456-7890"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Tanggal Perjalanan</label>
                        <input 
                          type="date"
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-white focus:outline-none transition-colors font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Jumlah Wisatawan</label>
                        <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl p-1.5 h-[38px] justify-between">
                          <button 
                            type="button"
                            onClick={() => setBookingForm({ ...bookingForm, qty: Math.max(1, bookingForm.qty - 1) })}
                            className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center font-black transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-black text-white font-mono">{bookingForm.qty}</span>
                          <button 
                            type="button"
                            onClick={() => setBookingForm({ ...bookingForm, qty: bookingForm.qty + 1 })}
                            className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center font-black transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Cost Breakdown */}
                  <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2 font-mono">
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span>Paket Wisata All-In ({bookingForm.qty} Orang)</span>
                      <span>{bookingForm.qty} x Rp {dest.packagePrice?.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span>Pajak Adat & Retribusi Pelestarian (10%)</span>
                      <span className="text-emerald-400">Rp 0 (Subsidi Komunitas)</span>
                    </div>
                    <div className="border-t border-neutral-850 pt-2 flex justify-between items-center">
                      <span className="text-xs font-black text-white uppercase tracking-wider">Total Pembayaran:</span>
                      <span className="text-sm font-black text-emerald-400">Rp {totalCost.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    Lanjut ke Metode Pembayaran
                  </button>
                </div>
              )}

              {/* STEP 2: PAYMENT METHOD */}
              {bookingStep === 2 && (
                <div className="space-y-4 animate-fade-in relative">
                  {isProcessingBookingPayment && (
                    <div className="absolute inset-0 bg-neutral-900/90 z-20 flex flex-col items-center justify-center space-y-4 rounded-3xl">
                      <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                      <p className="text-xs font-black text-white uppercase tracking-wider font-mono">Memproses Pembayaran Adat...</p>
                      <p className="text-[10px] text-gray-500">Mengamankan kuota tiket perjalanan Anda...</p>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Pilih Metode Pembayaran</h4>
                    
                    {/* OPTION A: KUBAR WALLET */}
                    <div 
                      onClick={() => setSelectedPaymentMethod('wallet')}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${selectedPaymentMethod === 'wallet' ? 'bg-emerald-950/20 border-emerald-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-750'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Wallet className={`w-5 h-5 ${selectedPaymentMethod === 'wallet' ? 'text-emerald-400' : 'text-gray-400'}`} />
                        <div>
                          <p className="text-xs font-black text-white">Eunoiaverse Kubar Wallet</p>
                          <p className="text-[10px] font-mono font-bold text-gray-500 mt-0.5">Saldo: Rp {balance.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!hasSufficientWalletBalance && (
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setBalance(prev => prev + 1000000);
                              triggerPushNotification("💰 Top Up Berhasil", "Menambahkan Rp 1.000.000 ke Kubar Wallet Anda.", "success");
                            }}
                            className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-[8px] font-black uppercase rounded-md border border-amber-500/30 hover:bg-amber-500 hover:text-white transition-all"
                          >
                            + Top Up
                          </button>
                        )}
                        <span className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${selectedPaymentMethod === 'wallet' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' : 'border-neutral-800'}`}>
                          {selectedPaymentMethod === 'wallet' && <span className="w-2 h-2 bg-emerald-400 rounded-full" />}
                        </span>
                      </div>
                    </div>

                    {/* OPTION B: BANK VIRTUAL ACCOUNT */}
                    <div 
                      onClick={() => setSelectedPaymentMethod('va')}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${selectedPaymentMethod === 'va' ? 'bg-blue-950/20 border-blue-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-750'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <CreditCard className={`w-5 h-5 ${selectedPaymentMethod === 'va' ? 'text-blue-400' : 'text-gray-400'}`} />
                          <div>
                            <p className="text-xs font-black text-white">Transfer Virtual Account (VA)</p>
                            <p className="text-[9px] text-gray-500 font-bold mt-0.5">Diverifikasi otomatis dalam 10 detik</p>
                          </div>
                        </div>
                        <span className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${selectedPaymentMethod === 'va' ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-neutral-800'}`}>
                          {selectedPaymentMethod === 'va' && <span className="w-2 h-2 bg-blue-400 rounded-full" />}
                        </span>
                      </div>

                      {selectedPaymentMethod === 'va' && (
                        <div className="mt-3.5 p-3 bg-neutral-950 rounded-xl border border-neutral-850 space-y-2 animate-fade-in font-mono text-[10px]">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">BNI Virtual Account:</span>
                            <div className="flex items-center space-x-1">
                              <span className="text-white font-black">8806 0812 3456 7890</span>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText("8806081234567890");
                                  triggerPushNotification("📋 Salin Berhasil", "VA disalin ke papan klip.", "success");
                                }}
                                className="text-blue-400 font-bold hover:underline"
                              >
                                [Salin]
                              </button>
                            </div>
                          </div>
                          <p className="text-[9px] text-gray-500 leading-tight">Gunakan ATM, M-Banking atau internet banking untuk menyelesaikan transaksi.</p>
                        </div>
                      )}
                    </div>

                    {/* OPTION C: QRIS PEMBAYARAN ADAT */}
                    <div 
                      onClick={() => setSelectedPaymentMethod('qris')}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${selectedPaymentMethod === 'qris' ? 'bg-amber-950/20 border-amber-500' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-750'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <QrCode className={`w-5 h-5 ${selectedPaymentMethod === 'qris' ? 'text-amber-400' : 'text-gray-400'}`} />
                          <div>
                            <p className="text-xs font-black text-white">QRIS Adat E-Payment</p>
                            <p className="text-[9px] text-gray-500 font-bold mt-0.5">Mendukung Gopay, OVO, ShopeePay & LinkAja</p>
                          </div>
                        </div>
                        <span className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${selectedPaymentMethod === 'qris' ? 'border-amber-500 bg-amber-500/20 text-amber-400' : 'border-neutral-800'}`}>
                          {selectedPaymentMethod === 'qris' && <span className="w-2 h-2 bg-amber-400 rounded-full" />}
                        </span>
                      </div>

                      {selectedPaymentMethod === 'qris' && (
                        <div className="mt-3.5 flex flex-col items-center justify-center p-4 bg-white rounded-2xl space-y-2 animate-fade-in">
                          <div className="w-32 h-32 bg-neutral-100 flex items-center justify-center relative rounded-xl border border-neutral-300">
                            {/* Simple beautiful matrix pattern mock */}
                            <div className="absolute inset-2 grid grid-cols-5 gap-1 opacity-80">
                              {Array.from({ length: 25 }).map((_, i) => (
                                <div key={i} className={`rounded-sm ${(i * 7 + 3) % 2 === 0 ? 'bg-neutral-900' : 'bg-transparent'}`} />
                              ))}
                            </div>
                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent animate-pulse" />
                            <span className="text-[9px] bg-black text-white px-1.5 py-0.5 rounded font-black font-mono z-10">QRIS LOKAL</span>
                          </div>
                          <p className="text-[8px] text-gray-500 font-mono">Pindai kode QRIS di atas untuk melakukan checkout</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary cost */}
                  <div className="p-3.5 bg-neutral-950 rounded-2xl border border-neutral-800 flex justify-between items-center font-mono">
                    <div>
                      <p className="text-[9px] text-gray-500">TOTAL PEMBAYARAN</p>
                      <p className="text-sm font-black text-white">Rp {totalCost.toLocaleString('id-ID')}</p>
                    </div>
                    <span className="text-[9px] text-emerald-400 bg-emerald-950/50 border border-emerald-900/40 px-2.5 py-1 rounded-xl font-bold">
                      Bebas Biaya Admin
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setBookingStep(1)}
                      className="flex-1 py-3 bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 rounded-xl text-xs font-black uppercase text-gray-400 transition-all text-center cursor-pointer"
                    >
                      Kembali
                    </button>
                    <button 
                      onClick={handleConfirmPayment}
                      disabled={selectedPaymentMethod === 'wallet' && !hasSufficientWalletBalance}
                      className={`flex-[2] py-3 text-center text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                        selectedPaymentMethod === 'wallet' && !hasSufficientWalletBalance
                          ? 'bg-neutral-800 text-neutral-600 border border-neutral-850 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      }`}
                    >
                      Konfirmasi & Bayar
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: BOOKING SUCCESS & E-TICKET */}
              {bookingStep === 3 && (
                <div className="space-y-4 animate-fade-in text-center">
                  <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30">
                    <Check className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">Pembayaran Sukses!</h4>
                    <p className="text-[10px] text-emerald-400 font-bold font-mono mt-0.5">E-Tiket Anda Telah Diterbitkan</p>
                  </div>

                  {/* High fidelity ticket render */}
                  <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800/80 text-left space-y-3 relative overflow-hidden font-mono text-[10px]">
                    <div className="absolute top-2 right-2 flex items-center space-x-1 text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900/30 px-2.5 py-0.5 rounded-full font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span>AKTIF</span>
                    </div>

                    <div className="border-b border-neutral-800 pb-2.5 space-y-1">
                      <span className="text-[8px] text-gray-600 font-extrabold uppercase tracking-widest block">DESTINASI IMPIAN</span>
                      <h5 className="text-xs font-black text-white leading-tight">{dest.name}</h5>
                      <p className="text-[9px] text-gray-500">{dest.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2.5 text-[9px]">
                      <div>
                        <span className="text-gray-500 block">NAMA PEMESAN</span>
                        <span className="text-gray-200 font-bold">{bookingForm.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">TANGGAL TRIP</span>
                        <span className="text-gray-200 font-bold">{bookingForm.date}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">JUMLAH WISATAWAN</span>
                        <span className="text-gray-200 font-bold">{bookingForm.qty} Orang</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">TOTAL PEMBAYARAN</span>
                        <span className="text-emerald-400 font-black">Rp {totalCost.toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-neutral-850 pt-3.5 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] text-gray-600 block">E-TICKET NUMBER</span>
                        <span className="text-[9px] text-white font-black">EUN-78329-KUBAR</span>
                      </div>
                      <div className="w-10 h-10 bg-white p-1 rounded-lg">
                        {/* QR Code placeholder mock */}
                        <div className="w-full h-full bg-neutral-950 rounded grid grid-cols-3 gap-0.5 p-0.5">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className={`rounded-sm ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleExportTicketPDF({
                        id: Math.floor(100000 + Math.random() * 900000),
                        destName: dest.name,
                        date: bookingForm.date,
                        name: bookingForm.name,
                        contact: bookingForm.contact,
                        qty: bookingForm.qty,
                        totalPrice: totalCost
                      })}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-black uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer animate-pulse"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Unduh PDF E-Tiket</span>
                    </button>

                    <button 
                      onClick={() => {
                        setShowBookingModal(null);
                        setBookingStep(1);
                        setCurrentPage('profile');
                        setProfileActiveTab('bookings');
                      }}
                      className="w-full py-3 bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 rounded-xl text-xs font-black uppercase text-gray-400 transition-all text-center cursor-pointer block"
                    >
                      Tutup & Lihat di Profil Anda
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* DETAIL DIALOG: POST */}
      {selectedPostDetail && (
        <div className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl animate-scale-up text-left flex flex-col max-h-[90vh]">
            <div className="relative aspect-square w-full">
              <img src={selectedPostDetail.image} className="w-full h-full object-cover" alt="" />
              <button 
                onClick={() => setSelectedPostDetail(null)}
                className="absolute top-4 right-4 p-2 bg-neutral-900/80 hover:bg-neutral-900 backdrop-blur-md rounded-full text-white cursor-pointer border border-neutral-800/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              <div>
                <h4 className="text-sm font-black text-white leading-tight">{selectedPostDetail.title}</h4>
                <p className="text-[10px] text-gray-500 uppercase font-bold font-mono mt-1">{selectedPostDetail.date}</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedPostDetail.caption}</p>
              
              <div className="flex items-center space-x-6 py-3 border-y border-neutral-800/60">
                <button 
                  onClick={() => {
                    const liked = selectedPostDetail.isLiked;
                    setSelectedPostDetail({
                      ...selectedPostDetail,
                      isLiked: !liked,
                      likes: liked ? selectedPostDetail.likes - 1 : selectedPostDetail.likes + 1
                    });
                    setProfilePosts(prev => prev.map(p => p.id === selectedPostDetail.id ? {
                      ...p,
                      likes: liked ? p.likes - 1 : p.likes + 1
                    } : p));
                  }}
                  className="flex items-center text-xs font-black text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Heart className={`w-5 h-5 mr-1.5 ${selectedPostDetail.isLiked ? 'text-red-500 fill-current' : ''}`} />
                  <span>{selectedPostDetail.likes} Menyukai</span>
                </button>
                <div className="flex items-center text-xs font-black text-gray-300">
                  <MessageCircle className="w-5 h-5 mr-1.5 text-blue-400" />
                  <span>{selectedPostDetail.comments} Komentar</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-1">
                <button 
                  onClick={() => {
                    if (window.confirm("Hapus postingan ini secara permanen dari Galeri Anda?")) {
                      setProfilePosts(prev => prev.filter(p => p.id !== selectedPostDetail.id));
                      setSelectedPostDetail(null);
                      triggerPushNotification("🗑️ Postingan Dihapus", "Postingan Anda telah dihapus.", "error");
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-red-900/30 hover:text-red-400 text-xs font-black uppercase text-gray-400 transition-all cursor-pointer"
                >
                  Hapus Postingan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL DIALOG: PORTFOLIO */}
      {selectedPortfolioDetail && (
        <div className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl animate-scale-up text-left flex flex-col max-h-[90vh]">
            <div className="relative h-48 w-full">
              <img src={selectedPortfolioDetail.image} className="w-full h-full object-cover" alt="" />
              <span className="absolute bottom-3 left-3 text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-neutral-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-neutral-800">
                {selectedPortfolioDetail.category}
              </span>
              <button 
                onClick={() => setSelectedPortfolioDetail(null)}
                className="absolute top-4 right-4 p-2 bg-neutral-900/80 hover:bg-neutral-900 backdrop-blur-md rounded-full text-white cursor-pointer border border-neutral-800/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto space-y-4 font-sans">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-black text-white leading-snug">{selectedPortfolioDetail.title}</h4>
                  <span className="text-xs font-bold text-gray-500 font-mono flex-shrink-0 ml-3">{selectedPortfolioDetail.year}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-black uppercase mt-1">Peran: <span className="text-blue-400">{selectedPortfolioDetail.role}</span></p>
              </div>

              <div className="space-y-1.5">
                <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Deskripsi Karya / Program</h5>
                <p className="text-xs text-gray-300 leading-relaxed">{selectedPortfolioDetail.description}</p>
              </div>

              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Kualifikasi & Badges</h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPortfolioDetail.badges.map((b: string, i: number) => (
                    <span key={i} className="text-[9px] font-bold text-gray-400 bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800/50">
                      #{b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-3 border-t border-neutral-800/60">
                <button 
                  onClick={() => {
                    if (window.confirm("Hapus portofolio karya ini dari profil Anda?")) {
                      setProfilePortfolio(prev => prev.filter(item => item.id !== selectedPortfolioDetail.id));
                      setSelectedPortfolioDetail(null);
                      triggerPushNotification("🗑️ Portofolio Dihapus", "Karya telah dihapus dari portofolio Anda.", "error");
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-red-900/30 hover:text-red-400 text-xs font-black uppercase text-gray-400 transition-all cursor-pointer text-center"
                >
                  Hapus dari Portofolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
