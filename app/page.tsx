"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Image as ImageIcon, Users, User, X, Filter, Menu, Star, LogOut, History, ChevronDown } from 'lucide-react';
import NotificationBell from './components/NotificationBell';

import { Member, Team, CATEGORIES, USER_SCHOOL, MOCK_TEAMS, PAST_TEAMS, SPECTRUM_REVIEWS } from './lib/mockData';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'โรงเรียนเดียวกัน' | 'ทั้งหมด'>('โรงเรียนเดียวกัน');
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const router = useRouter();

  // New State
  const [currentView, setCurrentView] = useState<'dashboard' | 'history'>('dashboard');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('mockIsLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      setShowLoginPopup(true);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('mockIsLoggedIn', 'true');
    setIsLoggedIn(true);
    setShowLoginPopup(false);
  };

  const handleOpenMyProfile = () => {
    router.push('/profile/me');
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
              <div className="flex items-center gap-3">
                <button onClick={() => setCurrentView('dashboard')} className="hover:opacity-80 transition-opacity">
                  <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
                </button>
                <h1 className="text-3xl font-bold text-slate-800">{USER_SCHOOL}</h1>
              </div>
              {/* Auth / Menu Container */}
              {isLoggedIn ? (
                <div className="relative flex items-center gap-3">
                  <NotificationBell />
                  <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors shadow-sm bg-white border border-slate-200"
                  >
                    <Menu className="w-6 h-6" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                      <button 
                        onClick={() => { handleOpenMyProfile(); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        โปรไฟล์ของฉัน
                      </button>
                      <button 
                        onClick={() => { setCurrentView('history'); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
                      >
                        <History className="w-4 h-4 text-slate-400" />
                        ประวัติการเข้าร่วมทีม
                      </button>
                      <button 
                        onClick={() => {
                          sessionStorage.removeItem('mockIsLoggedIn');
                          window.location.href = '/onboarding';
                        }}
                        className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        ออกจากระบบ
                      </button>
                    </div>
                  )}
                </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowLoginPopup(true)}
                    className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    เข้าสู่ระบบ
                  </button>
                  <button 
                    onClick={() => router.push('/onboarding')}
                    className="px-4 py-2 text-sm font-bold text-white bg-[#1C1F43] hover:bg-[#12142d] rounded-full transition-colors shadow-sm"
                  >
                    สมัครสมาชิก
                  </button>
                </div>
              )}
            </div>
            {currentView === 'dashboard' && (
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
            )}
          </div>
        </header>

        {/* Main Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {currentView === 'dashboard' ? (
              <>
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
                    <div key={team.id} onClick={() => router.push('/team/' + team.id)} className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 cursor-pointer relative overflow-hidden group">
                      {/* Match Percentage Badge (Small on card) */}
                      {isLoggedIn && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#EC6D8C] font-black text-xs px-2 py-1 rounded-full shadow-sm z-10 border border-slate-100">
                          Match {team.matchPercentage}%
                        </div>
                      )}

                      {/* Cover Image Placeholder */}
                      <div className={`w-full h-32 rounded-2xl ${team.coverColor} flex flex-col items-center justify-center text-slate-400 border border-black/5 overflow-hidden relative`}>
                        {team.posterUrl ? (
                          <img src={team.posterUrl} alt={team.competition} className="w-full h-full object-cover" />
                        ) : (
                          <>
                             <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                             <span className="text-xs font-semibold opacity-70">ชื่อรายการ: {team.competition}</span>
                          </>
                        )}
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
                            {isLoggedIn ? "ทีมที่น่าจะเข้ากับคุณ (Match 75%+)" : "ทีมแนะนำ"}
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
              </>
            ) : (
              <div className="pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                    <History className="w-6 h-6 text-slate-500" />
                    ประวัติทีมที่เคยเข้าร่วม
                  </h2>
                  <button 
                    onClick={() => setCurrentView('dashboard')}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    กลับหน้าหลัก
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PAST_TEAMS.map(team => (
                    <div key={team.id} onClick={() => router.push('/team/' + team.id)} className="bg-slate-100/50 border border-slate-200 rounded-3xl p-4 flex flex-col gap-3 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer opacity-90 hover:opacity-100 group">
                      <div className={`w-full h-24 rounded-2xl ${team.coverColor} flex flex-col items-center justify-center text-slate-500 border border-black/5 grayscale-[30%] group-hover:grayscale-0 transition-all overflow-hidden relative`}>
                        {team.posterUrl ? (
                          <img src={team.posterUrl} alt={team.competition} className="w-full h-full object-cover" />
                        ) : (
                          <>
                             <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                             <span className="text-[10px] font-semibold opacity-70">รายการ: {team.competition}</span>
                          </>
                        )}
                      </div>
                      <div className="px-2 pt-2 space-y-1">
                        <p className="text-sm font-bold text-slate-800">{team.name}</p>
                        <p className="text-xs font-bold text-slate-500">{team.competition}</p>
                      </div>
                      <div className="mt-2 pt-3 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">เพื่อนร่วมทีม {team.currentMembers} คน</span>
                        <div className="flex -space-x-2">
                          {Array.from({ length: team.currentMembers }).map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-slate-300 border-2 border-slate-100 flex items-center justify-center">
                               <User className="w-3 h-3 text-slate-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

      {/* Login Modal */}
      {showLoginPopup && !isLoggedIn && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-[#EC6D8C]/10 rounded-2xl flex items-center justify-center mb-4">
                <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">ยินดีต้อนรับสู่ Vibe Match</h2>
              <p className="text-slate-500">ค้นหาทีมที่ใช่ และเพื่อนที่เข้ากับสไตล์การทำงานของคุณ</p>
            </div>
            <div className="space-y-3">
              <button 
                onClick={handleLogin}
                className="w-full py-4 bg-[#1C1F43] hover:bg-[#12142d] text-white font-bold rounded-2xl transition-all shadow-md"
              >
                เข้าสู่ระบบ (Demo)
              </button>
              <button 
                onClick={() => router.push('/onboarding')}
                className="w-full py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl transition-all border border-slate-200 shadow-sm"
              >
                สมัครสมาชิก
              </button>
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
