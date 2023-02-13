import { IonButton, IonContent, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { useEffect } from 'react';
import { useTeamStore } from 'store/team';
import { closeOutline } from 'ionicons/icons';
import { getAllTeams, deleteTeam, addTeam } from 'services/teams-service';
import { Team } from 'types/team-types';

const TeamTab: React.FC = () => {
  const { teams } = useTeamStore((state) => state);

  useEffect(() => {
    getAllTeams();
  }, []);

  const handleAddTeam = async () => {
    await addTeam('AGF', 1950);
  };

  return (
    <IonContent color={'white-background'}>
      {teams?.map((team) => (
        <IonItem key={team.id}>
          <IonLabel>{team.name}</IonLabel>
          <IonIcon onClick={() => deleteTeam(team.id)} slot="end" icon={closeOutline} />
        </IonItem>
      ))}
      <IonButton onClick={handleAddTeam}>Add Team</IonButton>
    </IonContent>
  );
};
export default TeamTab;
