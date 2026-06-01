import React from 'react';
import { findMemberById, PAST_TEAMS, Member } from '@/app/lib/mockData';
import { User, MapPin, MessageCircle, Star, Briefcase, Award } from 'lucide-react';
import Link from 'next/link';
import BackButton from '@/app/components/BackButton';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = findMemberById(id);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">404</h1>
          <p className="text-slate-500 mb-6">ไม่พบโปรไฟล์ที่คุณค้นหา</p>
          <Link href="/" className="px-6 py-3 bg-[#1C1F43] text-white rounded-full font-bold">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  const isMe = id === 'me';
  
  // Create deterministic gradient based on ID
  const gradientStyles = [
    "from-pink-400 via-purple-400 to-indigo-500",
    "from-[#EC6D8C] to-[#1C1F43]",
    "from-cyan-400 via-blue-500 to-indigo-600",
    "from-emerald-400 to-teal-500",
    "from-orange-400 to-rose-500"
  ];
  const bgGradient = gradientStyles[member.name.length % gradientStyles.length];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* --- Banner --- */}
      <div className={`h-64 w-full bg-gradient-to-r ${bgGradient} relative`}>
        <div className="absolute top-6 left-6 z-10">
          <BackButton />
        </div>
        {/* Cover Pattern/Overlay */}
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay pattern-diagonal-lines opacity-50 pointer-events-none"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
        
        {/* --- Top Section: Profile Info --- */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Avatar */}
          <div className="relative">
            <div className="w-40 h-40 bg-white rounded-full p-2 shadow-lg">
              <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
                <User className="w-20 h-20 text-slate-400" />
              </div>
            </div>
            {isMe && (
              <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left pt-2 md:pt-8">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center justify-center md:justify-start gap-3">
              {member.name}
              {isMe && <span className="text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-bold">You</span>}
            </h1>
            <p className="text-slate-500 font-medium mt-2 flex items-center justify-center md:justify-start gap-1">
              <MapPin className="w-4 h-4" /> {member.school}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
              <span className="px-4 py-1.5 bg-[#EC6D8C]/10 text-[#EC6D8C] text-sm font-bold rounded-full border border-[#EC6D8C]/20 shadow-sm">
                {member.role}
              </span>
              {isMe && (
                <span className="px-4 py-1.5 bg-[#1C1F43]/10 text-[#1C1F43] text-sm font-bold rounded-full border border-[#1C1F43]/20 shadow-sm">
                  UX/UI Design
                </span>
              )}
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-3 md:pt-8">
            {member.ig && (
              <a href="#" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:bg-pink-50 transition-colors border border-slate-200 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            )}
            {member.fb && (
              <a href="#" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-slate-200 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            )}
            {member.line && (
              <a href="#" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-green-500 hover:bg-green-50 transition-colors border border-slate-200 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </a>
            )}
          </div>
        </div>

        {/* --- Grid Layout for Details --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Bio Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#EC6D8C]" /> เกี่ยวกับฉัน
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {isMe 
                  ? "สวัสดีครับ ผมชอบการออกแบบ UI และรักในการเขียนโค้ดเพื่อสร้างประสบการณ์ใช้งานที่ยอดเยี่ยม พร้อมลุยและเปิดรับสิ่งใหม่ๆ เสมอครับ!" 
                  : `ผู้ที่ชื่นชอบการทำงานสาย ${member.role} พร้อมเรียนรู้สิ่งใหม่ๆ และทำงานร่วมกับทีมเพื่อสร้างสรรค์นวัตกรรมใหม่ๆ`}
              </p>
            </div>

            {/* General Skills (Mock) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-[#1C1F43]" /> ความสามารถ
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Figma", "React", "Next.js", "Tailwind CSS", "Communication", "Problem Solving"].slice(0, isMe ? 6 : 4).map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Working Style Spectrum */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> 
                สไตล์การทำงาน {isMe ? '(ประเมินโดยเพื่อนร่วมทีม)' : ''}
              </h3>
              
              <div className="space-y-8">
                {member.profileSpectrums.map(spec => (
                  <div key={spec.id} className="relative">
                    <div className="flex justify-between text-sm font-bold text-slate-600 mb-3">
                      <span>{spec.leftLabel}</span>
                      <span>{spec.rightLabel}</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="relative w-full h-5 bg-slate-100 rounded-full overflow-hidden shadow-inner flex border border-slate-200/60">
                      {/* Left Fill (Blue) */}
                      <div 
                        className="h-full bg-blue-500 transition-all duration-1000 border-r-[2px] border-white/70 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"
                        style={{ width: `${50 - (spec.score * 5)}%` }}
                      ></div>
                      
                      {/* Right Fill (Red) */}
                      <div 
                        className="h-full bg-[#EC6D8C] transition-all duration-1000 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]"
                        style={{ width: `${50 + (spec.score * 5)}%` }}
                      ></div>

                      {/* Center Marker */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-black/10 -translate-x-1/2"></div>
                    </div>
                    
                    {/* Description */}
                    <div className="text-center mt-3">
                      <span className="inline-block px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-500">
                        {spec.score === 0 
                          ? `สมดุลระหว่าง "${spec.leftLabel}" และ "${spec.rightLabel}"`
                          : spec.score < 0
                          ? `ค่อนข้างไปทาง "${spec.leftLabel}"`
                          : `ค่อนข้างไปทาง "${spec.rightLabel}"`
                        }
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Activities */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-[#1C1F43]" /> 
                สิ่งที่เคยเข้าร่วม
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PAST_TEAMS.map(team => (
                  <div key={team.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${team.coverColor} flex items-center justify-center shrink-0 border border-black/5 overflow-hidden relative`}>
                        {team.posterUrl ? (
                          <img src={team.posterUrl} alt={team.competition} className="w-full h-full object-cover" />
                        ) : (
                          <AwardIcon />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 leading-tight group-hover:text-[#EC6D8C] transition-colors line-clamp-1">{team.name}</h4>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1">{team.competition}</p>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-bold">{team.category}</span>
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 3).map((m, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center z-10">
                            <User className="w-3 h-3 text-slate-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function AwardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700 opacity-60">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  );
}
