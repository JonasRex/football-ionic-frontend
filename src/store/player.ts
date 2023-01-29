import create from 'zustand';
import { supabase } from 'apis/supabaseClient';
import { Database } from 'types/database.types';

type Player = Database['public']['Tables']['player']['Row'];

interface PlayerState {
  players: Player[];
  getPlayers: () => void;
  addPlayer: (player: Player) => void;
  updatePlayer: (player: Player) => void;
  deletePlayer: (id: string) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: [],
  getPlayers: async () => {
    const { data } = await supabase.from('player').select();
    if (!data) return;
    set((state) => ({ players: data }));
  },
  addPlayer: async (player) => {
    const { data } = await supabase.from('player').insert(player).select();
    if (!data) return;
    set((state) => ({ players: [...state.players, data[0]] }));
  },
  updatePlayer: async (player) => {
    const { data } = await supabase.from('player').update(player).match({ id: player.id }).select();
    if (!data) return;
    set((state) => ({ players: state.players.map((player) => (player.id === data[0].id ? data[0] : player)) }));
  },
  deletePlayer: async (id) => {
    await supabase.from('player').delete().match({ id });
    set((state) => ({ players: state.players.filter((player) => player.id !== id) }));
  },
}));
