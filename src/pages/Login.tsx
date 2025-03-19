import React, {useState } from 'react';
import {
  IonAlert,
  IonAvatar, 
  IonButton,
  IonButtons,
  IonContent, 
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonMenuButton, 
  IonPage,
  IonTitle, 
  IonToolbar, 
  useIonRouter
} from '@ionic/react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = () => {
    console.log("Login button clicked with:", email, password);
    if (!email || !password) {
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
      return;
    }
    const storedEmail = localStorage.getItem("registeredEmail");
    const storedPassword = localStorage.getItem("registeredPassword");
    
    // Mock authentication logic
    if (email === storedEmail && password === storedPassword) {
      console.log("Login successful, navigating...");
      navigation.push('/it35-lab/app');
    } else {
      setAlertMessage('Invalid email or password.');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar> 
      </IonHeader>
      <IonContent className='ion-padding'>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <IonAvatar style={{ width: '120px', height: '120px', margin: 'auto' }}>
            <img src='https://tse4.mm.bing.net/th?id=OIP.-Kk1akw0F8x9loZlGTSoJwHaHa&pid=Api&P=0&h=180'
              style={{ width: '100%', height: '100px', borderRadius: '50%' }}
              alt='User Avatar'
            />
          </IonAvatar>
        </div>
        <IonItem>
          <IonInput
            label='Email'
            labelPlacement='floating'
            value={email}
            onIonInput={(e) => setEmail(e.detail.value!)}
            placeholder='Enter email'
            type='email'
          />
        </IonItem>
        <IonItem>
          <IonInput
            label='Password'
            labelPlacement='floating'
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
            placeholder='Enter password'
            type='password'
          />
          <IonInputPasswordToggle slot='end' />
        </IonItem>
        <IonButton onClick={handleLogin} expand='full'>Login</IonButton>
        <IonButton fill='clear' onClick={() => navigation.push('/it35-lab/signup')} expand='full'>
          Sign Up
        </IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Login Failed'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
