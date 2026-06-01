// --- Types ---
export type Member = {
  id: string;
  name: string;
  role: string;
  school: string;
  ig?: string;
  fb?: string;
  line?: string;
  profileSpectrums: { id: number; leftLabel: string; rightLabel: string; score: number }[];
};

export type Team = {
  id: string;
  name: string;
  competition: string;
  category: string;
  missingRoles: string[];
  missingCount: number;
  currentMembers: number;
  coverColor: string;
  school: string;
  matchPercentage: number;
  posterUrl?: string;
  members: Member[];
};

// --- Constants ---
export const SPECTRUM_REVIEWS = [
  { id: 1, leftLabel: "สายลุยหน้างาน", rightLabel: "สายวางแผน", score: -6 }, // -10 to 10
  { id: 2, leftLabel: "ผู้นำ (Leader)", rightLabel: "ผู้ตาม (Follower)", score: 0 },
  { id: 3, leftLabel: "คิดนอกกรอบ", rightLabel: "ตามหลักการ", score: 8 },
];

export const CATEGORIES = ["ทั้งหมด", "สายคอม", "วิศวกรรม", "แพทย์", "สถาปัตย์", "บริหารธุรกิจ", "วิทยาศาสตร์"];

export const USER_SCHOOL = "โรงเรียนวิทยาศาสตร์";

// --- Mock Data Generators ---
export const generateMockMembers = (count: number, teamId: string = ""): Member[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `m_${teamId}_${i + 1}`,
    name: `สมาชิกคนที่ ${i + 1}`,
    role: ["Frontend", "Backend", "UX/UI", "Data", "Pitching"][i % 5],
    school: "โรงเรียนวิทยาศาสตร์",
    ig: `@member_${teamId}_${i + 1}`,
    fb: `Member ${teamId} ${i + 1} FB`,
    line: `member${teamId}${i + 1}_line`,
    profileSpectrums: [
      { id: 1, leftLabel: "สายลุยหน้างาน", rightLabel: "สายวางแผน", score: (i * 3) % 11 - 5 },
      { id: 2, leftLabel: "ผู้นำ (Leader)", rightLabel: "ผู้ตาม (Follower)", score: (i * 7) % 11 - 5 },
      { id: 3, leftLabel: "คิดนอกกรอบ", rightLabel: "ตามหลักการ", score: (i * 4) % 11 - 5 },
    ]
  }));
};

export const MOCK_TEAMS: Team[] = [
  {
    id: "t1",
    name: "CodeBreakers",
    competition: "NSC 2026",
    category: "สายคอม",
    missingRoles: ["Frontend", "UX/UI"],
    missingCount: 2,
    currentMembers: 2,
    coverColor: "bg-blue-100",
    school: "โรงเรียนวิทยาศาสตร์",
    matchPercentage: 92,
    posterUrl: "/posters/nsc_2026_poster.png",
    members: generateMockMembers(2, "t1")
  },
  {
    id: "t2",
    name: "RoboTitans",
    competition: "World Robot Olympiad",
    category: "วิศวกรรม",
    missingRoles: ["Hardware Engineer"],
    missingCount: 1,
    currentMembers: 3,
    coverColor: "bg-orange-100",
    school: "โรงเรียนเตรียมอุดมฯ",
    matchPercentage: 65,
    posterUrl: "/posters/wro_poster.png",
    members: generateMockMembers(3, "t2")
  },
  {
    id: "t3",
    name: "MedTech Innovators",
    competition: "HealthHack Thailand",
    category: "แพทย์",
    missingRoles: ["Data Scientist", "Biologist"],
    missingCount: 2,
    currentMembers: 2,
    coverColor: "bg-teal-100",
    school: "โรงเรียนวิทยาศาสตร์",
    matchPercentage: 88,
    posterUrl: "/posters/healthhack_poster.png",
    members: generateMockMembers(2, "t3")
  },
  {
    id: "t4",
    name: "Pixel Perfect",
    competition: "Creative App Design",
    category: "สถาปัตย์",
    missingRoles: ["3D Animator"],
    missingCount: 1,
    currentMembers: 3,
    coverColor: "bg-pink-100",
    school: "โรงเรียนสาธิตฯ",
    matchPercentage: 45,
    posterUrl: "/posters/creative_app_poster.png",
    members: generateMockMembers(3, "t4")
  },
  {
    id: "t5",
    name: "Cyber Knights",
    competition: "CTF National",
    category: "สายคอม",
    missingRoles: ["Security Analyst", "Backend"],
    missingCount: 2,
    currentMembers: 1,
    coverColor: "bg-slate-200",
    school: "โรงเรียนวิทยาศาสตร์",
    matchPercentage: 78,
    posterUrl: "/posters/ctf_national_poster.png",
    members: generateMockMembers(1, "t5")
  },
  {
    id: "t6",
    name: "BizPioneers",
    competition: "Startup Thailand",
    category: "บริหารธุรกิจ",
    missingRoles: ["Marketing", "Pitching"],
    missingCount: 2,
    currentMembers: 2,
    coverColor: "bg-yellow-100",
    school: "โรงเรียนนานาชาติ",
    matchPercentage: 50,
    posterUrl: "/posters/startup_thailand_poster.png",
    members: generateMockMembers(2, "t6")
  },
];

export const PAST_TEAMS: Team[] = [
  {
    id: "p1",
    name: "HackTheCrisis",
    competition: "COVID Hackathon 2024",
    category: "สายคอม",
    missingRoles: [],
    missingCount: 0,
    currentMembers: 4,
    coverColor: "bg-purple-100",
    school: "โรงเรียนวิทยาศาสตร์",
    matchPercentage: 0,
    posterUrl: "/posters/covid_hackathon_poster.png",
    members: generateMockMembers(3, "p1")
  },
  {
    id: "p2",
    name: "Green Future Innovators",
    competition: "Eco Hackathon 2025",
    category: "วิทยาศาสตร์",
    missingRoles: [],
    missingCount: 0,
    currentMembers: 3,
    coverColor: "bg-green-100",
    school: "โรงเรียนวิทยาศาสตร์",
    matchPercentage: 0,
    posterUrl: "/posters/eco_hackathon_poster.png",
    members: generateMockMembers(2, "p2")
  }
];

export const findTeamById = (id: string): Team | undefined => {
  return [...MOCK_TEAMS, ...PAST_TEAMS].find(t => t.id === id);
};

export const ME: Member = {
  id: "me",
  name: "นายสมชาย ใจดี",
  role: "Frontend Developer",
  school: USER_SCHOOL,
  ig: "@somchai_dev",
  line: "somchai123",
  fb: "Somchai Jaidee",
  profileSpectrums: SPECTRUM_REVIEWS
};

// Helper function to find a member globally
export const findMemberById = (id: string): Member | undefined => {
  if (id === "me") return ME;
  
  for (const team of [...MOCK_TEAMS, ...PAST_TEAMS]) {
    const member = team.members.find(m => m.id === id);
    if (member) return member;
  }
  return undefined;
};
