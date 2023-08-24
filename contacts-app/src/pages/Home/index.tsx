import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonSearchbar, IonText } from "@ionic/react";
import ContactsList from "./components/ContactsList";
import { add } from "ionicons/icons";
import { useState } from "react";

const Home: React.FC = () => {
    const [searchText, setSearchText] = useState("");
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contacts App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonSearchbar
                    animated={true}
                    placeholder="Search"
                    onIonInput={(e) => setSearchText(e.detail.value!)}
                ></IonSearchbar>
                <ContactsList searchText={searchText} />
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
