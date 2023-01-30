import { IonButton, IonContent, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { useEffect } from 'react';
import { usePlayerStore } from 'store/player';
import { closeOutline } from 'ionicons/icons';

const PlayerTab: React.FC = () => {
  const { players, addPlayer, deletePlayer } = usePlayerStore((state) => state);

  useEffect(() => {
    usePlayerStore.getState().getPlayers();
  }, []);

  return (
    <IonContent color={'white-background'}>
      {players?.map((player) => (
        <IonItem key={player.id}>
          <IonLabel>{player.first_name}</IonLabel>
          <IonIcon onClick={() => deletePlayer(player.id)} slot="end" icon={closeOutline} />
        </IonItem>
      ))}
    </IonContent>
  );
};
export default PlayerTab;
