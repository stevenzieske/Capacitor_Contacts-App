import React, { useState, useEffect } from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";
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

    return (
        <div>
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
        </div>
    );
}

export default ContactsList;
