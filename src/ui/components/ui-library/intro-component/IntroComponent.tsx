import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/bundle';
import { IonProgressBar, IonText, useIonRouter } from '@ionic/react';
import CircularButton from '../../ui-library/circular-button/CircularButton';
import styles from './intro-component.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import img from 'static/assets/img/meew-bg.jpg';

const IntroComponent: React.FC = () => {
  const router = useIonRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const handleSkipClick = () => router.push('/home');

  return (
    <>
      <div className={styles.bgImgOverlay} />
      <div style={{ backgroundImage: `url(${img})` }} className={styles.bgImg} />

      <div className={`w-full p-6 text-white not-italic h-full ${styles.textStyle}`}>
        <Swiper className={styles.swiper} spaceBetween={200} onSlideChange={(swiper) => setCurrentStep(swiper.realIndex)}>
          {stepInfo.map((d, i) => (
            <SwiperSlide key={i}>
              <div className="text-left mb-[100px]">
                <div>
                  <IonText class="font-bold text-[45px]">
                    Step {d.id}: {d.title}
                  </IonText>
                </div>
                <div>
                  <IonText class="font-normal text-sm">{d.subText}</IonText>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={`${styles.progressContainer} text-center justify-center font-normal text-sm mt-[10px]`}>
          <button onClick={handleSkipClick} className={styles.textStyle}>
            Skip
          </button>

          <div className={`${styles.progressbarGrid} w-full mx-[45px]`}>
            {stepInfo.map((d, i) => (
              <IonProgressBar key={i} value={currentStep === i ? 1 : 0} color={'white-text'} />
            ))}
          </div>

          <CircularButton disabled={currentStep !== stepInfo.length - 1} onClick={() => currentStep === stepInfo.length - 1 && handleSkipClick()} />
        </div>
      </div>
    </>
  );
};

export default IntroComponent;

const stepInfo = [
  {
    id: 1,
    title: 'Beregn din friv??rdi p?? din bolig',
    subText: 'Din nye app til valg af egendomsm??gler, kuponer, vouchers og spar 20k p?? dit n??ste boligsalg',
  },
  {
    id: 2,
    title: 'Besvar en r??kke sp??rgsm??l',
    subText: 'Din nye app til valg af egendomsm??gler, kuponer, vouchers og spar 20k p?? dit n??ste boligsalg. Din nye app til valg af egendomsm??gler',
  },
  {
    id: 3,
    title: 'V??lg en ejendoms-m??gler',
    subText: 'S??lg din bolig via din egendomsm??gler i Atlantis, og du vil spare kr. 20.000,- p?? sal??ret',
  },
];
