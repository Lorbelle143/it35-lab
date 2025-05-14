import React, { useState } from 'react';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonImg,
  IonText,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';

const UtiliTrackFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState<{ title: string; img: string; liked: boolean }[]>([
    {
      title: 'Electric Meter Quest',
      img: 'https://i.pinimg.com/originals/12/14/54/121454ba8bfa40e7ce521993f9896fa9.gif',
      liked: false,
    },
    {
      title: 'Water Leak Hunter',
      img: 'https://i.pinimg.com/originals/17/e0/70/17e070f478a53f8d11d0d697ad43069c.gif',
      liked: false,
    },
    {
      title: 'Grid Sync Challenge',
      img: 'https://i.pinimg.com/originals/cf/f0/e5/cff0e5dce67e0e24300dfcb5d9f616b4.gif',
      liked: false,
    },
    {
      title: 'Power Pole Patrol',
      img: 'https://i.pinimg.com/originals/91/52/f9/9152f9d6e0b22a96a0b73d1fe4c9d2a4.gif',
      liked: false,
    },
    {
      title: 'Transformer Repair Run',
      img: 'https://i.pinimg.com/originals/95/45/64/954564ffdd318c63d9e68cf49b401b82.gif',
      liked: false,
    },
    {
      title: 'Battery Backup Mission',
      img: 'https://i.pinimg.com/originals/ed/07/ed/ed07ed6dc5f91cf203eec3e45628a053.gif',
      liked: false,
    },
  ]);

  const toggleLike = (index: number) => {
    setFavorites(prev =>
      prev.map((item, i) => (i === index ? { ...item, liked: !item.liked } : item))
    );
  };

  return (
    <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center' }}>
      <IonGrid style={{ maxWidth: '1000px' }}>
        <IonRow className="ion-justify-content-center">
          {favorites.map((item, index) => (
            <IonCol size="12" sizeMd="4" key={index}>
              <IonCard style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <IonImg src={item.img} alt={item.title} style={{ height: '200px', objectFit: 'cover' }} />
                <IonCardContent className="ion-text-center">
                  <IonText>
                    <h2 style={{ fontSize: '1.1rem', margin: '0.5rem 0', fontWeight: 'bold' }}>
                      {item.title}
                    </h2>
                  </IonText>
                  <IonButton fill="clear" onClick={() => toggleLike(index)}>
                    <IonIcon
                      icon={item.liked ? heart : heartOutline}
                      color={item.liked ? 'danger' : 'medium'}
                      style={{ fontSize: '1.5rem' }}
                    />
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default UtiliTrackFavorites;
