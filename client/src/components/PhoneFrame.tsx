import { useState } from "react";
import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  src: string;
  alt: string;
  className?: string;
  testId?: string;
};

export function PhoneFrame({ src, alt, className, testId }: PhoneFrameProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div
      className={cn("mx-auto w-44 md:w-52", className)}
      data-testid={testId}
    >
      <div className="rounded-[28px] bg-slate-900 border border-slate-700 p-2 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.6)]">
        <div className="rounded-[18px] bg-[#020617] border border-slate-800 overflow-hidden aspect-[9/16]">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
