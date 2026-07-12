import type { NextPage } from 'next'
import { useState } from 'react';
import Head from 'next/head'
import { Menu, X, FileText } from 'lucide-react';


const Header: NextPage = () => {


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/#home' },
        { name: 'Experience', href: '/#experience' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Contact', href: '/#contact' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (

        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>JIM.CHAN | Portfolio</title>
                {/* <!-- Google Fonts for a tech/monospaced aesthetic --> */}
                <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
                <link rel="icon" type="image/png" href="/favicon.png"></link>
            </Head>


            <header className="fixed top-0 left-0 w-full h-16 bg-[#0f172a]/85 backdrop-blur-md border-b border-cyan-500/30 z-50">
                <div className="max-w-6xl mx-auto px-5 h-full flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#34d399]">
                        JIM.CHAN
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm tracking-wider text-[#cbd5e1] hover:text-[#38bdf8] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                            >
                // {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#38bdf8] p-1 cursor-pointer focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>


                {/* Mobile Dropdown Menu */}
                <div className={`fixed top-16 left-0 w-full bg-[#0f172a] border-b border-cyan-500/40 flex-col p-5 pb-6 gap-4 z-40 transition-all duration-300 ${isMenuOpen ? 'flex opacity-100' : 'hidden opacity-0'}`}>
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg text-[#f8fafc] py-2 border-b border-[#334155]"
                        >
                            &gt; {item.name}
                        </a>
                    ))}
                </div>
            </header>
        </div>
    )
}

export default Header
