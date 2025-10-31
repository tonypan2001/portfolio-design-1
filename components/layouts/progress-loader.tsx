"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LoaderProps } from "@/types/loader";

const EXIT_MS = 700; // slide-up + fade duration

export default function ProgressLoader({
  assets,
  includeFonts = true,
  minShowMs = 800,
  barColorClass = "bg-white",
  backdropClass = "bg-primary",
  text = "Initializing PanStudio…",
  waitForEvents = [],
  waitTimeoutMs = 20000,
}: LoaderProps) {
  const [progress, setProgress] = useState(0); // 0-100
  const [visible, setVisible] = useState(true);
  const startAtRef = useRef<number>(Date.now());
  const abortersRef = useRef<AbortController[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  // เตรียมรายการไฟล์ (กรองซ้ำ)
  const assetList = useMemo(() => {
    const seen = new Set<string>();
    return assets.filter((a) => {
      const key = a.url;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [assets]);

  useEffect(() => {
    let loadedBytes = 0;
    let totalBytes = 0;
    let completedCount = 0;
    let unknownTotalUnits = 0; // จำนวนไฟล์ที่ไม่รู้ขนาด
    let unknownLoadedUnits = 0;

    const update = () => {
      let ratioKnown = totalBytes > 0 ? loadedBytes / totalBytes : 0;
      let ratioUnknown =
        unknownTotalUnits > 0 ? unknownLoadedUnits / unknownTotalUnits : 0;
      // ผสมสองส่วนตามสัดส่วนจำนวนไฟล์ (ง่ายและเสถียร)
      const mixWeight = unknownTotalUnits > 0 ? 0.4 : 0; // ถ้าไม่รู้น้ำหนักเลยให้ 40% ไปจากชิ้นงาน
      const ratio =
        mixWeight > 0
          ? (1 - mixWeight) * ratioKnown + mixWeight * ratioUnknown
          : ratioKnown;

      const pct = Math.max(0, Math.min(100, Math.floor(ratio * 100)));
      setProgress(pct);
    };

    const streams: Promise<void>[] = [];

    // โหลดฟอนต์ (ถ้าต้องการ)
    if (
      includeFonts &&
      typeof document !== "undefined" &&
      "fonts" in document
    ) {
      unknownTotalUnits += 1;
      const p = (document as any).fonts.ready
        .then(() => {
          unknownLoadedUnits += 1;
          update();
        })
        .catch(() => {
          // ถ้าฟอนต์ล้มเหลวก็ถือว่าไม่บล็อก
          unknownLoadedUnits += 1;
          update();
        });
      streams.push(p);
      update();
    }

    // รอ custom events (เช่น R3F พร้อมใช้งาน)
    if (typeof window !== "undefined" && waitForEvents.length > 0) {
      for (const evtName of waitForEvents) {
        unknownTotalUnits += 1;
        update();
        const p = new Promise<void>((resolve) => {
          let resolved = false;
          const onEvt = () => {
            if (resolved) return;
            resolved = true;
            window.removeEventListener(evtName, onEvt);
            // Clear the timeout below
            window.clearTimeout(timer);
            unknownLoadedUnits += 1;
            update();
            resolve();
          };
          window.addEventListener(evtName, onEvt, { once: true });
          // Safety timeout
          const timer = window.setTimeout(() => {
            if (resolved) return;
            resolved = true;
            window.removeEventListener(evtName, onEvt);
            unknownLoadedUnits += 1;
            update();
            resolve();
          }, Math.max(3000, waitTimeoutMs));
        });
        streams.push(p);
      }
    }

    // โหลดไฟล์ต่าง ๆ แบบนับ bytes
    for (const item of assetList) {
      const ac = new AbortController();
      abortersRef.current.push(ac);

      const p = (async () => {
        try {
          const res = await fetch(item.url, {
            signal: ac.signal,
            cache: "force-cache",
          });
          // ถ้าข้าม CORS/ไม่มี content-length → ใช้ unknown unit
          const lenHeader = res.headers.get("Content-Length");
          let contentLength = lenHeader ? parseInt(lenHeader, 10) : NaN;
          const isUnknown =
            !Number.isFinite(contentLength) || contentLength <= 0;

          if (isUnknown) {
            unknownTotalUnits += item.weight || 1;
            update();
          } else {
            totalBytes += contentLength;
            update();
          }

          if (!res.ok || !res.body) {
            // ถือว่าโหลดเสร็จแบบไม่รู้ขนาด
            if (isUnknown) {
              unknownLoadedUnits += item.weight || 1;
            } else {
              loadedBytes += contentLength || 0;
            }
            update();
            return;
          }

          const reader = res.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
              if (isUnknown) {
                // ไม่มีขนาด — ขยับเล็กน้อยเพื่อความรู้สึก (ไม่แนะนำขยับบ่อย)
                // ปล่อยไว้ให้ตัดจบทีเดียวตอนเสร็จจะเนียนกว่า
              } else {
                loadedBytes += value.byteLength;
              }
              update();
            }
          }

          // เสร็จแล้ว
          if (isUnknown) {
            unknownLoadedUnits += item.weight || 1;
          } else {
            // กัน rounding: บวกให้เต็มไฟล์
            loadedBytes += Math.max(
              0,
              (contentLength || 0) - (loadedBytes % (contentLength || 1)),
            );
          }
          update();
        } catch {
          // ล้มเหลว: ถือว่าเสร็จเพื่อไม่ให้ค้าง
          if (unknownTotalUnits > 0) {
            unknownLoadedUnits += item.weight || 1;
          }
          update();
        }
      })();

      streams.push(p);
    }

    const finalize = async () => {
      try {
        await Promise.allSettled(streams);
      } finally {
        // ดันให้ 100% แล้วหน่วงให้เห็นหลอดเต็มสั้น ๆ
        setProgress(100);
        const spent = Date.now() - startAtRef.current;
        const wait = Math.max(0, minShowMs - spent) + 200; // +200ms เพื่อให้เห็น "เต็ม"
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => setVisible(false), EXIT_MS);
        }, wait);
      }
    };

    finalize();

    return () => {
      // ยกเลิกโหลดเมื่อคอมโพเนนต์ถูกถอด
      abortersRef.current.forEach((a) => a.abort());
      abortersRef.current = [];
    };
  }, [assetList, includeFonts, minShowMs]);

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      role="status"
      className={`${backdropClass} fixed inset-0 z-9999 flex items-center justify-center`}
      style={{
        transition: `transform ${EXIT_MS}ms ease-out, opacity ${EXIT_MS}ms ease-out`,
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
        opacity: isExiting ? 0 : 1,
        willChange: "transform, opacity",
      }}
    >
      <div className="w-[min(88vw,520px)] space-y-5 text-center">
        <div className="text-lg sm:text-sm font-semibold tracking-tight text-white tabular-nums">
          {progress}%
        </div>

        <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden ring-1 ring-white/10">
          <div
            className={`h-full ${barColorClass} transition-[width] duration-200`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {text ? <p className="text-white/70 text-sm">{text}</p> : null}
      </div>
    </div>
  );
}
