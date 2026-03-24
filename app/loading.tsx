import { LoaderPinwheel } from "lucide-react"

export default function Loading({ num = 0 }: { num?: number }) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <p className="text-4xl font-bold text-amber-600">
        Loading the site you Will Own
      </p>
      <div className="perspective-distant transform-3d">
        <div className="rotate-x-45">
          <LoaderPinwheel
            size={256}
            className="drop-shadow-2xs animate-spin drop-shadow-amber-600 duration-1000"
            color="var(--color-amber-600)"
          ></LoaderPinwheel>
        </div>
      </div>
    </div>
  )
}
