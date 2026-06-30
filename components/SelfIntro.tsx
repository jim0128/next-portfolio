import type { NextPage } from 'next'

const SelfIntro: NextPage = () => {
  return (
    <section id="home" className="relative min-h-screen h-screen flex items-center justify-center pt-16 overflow-hidden text-center bg-[#0f172a]">
      {/* Enclosing Canvas Container with SVG Filter */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0 opacity-65"
        style={{ filter: 'url(#irregular-ink-filter)' }}
      >
        {/* Main Core Ink Blob */}
        <div
          className="absolute w-[500px] h-[500px] rounded-[53%_47%_43%_57%/_45%_42%_58%_55%] animate-[irregularWash_5s_infinite_alternate_ease-in-out]"
          style={{
            background: 'radial-gradient(circle, rgba(15, 23, 42, 0.95) 10%, rgba(5, 150, 105, 0.4) 45%, rgba(15, 23, 42, 0) 70%)'
          }}
        />

        {/* Cyan Secondary Bleed */}
        <div
          className="absolute w-[700px] h-[700px] rounded-[42%_58%_49%_51%/_60%_40%_60%_40%] animate-[irregularCyber_8s_infinite_linear]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(56, 189, 248, 0.08) 50%, rgba(15, 23, 42, 0) 70%)'
          }}
        />
      </div>

      {/* React SVG Filter Matrix for Bleeding/Tearing Edges */}
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-0 h-0 invisible pointer-events-none">
        <defs>
          <filter id="irregular-ink-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="55" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 max-w-[700px] px-5">
        <p className="text-[#38bdf8] text-sm tracking-[2px] mb-3 uppercase">[ System Initialized ]</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#34d399]">Jim Chan</span>
        </h1>
        <p className="text-[#cbd5e1] leading-relaxed border-l-4 border-[#38bdf8] pl-4 pr-2 text-left bg-[#1e293b]/60 backdrop-blur-md py-3 rounded-r-md">
          A software engineer in Hong Kong who loves to build tech things and explore the world of programming. I am passionate about creating innovative solutions and continuously learning new technologies to enhance my skills.
        </p>
      </div>
    </section>
  )
}

export default SelfIntro
