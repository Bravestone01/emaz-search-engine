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
      className="group flex h-full flex-col gap-18 rounded-[27px] border border-[#D4AF37] p-27 transition-colors hover:bg-primary-secondary"
    >
      <div className="flex items-center justify-between gap-18">
        <h3 className="text-h3 text-primary-text group-hover:text-primary-accent">{title}</h3>
        <span className="rounded-full border border-[#D4AF37] px-18 py-9 text-small uppercase tracking-[0.2rem] text-primary-text">
          {source}
        </span>
      </div>
      <p className="text-body text-primary-text/80">{description}</p>
      <span className="mt-auto text-small text-primary-text/70">{url}</span>
    </a>
  )
}
