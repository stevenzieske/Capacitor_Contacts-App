import React, { useState, useEffect } from "react";
import {
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonToast,
    RefresherEventDetail,
} from "@ionic/react";
import getContacts from "../../../helper/getContacts";

function ContactsList() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [divideLetters, setDivideLetters] = useState<string[]>([]);
    const [toastIsOpen, setToastIsOpen] = useState(false);

    async function retrieveContactArray() {
        const projection = {
            // Specify which fields should be retrieved.
            name: true,
            phones: true,
        };
        const contactArray = await getContacts(projection);
        setContacts(contactArray || []);

        const firstLetters: string[] = [];
        // Get the first letter of each contact name.
        contactArray?.forEach((contact) => {
            const firstLetter = contact.name?.given?.charAt(0);
            if (firstLetter) {
                firstLetters.push(firstLetter);
            }
        });
        // Remove duplicates.
        const uniqueFirstLetters = [...new Set(firstLetters)];
        setDivideLetters(uniqueFirstLetters);
    }

    useEffect(() => {
        retrieveContactArray();
    }, []);

    async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        retrieveContactArray();
        event.detail.complete();
        setToastIsOpen(true);
    }

    return (
        <>
            <IonRefresher
                slot="fixed"
                onIonRefresh={handleRefresh}
            >
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonToast
                isOpen={toastIsOpen}
                message="The list has been refreshed."
                onDidDismiss={() => setToastIsOpen(false)}
                duration={3000}
            ></IonToast>
            <IonList>
                {divideLetters.map((letter, index) => {
                    return (
                        <IonItemGroup key={index}>
                            <IonItemDivider>
                                <IonLabel>{letter}</IonLabel>
                            </IonItemDivider>
                            {contacts.map((contact, index) => {
                                return contact.name.display.charAt(0) === letter ? (
                                    <IonItem
                                        detail={true}
                                        key={index}
                                        href={`/contact/${contact.contactId}`}
                                    >
                                        <IonLabel>
                                            <h2>{contact.name.display}</h2>
                                            <p>{contact.phones ? contact.phones[0].number : "No phone number"}</p>
                                        </IonLabel>
                                    </IonItem>
                                ) : null;
                            })}
                        </IonItemGroup>
                    );
                })}
            </IonList>
        </>
    );
}

export default ContactsList;
