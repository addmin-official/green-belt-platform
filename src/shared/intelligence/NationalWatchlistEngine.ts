import { WatchlistEntity } from './NationalThreatTypes';
import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';
import { SovereignThreatLedger } from './SovereignThreatLedger';

export class NationalWatchlistEngine {
  public static addWatchlistEntity(entity: Omit<WatchlistEntity, 'sealedDate'>): WatchlistEntity {
    const fullEntity: WatchlistEntity = {
      ...entity,
      sealedDate: new Date().toISOString()
    };
    
    NationalIntelligenceRegistry.addWatchlist(fullEntity);
    return fullEntity;
  }

  public static updateWatchlistRating(id: string, newRating: WatchlistEntity['riskRating'], logActor: string): void {
    const entry = NationalIntelligenceRegistry.getWatchlist().find(w => w.id === id);
    if (entry) {
      entry.riskRating = newRating;
      SovereignThreatLedger.sealAndPublish('watchlist', {
        id,
        newRating,
        actor: logActor,
        action: 'WATCHLIST_RATING_MUTATION'
      });
    }
  }

  public static queryWatchlist(type?: WatchlistEntity['type']): WatchlistEntity[] {
    const list = NationalIntelligenceRegistry.getWatchlist();
    if (!type) return list;
    return list.filter(w => w.type === type);
  }
}
