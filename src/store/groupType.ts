import create from 'zustand';
import { supabase } from 'apis/supabaseClient';
import { Database } from 'types/database.types';

type GroupType = Database['public']['Tables']['group_type']['Row'];

interface GroupTypeState {
  groupTypes: GroupType[];
  getGroupTypes: () => void;
  addGroupType: (groupType: GroupType) => void;
  updateGroupType: (groupType: GroupType) => void;
  deleteGroupType: (id: string) => void;
}

export const useGroupTypeStore = create<GroupTypeState>((set) => ({
  groupTypes: [],
  getGroupTypes: async () => {
    const { data } = await supabase.from('group_type').select();
    if (!data) return;
    set((state) => ({ groupTypes: data }));
  },
  addGroupType: async (groupType) => {
    const { data } = await supabase.from('group_type').insert(groupType).select();
    if (!data) return;
    set((state) => ({ groupTypes: [...state.groupTypes, data[0]] }));
  },
  updateGroupType: async (groupType) => {
    const { data } = await supabase.from('group_type').update(groupType).match({ id: groupType.id }).select();
    if (!data) return;
    set((state) => ({ groupTypes: state.groupTypes.map((groupType) => (groupType.id === data[0].id ? data[0] : groupType)) }));
  },
  deleteGroupType: async (id) => {
    await supabase.from('group_type').delete().match({ id });
    set((state) => ({ groupTypes: state.groupTypes.filter((groupType) => groupType.id !== id) }));
  },
}));
