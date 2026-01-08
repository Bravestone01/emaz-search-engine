import { SITE_NAME } from '@/lib/constants'

export function Logo() {
  return (
    <div className="flex items-center gap-9">
      <div className="flex h-36 w-36 items-center justify-center rounded-9 bg-emaz-secondary text-18 font-semibold text-emaz-gold">
        369
      </div>
      <div>
        <p className="text-27 font-semibold leading-none">{SITE_NAME}</p>
        <p className="text-18 text-emaz-gold/70">Design System</p>
      </div>
    </div>
  )
}
