import { Database } from './database.types';
import { Player } from './player-types';


export type Team = Database['public']['Tables']['team']['Row'] & {
    players: Player[];
};
