import { CURRENT_PLATFORM_MODE } from '../config/platformMode';

export default function PlatformModeBanner() {
  return <aside dir="rtl">{CURRENT_PLATFORM_MODE.label}</aside>;
}
