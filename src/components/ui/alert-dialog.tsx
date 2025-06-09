import * as React from "react"
import { cn } from "../../lib/utils"

const AlertDialog = ({ children, open, onOpenChange }: { 
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void 
}) => {
  const [isOpen, setIsOpen] = React.useState(open || false)
  
  React.useEffect(() => {
    if (open !== undefined) setIsOpen(open)
  }, [open])
  
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <div>
      {React.Children.map(children, child => 
        React.isValidElement(child) 
          ? React.cloneElement(child, { isOpen, onOpenChange: handleOpenChange } as any)
          : child
      )}
    </div>
  )
}

const AlertDialogTrigger = ({ children, isOpen, onOpenChange }: { 
  children: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void 
}) => {
  return (
    <div onClick={() => onOpenChange?.(!isOpen)}>
      {children}
    </div>
  )
}

const AlertDialogContent = ({ className, children, isOpen, onOpenChange, ...props }: { 
  className?: string
  children: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={cn(
          "relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
)

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)

const AlertDialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold", className)} {...props} />
)

const AlertDialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-gray-600", className)} {...props} />
)

const AlertDialogAction = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn("bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700", className)}
    {...props}
  />
)

const AlertDialogCancel = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn("border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 mt-2 sm:mt-0", className)}
    {...props}
  />
)

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}