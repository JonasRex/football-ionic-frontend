import { supabase } from 'apis/supabaseClient';
import { Team } from 'types/team-types';
import { useTeamStore } from 'store/team';
export const getAllTeams = async () => {
    const response = await supabase
      .from('team')
      .select(
        `
        *,
        player (*)
      `
      )
      .select();
  
    if (response.error) {
      throw new Error('E_TEAMS_NOT_FOUND');
    }
    useTeamStore.getState().setTeams(response.data as Team[]);
  };

  export const deleteTeam = async (id: string) => {
    await supabase.from('team').delete().match({ id });
    useTeamStore.getState().setTeams(useTeamStore.getState().teams.filter((team) => team.id !== id));
  };

  export const addTeam = async (name: string, year_founded: number) => {
    const { data } = await supabase.from('team').insert({ name, year_founded }).select();
    if (!data) return;
    useTeamStore.getState().setTeams([...useTeamStore.getState().teams, data[0]]);
  };