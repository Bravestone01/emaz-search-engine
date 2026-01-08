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
      className="group flex flex-col gap-4 rounded-2xl border border-[#D4AF37]/40 bg-primary-bg/30 p-6 transition-colors hover:bg-primary-secondary/60"
    >
      <div className="flex flex-wrap items-center gap-3 text-small text-primary-text/70">
        <span className="truncate">{url}</span>
        <span className="rounded-full border border-[#D4AF37]/70 px-3 py-1 text-[0.7rem] uppercase tracking-[0.2rem] text-primary-text">
          {source}
        </span>
      </div>
      <h3 className="text-h3 text-primary-text group-hover:text-primary-accent">{title}</h3>
      <p className="text-body text-primary-text/80">{description}</p>
    </a>
  )
}
