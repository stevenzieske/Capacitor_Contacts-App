import React, { useState, useEffect } from "react";
import { IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";
import getContacts from "../../../helper/getContacts";

function ContactsList() {
    const [contacts, setContacts] = useState<any[]>([]);

    useEffect(() => {
        async function retrieveContactArray() {
            const projection = {
                // Specify which fields should be retrieved.
                name: true,
            };
            const contactArray = await getContacts(projection);
            console.log("contactArray", contactArray);
            setContacts(contactArray || []);
        }
        retrieveContactArray();
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
        }, 2000);
    }

    return (
        <>
            <IonRefresher
                slot="fixed"
                onIonRefresh={handleRefresh}
            >
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList inset={true}>
                {contacts.map((contact, index) => {
                    return (
                        <IonItem
                            detail={true}
                            key={index}
                            href={`/contact/${contact.contactId}`}
                        >
                            <IonLabel>
                                {contact.contactId} | {contact.name.display} | {contact.phones[0].number}
                            </IonLabel>
                        </IonItem>
                    );
                })}
            </IonList>
        </>
    );
}

export default ContactsList;
