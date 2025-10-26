import { useCallback, useEffect, useRef, useState } from "react";
import { UseHoverHighlightOptions } from "@/types/hover-highlight";
import { HighlightState } from "@/types/hover-highlight";

export function useHoverHighlight(opts: UseHoverHighlightOptions = {}) {
  const {
    stickToActive = true,
    getActiveEl,
    autoHideOnLeave = false,
    transitionMs = 0,
  } = opts;

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState<HighlightState>({
    x: 0,
    w: 0,
    h: 0,
    visible: false,
  });

  const compute = useCallback((target: HTMLElement) => {
    if (!menuRef.current) return null;
    const menuBox = menuRef.current.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    return {
      x: box.left - menuBox.left,
      w: box.width,
      h: box.height,
      visible: true,
    } as HighlightState;
  }, []);

  const moveTo = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;
      const pos = compute(el);
      if (pos) setRect(pos);
    },
    [compute],
  );

  const hide = useCallback(() => {
    if (stickToActive && getActiveEl) {
      const activeEl = getActiveEl();
      if (activeEl) return moveTo(activeEl);
    }
    // ถ้าไม่ stick หรือไม่มี active ให้จางหาย
    setRect((s) => ({ ...s, visible: false }));
  }, [stickToActive, getActiveEl, moveTo]);

  // จัดการ mouseleave บน container
  useEffect(() => {
    if (!autoHideOnLeave) return;
    const node = menuRef.current;
    if (!node) return;

    const onLeave = () => {
      if (transitionMs > 0) {
        // รอให้ animation ปัจจุบันจบเล็กน้อย (edge cases)
        setTimeout(hide, transitionMs / 2);
      } else {
        hide();
      }
    };

    node.addEventListener("mouseleave", onLeave);
    return () => node.removeEventListener("mouseleave", onLeave);
  }, [autoHideOnLeave, hide, transitionMs]);

  // รีคำนวณเมื่อ resize (กรณี stickToActive)
  useEffect(() => {
    const onResize = () => {
      if (stickToActive && getActiveEl) moveTo(getActiveEl());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [stickToActive, getActiveEl, moveTo]);

  return {
    menuRef, // ใส่ที่ container ของเมนู (relative)
    rect, // {x, w, h, visible}
    moveTo, // เรียกตอน onMouseEnter ของปุ่ม
    hide, // เรียกตอนต้องการซ่อน/รีกลับไป active
  };
}
