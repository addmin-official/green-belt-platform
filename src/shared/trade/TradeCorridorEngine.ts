import { TradeCorridor } from './TradeTypes';

export class TradeCorridorEngine {
  private static corridors: TradeCorridor[] = [
    {
      id: 'COR-IK',
      name: 'Ibrahim Khalil Corridor',
      type: 'LAND',
      primaryGateName: 'Zakho Gate',
      operatingJurisdiction: 'krg',
      dailyCapacityTons: 15000,
      activeStatus: true
    },
    {
      id: 'COR-PK',
      name: 'Parwez Khan Corridor',
      type: 'LAND',
      primaryGateName: 'Qasr-e Shirin Gate',
      operatingJurisdiction: 'krg',
      dailyCapacityTons: 8000,
      activeStatus: true
    },
    {
      id: 'COR-BM',
      name: 'Bashmakh Corridor',
      type: 'LAND',
      primaryGateName: 'Penjwen Gate',
      operatingJurisdiction: 'krg',
      dailyCapacityTons: 6000,
      activeStatus: true
    },
    {
      id: 'COR-UQ',
      name: 'Umm Qasr Corridor',
      type: 'SEA',
      primaryGateName: 'Umm Qasr Deepwater Port',
      operatingJurisdiction: 'federal',
      dailyCapacityTons: 40000,
      activeStatus: true
    },
    {
      id: 'COR-BGW',
      name: 'Baghdad Intl Airport Corridor',
      type: 'AIR',
      primaryGateName: 'BIAP Cargo Terminal',
      operatingJurisdiction: 'federal',
      dailyCapacityTons: 2500,
      activeStatus: true
    },
    {
      id: 'COR-EBL',
      name: 'Erbil Intl Airport Corridor',
      type: 'AIR',
      primaryGateName: 'EIA Cargo Enclave',
      operatingJurisdiction: 'krg',
      dailyCapacityTons: 1800,
      activeStatus: true
    }
  ];

  public static getAllCorridors(): TradeCorridor[] {
    return [...this.corridors];
  }

  public static getCorridorById(id: string): TradeCorridor | undefined {
    return this.corridors.find(c => c.id === id);
  }

  public static addCorridor(corridor: Omit<TradeCorridor, 'id'>): TradeCorridor {
    const id = `COR-${corridor.name.replace(/\s+/g, '-').slice(0, 5).toUpperCase()}-${Math.floor(100 + Math.random() * 899)}`;
    const newCorridor: TradeCorridor = {
      id,
      ...corridor
    };
    this.corridors.push(newCorridor);
    return newCorridor;
  }

  public static toggleCorridorStatus(id: string): boolean {
    const c = this.corridors.find(cor => cor.id === id);
    if (c) {
      c.activeStatus = !c.activeStatus;
      return true;
    }
    return false;
  }

  public static updateCapacity(id: string, tons: number): boolean {
    const c = this.corridors.find(cor => cor.id === id);
    if (c && tons > 0) {
      c.dailyCapacityTons = tons;
      return true;
    }
    return false;
  }
}
