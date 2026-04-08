import Image from "next/image"

export function InitialLogo({
  size = "default",
}: {
  size?: "default" | "sm" | "lg"
}) {
  const widthHeight = size === "sm" ? 24 : size === "lg" ? 32 : 26
  const textSize =
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Logo"
        width={widthHeight}
        height={widthHeight}
      />
      <span className={`${textSize} font-bold text-slate-900`}>
        {process.env.APP_NAME}
      </span>
    </div>
  )
}
