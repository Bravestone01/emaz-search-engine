import * as React from 'react'

import { cn } from '@/lib/utils'

export type GridProps = React.HTMLAttributes<HTMLDivElement>

export function Grid({ className, ...props }: GridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-3 gap-27 md:grid-cols-6 lg:grid-cols-9',
        className
      )}
      {...props}
    />
  )
}
