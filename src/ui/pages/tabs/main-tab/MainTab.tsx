import { IonButton, IonContent, IonTitle } from '@ionic/react';
import { usePersonStore } from 'store/person';
import { useGroupStore } from 'store/group';
import { useGroupTypeStore } from 'store/groupType';

const MainTab: React.FC = () => {
  const { persons, addPerson, deletePerson } = usePersonStore((state) => state);
  const { groups, addGroup, deleteGroup } = useGroupStore((state) => state);
  const { groupTypes, addGroupType, deleteGroupType } = useGroupTypeStore((state) => state);

  const handleAddPerson = () => {
    addPerson('Ole').then((person) => {
      console.log(person);
    });
  };

  const handleAddGroup = () => {
    addGroup('1835bb3e-96b3-4ef0-8495-6e5a2ca1b0ae', '821a8c44-bf6e-4685-9e30-81e6463a0759').then((group) => {
      console.log(group);
    });
  };

  return (
    <IonContent color={'white-background'}>
      <IonButton onClick={handleAddPerson}>Add Person</IonButton>
      <IonButton onClick={handleAddGroup}>Add Group</IonButton>
    </IonContent>
  );
};

export default MainTab;
