import React, { useState } from "react";
import { BellRing, Check } from "lucide-react";

export default function JobAlertBanner() {
  const [set, setSet] = useState(false);
  return (
    <div className="flex items-center gap-3.5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4">
      <BellRing className="w-5 h-5 text-blue-600 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-blue-900">Get matched roles in your inbox</div>
        <div className="text-[11.5px] text-blue-500 truncate">
          New positions matching your filters arrive the moment they're posted.
        </div>
      </div>
      <button
        onClick={() => setSet(true)}
        className={`px-4 py-[7px] rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
          set ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {set ? (
          <>
            <Check className="w-3.5 h-3.5" /> Alert set
          </>
        ) : (
          "Set job alert"
        )}
      </button>
    </div>
  );
}
