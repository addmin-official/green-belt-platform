export interface SecureDevice {
  deviceFingerprint: string;
  os: string;
  assignedStaffId: string;
  trusted: boolean;
  securityPatchDate: string;
  firewallActive: boolean;
  detectedLocation: string; // Baghdad, Erbil, etc.
}

export const REGISTERED_DEVICES: SecureDevice[] = [
  {
    deviceFingerprint: 'DEV-FGP-FED-01',
    os: 'Enterprise Sovereign Linux v1.2',
    assignedStaffId: 'EMP-FED-001',
    trusted: true,
    securityPatchDate: '2026-06-01',
    firewallActive: true,
    detectedLocation: 'Baghdad - Council Office',
  },
  {
    deviceFingerprint: 'DEV-FGP-FED-02',
    os: 'Enterprise Sovereign Linux v1.2',
    assignedStaffId: 'EMP-FED-004',
    trusted: true,
    securityPatchDate: '2026-06-01',
    firewallActive: true,
    detectedLocation: 'Basra - Umm Qasr Port',
  },
  {
    deviceFingerprint: 'DEV-FGP-KRG-01',
    os: 'Regional Secure OS v3',
    assignedStaffId: 'EMP-KRG-001',
    trusted: true,
    securityPatchDate: '2026-05-20',
    firewallActive: true,
    detectedLocation: 'Erbil - PM Headquarters',
  },
  {
    deviceFingerprint: 'DEV-FGP-KRG-02',
    os: 'Regional Secure OS v3',
    assignedStaffId: 'EMP-KRG-004',
    trusted: true,
    securityPatchDate: '2026-05-20',
    firewallActive: true,
    detectedLocation: 'Duhok - Ibrahim Khalil',
  }
];

export class DeviceTrustEngine {
  private static devices: SecureDevice[] = [...REGISTERED_DEVICES];

  public static getDevices(): SecureDevice[] {
    return this.devices;
  }

  public static isDeviceTrusted(fingerprint: string): boolean {
    const dev = this.devices.find(d => d.deviceFingerprint === fingerprint);
    return dev ? dev.trusted && dev.firewallActive : false;
  }

  public static registerDevice(device: SecureDevice): void {
    if (this.devices.some(d => d.deviceFingerprint === device.deviceFingerprint)) {
      throw new Error(`Device with signature ${device.deviceFingerprint} is already registered.`);
    }
    this.devices.push(device);
  }

  public static toggleDeviceTrust(fingerprint: string): void {
    const dev = this.devices.find(d => d.deviceFingerprint === fingerprint);
    if (dev) dev.trusted = !dev.trusted;
  }
}
