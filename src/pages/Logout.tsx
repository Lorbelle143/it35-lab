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

const Template: React.FC = () => {
    const navigation = useIonRouter();

    const doLogout = () => {
        navigation.push('/login', 'back', 'replace');
    }

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
                <IonButton onClick={doLogout} expand="full">
                    Logout
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Template;