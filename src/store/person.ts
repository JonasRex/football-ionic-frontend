import create from 'zustand';
import { supabase } from 'apis/supabaseClient';
import { Database } from 'types/database.types';
import { person } from 'ionicons/icons';

type Person = Database['public']['Tables']['person']['Row'];

interface PersonState {
  persons: Person[];
  getPersons: () => void;
  getPerson: (id: string) => Promise<Person | undefined>;
  addPerson: (name: string) => Promise<Person | undefined>;
  updatePerson: (person: Person) => void;
  deletePerson: (id: string) => void;
}

export const usePersonStore = create<PersonState>((set, get) => ({
  persons: [],
  getPersons: async () => {
    const { data } = await supabase.from('person').select();
    if (!data) return;
    set((state) => ({ persons: data }));
  },
  getPerson: async (id) => {
    const { data } = await supabase.from('person').select().match({ id }).select();
    if (!data) return;
    return data[0];
  },
  addPerson: async (name) => {
    const { data } = await supabase.from('person').insert({ name }).select();
    if (!data) return;
    set((state) => ({ persons: [...state.persons, data[0]] }));
    return data[0];
  },
  updatePerson: async (person) => {
    const { data } = await supabase.from('person').update(person).match({ id: person.id }).select();
    if (!data) return;
    set((state) => ({ persons: state.persons.map((person) => (person.id === data[0].id ? data[0] : person)) }));
  },
  deletePerson: async (id) => {
    await supabase.from('person').delete().match({ id });
    set((state) => ({ persons: state.persons.filter((person) => person.id !== id) }));
  },
}));
