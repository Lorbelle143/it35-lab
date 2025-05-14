import { IonAlert, IonAvatar, IonButton, IonContent, IonInput, IonInputPasswordToggle, IonPage, IonText, IonToast, useIonRouter } from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import logo from '../assets/img/onepiece.jpg';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(error.message);
      setShowAlert(true);
    } else {
      setShowToast(true);
      setTimeout(() => {
        navigation.push('/it35-lab/app', 'forward', 'replace');
      }, 300);
    }
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        style={{
          '--background': `url("https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif") center/cover no-repeat`,
          backgroundSize: 'cover',
          backgroundBlendMode: 'soft-light',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Full screen height
            backdropFilter: 'blur(4px)', // Soft blur behind the content
            padding: '20px',
          }}
        >
          {/* Avatar */}
          <IonAvatar
            style={{
              width: '120px',
              height: '120px',
              marginBottom: '20px',
              border: '4px solid #00b5d8',
            }}
          >
            <img alt="Logo" src={logo} />
          </IonAvatar>

          {/* Title */}
          <IonText>
            <h1
              style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              Welcome to My Ionic App
            </h1>
          </IonText>

          {/* Email Input */}
          <IonInput
            style={{
              marginBottom: '15px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              padding: '10px',
              width: '100%',
              maxWidth: '400px',
            }}
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="Enter your email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />

          {/* Password Input */}
          <IonInput
            style={{
              marginBottom: '15px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              padding: '10px',
              width: '100%',
              maxWidth: '400px',
            }}
            fill="outline"
            type="password"
            placeholder="Enter your password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          {/* Login Button */}
          <IonButton
            onClick={doLogin}
            expand="full"
            shape="round"
            style={{
              backgroundColor: '#00b5d8',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              padding: '12px 0',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            Login
          </IonButton>

          {/* Register Button */}
          <IonButton
            routerLink="/it35-lab/register"
            expand="full"
            fill="clear"
            shape="round"
            style={{
              marginTop: '10px',
              color: '#fff',
              textDecoration: 'underline',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            Don't have an account? Register here
          </IonButton>

          {/* IonAlert for displaying login errors */}
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Login Failed"
            message={errorMessage}
            buttons={['OK']}
          />

          {/* IonToast for success message */}
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Login successful! Redirecting..."
            duration={1500}
            position="top"
            color="primary"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
