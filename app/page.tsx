"use client";

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Target, Zap, Clock, Briefcase, Award, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

// --- Types ---
type Profile = {
  id: string;
  name: string;
  role: string;
  hardSkills: string[];
  paceScale: number; // -5 (Methodical) to +5 (Fast-paced)
  focusScale: number; // -5 (Big Picture) to +5 (Detail-oriented)
  roleScale: number; // -5 (Executor) to +5 (Planner)
  earnedBadges: string[];
  avatarUrl: string;
};

// --- Mock Data ---
const CURRENT_USER: Profile = {
  id: 'u1',
  name: 'Tanawat',
  role: 'AI Engineer / Backend',
  hardSkills: ['Python', 'OpenCV', 'AI', 'TensorFlow'],
  paceScale: 3,
  focusScale: 2,
  roleScale: 1,
  earnedBadges: ['AI Visionary', 'Night Owl', 'Hackathon Vet'],
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanawat&backgroundColor=1c1f43',
};

const SEEKING_SKILLS = ['Next.js', 'Figma', 'Pitching', 'React'];

const CANDIDATES: Profile[] = [
  {
    id: 'c1',
    name: 'Somchai',
    role: 'Frontend Developer',
    hardSkills: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
    paceScale: 4,
    focusScale: 1,
    roleScale: -4,
    earnedBadges: ['UI Wizard', 'Pixel Perfect'],
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somchai&backgroundColor=ec6d8c',
  },
  {
    id: 'c2',
    name: 'Napat',
    role: 'UX/UI Designer',
    hardSkills: ['Figma', 'Prototyping', 'User Research'],
    paceScale: -2,
    focusScale: -4,
    roleScale: -2,
    earnedBadges: ['Design Thinker', 'Empathy Pro'],
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Napat&backgroundColor=1c1f43',
  },
  {
    id: 'c3',
    name: 'Ploy',
    role: 'Product Manager / Hacker',
    hardSkills: ['Pitching', 'Next.js', 'Project Management', 'Figma'],
    paceScale: 3,
    focusScale: 2,
    roleScale: -3,
    earnedBadges: ['The Pitcher', 'Scrum Master'],
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ploy&backgroundColor=ec6d8c',
  },
  {
    id: 'c4',
    name: 'Krit',
    role: 'Backend Dev',
    hardSkills: ['Node.js', 'PostgreSQL', 'Docker'],
    paceScale: 0,
    focusScale: 0,
    roleScale: 4,
    earnedBadges: ['Bug Hunter', 'Database Guru'],
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Krit&backgroundColor=ed1c24',
  },
  {
    id: 'c5',
    name: 'Jane',
    role: 'Fullstack Dev',
    hardSkills: ['React', 'Figma', 'Python', 'AWS'],
    paceScale: 2,
    focusScale: 3,
    roleScale: -1,
    earnedBadges: ['Jack of All Trades', 'Cloud Native'],
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane&backgroundColor=1c1f43',
  }
];

// --- Algorithm ---
const calculateMatchScore = (teamProfile: Profile, teamSeekingSkills: string[], candidate: Profile) => {
  const matchedSkillsCount = teamSeekingSkills.filter(skill => 
    candidate.hardSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
  ).length;
  const skillRatio = teamSeekingSkills.length > 0 ? (matchedSkillsCount / teamSeekingSkills.length) : 0;
  const skillScore = skillRatio * 40;

  const paceDiff = Math.abs(teamProfile.paceScale - candidate.paceScale);
  const focusDiff = Math.abs(teamProfile.focusScale - candidate.focusScale);
  const totalVibeDiff = paceDiff + focusDiff;
  const vibeRatio = Math.max(0, (20 - totalVibeDiff) / 20);
  const vibeScore = vibeRatio * 40;

  const roleDiff = Math.abs(teamProfile.roleScale - candidate.roleScale);
  const roleRatio = roleDiff / 10; 
  const roleScore = roleRatio * 20;

  const totalScore = Math.round(skillScore + vibeScore + roleScore);
  
  return {
    totalScore,
    breakdown: {
      skillScore: Math.round(skillScore),
      vibeScore: Math.round(vibeScore),
      roleScore: Math.round(roleScore)
    }
  };
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-vibe-pink bg-vibe-pink-light border-vibe-pink/20';
  if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-vibe-red bg-red-50 border-red-200';
};

const getProgressBarColor = (score: number) => {
  if (score >= 80) return 'bg-vibe-pink';
  if (score >= 50) return 'bg-amber-400';
  return 'bg-vibe-red';
};

export default function VibeMatchDashboard() {
  const [activeTab, setActiveTab] = useState<'matches' | 'saved'>('matches');

  const scoredCandidates = useMemo(() => {
    return CANDIDATES.map(candidate => {
      const match = calculateMatchScore(CURRENT_USER, SEEKING_SKILLS, candidate);
      return { ...candidate, match };
    }).sort((a, b) => b.match.totalScore - a.match.totalScore);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans selection:bg-vibe-pink/30 pb-20">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-vibe-pink flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-bold text-vibe-navy tracking-tight">
              Vibe Match
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-vibe-pink transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full border-2 border-slate-200 overflow-hidden bg-slate-100">
              <img src={CURRENT_USER.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Header / Filter Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current User Summary */}
          <div className="lg:col-span-1 rounded-2xl bg-white border border-slate-200 p-6 shadow-md relative overflow-hidden group hover:border-vibe-pink/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-vibe-pink/10 blur-3xl -mr-10 -mt-10 rounded-full"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                <img src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-vibe-navy">{CURRENT_USER.name}</h1>
                <p className="text-vibe-pink font-medium text-sm mt-1">{CURRENT_USER.role}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {CURRENT_USER.hardSkills.map(skill => (
                    <span key={skill} className="px-2 py-0.5 text-xs rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Looking For Details */}
          <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6 shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                  <Target className="w-4 h-4 text-vibe-pink" />
                  Target Teammate Skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {SEEKING_SKILLS.map(skill => (
                    <span key={skill} className="px-3 py-1 text-sm rounded-lg bg-vibe-pink-light text-vibe-pink border border-vibe-pink/20 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden md:block w-px h-16 bg-slate-200"></div>

              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-vibe-navy" />
                  Team Chemistry Metrics
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="text-slate-500">Pace: <span className="text-vibe-navy">Fast</span></span>
                    <span className="text-slate-500">Focus: <span className="text-vibe-navy">Detail</span></span>
                    <span className="text-slate-500">Role: <span className="text-vibe-navy">Planner</span></span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-vibe-navy w-1/3"></div>
                    <div className="h-full bg-vibe-pink w-1/3"></div>
                    <div className="h-full bg-slate-300 w-1/3"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveTab('matches')}
              className={`text-lg font-semibold transition-colors pb-4 -mb-[17px] border-b-2 ${activeTab === 'matches' ? 'text-vibe-navy border-vibe-navy' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
            >
              Top Matches
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`text-lg font-semibold transition-colors pb-4 -mb-[17px] border-b-2 ${activeTab === 'saved' ? 'text-vibe-navy border-vibe-navy' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
            >
              Saved Profiles
            </button>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-vibe-navy bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Match Results Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {scoredCandidates.map((candidate, idx) => {
            const score = candidate.match.totalScore;
            const scoreTheme = getScoreColor(score);
            const progressColor = getProgressBarColor(score);
            
            return (
              <div 
                key={candidate.id} 
                className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-vibe-pink/40 transition-all duration-300 hover:shadow-xl hover:shadow-vibe-pink/5 hover:-translate-y-1 flex flex-col"
              >
                {/* Ranking Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-vibe-navy border border-slate-200 flex items-center justify-center text-xs font-bold text-white z-10 shadow-md">
                  #{idx + 1}
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm">
                      <img src={candidate.avatarUrl} alt={candidate.name} className="w-full h-full object-cover" />
                      {score >= 80 && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-vibe-navy group-hover:text-vibe-pink transition-colors flex items-center gap-2">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">{candidate.role}</p>
                    </div>
                  </div>
                  
                  {/* Score Circular Display or Badge */}
                  <div className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl border font-bold ${scoreTheme}`}>
                    <span className="text-xl leading-none">{score}%</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-80 mt-0.5">Match</span>
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="space-y-3 mb-6 flex-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Skill Gap</span>
                      <span className="text-vibe-navy font-semibold">{candidate.match.breakdown.skillScore}/40</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${progressColor}`} style={{ width: `${(candidate.match.breakdown.skillScore / 40) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Vibe Similarity</span>
                      <span className="text-vibe-navy font-semibold">{candidate.match.breakdown.vibeScore}/40</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${progressColor} opacity-80`} style={{ width: `${(candidate.match.breakdown.vibeScore / 40) * 100}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Role Complement</span>
                      <span className="text-vibe-navy font-semibold">{candidate.match.breakdown.roleScore}/20</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${progressColor} opacity-60`} style={{ width: `${(candidate.match.breakdown.roleScore / 20) * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Skills & Badges */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.hardSkills.slice(0, 4).map(skill => (
                      <span 
                        key={skill} 
                        className={`px-2 py-1 text-xs rounded-md border ${
                          SEEKING_SKILLS.some(s => s.toLowerCase() === skill.toLowerCase())
                            ? 'bg-vibe-pink-light text-vibe-pink border-vibe-pink/20 font-medium'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.hardSkills.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded-md bg-slate-50 text-slate-500 border border-slate-200">
                        +{candidate.hardSkills.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {candidate.earnedBadges.map(badge => (
                      <div key={badge} className="flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                        <Award className="w-3 h-3" />
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className="mt-6 w-full py-2.5 rounded-xl font-medium text-sm bg-slate-100 hover:bg-slate-200 text-vibe-navy transition-colors flex items-center justify-center gap-2 group-hover:bg-vibe-pink group-hover:text-white group-hover:shadow-md">
                  View Full Profile
                  <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            );
          })}
        </section>

      </main>
    </div>
  );
}
