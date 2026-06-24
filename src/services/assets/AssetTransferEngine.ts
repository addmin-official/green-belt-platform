import { NationalAssetRegistry, SovereignPhysicalAsset, OwnershipModel } from './NationalAssetRegistry';
import { CBIRegistry } from '../treasury/CBIRegistry';

export interface TransferProposal {
  id: string; // ناسنامە
  assetId: string; // ناسنامەی سەروەت/کاڵا
  sourceOwnership: OwnershipModel; // خاوەندارێتی سەرچاوە
  targetOwnership: OwnershipModel; // خاوەندارێتی ئامانج
  sourceJurisdiction: 'federal' | 'krg' | 'joint'; // دەسەڵاتی سەرچاوە
  targetJurisdiction: 'federal' | 'krg' | 'joint'; // دەسەڵاتی ئامانج
  valuationAtTransferUSD: number; // نرخاندن لە کاتی گواستنەوە (بە دۆلار)
  authorizedBy: string; // پەسەندکراو لەلایەن
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'REJECTED'; // دۆخی مامەڵە
  timestamp: string; // کاتی ئەنجامدان
}

// ئەمە دۆخی مامەڵەکانە بە کوردی بۆ بەکارهێنان لە UI
export const TransferStatusLabels: Record<TransferProposal['status'], string> = {
  PENDING: 'چاوەڕوانکراو',
  APPROVED: 'پەسەندکراو',
  COMPLETED: 'تەواوکراو',
  REJECTED: 'ڕەتکراوە'
};

// ئەمە ناوی دەسەڵاتەکانە بە کوردی بۆ UI
export const JurisdictionLabels: Record<TransferProposal['sourceJurisdiction'], string> = {
  federal: 'فیدراڵی',
  krg: 'هەرێمی کوردستان',
  joint: 'هاوبەش'
};

export class AssetTransferEngine {
  private static transfers: TransferProposal[] = [
    {
      id: 'TRSF-001',
      assetId: 'AST-IBRAHIMKHALIL-GATE',
      sourceOwnership: 'KRG',
      targetOwnership: 'JOINT',
      sourceJurisdiction: 'krg',
      targetJurisdiction: 'joint',
      valuationAtTransferUSD: 4800,
      authorizedBy: 'لیژنەی ڕێککەوتنی هاوبەشی هەولێر-بەغدا',
      status: 'COMPLETED',
      timestamp: '2026-06-03T10:11:00Z'
    }
  ];
  public static getTransfers(): TransferProposal[] {
    return [...this.transfers];
  }

  public static submitTransfer(
    assetId: string,
    targetOwnership: OwnershipModel,
    targetJurisdiction: 'federal' | 'krg' | 'joint',
    actor: string
  ): { success: boolean; transfer?: TransferProposal; message: string } {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return { success: false, message: 'سەروەت یان کاڵاکە نەدۆزرایەوە' };
    }

    const id = `TRSF-${String(this.transfers.length + 1).padStart(3, '0')}`;
    const newTransfer: TransferProposal = {
      id,
      assetId,
      sourceOwnership: asset.ownership,
      targetOwnership,
      sourceJurisdiction: asset.jurisdiction,
      targetJurisdiction,
      valuationAtTransferUSD: asset.valuationUSD,
      authorizedBy: actor,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };

    this.transfers.push(newTransfer);

    NationalAssetRegistry.appendLedgerRecord(
      assetId,
      'TRANSFER',
      actor,
      `پێشنیاری گواستنەوە دەستیپێکرد لە ${asset.ownership} (${asset.jurisdiction}) بۆ ${targetOwnership} (${targetJurisdiction}). بەها: ${asset.valuationUSD} ملیۆن دۆلار.`
    );

    return {
      success: true,
      transfer: newTransfer,
      message: `پێشنیاری گواستنەوەی ${id} چاوەڕوانی پەسەندکردنی دەستوورییە.`
    };
  }

  public static approveAndExecuteTransfer(transferId: string, actor: string): { success: boolean; message: string } {
    const transfer = this.transfers.find(t => t.id === transferId);
    if (!transfer) {
      return { success: false, message: 'پێشنیاری گواستنەوەکە نەدۆزرایەوە' };
    }

    if (transfer.status !== 'PENDING') {
      return { success: false, message: 'گواستنەوەکە لە دۆخی چاوەڕوانکراودا نییە' };
    }

    const asset = NationalAssetRegistry.getAssetById(transfer.assetId);
    if (!asset) {
      transfer.status = 'REJECTED';
      return { success: false, message: 'سەروەتەکە لە ناو مەلەفی سەروەتە هەرێمییەکاندا نەماوە' };
    }

    // جێبەجێکردنی گۆڕانکارییەکانی گواستنەوە
    transfer.status = 'COMPLETED';
    transfer.timestamp = new Date().toISOString();

    const previousOwnership = asset.ownership;
    const previousJurisdiction = asset.jurisdiction;

    asset.ownership = transfer.targetOwnership;
    asset.jurisdiction = transfer.targetJurisdiction;
    asset.lifecycle = 'ACTIVE';

    // نوێکردنەوە لە بنکەی دراوی بانکی ناوەندی (CBI) بۆ ئەوەی بە یەکەوە بەستراو بن!
    const cbiAssets = CBIRegistry.getSovereignAssets();
    const cbiAsset = cbiAssets.find(a => a.id === asset.id);
    if (cbiAsset) {
      cbiAsset.jurisdiction = transfer.targetJurisdiction;
    }

    // دووبارە هەژمارکردنەوەی پێوانەکانی دارایی بە شێوەیەکی خۆکار لە کاتی گواستنەوەدا!
    this.recalculateTreasuryExposureOnTransfer(transfer);

    // تۆمارکردن لە دەفتەری گشتی (Ledger)
    NationalAssetRegistry.appendLedgerRecord(
      asset.id,
      'TRANSFER',
      actor,
      `گواستنەوەکە جێبەجێ کرا. خاوەندارێتی لە ${previousOwnership} گوازرایەوە بۆ ${transfer.targetOwnership}. هەروەها دەسەڵاتی دادوەری لە ${previousJurisdiction} گوازرایەوە بۆ ${transfer.targetJurisdiction}.`
    );

    return { 
      success: true, 
      message: 'گواستنەوەکە بە سەرکەوتوویی جێبەجێ کرا و تۆمارەکانی بانکی ناوەندی نوێکرانەوە.' 
    };
    return {
      success: true,
      message: `Transfer completed successfully. National Balance Sheet updated.`
    };
  }

  /**
   * دووبارە هەژمارکردنەوەی خستنەڕووی دارایی، ڕێژەی دڵنیایی، و یەدەگەکان بە شێوەیەکی خۆکار.
   */
  private static recalculateTreasuryExposureOnTransfer(transfer: TransferProposal) {
    // لە کاتی گواستنەوەدا (بەتایبەت لە نێوان فیدراڵ و هەرێم یان هاوبەش)، شلەیی سەرمایە (Liquidity) هاوسەنگ دەکرێتەوە.
    // ئێمە هەژمارە سەرەکییەکانی بانکی ناوەندی (CBI) کەمێک ڕێکدەخەین بۆ ئەوەی گەرەنتییە داراییەکان یان پاکتاوکردنی کارگێڕی ڕەنگبداتەوە.
    const feeMillions = Math.min(25, Math.round(transfer.valuationAtTransferUSD * 0.002 * 10) / 10); // ٠.٢٪ باجی گواستنەوە
    
    const fedAccount = CBIRegistry.getCBIAccounts().find(a => a.jurisdiction === 'federal' && a.currency === 'USD');
    const krgAccount = CBIRegistry.getCBIAccounts().find(a => a.jurisdiction === 'krg' && a.currency === 'USD');

    if (transfer.sourceJurisdiction === 'federal' && transfer.targetJurisdiction === 'krg' && fedAccount && krgAccount) {
      // فیدراڵ سەروەتەکە دەگوازێتەوە بۆ دەفتەری هەرێمی کوردستان. هاوسەنگکردنی باڵانسەکان.
      CBIRegistry.updateCBIAccountBalance(fedAccount.accountNumber, feeMillions);
      CBIRegistry.updateCBIAccountBalance(krgAccount.accountNumber, -feeMillions);
    } else if (transfer.sourceJurisdiction === 'krg' && transfer.targetJurisdiction === 'federal' && fedAccount && krgAccount) {
      // هەرێمی کوردستان سەروەتەکە دەگوازێتەوە بۆ فیدراڵ.
      CBIRegistry.updateCBIAccountBalance(fedAccount.accountNumber, -feeMillions);
      CBIRegistry.updateCBIAccountBalance(krgAccount.accountNumber, feeMillions);
    }
  }
}
