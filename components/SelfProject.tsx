import type { NextPage } from 'next'
import { ExternalLink, ShieldAlert, Layers } from 'lucide-react';

const SelfProject: NextPage = () => {
    return (
        <section id="projects" className="max-w-5xl mx-auto py-20 px-5 border-t border-[#1e293b]">
            <h2 className="text-center text-2xl tracking-[2px] text-[#38bdf8] mb-12 uppercase">// External_Subsystems</h2>
            <div className="grid md:grid-cols-2 gap-8">

                {/* App 1 */}
                <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-[#f87171]/30 p-8 rounded-lg flex flex-col justify-between hover:border-[#f87171] hover:shadow-[0_0_20px_rgba(248,113,113,0.15)] transition-all duration-300">
                    <div>
                        <div className="text-[#f87171] mb-4"><ShieldAlert size={32} /></div>
                        <h3 className="text-xl font-bold mb-3">Image Encryption Portal</h3>
                        <p className="text-[#cbd5e1] text-sm line-clamp-3 leading-relaxed mb-6">
                            An isolated sandboxed system handling browser-side pixel transformations, custom encryption matrices, and steganography toolsets.
                        </p>
                    </div>
                    <a href="/crypto-portal" className="inline-flex items-center gap-2 text-xs font-bold text-[#f87171] uppercase hover:underline">
                        Initialize Handshake <ExternalLink size={14} />
                    </a>
                </div>

                {/* App 2 */}
                <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-[#38bdf8]/30 p-8 rounded-lg flex flex-col justify-between hover:border-[#38bdf8] hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300">
                    <div>
                        <div className="text-[#38bdf8] mb-4"><Layers size={32} /></div>
                        <h3 className="text-xl font-bold mb-3">The App Hub</h3>
                        <p className="text-[#cbd5e1] text-sm line-clamp-3 leading-relaxed mb-6">
                            Centralized matrix staging micro-utilities, dynamic automation features, and client experimental sandboxes.
                        </p>
                    </div>
                    <a href="/app-hub" className="inline-flex items-center gap-2 text-xs font-bold text-[#38bdf8] uppercase hover:underline">
                        Access Modules <ExternalLink size={14} />
                    </a>
                </div>


            </div>
        </section>
    )
}

export default SelfProject
