import type { NextPage } from 'next'

const Timeline: NextPage = () => {
  return (
    <section id="experience" className="max-w-3xl mx-auto py-20 px-5 border-t border-[#1e293b]">
      <h2 className="text-center text-2xl tracking-[2px] text-[#38bdf8] mb-12 uppercase">// Career_Log</h2>

      <div className="relative border-l-2 border-dashed border-[#38bdf8]/40 md:ml-[140px] pl-8 space-y-12">

        {/* Job 1 */}
        <div className="relative">
          <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
          <div className="hidden md:block absolute -left-[172px] top-1 text-sm text-[#cbd5e1] font-bold">2021 - Present</div>
          <div className="bg-[#1e293b] border border-[#334155] p-6 rounded-lg hover:border-[#38bdf8] hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300">
            <div className="md:hidden text-xs text-[#38bdf8] font-bold mb-2">May 2021 - Present</div>
            <h3 className="text-xl font-bold">Software Engineer II</h3>
            <div className="text-[#34d399] text-sm mb-4">
              <a href="https://www.you.co/sg/" target="_blank">@ YouTrip</a>
            </div>
            <ul className="list-disc list-inside text-[#cbd5e1] text-sm space-y-2">
              <li>Using Flutter to build 2.0 of the user app in Android and iOS. Involved to the maintenance of the 1.0 app with native code</li>
              <li>Also need to build and maintain the backend with Golang and gRPC</li>
              <li>Recently working on e-Giro integration and YT Family Project</li>
            </ul>
          </div>
        </div>

        {/* Job 2 */}
        <div className="relative">
          <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
          <div className="hidden md:block absolute -left-[172px] top-1 text-sm text-[#cbd5e1] font-bold">2020 - 2021</div>
          <div className="bg-[#1e293b] border border-[#334155] p-6 rounded-lg hover:border-[#38bdf8] hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300">
            <div className="md:hidden text-xs text-[#38bdf8] font-bold mb-2">April 2020 - May 2021</div>
            <h3 className="text-xl font-bold">Software Engineer</h3>
            <div className="text-[#34d399] text-sm mb-4">
              <a href="https://shopline.hk/en/" target="_blank">@ SHOPLINE</a>
            </div>
            <ul className="list-disc list-inside text-[#cbd5e1] text-sm space-y-2">
              <li>Handling SHOPLINE chatbot application</li>
              <li>Involved development of the dashboard UI library</li>
              <li>Developing of the brand new product - App Center</li>
            </ul>
          </div>
        </div>

        {/* Job 3 */}
        <div className="relative">
          <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
          <div className="hidden md:block absolute -left-[172px] top-1 text-sm text-[#cbd5e1] font-bold">2018 - 2020</div>
          <div className="bg-[#1e293b] border border-[#334155] p-6 rounded-lg hover:border-[#38bdf8] hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300">
            <div className="md:hidden text-xs text-[#38bdf8] font-bold mb-2">March 2018 - Jan 2020</div>
            <h3 className="text-xl font-bold">Full Stack Software Engineer</h3>
            <div className="text-[#34d399] text-sm mb-4">
              <a href="https://www.dashare.com" target="_blank">@ DASH Living</a>
            </div>
            <ul className="list-disc list-inside text-[#cbd5e1] text-sm space-y-2">
              <li>First was focused on the start from scratch Web page</li>
              <li>Later on focused on the React Native app</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Timeline
