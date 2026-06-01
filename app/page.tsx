"use client";

import React, { useState } from 'react';
import { Search, Plus, Image as ImageIcon, Users, User, X, Filter, Menu, Star } from 'lucide-react';

// --- Types ---
type Member = {
  id: string;
  name: string;
  role: string;
  school: string;
  ig?: string;
  fb?: string;
  line?: string;
  profileSpectrums: { id: number; leftLabel: string; rightLabel: string; score: number }[];
};

type Team = {
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
  members: Member[];
};

// --- Mock Data ---
const SPECTRUM_REVIEWS = [
  { id: 1, leftLabel: "สายลุยหน้างาน", rightLabel: "สายวางแผน", score: -6 }, // -10 to 10
  { id: 2, leftLabel: "ผู้นำ (Leader)", rightLabel: "ผู้ตาม (Follower)", score: 0 },
  { id: 3, leftLabel: "คิดนอกกรอบ", rightLabel: "ตามหลักการ", score: 8 },
];

const CATEGORIES = ["ทั้งหมด", "สายคอม", "วิศวกรรม", "แพทย์", "สถาปัตย์", "บริหารธุรกิจ", "วิทยาศาสตร์"];

const USER_SCHOOL = "โรงเรียนวิทยาศาสตร์";

const generateMockMembers = (count: number): Member[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `m${Math.random()}`,
    name: `สมาชิกคนที่ ${i + 1}`,
    role: ["Frontend", "Backend", "UX/UI", "Data", "Pitching"][Math.floor(Math.random() * 5)],
    school: "โรงเรียนวิทยาศาสตร์",
    ig: `@member_${i + 1}`,
    fb: `Member ${i + 1} FB`,
    line: `member${i + 1}_line`,
    profileSpectrums: [
      { id: 1, leftLabel: "สายลุยหน้างาน", rightLabel: "สายวางแผน", score: Math.floor(Math.random() * 21) - 10 },
      { id: 2, leftLabel: "ผู้นำ (Leader)", rightLabel: "ผู้ตาม (Follower)", score: Math.floor(Math.random() * 21) - 10 },
      { id: 3, leftLabel: "คิดนอกกรอบ", rightLabel: "ตามหลักการ", score: Math.floor(Math.random() * 21) - 10 },
    ]
  }));
};

const MOCK_TEAMS: Team[] = [
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
    members: generateMockMembers(2)
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
    members: generateMockMembers(3)
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
    members: generateMockMembers(2)
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
    members: generateMockMembers(3)
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
    members: generateMockMembers(1)
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
    members: generateMockMembers(2)
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'โรงเรียนเดียวกัน' | 'ทั้งหมด'>('โรงเรียนเดียวกัน');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProfileUser, setSelectedProfileUser] = useState<Member | 'me' | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenMyProfile = () => {
    setSelectedProfileUser('me');
    setIsProfileOpen(true);
  };

  const handleOpenMemberProfile = (member: Member) => {
    setSelectedProfileUser(member);
    setIsProfileOpen(true);
  };

  // Filter Logic
  const filteredTeams = MOCK_TEAMS.filter((team) => {
    const matchesTab = activeTab === 'ทั้งหมด' || (activeTab === 'โรงเรียนเดียวกัน' && team.school === USER_SCHOOL);
    const matchesCategory = activeCategory === "ทั้งหมด" || team.category === activeCategory;
    const matchesSearch = 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      team.competition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex">
      
      {/* Left Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md px-8 py-6 border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-slate-800">{USER_SCHOOL}</h1>
              <button 
                onClick={handleOpenMyProfile} 
                className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors shadow-sm bg-white border border-slate-200"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('โรงเรียนเดียวกัน')}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${
                    activeTab === 'โรงเรียนเดียวกัน' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  โรงเรียนเดียวกัน
                </button>
                <button 
                  onClick={() => setActiveTab('ทั้งหมด')}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${
                    activeTab === 'ทั้งหมด' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  ทั้งหมด
                </button>
              </div>
          </div>
        </header>

        {/* Main Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="ค้นหาทีม หรือ รายการแข่งขัน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-none rounded-full pl-12 pr-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-700 font-medium"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat 
                      ? 'bg-slate-700 text-white shadow-md border border-slate-700' 
                      : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filtered Teams Split into Two Zones */}
            {(() => {
              const highlyMatchedTeams = filteredTeams.filter(t => t.matchPercentage >= 75);
              const generalTeams = filteredTeams.filter(t => t.matchPercentage < 75);
              
              const renderTeamCard = (team: Team) => (
                <div key={team.id} onClick={() => setSelectedTeam(team)} className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 cursor-pointer relative overflow-hidden group">
                  {/* Match Percentage Badge (Small on card) */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#EC6D8C] font-black text-xs px-2 py-1 rounded-full shadow-sm z-10 border border-slate-100">
                    Match {team.matchPercentage}%
                  </div>

                  {/* Cover Image Placeholder */}
                  <div className={`w-full h-32 rounded-2xl ${team.coverColor} flex flex-col items-center justify-center text-slate-400 border border-black/5`}>
                     <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                     <span className="text-xs font-semibold opacity-70">ชื่อรายการ: {team.competition}</span>
                  </div>
                  
                  {/* Team Info */}
                  <div className="px-2 pt-2 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-slate-500">ชื่อทีม : <span className="text-slate-800">{team.name}</span></p>
                        <p className="text-xs font-bold text-slate-500">รายการแข่ง : <span className="text-slate-800">{team.competition}</span></p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-300/50">
                      <p className="text-xs font-bold text-slate-500">
                        ขาด : <span className="text-vibe-red">{team.missingRoles.join(', ')}</span> ({team.missingCount} คน)
                      </p>
                    </div>

                    {/* Members Avatar Row */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex -space-x-2">
                        {Array.from({ length: team.currentMembers }).map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center shadow-sm">
                             <User className="w-3 h-3 text-slate-500" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">อัปเดต 2 ชม. ที่แล้ว</span>
                    </div>
                  </div>
                </div>
              );

              return (
                <div className="pb-20 space-y-12">
                  {/* Zone 1: Highly Matched */}
                  {highlyMatchedTeams.length > 0 && (
                    <section>
                      <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        ทีมที่น่าจะเข้ากับคุณ (Match 75%+)
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {highlyMatchedTeams.map(renderTeamCard)}
                      </div>
                    </section>
                  )}

                  {/* Zone 2: General Teams */}
                  {generalTeams.length > 0 && (
                    <section>
                      <h2 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-slate-400" />
                        ทีมอื่นๆ ทั่วไป
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {generalTeams.map(renderTeamCard)}
                      </div>
                    </section>
                  )}
                  
                  {filteredTeams.length === 0 && (
                    <div className="text-center py-20 text-slate-500 font-medium bg-white rounded-3xl border border-slate-200">
                      ไม่พบทีมที่ตรงกับเงื่อนไข
                    </div>
                  )}
                </div>
              );
            })()}

          </div>

          {/* Floating Action Button */}
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="absolute bottom-8 right-8 w-14 h-14 bg-vibe-red hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform z-40"
          >
            <Plus className="w-8 h-8" />
          </button>
        </main>
      </div>


      {/* --- Add Team Modal --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-slate-400 mb-8 lowercase">เพิ่มการหาทีม</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Team Name */}
                  <div className="space-y-2">
                    <label className="text-lg font-bold text-slate-800">ชื่อทีม</label>
                    <input 
                      type="text" 
                      placeholder="เช่น CodeBreakers"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300 font-bold text-slate-700"
                    />
                  </div>

                  {/* Competition Name */}
                  <div className="space-y-2">
                    <label className="text-lg font-bold text-slate-800">รายการแข่งเป้าหมาย</label>
                    <input 
                      type="text" 
                      placeholder="เช่น NSC 2026"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300 font-bold text-slate-700"
                    />
                  </div>

                  {/* Member Count */}
                  <div className="space-y-2">
                    <label className="text-lg font-bold text-slate-800">สมาชิกในทีม</label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1">
                        <button className="text-xl font-bold text-slate-500 hover:text-slate-800">{'<'}</button>
                        <span className="text-xl font-bold text-slate-800 w-6 text-center">2</span>
                        <button className="text-xl font-bold text-slate-500 hover:text-slate-800">{'>'}</button>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-400"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-400"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold pb-0.5">+</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="text-lg font-bold text-slate-800">tag</label>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-slate-300 text-slate-700 text-sm font-bold rounded-lg">#model</span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-lg font-bold text-slate-800">สายการแข่ง (หมวดหมู่)</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300 font-bold text-slate-700 appearance-none">
                      <option value="" disabled selected>เลือกสายการแข่ง</option>
                      {CATEGORIES.filter(c => c !== "ทั้งหมด").map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Missing Roles */}
                  <div className="space-y-2">
                    <label className="text-lg font-bold text-slate-800">ตำแหน่งที่กำลังตามหา (ขาดอะไร)</label>
                    <input 
                      type="text" 
                      placeholder="เช่น Frontend, UX/UI, พิธีกร"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300 font-bold text-slate-700"
                    />
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2">
                    <label className="text-lg font-bold text-slate-800">รายละเอียดอื่นๆ (อยากได้คนแบบไหน)</label>
                    <textarea 
                      rows={3}
                      placeholder="เช่น ขอคนที่ขยัน สามารถประชุมดึกได้ ถนัดใช้ Figma..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-300 font-bold text-slate-700 resize-none"
                    ></textarea>
                  </div>
                </div>

              </div>

              <div className="mt-10 flex justify-end">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-8 py-3 bg-vibe-red hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-md"
                >
                  โพสต์หาทีม
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Team Details Modal --- */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Header / Cover */}
            <div className={`relative w-full h-32 ${selectedTeam.coverColor} flex items-center justify-center`}>
              <button 
                onClick={() => setSelectedTeam(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md transition-colors border border-black/5"
              >
                <X className="w-5 h-5 text-slate-800" />
              </button>
              <h2 className="text-3xl font-bold text-slate-800 mix-blend-color-burn">{selectedTeam.name}</h2>
            </div>
            
            {/* Body */}
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              
              {/* Match Score */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
                <div className="text-5xl font-black text-[#EC6D8C] mb-2">{selectedTeam.matchPercentage}%</div>
                <div className="text-sm font-bold text-slate-600 text-center">
                  ความเข้ากันได้ของสไตล์การทำงาน
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-bold text-slate-800 mb-2">ข้อมูลทีม</h3>
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">การแข่งขัน:</span>
                    <span className="font-bold text-slate-800">{selectedTeam.competition}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">สาย:</span>
                    <span className="font-bold text-slate-800">{selectedTeam.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">โรงเรียน:</span>
                    <span className="font-bold text-slate-800">{selectedTeam.school}</span>
                  </div>
                </div>
              </div>

              {/* Members */}
              <div>
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  สมาชิกปัจจุบัน ({selectedTeam.currentMembers})
                </h3>
                <div className="space-y-2">
                  {selectedTeam.members.map((member) => (
                    <div 
                      key={member.id} 
                      onClick={() => handleOpenMemberProfile(member)}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{member.name}</div>
                          <div className="text-xs text-slate-500">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#1C1F43] bg-[#1C1F43]/10 px-3 py-1 rounded-full">
                        ดูโปรไฟล์
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Roles */}
              <div>
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-slate-400" />
                  ตำแหน่งที่ต้องการ (+{selectedTeam.missingCount})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTeam.missingRoles.map((role, i) => (
                    <div key={i} className="bg-slate-100 border border-slate-200 text-slate-600 font-bold px-3 py-1 rounded-full text-xs">
                      {role}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- Profile Drawer --- */}
      {isProfileOpen && selectedProfileUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-bold text-slate-800">
                {selectedProfileUser === 'me' ? 'โปรไฟล์ของฉัน' : 'โปรไฟล์เพื่อนร่วมทีม'}
              </h2>
              <button onClick={() => setIsProfileOpen(false)} className="p-2 bg-white hover:bg-slate-200 rounded-full text-slate-500 shadow-sm transition-colors border border-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                   <User className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  {selectedProfileUser === 'me' ? 'นายสมชาย ใจดี (คุณ)' : selectedProfileUser.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {selectedProfileUser === 'me' ? USER_SCHOOL : selectedProfileUser.school}
                </p>
                <div className="flex gap-2 mt-3">
                  {selectedProfileUser === 'me' ? (
                    <>
                       <span className="px-3 py-1 bg-[#EC6D8C]/10 text-[#EC6D8C] text-xs font-bold rounded-full">Frontend</span>
                       <span className="px-3 py-1 bg-[#1C1F43]/10 text-[#1C1F43] text-xs font-bold rounded-full">UX/UI</span>
                    </>
                  ) : (
                    <span className="px-3 py-1 bg-[#EC6D8C]/10 text-[#EC6D8C] text-xs font-bold rounded-full">{selectedProfileUser.role}</span>
                  )}
                </div>
                
                {/* --- Contacts --- */}
                {selectedProfileUser !== 'me' && (
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {selectedProfileUser.ig && (
                      <div className="flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-medium border border-slate-200 shadow-sm">
                        <span className="font-bold">IG:</span> {selectedProfileUser.ig}
                      </div>
                    )}
                    {selectedProfileUser.line && (
                      <div className="flex items-center gap-1 text-xs bg-[#00B900]/10 text-[#00B900] px-3 py-1.5 rounded-full font-medium border border-[#00B900]/20 shadow-sm">
                        <span className="font-bold">LINE:</span> {selectedProfileUser.line}
                      </div>
                    )}
                    {selectedProfileUser.fb && (
                      <div className="flex items-center gap-1 text-xs bg-[#1877F2]/10 text-[#1877F2] px-3 py-1.5 rounded-full font-medium border border-[#1877F2]/20 shadow-sm">
                        <span className="font-bold">FB:</span> {selectedProfileUser.fb}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  สถิติสไตล์การทำงาน {selectedProfileUser === 'me' ? '(จากเพื่อนร่วมทีม)' : ''}
                </h4>
                
                {(selectedProfileUser === 'me' ? SPECTRUM_REVIEWS : selectedProfileUser.profileSpectrums).map(spec => (
                  <div key={spec.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-3">
                      <span>{spec.leftLabel}</span>
                      <span>{spec.rightLabel}</span>
                    </div>
                    {/* Progress Bar Container (Two-sided tube) */}
                    <div className="relative w-full h-4 bg-slate-200 rounded-full mb-4 overflow-hidden shadow-inner flex">
                      {/* Left Fill (Blue) */}
                      <div 
                        className="h-full bg-blue-500 transition-all duration-500 border-r-[2px] border-white/70"
                        style={{ width: `${50 - (spec.score * 5)}%` }}
                      ></div>
                      
                      {/* Right Fill (Red) */}
                      <div 
                        className="h-full bg-red-500 transition-all duration-500"
                        style={{ width: `${50 + (spec.score * 5)}%` }}
                      ></div>
                    </div>
                    
                    {/* Sentence */}
                    <p className="text-sm font-bold text-slate-700 text-center mt-2">
                      {spec.score === 0 
                        ? `เป็นกลางระหว่าง "${spec.leftLabel}" และ "${spec.rightLabel}"`
                        : spec.score < 0
                        ? `ค่อนข้างไปทาง "${spec.leftLabel}"`
                        : `ค่อนข้างไปทาง "${spec.rightLabel}"`
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Simple Award Icon Component
function AwardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  );
}
