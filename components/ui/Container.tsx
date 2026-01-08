import * as React from 'react'

import { cn } from '@/lib/utils'

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1296px] p-27', className)}
      {...props}
    />
  )
}
