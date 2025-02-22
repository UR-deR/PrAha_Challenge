'use client'

import { Root } from '@radix-ui/react-separator'
import type React from 'react'
import { cn } from '~/lib/utils'

const Separator: React.FC<React.ComponentProps<typeof Root>> = ({
	className,
	orientation = 'horizontal',
	decorative = true,
	...props
}) => {
	return (
		<Root
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'shrink-0 bg-border',
				orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
				className,
			)}
			{...props}
		/>
	)
}
Separator.displayName = Root.displayName

export { Separator }
