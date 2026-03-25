import { memo } from "react";
import { TICKER_ITEMS } from "@/data/siteData";

const BroadcastTicker = () => {
  const joined = `${TICKER_ITEMS.join("  ·  ")}  ·  `;

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[68] h-6 overflow-hidden border-l-[3px] border-[var(--f1-red)] bg-[rgba(232,0,45,0.15)] backdrop-blur-md md:h-8">
      <div className="flex h-full items-center overflow-hidden">
        <div className="animate-marquee flex min-w-[200%] gap-8 whitespace-nowrap px-4 font-data text-[10px] text-[var(--f1-white)] md:px-6 md:text-[11px]">
          <span>{joined}</span>
          <span>{joined}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(BroadcastTicker);
