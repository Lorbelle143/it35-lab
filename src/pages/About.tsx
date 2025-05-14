import React, { useState, useEffect } from 'react';
import {
  IonContent, IonPage, IonItem, IonText, IonCol, IonGrid, IonRow,
  IonAvatar, IonImg, IonHeader, IonButtons, IonBackButton, IonInput, IonButton
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
  const [isEditable, setIsEditable] = useState(false);  // To toggle between editable and non-editable mode
  const history = useHistory();

  useEffect(() => {
    const fetchSessionAndData = async () => {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
  
      if (sessionError || !session || !session.session) {
        setAvatarPreview(null);
        return;
      }

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('user_firstname, user_lastname, user_avatar_url, user_email, username')
        .eq('user_email', session.session.user.email)
        .single();

      if (userError || !user) {
        return;
      }

      setFirstName(user.user_firstname || '');
      setLastName(user.user_lastname || '');
      setAvatarPreview(user.user_avatar_url);
      setEmail(user.user_email);
      setUsername(user.username || '');
    };

    fetchSessionAndData();
  }, []);

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  return (
    <IonPage>
      <IonHeader style={{ background: 'linear-gradient(135deg, #3faffa, #00b5d8)' }}>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/it35-lab/app" />
        </IonButtons>
        <IonText color="light" style={{ padding: '10px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '600' }}>About Me</h1>
        </IonText>
      </IonHeader>
      <IonContent className="ion-padding" style={{ backgroundColor: '#f9f9f9' }}>
        <IonGrid style={{ marginTop: '20px' }}>
          {/* Avatar and Info Section */}
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol className="ion-text-center">
              {/* Display current avatar */}
              {avatarPreview ? (
                <IonAvatar style={{ width: '150px', height: '150px', marginBottom: '20px' }}>
                  <IonImg src={avatarPreview} style={{ objectFit: 'cover', borderRadius: '50%' }} />
                </IonAvatar>
              ) : (
                <IonAvatar style={{ width: '150px', height: '150px', marginBottom: '20px' }}>
                  <IonImg src="https://via.placeholder.com/150" style={{ objectFit: 'cover', borderRadius: '50%' }} />
                </IonAvatar>
              )}
              <IonText>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }}>Username: {username}</h3>
                <h4 style={{ fontSize: '1.5rem', color: '#666' }}>Full Name: {firstName} {lastName}</h4>
                <h4 style={{ fontSize: '1.5rem', color: '#666' }}>Email: {email}</h4>
              </IonText>
            </IonCol>
          </IonRow>

          {/* GIF Section */}
          <IonRow className="ion-text-center ion-margin-top">
            <IonCol>
              <IonImg 
                src="https://media.giphy.com/media/3o6Zt8z4u0dGvO3Xpo/giphy.gif" // Updated GIF URL
                style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)' }}
              />
            </IonCol>
          </IonRow>

          {/* Editable Hobbies Section */}
          <IonRow className="ion-margin-top">
            <IonCol>
              <IonText>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#333' }}>Hobbies</h3>
                {isEditable ? (
                  <IonInput
                    value={hobbies}
                    onIonChange={(e) => setHobbies(e.detail.value!)}
                    style={{ fontSize: '1.2rem', background: '#fff', padding: '10px', borderRadius: '8px' }}
                    placeholder="Enter your hobbies"
                  />
                ) : (
                  <p style={{ fontSize: '1.2rem', color: '#444' }}>{hobbies}</p>
                )}
              </IonText>
            </IonCol>
          </IonRow>

          {/* Editable Quote Section */}
          <IonRow className="ion-margin-top">
            <IonCol>
              <IonText>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#333' }}>Favorite Quote</h3>
                {isEditable ? (
                  <IonInput
                    value={quote}
                    onIonChange={(e) => setQuote(e.detail.value!)}
                    style={{ fontSize: '1.2rem', background: '#fff', padding: '10px', borderRadius: '8px' }}
                    placeholder="Enter your favorite quote"
                  />
                ) : (
                  <p style={{ fontSize: '1.2rem', color: '#444' }}>{quote}</p>
                )}
              </IonText>
            </IonCol>
          </IonRow>

          {/* Editable Additional Info Section */}
          <IonRow className="ion-margin-top">
            <IonCol>
              <IonText>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#333' }}>Additional Info</h3>
                {isEditable ? (
                  <IonInput
                    value={additionalInfo}
                    onIonChange={(e) => setAdditionalInfo(e.detail.value!)}
                    style={{ fontSize: '1.2rem', background: '#fff', padding: '10px', borderRadius: '8px' }}
                    placeholder="Enter additional info"
                  />
                ) : (
                  <p style={{ fontSize: '1.2rem', color: '#444' }}>{additionalInfo}</p>
                )}
              </IonText>
            </IonCol>
          </IonRow>

          {/* Toggle Edit Mode Button */}
          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonButton
                onClick={toggleEditMode}
                expand="full"
                shape="round"
                style={{
                  background: '#3faffa',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 0',
                  fontSize: '1.2rem',
                }}
              >
                {isEditable ? 'Save' : 'Edit'}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default About;
