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
      className="group flex flex-col gap-[9px] rounded-[9px] border-2 border-transparent bg-gradient-to-br from-[#0A1929] to-[#0D1F33] px-[18px] py-[18px] shadow-lg transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-gradient-to-br hover:from-[#0D1F33] hover:to-[#0A1929] hover:shadow-[0_0_18px_rgba(212,175,55,0.2)] hover:scale-[1.01]"
      onClick={handleClick}
    >
      <div className="flex flex-wrap items-center gap-[9px] text-xs text-primary-text/60">
        <span className="truncate text-[9px] font-medium">{new URL(affiliateUrl).hostname}</span>
        <span className="rounded-full border border-[#D4AF37]/60 px-[9px] py-[3px] text-[9px] font-semibold uppercase tracking-[0.18rem] text-primary-text/80 transition-all duration-300 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">
          {source}
        </span>
        {isAffiliate && (
          <span className="rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/10 px-[9px] py-[3px] text-[9px] font-bold uppercase tracking-[0.18rem] text-[#FFD700] shadow-[0_0_9px_rgba(212,175,55,0.3)] transition-all duration-300 group-hover:bg-[#D4AF37]/20 group-hover:shadow-[0_0_18px_rgba(255,215,0,0.5)]">
            ✦ Halal Earnings
          </span>
        )}
      </div>
      <h3 className="text-[18px] font-bold leading-[27px] text-primary-text transition-all duration-300 group-hover:text-[#FFD700]">
        {title}
      </h3>
      <p className="text-[14px] leading-[21px] text-primary-text/75 transition-colors duration-300 group-hover:text-primary-text/90">
        {description}
      </p>
    </a>
  )
}
