import type { NextPage } from 'next'
import { ExternalLink, Lock, Layers } from 'lucide-react';

const SelfProject: NextPage = () => {
    return (
        <section id="projects" className="max-w-5xl mx-auto py-20 px-5 border-t border-[#1e293b]">
            <h2 className="text-center text-2xl tracking-[2px] text-[#38bdf8] mb-12 uppercase">// External_Subsystems</h2>

            {/* ✨ Added 'justify-center' so that if there's only 1 item, it sits dead center */}
            <div className="flex flex-wrap md:flex-nowrap gap-8 justify-center items-stretch max-w-4xl mx-auto">

                {/* App 1: Image Encryption Portal */}
                {/* ✨ Added 'max-w-xl w-full mx-auto' to control the card stretch when centered solo */}
                <div className="border border-emerald-500/20 bg-[#141f32]/40 rounded-xl p-8 relative overflow-hidden group hover:border-emerald-400 hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.25)] transition-all duration-300 max-w-xl w-full mx-auto">

                    {/* The Icon: Swapped to Lucide's Lock, colored in Matrix Green */}
                    <div className="text-emerald-400 mb-4 p-2 bg-emerald-500/10 rounded-lg w-fit">
                        <Lock size={24} className="animate-pulse" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-emerald-400">Image Encryption Portal</h3>

                    <p className="text-[#cbd5e1] text-sm line-clamp-3 leading-relaxed mb-6">
                        An isolated sandboxed system handling browser-side pixel transformations, custom encryption matrices, and steganography toolsets.
                    </p>

                    <a href="/encipherment" className="text-emerald-400 text-xs flex items-center gap-1 hover:underline tracking-wider uppercase w-fit">
                        LAUNCH PORTAL <ExternalLink size={14} />
                    </a>
                </div>

                {/* App 2: The App Hub */}
                {/* ✨ Added 'max-w-xl w-full mx-auto' here as well to mirror the exact scale mechanics */}
                {/* <div className="border border-[#38bdf8]/10 bg-[#141f32]/40 rounded-xl p-8 relative overflow-hidden group hover:border-[#38bdf8] hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.2)] transition-all duration-300 max-w-xl w-full mx-auto">

                    <div className="text-[#38bdf8] mb-4 p-2 bg-[#38bdf8]/10 rounded-lg w-fit">
                        <Layers size={24} className="animate-pulse" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-[#38bdf8]">The App Hub</h3>

                    <p className="text-[#cbd5e1] text-sm line-clamp-3 leading-relaxed mb-6">
                        Centralized matrix staging micro-utilities, dynamic automation features, and client experimental sandboxes.
                    </p>

                    <a href="/app-hub" className="text-[#38bdf8] text-xs flex items-center gap-1 hover:underline tracking-wider uppercase w-fit">
                        ACCESS MODULES <ExternalLink size={14} />
                    </a>
                </div> */}

            </div>
        </section>
    )
}

export default SelfProject