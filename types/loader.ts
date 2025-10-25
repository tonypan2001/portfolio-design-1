export type LoaderProps = {
  /** เวลารวมโดยประมาณจนถึง 100% (มิลลิวินาที) */
  duration?: number;
  /** สีแถบ */
  barColorClass?: string; // tailwind class เช่น "bg-white"
  /** สีพื้นหลัง overlay */
  backdropClass?: string; // tailwind class เช่น "bg-neutral-900"
};
