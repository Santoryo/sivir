import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './DatabaseDefinitions'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>
      getSession(): Promise<Session | null>
    }
    interface PageData {
      session: Session | null
    }
    // interface Error {}
    // interface Platform {}

    declare module '@fortawesome/pro-solid-svg-icons/index.es' {
      export * from '@fortawesome/pro-solid-svg-icons';
    }
  }

  interface Champion {
    id: string;
    championId: number;
    key: string;
    name: string;
    title: string;
    fullName: string;
    releaseDate: string;
    releasePatch: string;
    price: any;
    lore: string;
    faction: string;
    skins: SkinData[];
    splashPath: string;
    uncenteredSplashPath: string;
    tilePath: string;
    loadScreenPath: string;
    expand: {
      skins: SkinData[]
    }
  }

  interface SkinData {
    id: string;
    skinId: number;
    name: string;
    isBase: boolean;
    availability: string;
    formatName: string;
    lootEligible: boolean;
    cost: number;
    sale: number;
    distribution: string;
    rarity: string;
    chromas: string;
    lore: string;
    release: string;
    set: string[];
    splashPath: string;
    uncenteredSplashPath: string;
    tilePath: string;
    loadScreenPath: string;
    loadScreenVintagePath: string;
    newEffects: boolean;
    newAnimations: boolean;
    newRecall: boolean;
    newVoice: boolean;
    newQuotes: boolean;
    voiceActor: string[];
    model: "";
  }


}