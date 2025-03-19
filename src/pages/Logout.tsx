import { 
    IonButtons,
    IonButton,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar 
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';

const Logout: React.FC = () => {
    const navigation = useIonRouter();

    const doLogout = () => {
        localStorage.removeItem("registeredEmail");
        localStorage.removeItem("registeredPassword");
        navigation.push('/it35-lab/login', 'back');
    };
    
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Template</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
<IonButton onClick={doLogout}>Logout</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Logout;