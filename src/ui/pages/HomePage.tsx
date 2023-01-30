import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTabs,
  IonRouterOutlet,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonButton,
  useIonRouter,
  IonLabel,
} from '@ionic/react';
import { homeOutline, peopleOutline, bodyOutline, globeOutline, cashOutline } from 'ionicons/icons';

import MainTab from './tabs/main-tab/MainTab';
import WorldTab from './tabs/world-tab/WorldTab';
import TeamTab from './tabs/team-tab/TeamTab';
import PlayerTab from './tabs/player-tab/PlayerTab';
import TransferTab from './tabs/transfer-tab/TransferTab';

import { supabase } from 'apis/supabaseClient';
import { useAuthUserStore } from 'store/user';

const HomePage: React.FC = () => {
  const router = useIonRouter();
  const authUser = useAuthUserStore((state) => state.authUser);
  const resetAuthUser = useAuthUserStore((state) => state.resetAuthUser);

  useEffect(() => {
    if (!authUser) router.push('/login');
  }, [router, authUser]);

  const handleLogOut = async () => {
    resetAuthUser();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButton onClick={handleLogOut} slot="end">
            Log ud
          </IonButton>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              {pages.map((p, i) => {
                return <Route key={i} exact path={p.path} component={p.component} />;
              })}

              <Route exact path="/home">
                <Redirect to={pages.filter((p) => p.redirect)[0].path} />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color={'white-background'} class={'h-[70px] border-t-[1px] border'}>
              {pages.map((p, i) => {
                return (
                  <IonTabButton key={i} tab={`tab${i}`} href={p.path}>
                    <IonIcon icon={p.icon} />
                    <IonLabel>{p.name}</IonLabel>
                  </IonTabButton>
                );
              })}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

const pages = [
  {
    name: 'Main',
    icon: homeOutline,
    path: '/main',
    component: MainTab,
    redirect: true,
  },
  {
    name: 'World',
    icon: globeOutline,
    path: '/world',
    component: WorldTab,
    redirect: false,
  },
  {
    name: 'Teams',
    icon: peopleOutline,
    path: '/teams',
    component: TeamTab,
    redirect: false,
  },
  {
    name: 'Players',
    icon: bodyOutline,
    path: '/players',
    component: PlayerTab,
    redirect: false,
  },
  {
    name: 'Transfers',
    icon: cashOutline,
    path: '/transfers',
    component: TransferTab,
    redirect: false,
  },
];

const menuItems = [{ name: 'Settings' }, { name: 'Account' }, { name: 'Questionnaire' }, { name: 'Logout' }];
