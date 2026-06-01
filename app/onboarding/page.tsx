"use client";

import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Zap, Upload, Camera, CheckCircle2, Instagram, Facebook, MessageCircle, Building2, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type OnboardingData = {
  profilePic: string | null;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  ig: string;
  fb: string;
  line: string;
  faculty: string;
};

const FACULTIES = [
  "วิศวกรรมศาสตร์ (Engineering)",
  "แพทยศาสตร์ (Medicine)",
  "วิทยาศาสตร์ (Science)",
  "สถาปัตยกรรมศาสตร์ (Architecture)",
  "บริหารธุรกิจและการบัญชี (Business)",
  "นิเทศศาสตร์ (Communication Arts)",
  "อักษรศาสตร์/มนุษยศาสตร์ (Arts/Humanities)",
  "นิติศาสตร์ (Law)",
  "ศิลปกรรมศาสตร์ (Fine Arts)",
  "เทคโนโลยีสารสนเทศ (IT)"
];

export default function MultiStepOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState<OnboardingData>({
    profilePic: null,
    firstName: '',
    lastName: '',
    username: '',
    gender: '',
    ig: '',
    fb: '',
    line: '',
    faculty: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
  const handleChange = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange('profilePic', imageUrl);
    }
  };

  const handleFinish = () => {
    // Navigate to main dashboard
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans selection:bg-vibe-pink/30 flex flex-col">
      
      {/* Navbar & Progress */}
      {step > 1 && (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
          <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 text-slate-400 hover:text-vibe-navy transition-colors flex items-center gap-1 font-medium text-sm"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <div className="text-sm font-semibold text-slate-400">
              Step {step} of {totalSteps}
            </div>
            <div className="w-16"></div> {/* Spacer for alignment */}
          </div>
          <div className="w-full h-1 bg-slate-100">
            <div 
              className="h-full bg-vibe-pink transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </nav>
      )}

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-8">
        
        {/* --- Step 1: Welcome --- */}
        {step === 1 && (
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-vibe-pink/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="w-20 h-20 bg-vibe-pink rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-vibe-pink/30 mb-8 rotate-3">
              <Zap className="w-10 h-10 text-white fill-current" />
            </div>
            
            <h1 className="text-3xl font-bold text-vibe-navy mb-4">ยินดีต้อนรับสู่ Vibe Match</h1>
            <p className="text-slate-500 mb-10 leading-relaxed">
              แพลตฟอร์มที่จะช่วยคุณหาเพื่อนร่วมทีมแข่งขัน <br/>ด้วยสถิติเคมีการทำงานที่เข้ากันที่สุด
            </p>

            <button 
              onClick={handleNext}
              className="w-full py-4 bg-vibe-navy hover:bg-[#12142d] text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-md shadow-vibe-navy/20"
            >
              เริ่มต้นใช้งาน
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* --- Step 2: Upload Profile --- */}
        {step === 2 && (
          <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-vibe-navy">อัปโหลดโปรไฟล์ของคุณ</h2>
              <p className="text-slate-500">เพิ่มรูปภาพเพื่อให้เพื่อนร่วมทีมจดจำคุณได้ง่ายขึ้น</p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative z-10">
                  {formData.profilePic ? (
                    <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-vibe-pink rounded-full border-4 border-white flex items-center justify-center text-white shadow-md z-20">
                  <Upload className="w-4 h-4" />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <p className="text-xs text-slate-400">คลิกที่รูปภาพเพื่ออัปโหลด (แก้ไขได้ในภายหลัง)</p>
            </div>

            <div className="pt-8">
              <button 
                onClick={handleNext}
                className="w-full py-4 bg-vibe-pink hover:bg-[#d65b79] text-white font-bold rounded-2xl transition-all shadow-md shadow-vibe-pink/20"
              >
                ไปต่อ
              </button>
            </div>
          </div>
        )}

        {/* --- Step 3: Name & Username --- */}
        {step === 3 && (
          <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-vibe-navy">ข้อมูลส่วนตัวเบื้องต้น</h2>
              <p className="text-slate-500">แนะนำตัวให้เพื่อนๆ รู้จักกันหน่อย</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">ชื่อ (First Name)</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-vibe-pink focus:ring-1 focus:ring-vibe-pink transition-all text-slate-800"
                  placeholder="เช่น สมชาย"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">นามสกุล (Last Name)</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-vibe-pink focus:ring-1 focus:ring-vibe-pink transition-all text-slate-800"
                  placeholder="เช่น สุขใจ"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">ชื่อผู้ใช้ (Username)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">@</span>
                  <input 
                    type="text" 
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:border-vibe-pink focus:ring-1 focus:ring-vibe-pink transition-all text-slate-800"
                    placeholder="somchai_hacker"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleNext}
                disabled={!formData.firstName || !formData.lastName || !formData.username}
                className="w-full py-4 bg-vibe-pink hover:bg-[#d65b79] text-white font-bold rounded-2xl transition-all shadow-md shadow-vibe-pink/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ไปต่อ
              </button>
            </div>
          </div>
        )}

        {/* --- Step 4: Gender --- */}
        {step === 4 && (
          <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-vibe-navy">เพศของคุณ</h2>
              <p className="text-slate-500">ข้อมูลนี้จะถูกแสดงบนโปรไฟล์ของคุณ</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'male', label: 'ชาย (Male)' },
                { id: 'female', label: 'หญิง (Female)' },
                { id: 'lgbtq', label: 'LGBTQ+ / ไม่ระบุ (Prefer not to say)' }
              ].map((gender) => (
                <button
                  key={gender.id}
                  onClick={() => handleChange('gender', gender.id)}
                  className={`w-full p-5 rounded-2xl border-2 text-left font-semibold transition-all flex items-center justify-between ${
                    formData.gender === gender.id 
                      ? 'border-vibe-pink bg-vibe-pink-light/30 text-vibe-pink' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {gender.label}
                  {formData.gender === gender.id && <CheckCircle2 className="w-5 h-5" />}
                </button>
              ))}
            </div>

            <div className="pt-4">
              <button 
                onClick={handleNext}
                disabled={!formData.gender}
                className="w-full py-4 bg-vibe-pink hover:bg-[#d65b79] text-white font-bold rounded-2xl transition-all shadow-md shadow-vibe-pink/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ไปต่อ
              </button>
            </div>
          </div>
        )}

        {/* --- Step 5: Social Media --- */}
        {step === 5 && (
          <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-vibe-navy">ช่องทางติดต่อโซเชียลมีเดีย</h2>
              <p className="text-slate-500">เพื่อความสะดวกในการติดต่อกับเพื่อนร่วมทีม</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                  <input 
                    type="text" 
                    value={formData.ig}
                    onChange={(e) => handleChange('ig', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-slate-800"
                    placeholder="IG Username"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Facebook</label>
                <div className="relative">
                  <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                  <input 
                    type="text" 
                    value={formData.fb}
                    onChange={(e) => handleChange('fb', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800"
                    placeholder="Facebook Name or Link"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Line ID</label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input 
                    type="text" 
                    value={formData.line}
                    onChange={(e) => handleChange('line', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-slate-800"
                    placeholder="Line ID"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleNext}
                className="w-full py-4 bg-vibe-pink hover:bg-[#d65b79] text-white font-bold rounded-2xl transition-all shadow-md shadow-vibe-pink/20"
              >
                ไปต่อ (ข้ามได้ถ้ายังไม่ต้องการใส่)
              </button>
            </div>
          </div>
        )}

        {/* --- Step 6: Target Faculty --- */}
        {step === 6 && (
          <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-vibe-navy">คณะที่อยากเข้าศึกษาต่อ</h2>
              <p className="text-slate-500">เลือกคณะเป้าหมายของคุณ เพื่อหาคนที่มีความฝันเดียวกัน</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select 
                  value={formData.faculty}
                  onChange={(e) => handleChange('faculty', e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-vibe-pink focus:ring-1 focus:ring-vibe-pink transition-all text-slate-800 appearance-none font-medium"
                >
                  <option value="" disabled>คลิกเพื่อเลือกคณะ</option>
                  {FACULTIES.map(fac => (
                    <option key={fac} value={fac}>{fac}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-center py-4">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="px-4 text-sm text-slate-400 font-medium">หรือ</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <button
                onClick={() => handleChange('faculty', 'ยังไม่แน่ใจ (Undecided)')}
                className={`w-full p-4 rounded-xl border-2 text-center font-bold transition-all flex items-center justify-center gap-2 ${
                  formData.faculty === 'ยังไม่แน่ใจ (Undecided)' 
                    ? 'border-slate-800 bg-slate-800 text-white' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                ยังไม่รู้ / ยังไม่แน่ใจ
              </button>
            </div>

            <div className="pt-8">
              <button 
                onClick={handleFinish}
                disabled={!formData.faculty}
                className="w-full py-4 bg-vibe-navy hover:bg-[#12142d] text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md shadow-vibe-navy/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-5 h-5" />
                เสร็จสิ้น & ไปหน้าหลัก
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
