import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    RefresherEventDetail,
    IonRefresher,
    IonRefresherContent,
    IonActionSheet,
    IonButton,
    IonAlert,
} from "@ionic/react";

import getContacts from "../../helper/getContacts";
import { Contacts } from "@capacitor-community/contacts";

interface RouteParams {
    contactId: string;
}

const ContactDetails: React.FC = () => {
    const { contactId } = useParams<RouteParams>();
    const [contactDetails, setContactDetails] = useState<any>();
    const history = useHistory();

    useEffect(() => {
        async function retrieveSingleContact() {
            const projection = {
                // Specify which fields should be retrieved.
                name: true,
                phones: true,
                postalAddresses: true,
            };
            const contactArray = await getContacts(projection);
            setContactDetails(contactArray?.find((contact) => contact.contactId === contactId));
        }
        retrieveSingleContact();
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
        }, 2000);
    }

    async function deleteCurrentContact(contactId: string) {
        try {
            await Contacts.deleteContact({ contactId });
            history.push("/home");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contacts Details</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton id="delete-contact">Delete</IonButton>
                        <IonAlert
                            trigger="delete-contact"
                            header="Alert"
                            message="Are you sure you want to delete this contact?"
                            buttons={[
                                {
                                    text: "Cancel",
                                    role: "cancel",
                                    handler: () => {
                                        console.log("Alert canceled");
                                    },
                                },
                                {
                                    text: "Confirm",
                                    role: "confirm",
                                    handler: () => {
                                        deleteCurrentContact(contactId);
                                    },
                                },
                            ]}
                        ></IonAlert>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher
                    slot="fixed"
                    onIonRefresh={handleRefresh}
                >
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
                    <IonItem>
                        <IonLabel>Vorname</IonLabel>
                        <IonText slot="end">{contactDetails?.name.given}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Nachname</IonLabel>
                        <IonText slot="end">{contactDetails?.name.family}</IonText>
                    </IonItem>
                    {contactDetails?.phones ? (
                        contactDetails?.phones.map((phone: any, index: number) => (
                            <IonItem key={index}>
                                <IonLabel>Phone number ({phone.type})</IonLabel>
                                <IonText slot="end">{phone.number}</IonText>
                            </IonItem>
                        ))
                    ) : (
                        <IonItem>
                            <IonLabel>Phone number</IonLabel>
                            <IonText slot="end">-</IonText>
                        </IonItem>
                    )}
                    {contactDetails?.emails ? (
                        contactDetails?.emails.map((email: any, index: number) => (
                            <IonItem key={index}>
                                <IonLabel>E-Mail ({email.type})</IonLabel>
                                <IonText slot="end">{email.address}</IonText>
                            </IonItem>
                        ))
                    ) : (
                        <IonItem>
                            <IonLabel>E-Mail</IonLabel>
                            <IonText slot="end">-</IonText>
                        </IonItem>
                    )}
                    <IonItem>
                        <IonLabel>Birthday</IonLabel>
                        {contactDetails?.birthday ? (
                            <IonText slot="end">
                                {contactDetails?.birthday?.day}.{contactDetails?.birthday?.month}.{contactDetails?.birthday?.year}
                            </IonText>
                        ) : (
                            <IonText slot="end">-</IonText>
                        )}
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default ContactDetails;
