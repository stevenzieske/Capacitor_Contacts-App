import React, { useState, useEffect } from "react";
import { Contacts } from "@capacitor-community/contacts";
import { IonItem, IonLabel, IonList } from "@ionic/react";

function ContactsList() {
    const [contacts, setContacts] = useState<any[]>([]);

    useEffect(() => {
        async function getContacts() {
            const permissionStatus = await Contacts.checkPermissions();

            console.log("permissionStatus", permissionStatus);

            if (permissionStatus.contacts === "granted") {
                const projection = {
                    // Specify which fields should be retrieved.
                    name: true,
                    phones: true,
                    postalAddresses: true,
                };
                const { contacts } = await Contacts.getContacts({ projection });
                console.log("Retrieved contacts:", contacts);
                setContacts(contacts);
            } else {
                const permissionRequestResult = await Contacts.requestPermissions();
                console.log("permissionRequestResult", permissionRequestResult);
            }
        }
        getContacts();
    }, []);

    return (
        <div>
            <IonList inset={true}>
                {contacts.map((contact, index) => {
                    return (
                        <IonItem
                            button
                            detail={true}
                            key={index}
                        >
                            <IonLabel>
                                {contact.contactId} | {contact.name.display} | {contact.phones[0].number}
                            </IonLabel>
                        </IonItem>
                    );
                })}
            </IonList>
        </div>
    );
}

export default ContactsList;
