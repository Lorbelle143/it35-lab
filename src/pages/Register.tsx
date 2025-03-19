import React, {  useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';

const Register: React.FC = () => {
  const navigation = useIonRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleRegister = () => {
    console.log("Register button clicked with:", email, password, confirmPassword);

    if (!username || !email || !password || !confirmPassword) {
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match!');
      setShowAlert(true);
      return;
    }
    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password);
    // Mock registration logic
    
    setAlertMessage('Registration successful! Redirecting to login.');
    setShowAlert(true);

    setTimeout(() => {
      navigation.push('/it35-lab/login'); // ✅ Corrected redirection to login
    }, 1500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonItem>
          <IonInput
            label="Username"
            labelPlacement="floating"
            value={username}
            onIonInput={(e) => setUsername(e.detail.value!)}
            placeholder="Enter username"
            type="text"
          />
        </IonItem>
        
        <IonItem>
          <IonInput
            label="Email"
            labelPlacement="floating"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value!)}
            placeholder="Enter email"
            type="email"
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Password"
            labelPlacement="floating"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
            placeholder="Enter password"
            type="password"
          />
          <IonInputPasswordToggle slot="end" />
        </IonItem>
        <IonItem>
          <IonInput
            label="Confirm Password"
            labelPlacement="floating"
            value={confirmPassword}
            onIonInput={(e) => setConfirmPassword(e.detail.value!)}
            placeholder="Re-enter password"
            type="password"
          />
          <IonInputPasswordToggle slot="end" />
        </IonItem>
        <IonButton onClick={handleRegister} expand="full">Register</IonButton>
        <IonButton fill="clear" onClick={() => navigation.push('/it35-lab/login')} expand="full">
          Back to Login
        </IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => navigation.push('/it35-lab/login')}
          header={'Sign Up'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
