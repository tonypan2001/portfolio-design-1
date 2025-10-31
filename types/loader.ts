export type AssetItem = {
  url: string;
  weight?: number;
};

export type LoaderProps = {
  assets: AssetItem[]; // ไฟล์ที่ต้องโหลดสำหรับหน้าแรก
  includeFonts?: boolean; // รวมรอ document.fonts.ready ด้วยไหม
  minShowMs?: number; // เวลาแสดงขั้นต่ำกันกระพริบ
  barColorClass?: string; // Tailwind สีหลอด
  backdropClass?: string; // Tailwind สีพื้นหลัง
  text?: string; // ข้อความใต้เปอร์เซ็นต์
  waitForEvents?: string[]; // รายชื่อ event บน window ที่ต้องรอก่อนปิด (เช่น "r3f-ready")
  waitTimeoutMs?: number; // เวลาสูงสุดในการรอ event แต่ละตัว (กันค้าง)
};
