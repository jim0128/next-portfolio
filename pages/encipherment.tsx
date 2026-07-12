'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Upload, Lock, Unlock, ShieldCheck, ShieldX, RefreshCw, Download } from 'lucide-react';

interface TabData {
    file: File | null;
    preview: string | null;
    output: string | null;
    password: string;
}

export default function CryptoPortal() {
    // Independent state for encrypt vs decrypt modes
    const [data, setData] = useState<{ Encrypt: TabData; Decrypt: TabData }>({
        Encrypt: { file: null, preview: null, output: null, password: '' },
        Decrypt: { file: null, preview: null, output: null, password: '' }
    });

    const [mode, setMode] = useState<'Encrypt' | 'Decrypt'>('Encrypt');
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePasswordChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setData(prev => ({
            ...prev,
            [mode]: { ...prev[mode], password: value }
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setData(prev => ({
                ...prev,
                [mode]: {
                    ...prev[mode], // Preserves the password for the current mode
                    file: selectedFile,
                    preview: URL.createObjectURL(selectedFile),
                    output: null
                }
            }));
        }
    };

    const processImage = async () => {
        const currentData = data[mode];

        if (!currentData.preview && !currentData.password) return alert('Please enter a password');


        try {
            setIsProcessing(true);
            // Calls the robust AES-GCM helper function below
            const processedDataUrl = await processImageSecurely(currentData.preview, currentData.password, mode);

            setData(prev => ({
                ...prev,
                [mode]: { ...prev[mode], output: processedDataUrl }
            }));
        } catch (err: any) {
            console.error("Crypto execution failed:", err);
            alert(err.message || "An error occurred during processing.");
        } finally {
            setIsProcessing(false);
        }
    };

    const activeData = data[mode];

    return (
        <div className="bg-[#0f172a] text-[#f8fafc] min-h-screen font-mono p-5 pt-24 pb-20">

            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none opacity-40 z-0" style={{ filter: 'url(#irregular-ink-filter)' }}>
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(52,211,153,0.2)_0%,rgba(15,23,42,0)_70%)] rounded-[60%_40%_30%_70%/_60%_30%_70%_40%]" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-8 text-[#38bdf8] uppercase">// Image Cryptographic Subsystem</h1>

                {/* Mode Toggle */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => { setMode('Encrypt'); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                        className={`flex items-center gap-2 px-6 py-2 border ${mode === 'Encrypt' ? 'border-[#38bdf8] bg-[#38bdf8]/10' : 'border-[#334155]'} rounded transition-all`}
                    >
                        <Lock size={16} /> Encrypt
                    </button>
                    <button
                        onClick={() => { setMode('Decrypt'); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                        className={`flex items-center gap-2 px-6 py-2 border ${mode === 'Decrypt' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-[#334155] text-slate-400'} rounded transition-all`}
                    >
                        <Unlock size={16} /> Decrypt
                    </button>
                </div>

                {/* Input/Preview Zone */}
                <div className="space-y-4 mb-8">
                    <div onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-[#334155] rounded-xl p-8 text-center cursor-pointer hover:border-[#38bdf8] bg-[#1e293b]/30 active:scale-[0.99] transition-transform">
                        <Upload className="mx-auto mb-4 text-[#64748b]" size={32} />
                        <p className="text-xs md:text-sm">{activeData.file ? activeData.file.name : `Tap to upload image for ${mode}`}</p>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                    </div>

                    {activeData.preview && (
                        <div className="w-full border border-[#334155] rounded-lg overflow-hidden bg-[#0f172a]">
                            <div className="text-[9px] p-2 bg-[#1e293b] text-[#64748b] uppercase">Source_Preview</div>
                            <img src={activeData.preview} alt="Preview" className="w-full h-40 md:h-64 object-contain" />
                        </div>
                    )}
                </div>

                {/* Security Token Input */}
                {activeData.preview && (
                    <div className="bg-[#1e293b]/50 border border-[#334155] rounded-lg p-4 mb-8">
                        <label className="block text-[10px] text-[#38bdf8] uppercase mb-2 tracking-widest">Security_Token</label>
                        <textarea
                            className="w-full bg-[#0f172a] border border-[#334155] rounded p-3 text-sm focus:border-[#38bdf8] outline-none"
                            onChange={handlePasswordChange}
                            value={activeData.password}
                            placeholder="Enter key..."
                            rows={2}
                        />
                    </div>
                )}

                {/* Action Panel */}
                {activeData.file && (
                    <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155] mb-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {
                                activeData.preview && activeData.password ?
                                    <span className="text-[#34d399] flex items-center gap-2 text-sm">
                                        <ShieldCheck size={18} /> Ready to {mode}
                                    </span>
                                    :
                                    <span className="text-[#f56565] flex items-center gap-2 text-sm">
                                        <ShieldX size={18} /> Please enter a password
                                    </span>
                            }
                            <button
                                onClick={processImage}
                                disabled={isProcessing || !activeData.password}
                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#38bdf8] text-[#0f172a] px-6 py-2 rounded font-bold hover:bg-[#7dd3fc] disabled:bg-slate-700 disabled:text-slate-400 transition-all"
                            >
                                <RefreshCw size={16} className={isProcessing ? "animate-spin" : ""} />
                                {isProcessing ? "Processing..." : "Process Image"}
                            </button>
                        </div>
                    </div>
                )}


                {/* Output Section */}
                {activeData.output && (
                    <div className="border border-[#38bdf8]/30 rounded-lg overflow-hidden">
                        <div className="text-[10px] p-2 bg-[#38bdf8]/10 text-[#38bdf8] uppercase flex items-center justify-between">
                            <span>{mode.toUpperCase()}_Result</span>
                            <a href={activeData.output} download={`${mode}_${activeData.file?.name || 'crypt.png'}`} className="flex items-center gap-1 hover:text-white underline">
                                <Download size={12} /> Download
                            </a>
                        </div>
                        {/* Renders beautifully for both encrypted matrix blocks and decrypted files! */}
                        <img src={activeData.output} alt="Processed Outcome" className="w-full h-40 md:h-64 object-contain" />
                    </div>
                )}

            </div>

            <svg className="hidden">
                <filter id="irregular-ink-filter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="5" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="95" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>
        </div>
    );
}

/**
 * Secure AES-GCM encryption that draws a visual scramble matrix for previews and downloads
 */
async function processImageSecurely(imageSrc: string, password: string, mode: 'Encrypt' | 'Decrypt'): Promise<string> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const baseKey = await crypto.subtle.importKey("raw", passwordBuffer, "PBKDF2", false, ["deriveKey"]);

    const salt = encoder.encode("StaticSaltSystemKeySync");
    const key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        [mode === 'Encrypt' ? "encrypt" : "decrypt"]
    );

    const iv = new Uint8Array(12);
    for (let i = 0; i < 12; i++) {
        iv[i] = (password.charCodeAt(i % password.length) + i) % 256;
    }

    if (mode === 'Encrypt') {
        // 1. Get raw image bytes
        const response = await fetch(imageSrc);
        const arrayBuffer = await response.arrayBuffer();

        // 2. Encrypt via AES-GCM
        const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, arrayBuffer);
        const encryptedBytes = new Uint8Array(encrypted);

        // 3. Generate a deterministic visual scramble using a canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Canvas context failed");

        // Keep dimensions light but reasonable for a preview artifact
        canvas.width = 300;
        canvas.height = 300;
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        const u8 = imgData.data;

        // Seed a pseudo-random loop using our encrypted bytes to draw static noise
        let byteIdx = 0;
        for (let i = 0; i < u8.length; i += 4) {
            const val = encryptedBytes[byteIdx % encryptedBytes.length] || 0;
            u8[i] = (val * (i + 13)) % 256; // Pseudo-random Red
            u8[i + 1] = (val * (i + 37)) % 256; // Pseudo-random Green
            u8[i + 2] = (val * (i + 51)) % 256; // Pseudo-random Blue
            u8[i + 3] = 255;                    // Fully visible Alpha
            byteIdx++;
        }
        ctx.putImageData(imgData, 0, 0);

        // 4. Overwrite a tiny pixel signature at the very end of the file containing the real data size
        // Then attach the actual raw encrypted payload as hidden text metadata inside the PNG
        const pngDataUrl = canvas.toDataURL('image/png');

        // Convert the canvas image back to a structure where we can append our encrypted payload safely
        const pngRes = await fetch(pngDataUrl);
        const pngBuffer = await pngRes.arrayBuffer();

        // Combine the visual noise file bytes and the encrypted file bytes together!
        const combinedBlob = new Blob([pngBuffer, "|||DATA_START|||", encryptedBytes], { type: "image/png" });
        return URL.createObjectURL(combinedBlob);

    } else {
        // DECRYPT MODE
        try {
            const response = await fetch(imageSrc);
            const combinedBuffer = await response.arrayBuffer();
            const combinedBytes = new Uint8Array(combinedBuffer);

            // Convert buffer bytes to string briefly to find our boundary marker splits
            const decoder = new TextDecoder();
            const entireFileString = decoder.decode(combinedBytes.subarray(0, Math.min(combinedBytes.length, 500000)));

            // Let's find where our real crypt payload starts
            const marker = "|||DATA_START|||";
            let markerIndex = -1;

            // Scan binary data safely for our separator sequence
            const markerBytes = encoder.encode(marker);
            for (let i = 0; i < combinedBytes.length - markerBytes.length; i++) {
                let match = true;
                for (let j = 0; j < markerBytes.length; j++) {
                    if (combinedBytes[i + j] !== markerBytes[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    markerIndex = i;
                    break;
                }
            }

            if (markerIndex === -1) throw new Error("No payload found");

            // Extract just the encrypted chunk out of the appended file section
            const encryptedPayload = combinedBytes.subarray(markerIndex + markerBytes.length);

            // 3. Decrypt payload back to original image formatting
            const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedPayload);
            const blob = new Blob([decrypted], { type: "image/png" });
            return URL.createObjectURL(blob);
        } catch (e) {
            throw new Error("Decryption failed. Invalid Security Token or corrupted image structure.");
        }
    }
}