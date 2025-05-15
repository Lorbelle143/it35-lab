import React, { useState, useEffect } from 'react';
import {
  IonContent, IonPage, IonItem, IonText, IonCol, IonGrid, IonRow,
  IonAvatar, IonImg, IonHeader, IonButtons, IonBackButton, IonInput, IonButton, IonCard, IonCardContent
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import { useHistory } from 'react-router-dom';

const About: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  // Chess related content
  const [favoriteOpenings, setFavoriteOpenings] = useState('Sicilian Defense, Ruy Lopez, French Defense');
  const [favoritePlayers, setFavoritePlayers] = useState('Magnus Carlsen, Garry Kasparov, Judit Polgar');
  const [chessQuote, setChessQuote] = useState('“Chess is the gymnasium of the mind.” – Blaise Pascal');
  const [additionalInfo, setAdditionalInfo] = useState('I enjoy analyzing chess games and improving my strategic thinking.');
  const [isEditable, setIsEditable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchSessionAndData = async () => {
      const { data: session, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session || !session.session) return;

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('user_firstname, user_lastname, user_avatar_url, user_email, username')
        .eq('user_email', session.session.user.email)
        .single();

      if (userError || !user) return;

      setFirstName(user.user_firstname || '');
      setLastName(user.user_lastname || '');
      setAvatarPreview(user.user_avatar_url);
      setEmail(user.user_email);
      setUsername(user.username || '');
    };

    fetchSessionAndData();
  }, []);

  const toggleEditMode = () => setIsEditable(!isEditable);

  // Save data handler can be added here to push changes to supabase if needed

  return (
    <IonPage>
      <IonHeader>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/it35-lab/app" />
        </IonButtons>
        <div style={{ padding: '16px' }}>
          <IonText>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#222' }}>About Me</h1>
          </IonText>
        </div>
      </IonHeader>

      <IonContent className="ion-padding" style={{ background: '#fafafa' }}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6">
              <IonCard style={{ borderRadius: '15px', padding: '30px 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                <IonCardContent className="ion-text-center">
                  <IonAvatar style={{ width: '140px', height: '140px', margin: '0 auto 20px', border: '3px solid #4A90E2' }}>
                    <IonImg src={avatarPreview || 'https://via.placeholder.com/150?text=Avatar'} />
                  </IonAvatar>
                  <IonText>
                    <h2 style={{ marginBottom: '4px', fontWeight: 700, fontSize: '1.6rem', color: '#333' }}>{username}</h2>
                    <p style={{ fontSize: '1.1rem', color: '#666' }}>{firstName} {lastName}</p>
                    <p style={{ fontSize: '0.95rem', color: '#999', letterSpacing: '0.03em' }}>{email}</p>
                  </IonText>
                </IonCardContent>
              </IonCard>

              {/* Editable Sections */}
              {[{
                label: 'Favorite Chess Openings',
                value: favoriteOpenings,
                setValue: setFavoriteOpenings,
                placeholder: 'e.g. Sicilian Defense, Ruy Lopez'
              }, {
                label: 'Favorite Chess Players',
                value: favoritePlayers,
                setValue: setFavoritePlayers,
                placeholder: 'e.g. Magnus Carlsen, Garry Kasparov'
              }, {
                label: 'Favorite Chess Quote',
                value: chessQuote,
                setValue: setChessQuote,
                placeholder: 'e.g. Chess is the gymnasium of the mind.'
              }, {
                label: 'Additional Info',
                value: additionalInfo,
                setValue: setAdditionalInfo,
                placeholder: 'Tell us more about yourself'
              }].map((section, idx) => (
                <IonCard
                  key={idx}
                  style={{
                    borderRadius: '12px',
                    padding: '20px 24px',
                    marginTop: '20px',
                    boxShadow: '0 4px 12px rgba(74,144,226,0.12)',
                    background: '#fff'
                  }}
                >
                  <IonCardContent>
                    <IonText>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px', color: '#2c3e50' }}>{section.label}</h3>
                      {isEditable ? (
                        <IonInput
                          value={section.value}
                          onIonChange={(e) => section.setValue(e.detail.value ?? '')}
                          placeholder={section.placeholder}
                          style={{
                            fontSize: '1rem',
                            background: '#f0f4f8',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            color: '#34495e',
                            border: '1.5px solid #4A90E2',
                            transition: 'border-color 0.3s ease'
                          }}
                        />
                      ) : (
                        <p style={{ fontSize: '1.1rem', color: '#34495e', lineHeight: '1.5' }}>{section.value}</p>
                      )}
                    </IonText>
                  </IonCardContent>
                </IonCard>
              ))}

              {/* Edit / Save Button */}
              <IonRow className="ion-justify-content-center ion-margin-top">
                <IonButton
                  onClick={toggleEditMode}
                  expand="block"
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    background: isEditable ? '#27ae60' : '#4A90E2',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 15px rgba(74,144,226,0.3)'
                  }}
                >
                  {isEditable ? 'Save Changes' : 'Edit Profile'}
                </IonButton>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default About;
