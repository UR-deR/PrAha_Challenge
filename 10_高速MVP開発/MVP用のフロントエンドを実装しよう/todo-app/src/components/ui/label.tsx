"use client"

import { Root } from "@radix-ui/react-label"
import { type VariantProps, cva } from "class-variance-authority"
import type React from "react"

import { cn } from "~/lib/utils"

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

const Label: React.FC<
	React.ComponentProps<typeof Root> & VariantProps<typeof labelVariants>
> = ({ className, ...props }) => (
	<Root className={cn(labelVariants(), className)} {...props} />
)
Label.displayName = Root.displayName

export { Label }
