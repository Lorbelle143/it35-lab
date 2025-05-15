import React, { useState } from 'react';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
  IonIcon,
  IonButton,
  IonSearchbar,
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';

const SportsFavorites: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState([
    {
      title: 'Chess Mastery',
      img: 'https://media.tenor.com/JuAwDcRY9lYAAAAC/chess-grandmaster.gif',
      liked: true,
    },
    {
      title: 'Basketball Dunk Show',
      img: 'https://media.giphy.com/media/l0Exk8EUzSLsrErEQ/giphy.gif',
      liked: true,
    },
    {
      title: 'Volleyball Spike Battle',
      img: 'https://media.giphy.com/media/qYxvo5hDnbQVa3x6cB/giphy.gif',
      liked: true,
    },
    {
      title: 'Street Basketball Moves',
      img: 'https://media.giphy.com/media/3o7TKF4CFoA0A4kZfG/giphy.gif',
      liked: true,
    },
    {
      title: 'Chess Opening Gambits',
      img: 'https://media.tenor.com/RFqH0eGRrZsAAAAC/chess-gambit.gif',
      liked: true,
    },
    {
      title: 'Volleyball Defense Drill',
      img: 'https://media.giphy.com/media/eJ9igIFoZcPejuVcLY/giphy.gif',
      liked: true,
    },
  ]);

  const toggleLike = (index: number) => {
    setFavorites(prev =>
      prev.map((item, i) => (i === index ? { ...item, liked: !item.liked } : item))
    );
  };

  const filteredFavorites = favorites.filter(
    item => item.title.toLowerCase().includes(searchText.toLowerCase()) && item.liked
  );

  return (
    <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center' }}>
      <IonGrid style={{ maxWidth: '1000px' }}>
        <IonRow>
          <IonCol size="12">
            <IonSearchbar
              value={searchText}
              onIonInput={(e) => setSearchText(e.detail.value!)}
              placeholder="Search your favorite sports..."
              debounce={300}
              animated
            />
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center" style={{ gap: '1rem' }}>
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((item, index) => (
              <IonCol size="12" sizeMd="4" key={index}>
                <IonCard
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleLike(index)}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px rgba(0,0,0,0.18)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover',
                      display: 'block',
                      userSelect: 'none',
                      pointerEvents: 'none', // prevent gif pause on click
                    }}
                  />
                  <IonCardContent className="ion-text-center" style={{ padding: '1rem' }}>
                    <IonText>
                      <h2
                        style={{
                          fontSize: '1.25rem',
                          margin: '0.5rem 0',
                          fontWeight: '700',
                          color: '#222',
                          userSelect: 'none',
                        }}
                      >
                        {item.title}
                      </h2>
                    </IonText>
                    <IonButton
                      fill="clear"
                      onClick={e => {
                        e.stopPropagation(); // prevent card onClick toggle
                        toggleLike(index);
                      }}
                      style={{ marginTop: '0.5rem' }}
                      aria-label={item.liked ? 'Unlike' : 'Like'}
                    >
                      <IonIcon
                        icon={item.liked ? heart : heartOutline}
                        color={item.liked ? 'danger' : 'medium'}
                        style={{ fontSize: '1.8rem' }}
                      />
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))
          ) : (
            <IonCol size="12" className="ion-text-center">
              <IonText color="medium">No favorites match your search.</IonText>
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default SportsFavorites;
