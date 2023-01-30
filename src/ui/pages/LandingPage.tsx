import React from 'react';
import { IonButton, IonContent, IonGrid, IonImg, IonPage, IonRow, IonText, useIonAlert, useIonLoading, useIonRouter } from '@ionic/react';
import EasyMove from 'static/assets/img/EasyMove.svg';
import Separator from 'ui/components/generic/Separator';
import { t } from 'i18next';
import { supabase } from 'apis/supabaseClient';
import SocialLoginButton from 'ui/components/authentication/social-login-buttons/SocialLoginButton';
import { Provider } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();

  const signInWithThirdParty = async (variant: Provider) => {
    await present({ message: t('authentication.redirecting') });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: variant,
    });
    if (error) return await presentAlert({ header: t('authentication.genericError'), message: error?.message, buttons: ['OK'] });
    await dismiss();
  };

  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex flex-col h-full mx-8">
          <div className="flex flex-col justify-around h-2/5">
            <IonImg src={EasyMove} className="h-[50px] w-full" />
          </div>
          <div className="flex flex-col justify-center h-1/5">
            <IonButton className="h-[60px] w-full " onClick={() => router.push('/login')} expand="full">
              Login
            </IonButton>
            <IonButton className="h-[60px] w-full " onClick={() => router.push('/register')} expand="full">
              Registrer
            </IonButton>
          </div>
          <div className="flex flex-col justify-between h-2/5 py-12">
            <div>
              <Separator text="Login med" />
              <div className="flex justify-between gap-2">
                <SocialLoginButton provider="facebook" onClick={() => signInWithThirdParty('facebook')} />
                <SocialLoginButton provider="google" onClick={() => signInWithThirdParty('google')} />
                <SocialLoginButton provider="apple" onClick={() => signInWithThirdParty('apple')} />
              </div>
            </div>
            <p className="text-sm text-center">
              Brug for en løsning til virksomheder?
              <Link className="ml-1" style={{ textDecorationLine: 'underline' }} to="/register">
                Klik her
              </Link>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
