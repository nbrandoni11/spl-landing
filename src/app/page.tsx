"use client";

import { useState } from "react";
import Image from "next/image";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a88b64] shrink-0 mt-0.5 drop-shadow-sm">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you. We will contact you soon.");
        setFormData({ name: "", company: "", email: "" });
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to submit the form.");
    }
  };

  return (
    <main className="min-h-screen font-sans bg-[#FAF9F6] text-[#2D2A26] flex flex-col items-center pb-0 sm:pb-16 w-full overflow-x-hidden">
      
      {/* FULL WIDTH HERO IMAGE */}
      <section className="relative w-full h-[35vh] sm:h-[45vh] min-h-[300px] sm:min-h-[350px] bg-stone-900 flex-shrink-0">
        <div className="absolute inset-0 bg-stone-300 opacity-80" style={{ backgroundImage: "url('/hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent"></div>
        
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-90 z-10 flex justify-center items-center text-center w-[300px] sm:w-[460px]">
          <Image src="/spl-logo.png" alt="SPL Logo" width={600} height={225} className="h-[80px] sm:h-[120px] w-auto drop-shadow-lg brightness-0 invert" priority />
        </div>
      </section>

      {/* CENTERED CONTENT WRAPPER */}
      <div className="w-full max-w-[900px] bg-white sm:shadow-2xl relative z-20 flex flex-col sm:-mt-16 sm:rounded-sm">
        
        <section className="pt-12 pb-10 px-6 sm:px-16 flex flex-col items-center text-center">
          <h1 className="font-serif text-[30px] sm:text-[38px] tracking-widest uppercase mb-5 text-stone-900 font-semibold leading-snug">
            Sintered Stone & Porcelain Slabs
          </h1>
          <p className="text-stone-700 text-[17px] sm:text-[18px] font-medium leading-relaxed mb-4 tracking-wide">
            Factory-direct supply from Argentina
          </p>
          <p className="text-stone-700 text-[14px] sm:text-[15px] font-medium leading-relaxed mb-8 tracking-widest uppercase">
            <strong className="font-bold text-stone-900">European premium quality.</strong> <strong className="font-bold text-stone-900">Manufactured in Argentina.</strong>
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="w-full max-w-[500px] space-y-5 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-stone-200 p-3.5 rounded-sm placeholder:text-stone-400 focus:outline-none focus:border-[#a88b64] transition-colors bg-[#FAFAFA] font-light text-[15px]"
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full border border-stone-200 p-3.5 rounded-sm placeholder:text-stone-400 focus:outline-none focus:border-[#a88b64] transition-colors bg-[#FAFAFA] font-light text-[15px]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-stone-200 p-3.5 rounded-sm placeholder:text-stone-400 focus:outline-none focus:border-[#a88b64] transition-colors bg-[#FAFAFA] font-light text-[15px] sm:col-span-2"
              />
            </div>

            {message && (
              <div className={`text-sm py-2 ${status === "success" ? "text-green-600" : "text-red-500"}`}>
                {message}
              </div>
            )}

            <div className="pt-3 flex justify-center w-full">
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gold w-full px-12 py-[16px] text-[15px] tracking-wider font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase rounded-sm border border-[#8b714f]/30"
              >
                {status === "loading" ? "Submitting..." : "Get Pricing & Supply Capabilities"}
              </button>
            </div>

            <div className="text-center flex flex-col space-y-1.5 -mt-1 pb-2">
               <p className="text-stone-600 text-[13px] sm:text-[14px] font-medium tracking-widest uppercase leading-relaxed">
                 We’ll get back to you within 24 hours
               </p>
            </div>
          </form>
        </section>

        <hr className="border-stone-100" />

        {/* DISTRIBUTION SECTION */}
        <section className="py-14 px-6 sm:px-16 bg-[#FDFCFB]">
          <div className="flex flex-col items-center text-center w-full mb-10">
            <h2 className="font-serif text-[26px] sm:text-[30px] tracking-[0.1em] uppercase mb-8 text-stone-900 font-semibold">
              Built for Industrial-Scale Supply
            </h2>
            <p className="max-w-[600px] text-stone-600 font-normal leading-relaxed text-[17px]">
              We manufacture and supply sintered stone and porcelain slabs at industrial scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 items-center justify-items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
               <p className="text-stone-600 font-normal leading-relaxed text-[17px]">
                 Our production capabilities and export structure allow us to reliably supply distributors, importers, and large-volume buyers worldwide.
               </p>
            </div>
            <div className="order-1 md:order-2 w-full max-w-[440px]">
              <div className="h-[260px] bg-stone-100 relative w-full shadow-md rounded-sm overflow-hidden border border-stone-200/50">
                <div className="absolute inset-0" style={{ backgroundImage: "url('/supply.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-stone-100" />

        {/* BENEFITS SECTION */}
        <section className="pt-12 pb-14 px-6 sm:px-16 flex flex-col items-center text-center sm:text-left sm:items-start bg-white">
          <div className="w-full flex justify-center md:justify-start mb-8 opacity-90">
            <Image src="/spl-logo.png" alt="SPL Logo" width={600} height={225} className="h-[36px] sm:h-[44px] w-auto drop-shadow-sm brightness-0" />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN */}
            <div className="flex flex-col items-center md:items-start w-full justify-center">
              <ul className="space-y-8 text-left pl-2 mb-10">
                <li className="flex items-center gap-5">
                  <CheckIcon />
                  <span className="text-stone-950 font-bold leading-relaxed text-[17px] sm:text-[19px] tracking-wide">Factory-direct pricing</span>
                </li>
                <li className="flex items-center gap-5">
                  <CheckIcon />
                  <span className="text-stone-950 font-bold leading-relaxed text-[17px] sm:text-[19px] tracking-wide">Industrial-scale production</span>
                </li>
                <li className="flex items-center gap-5">
                  <CheckIcon />
                  <span className="text-stone-950 font-bold leading-relaxed text-[17px] sm:text-[19px] tracking-wide">Reliable export logistics</span>
                </li>
                <li className="flex items-center gap-5">
                  <CheckIcon />
                  <span className="text-stone-950 font-bold leading-relaxed text-[17px] sm:text-[19px] tracking-wide">
                    Lower landed cost <span className="font-normal text-stone-600">for US buyers</span>
                  </span>
                </li>
              </ul>

              <div className="w-full bg-[#FAF9F6] border border-stone-200/60 p-6 sm:p-8 rounded-[6px] shadow-sm text-center sm:text-left">
                <h3 className="font-serif text-[20px] sm:text-[22px] tracking-wide text-stone-950 mb-3 font-semibold">
                  Structural duty advantage
                </h3>
                <p className="text-stone-600 font-normal leading-relaxed text-[16px] sm:text-[17px] mb-3">
                  Argentina maintains a
                </p>
                <p className="text-[#a88b64] font-extrabold text-[22px] sm:text-[26px] tracking-wide mb-3 drop-shadow-sm">
                  ~8.5% total landed duty
                </p>
                <p className="text-stone-600 font-normal leading-relaxed text-[16px] sm:text-[17px]">
                  creating a stronger sourcing position for US buyers.
                </p>
              </div>
            </div>
            
            {/* RIGHT COLUMN */}
            <div className="w-full h-full min-h-[400px] md:min-h-[550px] rounded-sm shadow-md overflow-hidden bg-stone-100 relative">
              <div className="absolute inset-0" style={{ backgroundImage: "url('/factory.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
            
          </div>
        </section>

        <hr className="border-stone-100" />

        {/* SMARTER SOURCING SECTION */}
        <section className="py-14 px-6 sm:px-16 bg-[#FDFCFB] flex flex-col items-center text-center w-full">
          <h2 className="font-serif text-[26px] sm:text-[30px] tracking-[0.1em] uppercase mb-10 text-stone-900 font-semibold">
            Smarter Sourcing for the US Market
          </h2>
          
          <div className="max-w-[700px] text-stone-600 font-normal leading-relaxed text-[16px] sm:text-[17px] space-y-5 mb-10">
            <p>Lower duties. Better margins. Stronger sourcing position.</p>
            <p>Argentina offers one of the most efficient sourcing structures available today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex justify-center w-full opacity-85">
                <Image src="/it.png" alt="Italy" width={26} height={18} className="object-contain h-[18px] w-auto drop-shadow-sm" />
              </div>
              <h3 className="text-stone-950 text-[15px] tracking-widest uppercase font-bold mb-3">
                Italian technology
              </h3>
              <p className="text-stone-600 font-normal text-[15px] leading-relaxed">
                State-of-the-art Italian production lines
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex justify-center w-full opacity-85">
                <Image src="/es.png" alt="Spain" width={26} height={18} className="object-contain h-[18px] w-auto drop-shadow-sm" />
              </div>
              <h3 className="text-stone-950 text-[15px] tracking-widest uppercase font-bold mb-3">
                Spanish pigments
              </h3>
              <p className="text-stone-600 font-normal text-[15px] leading-relaxed">
                Premium European raw materials and finishes
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex justify-center w-full opacity-85">
                <Image src="/ar.png" alt="Argentina" width={26} height={18} className="object-contain h-[18px] w-auto drop-shadow-sm" />
              </div>
              <h3 className="text-stone-950 text-[15px] tracking-widest uppercase font-bold mb-3">
                Duty advantage
              </h3>
              <p className="text-stone-600 font-normal text-[15px] leading-relaxed">
                <strong className="text-stone-950 font-bold">~8.5% total landed duty</strong> — among the lowest globally
              </p>
            </div>
          </div>
        </section>

        <hr className="border-stone-100" />

        {/* FINAL CTA SECTION */}
        <section className="relative w-full py-24 sm:py-32 px-6 sm:px-16 flex flex-col items-center justify-center text-center overflow-hidden sm:rounded-b-sm">
          {/* Background Image & Overlay */}
          <div 
            className="absolute inset-0 z-0 bg-stone-900" 
            style={{ backgroundImage: "url('/hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
          <div className="absolute inset-0 z-0 bg-black/40"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-[600px]">
            <h3 className="font-serif text-[28px] sm:text-[34px] tracking-widest text-[#FAF9F6] font-semibold mb-4 uppercase leading-snug drop-shadow-md">
              Meet Our Team at Coverings Las Vegas
            </h3>
            <p className="text-stone-200 text-[18px] sm:text-[20px] font-medium leading-relaxed mb-10 tracking-widest drop-shadow-sm uppercase">
              Booth #313
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btn-gold w-full sm:w-auto px-10 py-[16px] text-[14px] sm:text-[15px] tracking-wider font-semibold shadow-lg hover:shadow-xl transition-all uppercase rounded-sm border border-white/20"
            >
              Get Pricing & Supply Capabilities
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}
