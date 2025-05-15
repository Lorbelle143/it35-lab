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
  const [hobbies, setHobbies] = useState('Music, Traveling, Coding, Gaming');
  const [quote, setQuote] = useState('“Life is what happens when you’re busy making other plans.” - John Lennon');
  const [additionalInfo, setAdditionalInfo] = useState('I love experimenting with new technology and enjoy working on personal projects.');
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

  return (
    <IonPage>
      <IonHeader>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/it35-lab/app" />
        </IonButtons>
        <div style={{ padding: '16px' }}>
          <IonText>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 600, margin: 0 }}>About Me</h1>
          </IonText>
        </div>
      </IonHeader>

      <IonContent className="ion-padding" style={{ background: '#fff' }}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6">
              <IonCard style={{ borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <IonCardContent className="ion-text-center">
                  <IonAvatar style={{ width: '120px', height: '120px', margin: '0 auto 16px' }}>
                    <IonImg src={avatarPreview || 'https://via.placeholder.com/150'} />
                  </IonAvatar>
                  <IonText>
                    <h2 style={{ marginBottom: '6px' }}>{username}</h2>
                    <p style={{ fontSize: '1rem', color: '#666' }}>{firstName} {lastName}</p>
                    <p style={{ fontSize: '0.9rem', color: '#999' }}>{email}</p>
                  </IonText>
                </IonCardContent>
              </IonCard>

              {/* Editable Sections */}
              {[{
                label: 'Hobbies',
                value: hobbies,
                setValue: setHobbies
              }, {
                label: 'Favorite Quote',
                value: quote,
                setValue: setQuote
              }, {
                label: 'Additional Info',
                value: additionalInfo,
                setValue: setAdditionalInfo
              }].map((section, idx) => (
                <IonCard
                  key={idx}
                  style={{
                    borderRadius: '12px',
                    padding: '12px 16px',
                    marginTop: '16px',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
                  }}
                >
                  <IonCardContent>
                    <IonText>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '8px' }}>{section.label}</h3>
                      {isEditable ? (
                        <IonInput
                          value={section.value}
                          onIonChange={(e) => section.setValue(e.detail.value!)}
                          placeholder={`Enter your ${section.label.toLowerCase()}`}
                          style={{
                            fontSize: '1rem',
                            background: '#f5f5f5',
                            borderRadius: '8px',
                            padding: '10px'
                          }}
                        />
                      ) : (
                        <p style={{ fontSize: '1rem', color: '#444' }}>{section.value}</p>
                      )}
                    </IonText>
                  </IonCardContent>
                </IonCard>
              ))}

              {/* Edit Button */}
              <IonRow className="ion-justify-content-center ion-margin-top">
                <IonButton
                  onClick={toggleEditMode}
                  expand="block"
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    background: '#333',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    marginTop: '10px'
                  }}
                >
                  {isEditable ? 'Save' : 'Edit'}
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
