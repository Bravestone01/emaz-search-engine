export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#000B1E] to-[#0A1929] flex flex-col items-center justify-center p-8">
      {/* 1. Test Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000B1E] via-[#001066] to-[#0A1929] -z-10"></div>
      
      {/* 2. Test Typography */}
      <h1 className="text-[63px] font-bold mb-8" style={{ color: '#D4AF37' }}>
        EMAZ Search Engine
      </h1>
      
      <h2 className="text-[54px] text-white mb-6">
        369 Design System
      </h2>
      
      <p className="text-[27px] text-gray-300 mb-8">
        Tailwind v3 Working ✅
      </p>
      
      {/* 3. Test 369 Blocks */}
      <div className="flex gap-6 mb-8">
        <div 
          className="rounded-[9px]"
          style={{
            width: '27px',
            height: '27px',
            backgroundColor: '#D4AF37'
          }}
        ></div>
        <div 
          className="rounded-[18px]"
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#D4AF37',
            opacity: 0.8
          }}
        ></div>
        <div 
          className="rounded-[27px]"
          style={{
            width: '45px',
            height: '45px',
            backgroundColor: '#D4AF37',
            opacity: 0.6
          }}
        ></div>
      </div>
      
      {/* 4. Test Glass Effect (manual) */}
      <div 
        className="p-6 rounded-xl mb-6 backdrop-blur-lg"
        style={{
          background: 'rgba(10, 25, 41, 0.7)',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}
      >
        <p className="text-[18px]" style={{ color: '#D4AF37' }}>
          Glass Effect Working
        </p>
      </div>
      
      {/* 5. Test Default Tailwind */}
      <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-300/30">
        <p className="text-white text-lg">
          All Design Elements Visible?
        </p>
      </div>
    </main>
  )
}