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
};
