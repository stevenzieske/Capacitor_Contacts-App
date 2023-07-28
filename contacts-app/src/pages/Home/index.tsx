import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ContactsList from "./components/ContactsList";

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
        </IonPage>
    );
};

export default Home;
