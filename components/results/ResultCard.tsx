'use client'

import { useMemo } from 'react'

import { trackAffiliateClick } from '@/lib/affiliate/earningsTracker'
import { addAffiliateTag, isAmazonProductUrl } from '@/lib/affiliate/urlRewriter'

type ResultCardProps = {
  title: string
  description: string
  source: string
  url: string
}

export default function ResultCard({ title, description, source, url }: ResultCardProps) {
  const { isAffiliate, affiliateUrl } = useMemo(() => {
    const isAffiliateLink = isAmazonProductUrl(url)
    return {
      isAffiliate: isAffiliateLink,
      affiliateUrl: isAffiliateLink ? addAffiliateTag(url) : url,
    }
  }, [url])

  const handleClick = () => {
    if (isAffiliate) {
      trackAffiliateClick(affiliateUrl)
    }
  }

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-2 rounded-lg border border-transparent px-2 py-3 transition-colors hover:border-[#D4AF37]/30 hover:bg-primary-secondary/40"
      onClick={handleClick}
    >
      <div className="flex flex-wrap items-center gap-3 text-xs text-primary-text/60">
        <span className="truncate">{affiliateUrl}</span>
        <span className="rounded-full border border-[#D4AF37]/60 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.18rem] text-primary-text/80">
          {source}
        </span>
        {isAffiliate ? (
          <span className="rounded-full border border-[#D4AF37] px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.18rem] text-[#D4AF37]">
            Halal Earnings
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold text-primary-text transition-colors group-hover:text-primary-accent">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-primary-text/75">{description}</p>
    </a>
  )
}
