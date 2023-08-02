import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import ContactsList from "./components/ContactsList";
import { add } from "ionicons/icons";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contacts App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <ContactsList />
            </IonContent>
            <IonFab
                slot="fixed"
                vertical="bottom"
                horizontal="end"
            >
                <IonFabButton href={`/newContact`}>
                    <IonIcon icon={add}></IonIcon>
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default Home;
