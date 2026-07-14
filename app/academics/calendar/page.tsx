'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendar, FaDownload, FaPrint, FaSearch, FaGlassCheers,
  FaGraduationCap, FaUsers, FaFlag, FaStar, FaHome, FaFilter,
  FaMapMarkerAlt, FaClock, FaBirthdayCake, FaMagic,
} from 'react-icons/fa';
import {
  BiChevronUp, BiChevronDown, BiChevronRight, BiTrophy,
  BiBookOpen, BiMedal, BiHappyBeaming,
} from 'react-icons/bi';
import { MdCheckCircle } from 'react-icons/md';
import { FiAlertCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

// Types
interface Holiday {
  date: string;
  day: string;
  name: string;
  category: 'national' | 'festival' | 'vacation';
  isVacation?: boolean;
}

interface Exam {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  classes: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description?: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  day: string;
  category: string;
  description?: string;
}

interface PTM {
  id: string;
  title: string;
  date: string;
  day: string;
  time: string;
  classes: string;
  venue: string;
  description?: string;
}

interface Competition {
  id: string;
  name: string;
  date: string;
  day: string;
  category: string;
  prize?: string;
  description?: string;
}

// Data
const holidaysData: Holiday[] = [
  { date: '14 January', day: 'Tuesday', name: 'Makar Sankranti', category: 'festival' },
  { date: '26 January', day: 'Sunday', name: 'Republic Day', category: 'national' },
  { date: '26 February', day: 'Wednesday', name: 'Maha Shivratri', category: 'festival' },
  { date: '14 March', day: 'Friday', name: 'Holi', category: 'festival' },
  { date: '31 March', day: 'Monday', name: 'Eid-ul-Fitr', category: 'festival' },
  { date: '18 April', day: 'Friday', name: 'Good Friday', category: 'festival' },
  { date: '12 May', day: 'Monday', name: 'Buddha Purnima', category: 'festival' },
  { date: '15 August', day: 'Friday', name: 'Independence Day', category: 'national' },
  { date: '27 August', day: 'Wednesday', name: 'Ganesh Chaturthi', category: 'festival' },
  { date: '2 October', day: 'Thursday', name: 'Gandhi Jayanti', category: 'national' },
  { date: '20 October', day: 'Monday', name: 'Diwali Vacation Start', category: 'vacation', isVacation: true },
  { date: '5 November', day: 'Wednesday', name: 'Guru Nanak Jayanti', category: 'festival' },
  { date: '25 December', day: 'Thursday', name: 'Christmas', category: 'national' },
];

const vacationsData: Holiday[] = [
  { date: '1 May - 30 June', day: '', name: 'Summer Vacation', category: 'vacation', isVacation: true },
  { date: '20 December - 5 January', day: '', name: 'Winter Vacation', category: 'vacation', isVacation: true },
  { date: '10 October - 19 October', day: '', name: 'Dussehra Break', category: 'vacation', isVacation: true },
  { date: '20 October - 4 November', day: '', name: 'Diwali Break', category: 'vacation', isVacation: true },
];

const examsData: Exam[] = [
  {
    id: '1',
    name: 'Unit Test 1',
    startDate: '15 April 2026',
    endDate: '25 April 2026',
    classes: 'Nursery - Class 10',
    status: 'completed',
    description: 'First periodic assessment',
  },
  {
    id: '2',
    name: 'Periodic Test 1',
    startDate: '20 July 2026',
    endDate: '1 August 2026',
    classes: 'Class 1 - Class 10',
    status: 'completed',
    description: 'First half yearly assessment',
  },
  {
    id: '3',
    name: 'Half Yearly Examination',
    startDate: '15 September 2026',
    endDate: '30 September 2026',
    classes: 'Class 1 - Class 10',
    status: 'ongoing',
    description: 'Comprehensive mid-term examination',
  },
  {
    id: '4',
    name: 'Periodic Test 2',
    startDate: '10 November 2026',
    endDate: '20 November 2026',
    classes: 'Class 1 - Class 10',
    status: 'upcoming',
    description: 'Second periodic assessment',
  },
  {
    id: '5',
    name: 'Pre-Board Examination',
    startDate: '5 January 2027',
    endDate: '20 January 2027',
    classes: 'Class 9 - Class 10',
    status: 'upcoming',
    description: 'Board exam preparation',
  },
  {
    id: '6',
    name: 'Final Examination',
    startDate: '1 February 2027',
    endDate: '15 February 2027',
    classes: 'Nursery - Class 8',
    status: 'upcoming',
    description: 'Annual final examination',
  },
];

const eventsData: Event[] = [
  { id: '1', name: 'Sports Day', date: '15 November 2026', day: 'Saturday', category: 'Sports', description: 'Annual sports meet with various competitions' },
  { id: '2', name: 'Annual Function', date: '20 December 2026', day: 'Saturday', category: 'Cultural', description: 'School annual day celebration' },
  { id: '3', name: 'Science Exhibition', date: '10 October 2026', day: 'Friday', category: 'Academic', description: 'Student science projects exhibition' },
  { id: '4', name: 'Yoga Day', date: '21 June 2026', day: 'Sunday', category: 'Wellness', description: 'International Yoga Day celebration' },
  { id: '5', name: 'Environment Day', date: '5 June 2026', day: 'Thursday', category: 'Awareness', description: 'Tree plantation and awareness drive' },
  { id: '6', name: "Teachers' Day", date: '5 September 2026', day: 'Friday', category: 'Celebration', description: 'Celebrating educators' },
  { id: '7', name: "Children's Day", date: '14 November 2026', day: 'Friday', category: 'Celebration', description: 'Special activities for students' },
  { id: '8', name: 'Independence Day Celebration', date: '15 August 2026', day: 'Friday', category: 'National', description: 'Flag hoisting and cultural programs' },
  { id: '9', name: 'Republic Day Celebration', date: '26 January 2027', day: 'Monday', category: 'National', description: 'Patriotic performances and parade' },
  { id: '10', name: 'Christmas Celebration', date: '25 December 2026', day: 'Thursday', category: 'Cultural', description: 'Festive celebrations and activities' },
  { id: '11', name: 'Graduation Day', date: '30 April 2027', day: 'Thursday', category: 'Academic', description: 'Class 10 farewell ceremony' },
  { id: '12', name: 'Field Trip', date: '25 October 2026', day: 'Saturday', category: 'Educational', description: 'Educational excursion' },
];

const ptmData: PTM[] = [
  { id: '1', title: 'PTM 1 - Progress Review', date: '20 April 2026', day: 'Monday', time: '9:00 AM - 1:00 PM', classes: 'All Classes', venue: 'School Auditorium', description: 'First term progress discussion' },
  { id: '2', title: 'PTM 2 - Mid-Term Discussion', date: '15 October 2026', day: 'Wednesday', time: '9:00 AM - 2:00 PM', classes: 'All Classes', venue: 'School Auditorium', description: 'Half yearly results and feedback' },
  { id: '3', title: 'PTM 3 - Annual Report', date: '20 March 2027', day: 'Friday', time: '10:00 AM - 2:00 PM', classes: 'All Classes', venue: 'School Auditorium', description: 'Annual report card distribution' },
];

const competitionsData: Competition[] = [
  { id: '1', name: 'Drawing Competition', date: '15 June 2026', day: 'Sunday', category: 'Art', description: 'Theme-based drawing contest', prize: 'Trophy + Certificate' },
  { id: '2', name: 'Quiz Competition', date: '25 June 2026', day: 'Wednesday', category: 'Academic', description: 'Inter-house quiz championship', prize: 'Medals + Certificate' },
  { id: '3', name: 'Debate Competition', date: '10 July 2026', day: 'Friday', category: 'Literary', description: 'English & Hindi debate', prize: 'Trophy + Certificate' },
  { id: '4', name: 'Essay Writing', date: '20 July 2026', day: 'Monday', category: 'Literary', description: 'Creative writing competition', prize: 'Certificate' },
  { id: '5', name: 'Dance Competition', date: '5 August 2026', day: 'Wednesday', category: 'Cultural', description: 'Solo & Group dance', prize: 'Trophy + Certificate' },
  { id: '6', name: 'Singing Competition', date: '12 August 2026', day: 'Wednesday', category: 'Cultural', description: 'Solo singing contest', prize: 'Certificate' },
  { id: '7', name: 'Science Fair', date: '20 August 2026', day: 'Thursday', category: 'Academic', description: 'Innovative project exhibition', prize: 'Trophy + Certificate' },
  { id: '8', name: 'Coding Competition', date: '5 September 2026', day: 'Friday', category: 'Technical', description: 'Programming challenge', prize: 'Laptop + Certificate' },
  { id: '9', name: 'Math Olympiad', date: '15 September 2026', day: 'Tuesday', category: 'Academic', description: 'Mathematics competition', prize: 'Medal + Certificate' },
];

// Tab types
type TabType = 'holidays' | 'exams' | 'events' | 'ptm' | 'competitions';

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'holidays', label: 'Holidays', icon: <FaCalendar className="w-4 h-4" /> },
  { id: 'exams', label: 'Exams', icon: <BiBookOpen className="w-4 h-4" /> },
  { id: 'events', label: 'Events', icon: <FaGlassCheers className="w-4 h-4" /> },
  { id: 'ptm', label: 'PTM', icon: <FaUsers className="w-4 h-4" /> },
  { id: 'competitions', label: 'Competitions', icon: <BiTrophy className="w-4 h-4" /> },
];

// Badge component
const CategoryBadge = ({ category }: { category: string }) => {
  const styles: Record<string, string> = {
    national: 'bg-red-100 text-red-700 border-red-200',
    festival: 'bg-amber-100 text-amber-700 border-amber-200',
    vacation: 'bg-blue-100 text-blue-700 border-blue-200',
    nationalHoliday: 'bg-red-100 text-red-700 border-red-200',
    schoolVacation: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${styles[category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {category === 'nationalHoliday' ? 'National Holiday' : category === 'schoolVacation' ? 'School Vacation' : category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
};

// Status Badge component
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    completed: 'bg-green-100 text-green-700 border-green-200',
    ongoing: 'bg-orange-100 text-orange-700 border-orange-200',
    upcoming: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Main Component
export default function AcademicCalendarPage() {
  const [activeTab, setActiveTab] = useState<TabType>('holidays');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Download PDF (placeholder)
  const handleDownload = () => {
    alert('PDF download functionality will be implemented with server-side generation.');
  };

  // Filter data based on search and month
  const filterBySearch = <T extends { name?: string; title?: string }>(items: T[]) => {
    if (!searchQuery) return items;
    return items.filter(item =>
      (item.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (item.title?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );
  };

  // Get upcoming event
  const getUpcomingEvent = () => {
    const today = new Date();
    const upcoming = eventsData
      .filter(event => new Date(event.date) > today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
    return upcoming;
  };

  const upcomingEvent = getUpcomingEvent();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-orange-900/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                Academic Calendar 2026–27
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                Stay updated with holidays, examinations, school events, PTMs, competitions, and important academic activities.
              </p>
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                <FaHome className="w-4 h-4" />
                <span>Home</span>
                <BiChevronRight className="w-4 h-4" />
                <span>Academics</span>
                <BiChevronRight className="w-4 h-4" />
                <span className="text-white font-medium">Academic Calendar</span>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-end mb-6"
        >
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-orange-600 border border-gray-100"
          >
            <FaDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-orange-600 border border-gray-100"
          >
            <FaPrint className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </motion.div>

        {/* Upcoming Event Highlight */}
        {upcomingEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-[2px]">
              <div className="relative bg-white rounded-[14px] p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <FaMagic className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                        Upcoming Event
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{upcomingEvent.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{upcomingEvent.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-4 h-4" />
                        {upcomingEvent.date} ({upcomingEvent.day})
                      </span>
                      <span className="flex items-center gap-1">
                        <FaFlag className="w-4 h-4" />
                        {upcomingEvent.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isSearchFocused ? 'text-orange-500' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search events, exams, holidays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <AiOutlineClose className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full sm:w-48 pl-12 pr-10 py-3 bg-white rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 shadow-sm appearance-none cursor-pointer"
              >
                <option value="all">All Months</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
                <option value="may">May</option>
                <option value="jun">June</option>
                <option value="jul">July</option>
                <option value="aug">August</option>
                <option value="sep">September</option>
                <option value="oct">October</option>
                <option value="nov">November</option>
                <option value="dec">December</option>
              </select>
              <BiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex overflow-x-auto pb-2 gap-2 bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Holidays Tab */}
            {activeTab === 'holidays' && (
              <div className="space-y-8">
                {/* Vacations Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FaStar className="w-5 h-5 text-blue-600" />
                    </div>
                    School Vacations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vacationsData.map((vacation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FaCalendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{vacation.name}</h4>
                            <p className="text-sm text-gray-600">{vacation.date}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Holidays by Month */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <FaCalendar className="w-5 h-5 text-orange-600" />
                    </div>
                    Holidays & Festivals
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {filterBySearch(holidaysData).map((holiday, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -4, transition: { duration: 0.3 } }}
                        className="group relative bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <span className="text-orange-600 font-bold text-sm">
                              {holiday.date.split(' ')[0]}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-1">{holiday.name}</h4>
                            <p className="text-sm text-gray-500 mb-2">{holiday.day}</p>
                            <CategoryBadge category={holiday.category} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Legend */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4">Holiday Categories</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-100 border border-red-200 rounded-full" />
                      <span className="text-sm text-gray-600">National Holidays</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-amber-100 border border-amber-200 rounded-full" />
                      <span className="text-sm text-gray-600">Festival Holidays</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded-full" />
                      <span className="text-sm text-gray-600">School Vacations</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exams Tab */}
            {activeTab === 'exams' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterBySearch(examsData).map((exam, index) => (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                          <BiBookOpen className="w-6 h-6 text-orange-600" />
                        </div>
                        <StatusBadge status={exam.status} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{exam.name}</h3>
                      {exam.description && (
                        <p className="text-sm text-gray-600 mb-4">{exam.description}</p>
                      )}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaCalendar className="w-4 h-4" />
                          <span>{exam.startDate} - {exam.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaGraduationCap className="w-4 h-4" />
                          <span>{exam.classes}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-amber-300 to-orange-300" />
                <div className="space-y-6">
                  {filterBySearch(eventsData).map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex flex-col md:flex-row gap-4 ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <div className="flex-1 md:text-right">
                        {index % 2 === 0 ? (
                          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 ml-8 md:ml-0">
                            <div className="flex items-start gap-4 md:flex-row-reverse">
                              <div className="p-3 bg-orange-100 rounded-xl">
                                <FaGlassCheers className="w-6 h-6 text-orange-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                                {event.description && (
                                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                                )}
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 md:justify-end">
                                  <span className="flex items-center gap-1">
                                    <FaCalendar className="w-4 h-4" />
                                    {event.date}
                                  </span>
                                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
                                    {event.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 ml-8 md:ml-0">
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-orange-100 rounded-xl">
                                <FaGlassCheers className="w-6 h-6 text-orange-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                                {event.description && (
                                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                                )}
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <FaCalendar className="w-4 h-4" />
                                    {event.date}
                                  </span>
                                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
                                    {event.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg" />
                      <div className="hidden md:block flex-1" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* PTM Tab */}
            {activeTab === 'ptm' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterBySearch(ptmData).map((ptm, index) => (
                    <motion.div
                      key={ptm.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                          <FaUsers className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{ptm.title}</h3>
                          {ptm.description && (
                            <p className="text-sm text-gray-600">{ptm.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaCalendar className="w-4 h-4" />
                          <span>{ptm.date} ({ptm.day})</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaClock className="w-4 h-4" />
                          <span>{ptm.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaGraduationCap className="w-4 h-4" />
                          <span>{ptm.classes}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaMapMarkerAlt className="w-4 h-4" />
                          <span>{ptm.venue}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Competitions Tab */}
            {activeTab === 'competitions' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterBySearch(competitionsData).map((comp, index) => (
                    <motion.div
                      key={comp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-orange-100 rounded-xl">
                          <BiTrophy className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{comp.name}</h3>
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
                            {comp.category}
                          </span>
                        </div>
                      </div>
                      {comp.description && (
                        <p className="text-sm text-gray-600 mb-4">{comp.description}</p>
                      )}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaCalendar className="w-4 h-4" />
                          <span>{comp.date} ({comp.day})</span>
                        </div>
                        {comp.prize && (
                          <div className="flex items-center gap-2 text-amber-600">
                            <FaStar className="w-4 h-4" />
                            <span className="font-medium">{comp.prize}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            aria-label="Back to top"
          >
            <BiChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 R.M. Suncity School. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}