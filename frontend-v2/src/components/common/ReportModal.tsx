// NOT USED IN THE APP YET

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Text, Send } from "lucide-react"

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reportText: string) => void
}

export function ReportModal({ isOpen, onClose, onSubmit }: ReportModalProps) {
  const [reportText, setReportText] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    setIsDisabled(reportText.trim().length === 0)
  }, [reportText])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isDisabled) {
      onSubmit(reportText)
      setReportText("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md backdrop-blur-sm dark:bg-opacity-80">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Text className="h-5 w-5" />
            <span>Report Issue</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="report-text"
              placeholder="Describe the issue..."
              className="resize-none h-24 dark:placeholder:text-gray-400 placeholder:text-gray-500 text-base"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="submit"
              disabled={isDisabled}
              className="gap-2 transition-all hover:gap-3 bg-blue-600 hover:bg-blue-700 dark:text-white"
            >
              <span>Send</span>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}