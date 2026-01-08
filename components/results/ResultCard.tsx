type ResultCardProps = {
  title: string
  description: string
  source: string
  url: string
}

export default function ResultCard({ title, description, source, url }: ResultCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-2 rounded-lg border border-transparent px-2 py-3 transition-colors hover:border-[#D4AF37]/30 hover:bg-primary-secondary/40"
    >
      <div className="flex flex-wrap items-center gap-3 text-xs text-primary-text/60">
        <span className="truncate">{url}</span>
        <span className="rounded-full border border-[#D4AF37]/60 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.18rem] text-primary-text/80">
          {source}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-primary-text transition-colors group-hover:text-primary-accent">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-primary-text/75">{description}</p>
    </a>
  )
}
