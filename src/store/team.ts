import create from 'zustand';
import { supabase } from 'apis/supabaseClient';
import { Database } from 'types/database.types';

type Team = Database['public']['Tables']['team']['Row'];

interface TeamState {
  teams: Team[];
  getTeams: () => void;
  addTeam: (name: string, year_founded: number) => void;
  updateTeam: (id: string, name: string, year_founded: number) => void;
  deleteTeam: (id: string) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  getTeams: async () => {
    const { data } = await supabase.from('team').select();
    if (!data) return;
    set((state) => ({ teams: data }));
  },
  addTeam: async (name, year_founded) => {
    const { data } = await supabase.from('team').insert({ name, year_founded }).select();
    if (!data) return;
    set((state) => ({ teams: [...state.teams, data[0]] }));
  },
  updateTeam: async (id, name, year_founded) => {
    const { data } = await supabase.from('team').update({ name, year_founded }).match({ id }).select();
    if (!data) return;
    set((state) => ({ teams: state.teams.map((team) => (team.id === id ? data[0] : team)) }));
  },
  deleteTeam: async (id) => {
    await supabase.from('team').delete().match({ id });
    set((state) => ({ teams: state.teams.filter((team) => team.id !== id) }));
  },
}));
