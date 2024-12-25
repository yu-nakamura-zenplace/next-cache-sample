import { Staff, fetchStaffs } from '@/api/staffs';
import { isServer } from '@/utils/util';

interface CacheData {
  data: Staff[];
  timestamp: number;
}

class StaffsCache {
  private static instance: StaffsCache;
  private _cache: CacheData | null = null;
  
  // 1日（ミリ秒）を期限とする。過ぎていたら refreshします。
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000;

  private constructor() {}

  public static getInstance(): StaffsCache {
    if (!StaffsCache.instance) {
      StaffsCache.instance = new StaffsCache();
    }
    return StaffsCache.instance;
  }

  private isCacheExpired(): boolean {
    if (!this._cache) return true;
    const now = Date.now();
    return now - this._cache.timestamp > this.CACHE_DURATION;
  }

  public async cache(): Promise<Staff[]> {
    if (!isServer()) {
      throw new Error('This method can only be called on the server side');
    }
    if (!this._cache || this.isCacheExpired()) {
      const data = await fetchStaffs();
      this._cache = {
        data,
        timestamp: Date.now()
      };
    }
    return this._cache.data;
  }

  public async getStaffs(): Promise<Staff[]> {
    if (!isServer()) {
      throw new Error('This method can only be called on the server side');
    }
    // TODO: if (!this._cache || this.isCacheExpired()) なら this.cache() したい
    return this._cache?.data ?? [];
  }

  public async findById(id: number): Promise<Staff | undefined> {
    if (!isServer()) {
      throw new Error('This method can only be called on the server side');
    }
    return this._cache?.data.find(staff => staff.staff_id === id);
  }

  public clearCache(): void {
    this._cache = null;
  }
}

export const staffsCache = StaffsCache.getInstance();
