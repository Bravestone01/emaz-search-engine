export default function Loading() {
  return (
    <main className="min-h-screen bg-primary-bg text-primary-text">
      <div className="border-b border-primary-text/10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-[27px] px-[27px] py-[27px] sm:flex-row sm:items-center sm:gap-[36px]">
          <div className="h-[27px] w-[90px] animate-pulse rounded-[9px] bg-[#D4AF37]/20" />
          <div className="h-[54px] w-full max-w-2xl animate-pulse rounded-full bg-[#D4AF37]/10" />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-[27px] px-[27px] py-[36px]">
        <div className="space-y-[9px] text-left">
          <div className="h-[18px] w-[180px] animate-pulse rounded-[9px] bg-[#D4AF37]/20" />
          <div className="h-[36px] w-[360px] animate-pulse rounded-[9px] bg-[#D4AF37]/20" />
          <div className="h-[18px] w-[135px] animate-pulse rounded-[9px] bg-[#D4AF37]/10" />
        </div>

        <section className="flex flex-col gap-[18px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-[9px] rounded-[9px] border-2 border-transparent bg-gradient-to-br from-[#0A1929] to-[#0D1F33] px-[18px] py-[18px] shadow-lg"
            >
              <div className="flex gap-[9px]">
                <div className="h-[18px] w-[180px] animate-pulse rounded-full bg-[#D4AF37]/10" />
                <div className="h-[18px] w-[90px] animate-pulse rounded-full bg-[#D4AF37]/20" />
              </div>
              <div className="h-[27px] w-4/5 animate-pulse rounded-[9px] bg-[#D4AF37]/20" />
              <div className="h-[63px] w-full animate-pulse rounded-[9px] bg-[#D4AF37]/10" />
            </div>
          ))}
        </section>

        <div className="flex items-center justify-center gap-[9px] py-[27px]">
          <div className="h-[45px] w-[135px] animate-pulse rounded-full bg-[#D4AF37]/20" />
          <div className="h-[45px] w-[45px] animate-pulse rounded-full bg-[#FFD700]/40" />
          <div className="h-[45px] w-[45px] animate-pulse rounded-full bg-[#D4AF37]/20" />
          <div className="h-[45px] w-[45px] animate-pulse rounded-full bg-[#D4AF37]/20" />
          <div className="h-[45px] w-[108px] animate-pulse rounded-full bg-[#D4AF37]/20" />
        </div>
      </div>
    </main>
  )
}
