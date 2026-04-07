"use client"

import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { useFormStatus } from "react-dom"

type Props = {
  children: React.ReactNode
  loadingText?: string
  disabled?: boolean
  className?: string
}

const SubmitButton = ({
  children,
  loadingText,
  disabled,
  className,
}: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size={"lg"}
      disabled={pending || disabled}
      className={className}
    >
      {pending ? (
        <>
          <Loader2Icon className="animate-spin" />{" "}
          {loadingText || "Processing..."}
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  )
}

export default SubmitButton
