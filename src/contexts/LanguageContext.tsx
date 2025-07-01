
import React, { createContext, useState, useContext, useEffect } from "react";

type SupportedLanguage = "en" | "am" | "or";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    // Try to get language from localStorage
    const storedLanguage = localStorage.getItem("language") as SupportedLanguage;
    return storedLanguage && ["en", "am", "or"].includes(storedLanguage) ? storedLanguage : "en";
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translationKey = key.toLowerCase().replace(/\s+/g, "_");
    if (!translationKey) return key;
    
    const translation = translations[translationKey]?.[language];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Translations object with all translatable strings
const translations: Record<string, Record<SupportedLanguage, string>> = {
  // Common words and phrases
  "students": {
    "en": "Students",
    "am": "ተማሪዎች",
    "or": "Barattoota"
  },
  "teachers": {
    "en": "Teachers",
    "am": "መምህራን",
    "or": "Barsiisota"
  },
  "subjects": {
    "en": "Subjects",
    "am": "ትምህርቶች",
    "or": "Qabiyyeewwan"
  },
  "grades": {
    "en": "Grades",
    "am": "ውጤቶች",
    "or": "Qabxiiwwan"
  },
  "attendance": {
    "en": "Attendance",
    "am": "የመገኘት መዝገብ",
    "or": "Dhiyeenya"
  },
  "exams": {
    "en": "Exams",
    "am": "ፈተናዎች",
    "or": "Qormaata"
  },
  "dashboard": {
    "en": "Dashboard",
    "am": "ዳሽቦርድ",
    "or": "Dashboordii"
  },
  "academic_calendar": {
    "en": "Academic Calendar",
    "am": "የትምህርት የካላንደር",
    "or": "Kaaleendara Barnootaa"
  },
  "reports_&_statistics": {
    "en": "Reports & Statistics",
    "am": "ሪፖርቶች እና ስታቲስቲክስ",
    "or": "Gabaasaafi Istaatistiksii"
  },
  "settings": {
    "en": "Settings",
    "am": "ቅንጅቶች",
    "or": "Qindaa'inoota"
  },

  // Dashboard translations
  "total_students": {
    "en": "Total Students",
    "am": "ጠቅላላ ተማሪዎች",
    "or": "Barattoota Waliigala"
  },
  "total_teachers": {
    "en": "Total Teachers",
    "am": "ጠቅላላ መምህራን",
    "or": "Barsiisota Waliigala"
  },
  "average_attendance": {
    "en": "Average Attendance",
    "am": "አማካይ የመገኘት መዝገብ",
    "or": "Giddugaleessa Dhiyeenya"
  },
  "average_grade": {
    "en": "Average Grade",
    "am": "አማካይ ውጤት",
    "or": "Giddugaleessa Qabxii"
  },
  "students_by_grade": {
    "en": "Students by Grade",
    "am": "ተማሪዎች በክፍል",
    "or": "Barattoota Kutaatiin"
  },
  "gender_distribution": {
    "en": "Gender Distribution",
    "am": "የፆታ ስርጭት",
    "or": "Raabsa Koorniyaa"
  },
  "male": {
    "en": "Male",
    "am": "ወንድ",
    "or": "Dhiira"
  },
  "female": {
    "en": "Female",
    "am": "ሴት",
    "or": "Dubartii"
  },
  "monthly_attendance_rate": {
    "en": "Monthly Attendance Rate",
    "am": "የወር የመገኘት መጠን",
    "or": "Hanga Dhiyeenya Ji'aa"
  },
  "inmate_vs._non-inmate_students": {
    "en": "Inmate vs. Non-Inmate Students",
    "am": "የማረሚያ ቤት እና የማረሚያ ቤት ያልሆኑ ተማሪዎች",
    "or": "Barattoota Mana Sirreessaa fi Mana Sirreessaa Hin Taane"
  },
  "inmates": {
    "en": "Inmates",
    "am": "የማረሚያ ቤት ተማሪዎች",
    "or": "Mana Sirreessaa"
  },
  "non-inmates": {
    "en": "Non-Inmates",
    "am": "የማረሚያ ቤት ያልሆኑ ተማሪዎች",
    "or": "Mana Sirreessaa Hin Taane"
  },
  "quick_links": {
    "en": "Quick Links",
    "am": "ፈጣን ማስፈንጠሪያዎች",
    "or": "Hankaakuu"
  },
  "student_registration": {
    "en": "Student Registration",
    "am": "የተማሪ ምዝገባ",
    "or": "Galmee Barattootaa"
  },
  "today's_attendance": {
    "en": "Today's Attendance",
    "am": "የዛሬ የመገኘት መዝገብ",
    "or": "Dhiyeenya Hardha"
  },
  "upcoming_exams": {
    "en": "Upcoming Exams",
    "am": "መጪ ፈተናዎች",
    "or": "Qormaata Dhufuu"
  },
  "generate_reports": {
    "en": "Generate Reports",
    "am": "ሪፖርቶችን ፍጠር",
    "or": "Gabaasa Uumi"
  },
  "next_important_dates": {
    "en": "Next important dates",
    "am": "ቀጣዮቹ አስፈላጊ ቀናት",
    "or": "Guyyaa Barbaachisaa Itti Aanuu"
  },
  "mid-term_exams": {
    "en": "Mid-term Exams",
    "am": "የመካከለኛ ተርም ፈተናዎች",
    "or": "Qormaata Giddugaleessaa"
  },
  "parents_meeting": {
    "en": "Parents Meeting",
    "am": "የወላጆች ስብሰባ",
    "or": "Wal'gahii Maatii"
  },
  "winter_break": {
    "en": "Winter Break",
    "am": "የክረምት እረፍት",
    "or": "Boqonnaa Ganna"
  },
  "all_grades": {
    "en": "All grades",
    "am": "ሁሉም ክፍሎች",
    "or": "Kutaalee Hunda"
  },
  "school_closed": {
    "en": "School closed",
    "am": "ትምህርት ቤት ተዘግቷል",
    "or": "Manni Barnootaa Cufameera"
  },
  "view_full_calendar": {
    "en": "View Full Calendar",
    "am": "ሙሉ የካላንደር ይመልከቱ",
    "or": "Kaaleendara Guutuu Ilaali"
  },
  "new_student_registered": {
    "en": "New Student Registered",
    "am": "አዲስ ተማሪ ተመዝግቧል",
    "or": "Barataan Haaraan Galmaa'eera"
  },
  "final_exam_results_posted": {
    "en": "Final Exam Results Posted",
    "am": "የመጨረሻ ፈተና ውጤቶች ተለጥፈዋል",
    "or": "Bu'aan Qormaata Xumuraa Maxxanfameera"
  },
  "attendance_report_generated": {
    "en": "Attendance Report Generated",
    "am": "የመገኘት መዝገብ ሪፖርት ተፈጥሯል",
    "or": "Gabaasni Dhiyeenyaa Uumameera"
  },
  "new_teacher_joined": {
    "en": "New Teacher Joined",
    "am": "አዲስ መምህር ተቀላቅሏል",
    "or": "Barsiisaan Haaraan Makameera"
  },
  "new_course_added": {
    "en": "New Course Added",
    "am": "አዲስ ኮርስ ተጨምሯል",
    "or": "Koorsi Haaraan Ida'ameera"
  },
  "today_at_10:30_am": {
    "en": "Today at 10:30 AM",
    "am": "ዛሬ በ 10:30 ጥዋት",
    "or": "Hardha sa'a 10:30 WD"
  },
  "yesterday_at_3:45_pm": {
    "en": "Yesterday at 3:45 PM",
    "am": "ትላንት በ 3:45 ከሰዓት",
    "or": "Kaleessa sa'a 3:45 WB"
  },
  "yesterday_at_1:20_pm": {
    "en": "Yesterday at 1:20 PM",
    "am": "ትላንት በ 1:20 ከሰዓት",
    "or": "Kaleessa sa'a 1:20 WB"
  },
  "2_days_ago": {
    "en": "2 days ago",
    "am": "ከ 2 ቀናት በፊት",
    "or": "Guyyaa 2 dura"
  },
  "3_days_ago": {
    "en": "3 days ago",
    "am": "ከ 3 ቀናት በፊት",
    "or": "Guyyaa 3 dura"
  },
  "abebe_kebede_has_been_registered_as_a_new_student_in_grade_8.": {
    "en": "Abebe Kebede has been registered as a new student in Grade 8.",
    "am": "አበበ ከበደ በ8ኛ ክፍል እንደ አዲስ ተማሪ ተመዝግቧል።",
    "or": "Abebe Kebeden Grade 8 keessatti akka barataa haaraatti galmaa'eera."
  },
  "grade_10_mathematics_final_exam_results_have_been_posted.": {
    "en": "Grade 10 Mathematics final exam results have been posted.",
    "am": "የ10ኛ ክፍል ሒሳብ የመጨረሻ ፈተና ውጤቶች ተለጥፈዋል።",
    "or": "Bu'aan qormaata xumuraa Herregaa Grade 10 maxxanfameera."
  },
  "monthly_attendance_report_for_grade_6_has_been_generated.": {
    "en": "Monthly attendance report for Grade 6 has been generated.",
    "am": "ለ6ኛ ክፍል የወር የመገኘት መዝገብ ሪፖርት ተፈጥሯል።",
    "or": "Gabaasni dhiyeenya ji'aa Grade 6 tiif uumameera."
  },
  "solomon_haile_has_joined_as_an_english_teacher.": {
    "en": "Solomon Haile has joined as an English teacher.",
    "am": "ሰለሞን ኃይሌ እንደ እንግሊዝኛ መምህር ተቀላቅሏል።",
    "or": "Solomon Haile barsiisaa Afaan Ingilizii ta'ee makameera."
  },
  "afan_oromo_literature_has_been_added_to_grade_9_curriculum.": {
    "en": "Afan Oromo Literature has been added to Grade 9 curriculum.",
    "am": "የኦሮምኛ ሥነ-ጽሑፍ ወደ 9ኛ ክፍል ሥርዓተ ትምህርት ተጨምሯል።",
    "or": "Ogbarruu Afaan Oromoo sirna barnootaa Grade 9 keessatti ida'ameera."
  },
  "jan": { "en": "Jan", "am": "ጃንዩ", "or": "Ama" },
  "feb": { "en": "Feb", "am": "ፌብሩ", "or": "Gur" },
  "mar": { "en": "Mar", "am": "ማርች", "or": "Bit" },
  "apr": { "en": "Apr", "am": "ኤፕሪ", "or": "Ebla" },
  "may": { "en": "May", "am": "ሜይ", "or": "Caam" },
  "jun": { "en": "Jun", "am": "ጁን", "or": "Wax" },
  "jul": { "en": "Jul", "am": "ጁላይ", "or": "Ado" },
  "aug": { "en": "Aug", "am": "ኦገስት", "or": "Hag" },
  "sep": { "en": "Sep", "am": "ሴፕቴ", "or": "Ful" },
  "oct": { "en": "Oct", "am": "ኦክቶ", "or": "Onk" },
  "nov": { "en": "Nov", "am": "ኖቬም", "or": "Sad" },
  "dec": { "en": "Dec", "am": "ዲሴም", "or": "Mud" },
  "dec_10-15": { "en": "Dec 10-15", "am": "ዲሴም 10-15", "or": "Mud 10-15" },
  "dec_20": { "en": "Dec 20", "am": "ዲሴም 20", "or": "Mud 20" },
  "dec_25-jan_5": { "en": "Dec 25-Jan 5", "am": "ዲሴም 25-ጃንዩ 5", "or": "Mud 25-Ama 5" },
  "academic_year": { "en": "Academic Year", "am": "የትምህርት ዓመት", "or": "Waggaa Barnootaa" },
  
  // Calendar translations
  "calendar": {
    "en": "Calendar",
    "am": "ካላንደር",
    "or": "Kaaleendara"
  },
  "view_and_manage_academic_events_and_schedules": {
    "en": "View and manage academic events and schedules",
    "am": "የትምህርት ዝግጅቶችን እና የጊዜ ሰሌዳዎችን ይመልከቱ እና ያስተዳድሩ",
    "or": "Sagantaa fi sirna barnootaa ilaalaa fi bulchaa"
  },
  "events_on": {
    "en": "Events on",
    "am": "ዝግጅቶች በ",
    "or": "Sagantaalee guyyaa"
  },
  "add_event": {
    "en": "Add Event",
    "am": "ዝግጅት አክል",
    "or": "Sagantaa Dabaluu"
  },
  "all_event_types": {
    "en": "All Event Types",
    "am": "ሁሉም የዝግጅት አይነቶች",
    "or": "Gosa Sagantaa Hunda"
  },
  "academic": {
    "en": "Academic",
    "am": "የትምህርት",
    "or": "Barnootaa"
  },
  "exam": {
    "en": "Exam",
    "am": "ፈተና",
    "or": "Qormaata"
  },
  "meeting": {
    "en": "Meeting",
    "am": "ስብሰባ",
    "or": "Wal'gahii"
  },
  "holiday": {
    "en": "Holiday",
    "am": "የበዓል ቀን",
    "or": "Ayyaana"
  },
  "school_event": {
    "en": "School Event",
    "am": "የትምህርት ቤት ዝግጅት",
    "or": "Sagantaa Mana Barnootaa"
  },
  "first_day_of_school": {
    "en": "First Day of School",
    "am": "የትምህርት መጀመሪያ ቀን",
    "or": "Guyyaa Jalqabaa Mana Barnootaa"
  },
  "mid-term_examination": {
    "en": "Mid-term Examination",
    "am": "የመካከለኛ ክፍለ ጊዜ ፈተና",
    "or": "Qormaata Giddugaleessaa"
  },
  "parent-teacher_meeting": {
    "en": "Parent-Teacher Meeting",
    "am": "የወላጅ-መምህር ስብሰባ",
    "or": "Wal'gahii Maatii-Barsiisaa"
  },
  "winter_break_begins": {
    "en": "Winter Break Begins",
    "am": "የክረምት እረፍት ይጀምራል",
    "or": "Boqonnaa Gannaa Jalqaba"
  },
  "school_resumes": {
    "en": "School Resumes",
    "am": "ትምህርት ቤት ይቀጥላል",
    "or": "Manni Barnootaa Ni Jalqaba"
  },
  "sports_day": {
    "en": "Sports Day",
    "am": "የስፖርት ቀን",
    "or": "Guyyaa Ispoortii"
  },
  "final_examinations": {
    "en": "Final Examinations",
    "am": "የመጨረሻ ፈተናዎች",
    "or": "Qormaata Xumuraa"
  },
  "graduation_day": {
    "en": "Graduation Day",
    "am": "የምረቃ ቀን",
    "or": "Guyyaa Eebbaa"
  },
  "no_events_scheduled_for_this_day": {
    "en": "No events scheduled for this day",
    "am": "ለዛሬ የተያዙ ዝግጅቶች የሉም",
    "or": "Sagantaan guyyaa kanaaf qophaa'e hin jiru"
  },
  "upcoming_events": {
    "en": "Upcoming Events",
    "am": "መጪ ዝግጅቶች",
    "or": "Sagantaalee Dhufuu"
  },
  "events_for": {
    "en": "Events for",
    "am": "ዝግጅቶች ለ",
    "or": "Sagantaalee"
  },
  "no_events_for_this_month": {
    "en": "No events for this month",
    "am": "ለዚህ ወር ዝግጅቶች የሉም",
    "or": "Ji'a kanaaf sagantaan hin jiru"
  },
  "event_categories": {
    "en": "Event Categories",
    "am": "የዝግጅት ምድቦች",
    "or": "Kutaalee Sagantaa"
  },
  "filter_events_by_category": {
    "en": "Filter events by category",
    "am": "ዝግጅቶችን በምድብ አጣራ",
    "or": "Sagantaalee gosa isaaniitiin calalisuu"
  },
  "clear_filter": {
    "en": "Clear Filter",
    "am": "ማጣሪያ አጽዳ",
    "or": "Calalifannoo Balleessi"
  },
  
  // Exam page translations
  "exam_management": {
    "en": "Exam Management",
    "am": "የፈተና አስተዳደር",
    "or": "Bulchiinsa Qormaataa"
  },
  "create_new_exam": {
    "en": "Create New Exam",
    "am": "አዲስ ፈተና ፍጠር",
    "or": "Qormaata Haaraa Uumi"
  },
  "schedule_and_manage_student_examinations": {
    "en": "Schedule and manage student examinations",
    "am": "የተማሪዎችን ፈተናዎች ይቅጠሩ እና ያስተዳድሩ",
    "or": "Qormaata barattoota sagantaa qabsiisuufi bulchuu"
  },
  "past_exams": {
    "en": "Past Exams",
    "am": "ያለፉ ፈተናዎች",
    "or": "Qormaata Darbe"
  },
  "search_exams...": {
    "en": "Search exams...",
    "am": "ፈተናዎችን ይፈልጉ...",
    "or": "Qormaata barbaadi..."
  },
  "grade": {
    "en": "Grade",
    "am": "ክፍል",
    "or": "Kutaa"
  },
  "all_grades_filter": {
    "en": "All Grades",
    "am": "ሁሉም ክፍሎች",
    "or": "Kutaalee Hundaa"
  },
  "subject": {
    "en": "Subject",
    "am": "ትምህርት",
    "or": "Qabiyyee"
  },
  "all_subjects": {
    "en": "All Subjects",
    "am": "ሁሉም ትምህርቶች",
    "or": "Qabiyyeewwan Hundaa"
  },
  "mathematics": {
    "en": "Mathematics",
    "am": "ሒሳብ",
    "or": "Herregaa"
  },
  "english": {
    "en": "English",
    "am": "እንግሊዝኛ",
    "or": "Afaan Ingilizii"
  },
  "science": {
    "en": "Science",
    "am": "ሳይንስ",
    "or": "Saayinsii"
  },
  "history": {
    "en": "History",
    "am": "ታሪክ",
    "or": "Seenaa"
  },
  "geography": {
    "en": "Geography",
    "am": "ጂኦግራፊ",
    "or": "Jiograafii"
  },
  "exam_type": {
    "en": "Exam Type",
    "am": "የፈተና አይነት",
    "or": "Gosa Qormaataa"
  },
  "all_types": {
    "en": "All Types",
    "am": "ሁሉም አይነቶች",
    "or": "Gosa Hunda"
  },
  "quiz": {
    "en": "Quiz",
    "am": "ገበና ፈተና",
    "or": "Qwizii"
  },
  "assignment": {
    "en": "Assignment",
    "am": "የቤት ስራ",
    "or": "Hojii Manaa"
  },
  "mid-term": {
    "en": "Mid-Term",
    "am": "የመካከለኛ ተርም",
    "or": "Walakkaa"
  },
  "final": {
    "en": "Final",
    "am": "መጨረሻ",
    "or": "Xumura"
  },
  "project": {
    "en": "Project",
    "am": "ፕሮጀክት",
    "or": "Projekti"
  },
  "exam_details": {
    "en": "Exam Details",
    "am": "የፈተና ዝርዝሮች",
    "or": "Caafiitii Qormaataa"
  },
  "type": {
    "en": "Type",
    "am": "አይነት",
    "or": "Gosa"
  },
  "date_&_time": {
    "en": "Date & Time",
    "am": "ቀን እና ሰዓት",
    "or": "Guyyaafi Sa'aatii"
  },
  "grade_/_section": {
    "en": "Grade / Section",
    "am": "ክፍል / ሴክሽን",
    "or": "Kutaa / Kutuuu"
  },
  "marks": {
    "en": "Marks",
    "am": "ማርኮች",
    "or": "Mallattoowwan"
  },
  "actions": {
    "en": "Actions",
    "am": "ድርጊቶች",
    "or": "Gocha"
  },
  "section": {
    "en": "Section",
    "am": "ሴክሽን",
    "or": "Kutuu"
  },
  "semester": {
    "en": "Semester",
    "am": "ሴሚስተር",
    "or": "Simisteera"
  },
  "total": {
    "en": "Total",
    "am": "ጠቅላላ",
    "or": "Waliigala"
  },
  "pass": {
    "en": "Pass",
    "am": "አልፎአል",
    "or": "Darbe"
  },
  "view_details": {
    "en": "View Details",
    "am": "ዝርዝሮችን ይመልከቱ",
    "or": "Caafiitii Ilaaluu"
  },
  "edit_exam": {
    "en": "Edit Exam",
    "am": "ፈተናን ያርትዑ",
    "or": "Qormaata Gulaali"
  },
  "print_hall_ticket": {
    "en": "Print Hall Ticket",
    "am": "የክፍል ቲኬት ያትሙ",
    "or": "Tikeeta Hoollii Maxxansi"
  },
  "cancel_exam": {
    "en": "Cancel Exam",
    "am": "ፈተናን ይሰርዙ",
    "or": "Qormaata Haqi"
  },
  "no_upcoming_exams_found_matching_your_criteria.": {
    "en": "No upcoming exams found matching your criteria.",
    "am": "መስፈርትዎን የሚያሟሉ መጪ ፈተናዎች አልተገኙም።",
    "or": "Qormaanni dhufuu ulaagaa keessan guutu hin argamne."
  },
  "view_results": {
    "en": "View Results",
    "am": "ውጤቶችን ይመልከቱ",
    "or": "Bu'aa Ilaaluu"
  },
  "generate_report": {
    "en": "Generate Report",
    "am": "ሪፖርት ይፍጠሩ",
    "or": "Gabaasa Uumi"
  },
  "download_answers": {
    "en": "Download Answers",
    "am": "መልሶችን ያውርዱ",
    "or": "Deebii Buusi"
  },
  "no_past_exams_found_matching_your_criteria.": {
    "en": "No past exams found matching your criteria.",
    "am": "መስፈርትዎን የሚያሟሉ ያለፉ ፈተናዎች አልተገኙም።",
    "or": "Qormaanni darbe ulaagaa keessan guutu hin argamne."
  },
  "fill_in_the_details_to_schedule_a_new_examination": {
    "en": "Fill in the details to schedule a new examination",
    "am": "አዲስ ፈተና ለመመዝገብ ዝርዝሮችን ይሙሉ",
    "or": "Qormaata haaraa sagantaa qabsiisuuf caafitiiwwan guutaa"
  },
  
  // Settings page translations
  "general": {
    "en": "General",
    "am": "አጠቃላይ",
    "or": "Waliigala"
  },
  "notifications": {
    "en": "Notifications",
    "am": "ማሳወቂያዎች",
    "or": "Beeksisawwan"
  },
  "security": {
    "en": "Security",
    "am": "ደህንነት",
    "or": "Ittisa"
  },
  "save_changes": {
    "en": "Save Changes",
    "am": "ለውጦችን አስቀምጥ",
    "or": "Jijjiirama Olkaa'i"
  },
  "general_settings": {
    "en": "General Settings",
    "am": "አጠቃላይ ቅንብሮች",
    "or": "Qindaa'inoota Waliigalaa"
  },
  "manage_your_account_settings_and_preferences": {
    "en": "Manage your account settings and preferences",
    "am": "የመለያዎን ቅንብሮች እና ምርጫዎች ያስተዳድሩ",
    "or": "Qindaa'inoota herregaafi filannoolee keessan bulchaa"
  },
  "school_name": {
    "en": "School Name",
    "am": "የትምህርት ቤት ስም",
    "or": "Maqaa Mana Barnootaa"
  },
  "select_academic_year": {
    "en": "Select academic year",
    "am": "የትምህርት ዓመትን ይምረጡ",
    "or": "Waggaa barnootaa filadhu"
  },
  "timezone": {
    "en": "Timezone",
    "am": "የሰዓት ሰቅ",
    "or": "Sagantaa Sa'aatii"
  },
  "select_timezone": {
    "en": "Select timezone",
    "am": "የሰዓት ሰቅ ይምረጡ",
    "or": "Sagantaa Sa'aatii filadhu"
  },
  "language": {
    "en": "Language",
    "am": "ቋንቋ",
    "or": "Afaan"
  },
  "select_language": {
    "en": "Select language",
    "am": "ቋንቋ ይምረጡ",
    "or": "Afaan filadhu"
  },
  "theme": {
    "en": "Theme",
    "am": "ገጽታ",
    "or": "Bifa"
  },
  "select_theme": {
    "en": "Select theme",
    "am": "ገጽታ ይምረጡ",
    "or": "Bifa filadhu"
  },
  "light": {
    "en": "Light",
    "am": "ብርሃን",
    "or": "Ifa"
  },
  "dark": {
    "en": "Dark",
    "am": "ጨለማ",
    "or": "Dukkana"
  },
  "system": {
    "en": "System",
    "am": "ስርዓት",
    "or": "Sirna"
  },
  "system_settings": {
    "en": "System Settings",
    "am": "የስርዓት ቅንብሮች",
    "or": "Qindaa'inoota Sirna"
  },
  "configure_system-wide_settings": {
    "en": "Configure system-wide settings",
    "am": "የስርዓት አቀፍ ቅንብሮችን ያዋቅሩ",
    "or": "Qindaa'inoota sirna-hunda qindeessi"
  },
  "auto_backup": {
    "en": "Auto Backup",
    "am": "ራስ-ሰር ምትኬ",
    "or": "Kaappii Otoo"
  },
  "automatically_backup_system_data_daily": {
    "en": "Automatically backup system data daily",
    "am": "የስርዓት ውሂብን በየቀኑ በራስ-ሰር ይተኩ",
    "or": "Daataa sirna guyyaatti ofumaaf kaappii godhuu"
  },
  "maintenance_mode": {
    "en": "Maintenance Mode",
    "am": "የጥገና ሁነታ",
    "or": "Haala Suphaa"
  },
  "put_system_in_maintenance_mode": {
    "en": "Put system in maintenance mode",
    "am": "ስርዓቱን በጥገና ሁነታ ላይ ያስቀምጡ",
    "or": "Sirna haala suphaa keessa kaa'i"
  },
  "notification_settings": {
    "en": "Notification Settings",
    "am": "የማሳወቂያ ቅንብሮች",
    "or": "Qindaa'inoota Beeksisaa"
  },
  "control_when_and_how_you_receive_notifications": {
    "en": "Control when and how you receive notifications",
    "am": "መቼ እና እንዴት ማሳወቂያዎችን እንደሚቀበሉ ይቆጣጠሩ",
    "or": "Yeroo fi haala beeksisawwan itti fudhattan too'adhu"
  },
  "enable_notifications": {
    "en": "Enable Notifications",
    "am": "ማሳወቂያዎችን አንቃ",
    "or": "Beeksisawwan Dandeessisi"
  },
  "receive_notifications_about_system_events": {
    "en": "Receive notifications about system events",
    "am": "ስለ ስርዓት ክስተቶች ማሳወቂያዎችን ይቀበሉ",
    "or": "Waa'ee sagantaawwan sirna beeksisa fudhadhu"
  },
  "email_notifications": {
    "en": "Email Notifications",
    "am": "የኢሜል ማሳወቂያዎች",
    "or": "Beeksisawwan Imeelii"
  },
  "receive_notifications_via_email": {
    "en": "Receive notifications via email",
    "am": "በኢሜል በኩል ማሳወቂያዎችን ይቀበሉ",
    "or": "Imeelii keessaan beeksisa fudhu"
  },
  "sms_notifications": {
    "en": "SMS Notifications",
    "am": "የኤስኤምኤስ ማሳወቂያዎች",
    "or": "Beeksisawwan SMS"
  },
  "receive_notifications_via_sms": {
    "en": "Receive notifications via SMS",
    "am": "በኤስኤምኤስ በኩል ማሳወቂያዎችን ይቀበሉ",
    "or": "SMS keessaan beeksisa fudhu"
  },
  "notification_types": {
    "en": "Notification Types",
    "am": "የማሳወቂያ አይነቶች",
    "or": "Gosaalee Beeksisaa"
  },
  "select_which_types_of_events_trigger_notifications": {
    "en": "Select which types of events trigger notifications",
    "am": "የትኞቹ የክስተት ዓይነቶች ማሳወቂያዎችን እንደሚያነሳሱ ይምረጡ",
    "or": "Gosoota sagantaalee beeksisawwan kakaasu filaa"
  },
  "student_registration_notification": {
    "en": "Student Registration",
    "am": "የተማሪ ምዝገባ",
    "or": "Galmaa'ina Barataa"
  },
  "when_new_students_are_registered": {
    "en": "When new students are registered",
    "am": "አዲስ ተማሪዎች ሲመዘገቡ",
    "or": "Yeroo barattoota haaraan galmaa'an"
  },
  "exam_results": {
    "en": "Exam Results",
    "am": "የፈተና ውጤቶች",
    "or": "Bu'aa Qormaataa"
  },
  "when_exam_results_are_published": {
    "en": "When exam results are published",
    "am": "የፈተና ውጤቶች ሲታተሙ",
    "or": "Yeroo bu'aa qormaataa maxxanfaman"
  },
  "system_updates": {
    "en": "System Updates",
    "am": "የስርዓት ማሻሻያዎች",
    "or": "Haaromsituu Sirna"
  },
  "when_system_updates_are_available": {
    "en": "When system updates are available",
    "am": "የስርዓት ማሻሻያዎች ሲኖሩ",
    "or": "Yeroo haaromsituu sirna argamu"
  },
  "security_settings": {
    "en": "Security Settings",
    "am": "የደህንነት ቅንብሮች",
    "or": "Qindaa'inoota Ittisa"
  },
  "manage_your_account_security": {
    "en": "Manage your account security",
    "am": "የመለያዎን ደህንነት ያስተዳድሩ",
    "or": "Nageenya herregaa keessanii bulchaa"
  },
  "current_password": {
    "en": "Current Password",
    "am": "የአሁኑ የይለፍ ቃል",
    "or": "Jecha Iccitii Amma"
  },
  "new_password": {
    "en": "New Password",
    "am": "አዲስ የይለፍ ቃል",
    "or": "Jecha Iccitii Haaraa"
  },
  "confirm_new_password": {
    "en": "Confirm New Password",
    "am": "አዲስ የይለፍ ቃል ያረጋግጡ",
    "or": "Jecha Iccitii Haaraa Mirkaneessi"
  },
  "change_password": {
    "en": "Change Password",
    "am": "የይለፍ ቃል ቀይር",
    "or": "Jecha Iccitii Jijjiiri"
  },
  "two-factor_authentication": {
    "en": "Two-Factor Authentication",
    "am": "ሁለት-ጉዳይ ተግባር ማረጋገጫ",
    "or": "Mirkaneessaa Amala-Lama"
  },
  "add_an_extra_layer_of_security_to_your_account": {
    "en": "Add an extra layer of security to your account",
    "am": "ለመለያዎ ተጨማሪ የደህንነት ደረጃን ያክሉ",
    "or": "Sadarka nageenya dabalataa herregaa keetiif itti dabaluu"
  },
  "enable_two-factor_authentication": {
    "en": "Enable Two-Factor Authentication",
    "am": "ሁለት-ጉዳይ ተግባር ማረጋገጫን አንቃ",
    "or": "Mirkaneessaa Amala-Lama Dandeessisi"
  },
  "require_a_verification_code_in_addition_to_your_password": {
    "en": "Require a verification code in addition to your password",
    "am": "ከይለፍ ቃልዎ በተጨማሪ የማረጋገጫ ኮድ ይፈልጋል",
    "or": "Koodii mirkaneessaa dabalatee jecha iccitiitti barbaaduu"
  },
  "login_activity_alerts": {
    "en": "Login Activity Alerts",
    "am": "የመግቢያ እንቅስቃሴ ማንቂያዎች",
    "or": "Beeksiisawwan Galmee Seenaa"
  },
  "receive_notifications_for_unusual_login_activity": {
    "en": "Receive notifications for unusual login activity",
    "am": "ለተለየ የመግቢያ እንቅስቃሴ ማሳወቂያዎችን ይቀበሉ",
    "or": "Galmee seenaa addaa qabiyyee beeksisawwan fudhu"
  },
  "settings_saved": {
    "en": "Settings Saved",
    "am": "ቅንብሮች ተቀምጠዋል",
    "or": "Qindaa'inoota Olkaa'ame"
  },
  "your_settings_have_been_saved_successfully.": {
    "en": "Your settings have been saved successfully.",
    "am": "ቅንብሮችዎ በተሳካ ሁኔታ ተቀምጠዋል።",
    "or": "Qindaa'inooti kee milkaa'inaan olkaa'ameera."
  }
};

