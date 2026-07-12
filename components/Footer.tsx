import type { NextPage } from 'next'

const Footer: NextPage = () => {
    return (
        <footer id="contact" className="border-t border-[#1e293b] py-10 bg-[#0f172a]">
            <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-5">
                <div className="text-xs text-[#64748b] tracking-wider">&copy;ALL RIGHTS SECURED.</div>
                <div className="flex gap-6">
                    <a href="https://www.linkedin.com/in/jim-chan-707793114/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#cbd5e1] hover:text-[#38bdf8] transition-colors">
                        LinkedIn
                    </a>
                    {/* <a href="/your-cv.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#cbd5e1] hover:text-[#38bdf8] transition-colors">
                <FileText size={16} /> Download_CV
            </a> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer
