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
    IonButton,
    IonAlert,
    IonLoading,
    IonToast,
    IonIcon,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
} from "@ionic/react";

import getContacts from "../../helper/getContacts";
import { Contacts } from "@capacitor-community/contacts";
import { callOutline, copyOutline, mailOutline } from "ionicons/icons";
import { Clipboard } from "@capacitor/clipboard";

interface RouteParams {
    contactId: string;
}

const ContactDetails: React.FC = () => {
    const { contactId } = useParams<RouteParams>();
    const [contactDetails, setContactDetails] = useState<any>();
    const [toastIsOpen, setToastIsOpen] = useState(false);
    const [clipboardToastIsOpen, setClipboardToastIsOpen] = useState(false);
    const history = useHistory();

    async function retrieveSingleContact() {
        const projection = {
            // Specify which fields should be retrieved.
            name: true,
            phones: true,
            emails: true,
            birthday: true,
        };
        const contactArray = await getContacts(projection);
        setContactDetails(contactArray?.find((contact) => contact.contactId === contactId));

        console.log(contactArray?.find((contact) => contact.contactId === contactId));
    }

    useEffect(() => {
        retrieveSingleContact();
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        retrieveSingleContact();
        event.detail.complete();
        setToastIsOpen(true);
    }

    async function deleteCurrentContact(contactId: string) {
        try {
            await Contacts.deleteContact({ contactId });
            history.push("/home");
        } catch (error) {
            console.log(error);
        }
    }

    function openExternal(type: string, payload: string) {
        try {
            window.open(`${type}:${payload}`);
        } catch (error) {
            console.log(error);
        }
    }

    async function copyToClipboard(text: string) {
        try {
            await Clipboard.write({ string: text });
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
                <IonToast
                    isOpen={toastIsOpen}
                    message="This page has been refreshed."
                    onDidDismiss={() => setToastIsOpen(false)}
                    duration={3000}
                ></IonToast>
                <IonToast
                    isOpen={clipboardToastIsOpen}
                    message="Copied to clipboard."
                    onDidDismiss={() => setClipboardToastIsOpen(false)}
                    duration={3000}
                ></IonToast>
                <IonList>
                    <IonItem>
                        <IonLabel>First Name</IonLabel>
                        <IonText slot="end">{contactDetails?.name.given}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Last Name</IonLabel>
                        <IonText slot="end">{contactDetails?.name.family}</IonText>
                    </IonItem>
                    {contactDetails?.phones ? (
                        contactDetails?.phones.map((phone: any, index: number) => (
                            <IonItemSliding key={index}>
                                <IonItemOptions side="start">
                                    <IonItemOption
                                        color="medium"
                                        onClick={() => {
                                            copyToClipboard(phone.number);
                                            setClipboardToastIsOpen(true);
                                        }}
                                    >
                                        <IonIcon
                                            slot="icon-only"
                                            icon={copyOutline}
                                        ></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItem>
                                    <IonLabel>Phone number ({phone.type})</IonLabel>
                                    <IonText slot="end">{phone.number}</IonText>
                                </IonItem>
                                <IonItemOptions side="end">
                                    <IonItemOption
                                        color="success"
                                        onClick={() => {
                                            openExternal("tel", phone.number);
                                        }}
                                    >
                                        <IonIcon
                                            slot="icon-only"
                                            icon={callOutline}
                                        ></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        ))
                    ) : (
                        <IonItem>
                            <IonLabel>Phone number</IonLabel>
                            <IonText slot="end">-</IonText>
                        </IonItem>
                    )}
                    {contactDetails?.emails ? (
                        contactDetails?.emails.map((email: any, index: number) => (
                            <IonItemSliding key={index}>
                                <IonItemOptions side="start">
                                    <IonItemOption
                                        color="medium"
                                        onClick={() => {
                                            copyToClipboard(email.address);
                                            setClipboardToastIsOpen(true);
                                        }}
                                    >
                                        <IonIcon
                                            slot="icon-only"
                                            icon={copyOutline}
                                        ></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItem key={index}>
                                    <IonLabel>E-Mail ({email.type})</IonLabel>
                                    <IonText slot="end">{email.address}</IonText>
                                </IonItem>
                                <IonItemOptions side="end">
                                    <IonItemOption
                                        color="success"
                                        onClick={() => {
                                            openExternal("mailto", email.address);
                                        }}
                                    >
                                        <IonIcon
                                            slot="icon-only"
                                            icon={mailOutline}
                                        ></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
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
