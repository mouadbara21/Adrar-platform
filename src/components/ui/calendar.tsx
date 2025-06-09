import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export type CalendarProps = {
  className?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  showOutsideDays?: boolean
}

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }
  
  const handleDayClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (!disabled?.(date)) {
      onSelect?.(date)
    }
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex justify-center items-center mb-4">
        <button 
          onClick={previousMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="mx-4 font-medium">
          {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </div>
        <button 
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="p-2 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}
        
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          const isSelected = selected && date.toDateString() === selected.toDateString()
          const isDisabled = disabled?.(date)
          
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={isDisabled}
              className={cn(
                "p-2 text-sm rounded hover:bg-gray-100",
                isSelected && "bg-blue-600 text-white hover:bg-blue-700",
                isDisabled && "text-gray-300 cursor-not-allowed"
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar";

export { Calendar };
