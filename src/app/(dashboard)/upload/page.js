"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "sonner";
import {
  FaCloudUploadAlt,
  FaCircleNotch,
  FaUserCircle,
  FaFilePdf,
  FaTerminal,
  FaMicrochip,
  FaShieldAlt,
  FaSignal,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState("idle");
  const [progress, setProgress] = useState({
    overall: 0,
    statusText: "Awaiting Source",
  });
  const [generatedAssets, setGeneratedAssets] = useState({
    cover: null
  });
  const socketRef = useRef(null);
  const router = useRouter();

  //Socket Initialization
  useEffect(() => {
    socketRef.current = io(apiBaseUrl);

    socketRef.current.on("pipeline_update", (data) => {
      if(data.progress >= 75 && data.progress < 90)
        setGeneratedAssets({ cover: data.coverImage });

      setProgress({
        overall: data.progress,
        statusText: data.status.replace(/_/g, " "),
      });
      setStage(data.progress === 100 ? "completed" : "processing");
    });

    socketRef.current.on("pipeline_error", (data) => {
      setStage("error");
      toast.error(`NEURAL LINK SEVERED: ${data.message}`);
    });

    //Checking for active session(processing) on load
    const checkActiveSession = async () => {
      try {
        const res = await axios.get(
          `${apiBaseUrl}/api/books/check-active-session`,
          {
            withCredentials: true,
          },
        );
        if (res.data.active) {
          console.log("Resuming active session for:", res.data.title);

          // 1. Update UI immediately
          setStage("processing");
          setProgress({
            overall: res.data.progress,
            statusText: res.data.status.replace(/_/g, " "),
          });

          // 2. Re-join the socket room!
          socketRef.current.emit("join_book_room", res.data.bookId);
        }
      } catch (error) {
        console.error("Failed to check active session:", err);
      }
    };
    checkActiveSession();

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const handleExecute = async () => {
    if (!file) {
      toast.error("Please Upload a Book!");
      return;
    }

    setStage("initializing");
    setProgress({ overall: 0, statusText: "Uplinking To Server..." });

    try {
      const formData = new FormData();
      formData.append("bookFile", file);
      // formData.append("title", file.name);

      //Triggering the orchestrator now
      const res = await axios.post(
        `${apiBaseUrl}/api/books/start-pipeline`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      //Already Completed Case
      if (res.data.redirect) {
        setStage("completed");
        setProgress({ overall: 100, statusText: "Completed" });
        toast.success("Book already processed and exists in your library!");
        router.push("/dashboard");
        return;
      }

      //Joining the specific book room
      const { bookId, isResuming } = res.data;
      socketRef.current.emit("join_book_room", bookId);

      setStage("processing");
      if (isResuming)
        setProgress((prev) => ({
          ...prev,
          statusText: "Resuming Neural Link...",
        }));
    } catch (error) {
      console.error("Uplink Failed:", err);
      setStage("error");
      toast.error("Failed to initiate neural pipeline. Check console.");
    }
  };

  return (
    // Changed: Added h-full and overflow-hidden to prevent body scroll
    <div className="w-full h-full flex flex-col p-2 sm:p-4 overflow-hidden animate-in fade-in duration-700">
      {/* Changed: flex-1 h-full ensures this container stays within bounds */}
      <div className="flex-1 bg-black/40 backdrop-blur-3xl border border-amber-600/20 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
        {/* Changed: Reduced padding (p-4 to p-6) to reclaim space */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
          <div className="w-full max-w-6xl h-full flex flex-col gap-4 md:gap-6">
            {/* 🏷️ System Status Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 flex-shrink-0">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] text-amber-500 font-black tracking-widest uppercase whitespace-nowrap">
                  <FaMicrochip className="text-amber-500/60" />
                  NEURAL ENGINE // ACTIVE
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-400 font-black tracking-widest uppercase whitespace-nowrap">
                  <FaShieldAlt className="text-gray-600" />
                  SECURE DATA STREAM
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <FaSignal className="text-gray-700" /> UPLINK:{" "}
                  <span className="text-white">STABLE</span>
                </span>
                <span className="flex items-center gap-3">
                  {stage.toUpperCase()}
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${stage === "idle" ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]" : "bg-green-500"} animate-pulse`}
                  />
                </span>
              </div>
            </div>

            {/* 📟 The Main Terminal - Changed: flex-1 to distribute height */}
            <div className="flex-1 flex flex-col xl:flex-row gap-4 md:gap-6 overflow-hidden min-h-0">
              {/* LEFT: Upload Module */}
              <div className="w-full xl:w-[40%] bg-black/70 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-4 flex flex-col relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl md:rounded-3xl hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-700 cursor-pointer relative z-10 p-4">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <div
                    className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${file ? "bg-amber-500 text-black shadow-[0_0_50px_rgba(245,158,11,0.5)] scale-110" : "bg-white/5 border border-white/10 text-gray-500"}`}
                  >
                    {file ? (
                      <FaFilePdf className="text-3xl md:text-5xl" />
                    ) : (
                      <FaCloudUploadAlt className="text-3xl md:text-5xl" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm md:text-base font-bold mb-1 truncate max-w-[200px]">
                      {file ? file.name : "Initialize Source Stream"}
                    </p>
                    <p className="text-gray-500 text-[9px] uppercase tracking-widest font-black">
                      {file
                        ? "PDF ANALYZED & READY"
                        : "Click to select local PDF"}
                    </p>
                  </div>
                </label>
              </div>

              {/* RIGHT: Intelligence Terminal - Changed: flex-1 and overflow-hidden */}
              <div className="flex-1 flex flex-col gap-4 md:gap-6 min-h-0 overflow-hidden">
                <div className="flex-1 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 flex flex-col gap-4 md:gap-6 relative shadow-inner overflow-hidden">
                  {/* Top Analysis Header */}
                  <div className="flex justify-between items-end border-b border-white/10 pb-4 flex-shrink-0">
                    <div className="space-y-1">
                      <h3 className="text-amber-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
                        Multi-Pass Synthesis
                      </h3>
                      <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest text-nowrap">
                        Extracting Contextual Metadata
                      </p>
                    </div>
                    <span className="text-3xl md:text-5xl font-black text-white italic tabular-nums leading-none tracking-tighter">
                      {progress.overall}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
                    {/* World Meta Stack */}
                    <div className="flex flex-col gap-2 min-h-0">
                      <div className="flex items-center gap-3 text-[9px] font-black text-gray-400 uppercase tracking-widest flex-shrink-0">
                        <FaTerminal className="text-amber-500" /> System Log
                      </div>
                      <div className="flex-1 bg-white/[0.03] rounded-2xl border border-white/5 p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                        <StatusItem
                          label="BYTESTREAM PARSING"
                          done={progress.overall > 20}
                        />
                        <StatusItem
                          label="GLOBAL SYNTHESIS"
                          loading={
                            progress.overall > 20 && progress.overall < 45
                          }
                          done={progress.overall >= 45}
                        />
                        <StatusItem
                          label="CHARACTER MAPPING"
                          loading={
                            progress.overall >= 45 && progress.overall < 75
                          }
                          done={progress.overall >= 75}
                        />
                        <StatusItem
                          label="PROMPT SERIALIZATION"
                          loading={
                            progress.overall >= 75 && progress.overall < 90
                          }
                          done={progress.overall >= 90}
                        />
                        <StatusItem
                          label="FINAL IMG GENERATION"
                          loading={
                            progress.overall >= 90 && progress.overall < 100
                          }
                          done={progress.overall === 100}
                        />
                        <div className="mt-auto border-t border-white/10 pt-3">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">
                            <span className="text-amber-500/80 mr-2">
                              LOG //
                            </span>
                            {progress.overall === 100
                              ? "Ready for Journey."
                              : "Sequencing..."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Visual Engine Stack */}
                    <div className="flex flex-col gap-2 min-h-0">
                      <div className="flex items-center gap-3 text-[9px] font-black text-gray-400 uppercase tracking-widest flex-shrink-0">
                        <FaMicrochip className="text-amber-500" /> Visual Engine
                      </div>
                      <div className="flex-1 min-h-80 bg-black/60 rounded-2xl border border-white/10 relative flex flex-col items-center justify-center group overflow-hidden">
                        {generatedAssets.cover ? (
                          <img
                            src={generatedAssets.cover}
                            alt="Cover"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%] pointer-events-none opacity-40" />
                            <FaUserCircle
                              className={`text-4xl md:text-6xl ${stage === "processing" ? "text-amber-500/40 animate-pulse" : "text-white/5"}`}
                            />
                          </>
                        )}
                        <div className="absolute bottom-3 inset-x-3 p-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg">
                          <p className="text-[7px] text-amber-500/80 font-black uppercase text-center tracking-widest">
                            {generatedAssets.cover
                              ? "COVER FRAGMENT DETECTED"
                              : "AWAITING STREAM"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activation Button */}
                <button
                  disabled={!file || stage === "initializing" || stage == "processing"}
                  className={`flex-shrink-0 py-4 md:py-5 rounded-xl font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-500 ${file ? "bg-amber-500 text-black shadow-lg" : "bg-white/5 text-gray-700 border border-white/5"} cursor-pointer`}
                  onClick={handleExecute}
                >
                  {stage === "idle"
                    ? "Execute Visualization Pass"
                    : "Link Established..."}
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
      <span
        className={`text-[11px] md:text-[13px] font-black tracking-[0.15em] md:tracking-[0.2em] ${done ? "text-white" : "text-gray-600"}`}
      >
        {label}
      </span>
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
