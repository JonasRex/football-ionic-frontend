import create from 'zustand';
import { Database } from 'types/database.types';

type Team = Database['public']['Tables']['team']['Row'];

interface TeamState {
  teams: Team[];
  setTeams: (teams: Team[]) => void;}

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  setTeams: (teams) => set((state) => ({ teams })),
}));
