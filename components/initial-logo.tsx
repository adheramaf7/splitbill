import Image from "next/image"

export function InitialLogo({
  size = "default",
}: {
  size?: "default" | "sm" | "lg"
}) {
  const widthHeight = size === "sm" ? 24 : size === "lg" ? 32 : 26
  const textSize =
    size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl"

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Logo"
        width={widthHeight}
        height={widthHeight}
      />
      <span
        className={`${textSize} bg-linear-to-r from-primary to-secondary/80 bg-clip-text font-bold text-transparent`}
      >
        {process.env.APP_NAME}
      </span>
    </div>
  )
}
