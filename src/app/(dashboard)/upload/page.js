"use client";
import { useState } from "react";
import { FaCloudUploadAlt, FaCircleNotch, FaUserCircle, FaFilePdf, FaTerminal, FaMicrochip, FaShieldAlt, FaSignal } from "react-icons/fa";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState("idle"); 
  const [progress, setProgress] = useState({ overall: 0 });

  return (
    <div className="w-full flex-1 flex flex-col p-2 sm:p-4 md:p-8 animate-in fade-in duration-700">
      {/* The Outer Shell (Optimized Padding for Mobile) */}
      <div className="flex-1 bg-black/40 backdrop-blur-3xl border border-amber-600/20 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Centered Content Wrapper (Fluid Padding) */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-16">
          
          <div className="w-full max-w-6xl flex flex-col gap-6 md:gap-10">
            
            {/* 🏷️ System Status Badges (Responsive Wrap & Scale) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] md:text-[12px] text-amber-500 font-black tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap">
                  <FaMicrochip className="text-amber-500/60" />
                  NEURAL ENGINE // ACTIVE
                </div>
                <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] md:text-[12px] text-gray-400 font-black tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap">
                  <FaShieldAlt className="text-gray-600" />
                  SECURE DATA STREAM
                </div>
              </div>
              
              <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-[12px] text-gray-500 font-black uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <FaSignal className="text-gray-700" /> UPLINK: <span className="text-white">STABLE</span>
                </span>
                <span className="flex items-center gap-3">
                  {stage.toUpperCase()}
                  <span className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${stage === 'idle' ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'bg-green-500'} animate-pulse`} />
                </span>
              </div>
            </div>

            {/* 📟 The Main Terminal (Responsive Row-to-Col Pivot) */}
            <div className="flex flex-col xl:flex-row gap-6 md:gap-10 min-h-[500px] lg:min-h-[600px]">
              
              {/* LEFT: Upload Module (Scaling widths) */}
              <div className="w-full xl:w-[45%] bg-black/70 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 flex flex-col relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                
                <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl md:rounded-3xl hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-700 cursor-pointer relative z-10 py-10">
                  <input type="file" className="hidden" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
                  
                  <div className={`w-20 h-20 md:w-28 md:h-28 rounded-[1.25rem] md:rounded-3xl flex items-center justify-center mb-6 md:mb-10 transition-all duration-500 ${
                    file ? "bg-amber-500 text-black shadow-[0_0_50px_rgba(245,158,11,0.5)] scale-110" : "bg-white/5 border border-white/10 text-gray-500 group-hover:scale-105"
                  }`}>
                    {file ? <FaFilePdf className="text-3xl md:text-5xl" /> : <FaCloudUploadAlt className="text-3xl md:text-5xl" />}
                  </div>

                  <div className="text-center px-4 md:px-8">
                    <p className="text-white text-base md:text-lg font-bold tracking-tight mb-2 md:mb-3 truncate max-w-[200px] md:max-w-none">
                      {file ? file.name : "Initialize Source Stream"}
                    </p>
                    <p className="text-gray-500 text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] leading-loose font-black">
                      {file ? "PDF ANALYZED & READY" : "Click to select local PDF"}
                    </p>
                  </div>
                </label>
              </div>

              {/* RIGHT: Intelligence Terminal */}
              <div className="flex-1 flex flex-col gap-6 md:gap-8">
                
                <div className="flex-1 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 flex flex-col gap-8 md:gap-10 relative shadow-inner">
                  
                  {/* Top Analysis Header (Responsive Typography) */}
                  <div className="flex justify-between items-end border-b border-white/10 pb-6 md:pb-8">
                    <div className="space-y-1 md:space-y-2">
                      <h3 className="text-amber-500 text-[11px] md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Multi-Pass Synthesis</h3>
                      <p className="text-gray-500 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]">Extracting Contextual Metadata</p>
                    </div>
                    <span className="text-3xl md:text-5xl font-black text-white italic tabular-nums leading-none tracking-tighter">
                      {progress.overall}%
                    </span>
                  </div>

                  {/* Grid pivot for Tablets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8 md:gap-10 flex-1">
                    {/* World Meta Stack */}
                    <div className="flex flex-col gap-4 md:gap-5">
                      <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.25em]">
                        <FaTerminal className="text-amber-500" /> System Log
                      </div>
                      <div className="flex-1 bg-white/[0.03] rounded-2xl md:rounded-3xl border border-white/5 p-5 md:p-8 flex flex-col gap-4 md:gap-6">
                         <StatusItem label="PDF INDEXING" done={progress.overall > 15} />
                         <StatusItem label="TONAL MAPPING" loading={progress.overall > 15 && progress.overall < 50} done={progress.overall >= 50} />
                         <StatusItem label="SCENE ANCHORING" loading={progress.overall >= 50} />
                         
                         <div className="mt-auto border-t border-white/10 pt-4 md:pt-6">
                           <p className="text-[10px] md:text-[12px] text-gray-400 font-bold uppercase tracking-tight leading-relaxed">
                              <span className="text-amber-500/80 mr-2 md:mr-3">VIBE //</span> 
                              {progress.overall > 40 ? "Grimdark. Ancient Ruins." : "Waiting for Neural Pass..."}
                           </p>
                         </div>
                      </div>
                    </div>

                    {/* Visual Engine Stack */}
                    <div className="flex flex-col gap-4 md:gap-5">
                      <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.25em]">
                        <FaUserCircle className="text-amber-500" /> Visual Engine
                      </div>
                      <div className="flex-1 min-h-[160px] bg-black/60 rounded-2xl md:rounded-3xl border border-white/10 relative flex flex-col items-center justify-center group overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%] pointer-events-none opacity-40" />
                        
                        <FaUserCircle className="text-5xl md:text-7xl text-white/5 group-hover:text-amber-500/10 transition-all duration-1000" />
                        {stage === "processing" && <FaCircleNotch className="animate-spin text-amber-500 text-3xl md:text-4xl absolute" />}
                        
                        <div className="absolute bottom-4 md:bottom-6 inset-x-4 md:inset-x-6 p-3 md:p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl md:rounded-2xl">
                          <p className="text-[8px] md:text-[10px] text-amber-500/60 font-black uppercase text-center tracking-[0.15em] md:tracking-[0.2em]">
                            Rendering Context: {progress.overall > 70 ? "Ready" : "Queueing"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activation Button */}
                <button 
                  disabled={!file} 
                  className={`group relative overflow-hidden py-4 md:py-6 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[11px] md:text-[13px] transition-all duration-500 ${
                    file ? "bg-amber-500 text-black shadow-[0_0_60px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98]" : "bg-white/5 text-gray-700 border border-white/5"
                  }`}
                >
                  <span className="relative z-10">{stage === "idle" ? "Execute Visualization Pass" : "Link Established..."}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusItem({ label, loading, done }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-[11px] md:text-[13px] font-black tracking-[0.15em] md:tracking-[0.2em] ${done ? "text-white" : "text-gray-600"}`}>{label}</span>
      {done ? (
        <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,1)]" />
      ) : loading ? (
        <FaCircleNotch className="animate-spin text-amber-500/60 text-xs md:text-sm" />
      ) : (
        <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-white/10" />
      )}
    </div>
  );
}