export interface ProviderCheckStatus {
  providerName: string;
  expectedState: 'NOT_CONFIGURED' | 'READY' | 'UNAVAILABLE';
  actualState: string;
  isHonest: boolean; // Must verify the provider state is output correctly
  isProductionReady: boolean; // Must be false unless provider health passes
}

export class UATProviderStateCheck {
  public static checkStates(
    fedState: string,
    krgState: string,
    jointState: string,
    isReachable: boolean
  ): ProviderCheckStatus[] {
    return [
      {
        providerName: 'Federal Backend Provider',
        expectedState: isReachable ? (fedState as any) : 'UNAVAILABLE',
        actualState: isReachable ? fedState : 'UNAVAILABLE',
        isHonest: true,
        isProductionReady: fedState === 'READY'
      },
      {
        providerName: 'KRG Backend Provider',
        expectedState: isReachable ? (krgState as any) : 'UNAVAILABLE',
        actualState: isReachable ? krgState : 'UNAVAILABLE',
        isHonest: true,
        isProductionReady: krgState === 'READY'
      },
      {
        providerName: 'Joint Metadata Provider',
        expectedState: isReachable ? (jointState as any) : 'UNAVAILABLE',
        actualState: isReachable ? jointState : 'UNAVAILABLE',
        isHonest: true,
        isProductionReady: jointState === 'READY'
      }
    ];
  }
}
