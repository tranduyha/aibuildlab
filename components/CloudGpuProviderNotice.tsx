import {
  getCloudGpuProviderPricingNotice,
  getCloudGpuProviderWarnings,
} from "@/services/cloud-gpu-provider.service";
import type { CloudGpuProvider } from "@/types/cloud-gpu-provider";

interface CloudGpuProviderNoticeProps {
  provider?: CloudGpuProvider;
  notices?: string[];
}

export default function CloudGpuProviderNotice({
  provider,
  notices: customNotices,
}: CloudGpuProviderNoticeProps) {
  const notices = Array.from(
    new Set(
      customNotices ??
        (provider
          ? [
              ...getCloudGpuProviderWarnings(provider),
              getCloudGpuProviderPricingNotice(provider),
            ].filter((notice): notice is string => Boolean(notice))
          : []),
    ),
  );

  if (notices.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950" aria-label="Provider source notices">
      <h2 className="text-lg font-semibold tracking-normal">Source-aware planning notes</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6">
        {notices.map((notice) => (
          <li key={notice} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
            <span>{notice}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
