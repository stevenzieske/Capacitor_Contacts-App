import React, { useState, useEffect } from "react";
import { NativeSettings, AndroidSettings, IOSSettings } from "capacitor-native-settings";
import {
    IonAlert,
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

function ContactsList({ searchText }: { searchText: string }) {
    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [contacts, setContacts] = useState<any[]>([]);
    const [toastIsOpen, setToastIsOpen] = useState(false);

    async function retrieveContactArray() {
        const projection = {
            // Specify which fields should be retrieved.
            name: true,
            phones: true,
        };
        const contactArray = await getContacts(projection);

        console.log("contactArray", contactArray);

        if (contactArray === null) {
            setAlertIsOpen(true);
            return;
        } else {
            setContacts(contactArray || []);
        }
    }

    useEffect(() => {
        console.log("useEffect");
        retrieveContactArray();
    }, []);

    async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        retrieveContactArray();
        event.detail.complete();
        setToastIsOpen(true);
    }

    const groupedContacts = contacts.reduce((groups: { [key: string]: any[] }, contact) => {
        const firstLetter = contact.name.display[0].toUpperCase();
        if (!groups[firstLetter]) {
            groups[firstLetter] = [];
        }
        groups[firstLetter].push(contact);
        return groups;
    }, {});

    function onDismiss() {
        setAlertIsOpen(false);
        NativeSettings.open({
            optionAndroid: AndroidSettings.ApplicationDetails,
            optionIOS: IOSSettings.App,
        });
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
            <IonAlert
                isOpen={alertIsOpen}
                header="Missing permission"
                message="This app needs permission to access your contacts."
                buttons={["Open Settings"]}
                onDidDismiss={() => onDismiss()}
            ></IonAlert>
            <IonList>
                {Object.entries(groupedContacts).map(([letter, contacts]) => {
                    const filteredContacts = contacts.filter((contact) => contact.name.display.toLowerCase().includes(searchText.toLowerCase()));
                    if (filteredContacts.length === 0) {
                        return null;
                    }
                    return (
                        <IonItemGroup key={letter}>
                            <IonItemDivider>
                                <IonLabel>{letter}</IonLabel>
                            </IonItemDivider>
                            {filteredContacts.map((contact) => (
                                <IonItem
                                    detail={true}
                                    key={contact.contactId}
                                    href={`/contact/${contact.contactId}`}
                                >
                                    <IonLabel>
                                        <h2>{contact.name.display}</h2>
                                        <p>{contact.phones ? contact.phones[0].number : "No phone number"}</p>
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonItemGroup>
                    );
                })}
            </IonList>
        </>
    );
}

export default ContactsList;
