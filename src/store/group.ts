import create from 'zustand';
import { supabase } from 'apis/supabaseClient';
import { Database } from 'types/database.types';

type Group = Database['public']['Tables']['group']['Row'];

interface GroupState {
  groups: Group[];
  getGroups: () => void;
  addGroup: (leaderId: string, workerId: string) => Promise<Group | undefined>;
  updateGroup: (group: Group) => void;
  deleteGroup: (id: string) => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  groups: [],
  getGroups: async () => {
    const { data } = await supabase.from('group').select();
    if (!data) return;
    set((state) => ({ groups: data }));
  },
  addGroup: async (leaderId, workerId) => {
    const { data } = await supabase.from('group').insert({ leaderId, workerId, something: 'test', group_fk: '96fd2b22-e996-4022-b062-903b98e58a0a' }).select();
    if (!data) return;
    set((state) => ({ groups: [...state.groups, data[0]] }));
    return data[0];
  },
  updateGroup: async (group) => {
    const { data } = await supabase.from('group').update(group).match({ id: group.id }).select();
    if (!data) return;
    set((state) => ({ groups: state.groups.map((group) => (group.id === data[0].id ? data[0] : group)) }));
  },
  deleteGroup: async (id) => {
    await supabase.from('group').delete().match({ id });
    set((state) => ({ groups: state.groups.filter((group) => group.id !== id) }));
  },
}));
