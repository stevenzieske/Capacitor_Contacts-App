import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonText } from "@ionic/react";

import getContacts from "../../helper/getContacts";

interface RouteParams {
    contactId: string;
}

const ContactDetails: React.FC = () => {
    const { contactId } = useParams<RouteParams>();
    const [contactDetails, setContactDetails] = useState<any>();

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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contacts Details</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div>
                    <IonList>
                        <IonItem>
                            <IonLabel>Vorname</IonLabel>
                            <IonText slot="end">{contactDetails?.name.given}</IonText>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Nachname</IonLabel>
                            <IonText slot="end">{contactDetails?.name.family}</IonText>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Phone Number</IonLabel>
                            <IonText slot="end">{contactDetails?.phones[0]?.number}</IonText>
                        </IonItem>
                        <IonItem>
                            <IonLabel>E-Mail</IonLabel>
                            {contactDetails?.emails ? (
                                <IonText slot="end">{contactDetails?.emails[0]?.address}</IonText>
                            ) : (
                                <IonText slot="end">No E-Mail</IonText>
                            )}
                        </IonItem>
                        <IonItem>
                            <IonLabel>Birthday</IonLabel>
                            {contactDetails?.birthday ? (
                                <IonText slot="end">
                                    {contactDetails?.birthday?.day}.{contactDetails?.birthday?.month}.{contactDetails?.birthday?.year}
                                </IonText>
                            ) : (
                                <IonText slot="end">No birthday</IonText>
                            )}
                        </IonItem>
                    </IonList>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ContactDetails;
