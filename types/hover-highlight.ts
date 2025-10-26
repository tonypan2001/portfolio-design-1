export type HighlightState = {
  x: number;
  w: number;
  h: number;
  visible: boolean;
};

export type UseHoverHighlightOptions = {
  /** ให้ไฮไลท์กลับไปอยู่ที่เมนู active เมื่อ mouse ออกจากแถบเมนู */
  stickToActive?: boolean;
  /** คืน element ของปุ่ม active (ใช้กรณี stickToActive = true) */
  getActiveEl?: () => HTMLElement | null;
  /** เปิด/ปิด auto hide ตอน mouseleave บน container */
  autoHideOnLeave?: boolean;
  /** กันกระพริบ: เวลา animate (ms) ของ CSS ที่คุณตั้งไว้ (เพื่อ sync บาง edge case) */
  transitionMs?: number;
};
