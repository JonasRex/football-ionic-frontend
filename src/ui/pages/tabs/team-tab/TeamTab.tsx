import { IonButton, IonContent, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { useEffect } from 'react';
import { useTeamStore } from 'store/team';
import { closeOutline } from 'ionicons/icons';

const TeamTab: React.FC = () => {
  const { teams, addTeam, deleteTeam } = useTeamStore((state) => state);

  useEffect(() => {
    useTeamStore.getState().getTeams();
  }, []);

  return (
    <IonContent color={'white-background'}>
      {teams?.map((team) => (
        <IonItem key={team.id}>
          <IonLabel>{team.name}</IonLabel>
          <IonIcon onClick={() => deleteTeam(team.id)} slot="end" icon={closeOutline} />
        </IonItem>
      ))}
      <IonButton onClick={() => addTeam('test', 2022)}>Add Team</IonButton>
    </IonContent>
  );
};
export default TeamTab;
