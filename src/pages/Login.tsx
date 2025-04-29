import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,
  IonModal,  
  useIonRouter
} from '@ionic/react';
import  logo from '../assets/img/onepiece.jpg';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';


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
      
    }else{

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
    '--background': `url("https://i.pinimg.com/originals/5b/d0/e6/5bd0e6468d9615080586b1713d4a350f.gif") center/cover no-repeat`,
  }}
>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20%',
      padding: '20px',
      borderRadius: '15px',
      backdropFilter: 'blur(4px)',
    }}
  >
    <IonAvatar
      style={{
        width: '150px',
        height: '150px',
        marginBottom: '15px',
        border: '4px solid rgb(16, 164, 214)',
      }}
    >
      <img alt="onepiece.jpg" src={logo} />
    </IonAvatar>
    <h1 style={{ color: 'pink', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  WELCOME TO MY IONIC APP
</h1>

    <IonInput
    style={{ marginBottom: '10px', background: 'white' }}
      label="Email"
      labelPlacement="floating"
      fill="outline"
      type="email"
      placeholder="Enter Email"
      value={email}
      onIonChange={(e) => setEmail(e.detail.value!)}
    />
    <IonInput
      style={{ marginTop: '20px', background: 'white' }}
      fill="outline"
      type="password"
      placeholder="Password"
      value={password}
      onIonChange={(e) => setPassword(e.detail.value!)}
    >
      <IonInputPasswordToggle slot="end" />
    </IonInput>
  </div>

        <IonButton onClick={doLogin} expand="full" shape='round'>
          Login
        </IonButton>

        <IonButton routerLink="/it35-lab/register" expand="full" fill="clear" shape='round'>
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
      </IonContent>
    </IonPage>
  );
};

export default Login;