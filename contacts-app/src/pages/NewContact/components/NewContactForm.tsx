import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonInput,
    IonItem,
    IonList,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonLabel,
    IonButton,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";

function NewContactForm() {
    const inputRef = useRef<HTMLIonDatetimeElement>(null);

    const [firstName, setFirstName] = useState<any>("");
    const [lastName, setLastName] = useState<any>("");
    const [phoneNumber, setPhoneNumber] = useState<any>("");
    const [mailAddress, setMailAddress] = useState<any>("");
    const [birthdayDate, setBirthdayDate] = useState<any>("");

    useEffect(() => {
        setBirthdayDate(inputRef.current?.value);
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Enter new contact</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonInput
                            label="First Name"
                            placeholder="First Name"
                            onIonInput={(e) => {
                                setFirstName(e.target.value);
                            }}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput
                            label="Last Name"
                            placeholder="Last Name"
                            onIonInput={(e) => {
                                setLastName(e.target.value);
                            }}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput
                            label="Telephone number"
                            type="tel"
                            placeholder="888-888-8888"
                            onIonInput={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonInput
                            label="Email address"
                            type="email"
                            placeholder="email@domain.com"
                            onIonInput={(e) => {
                                setMailAddress(e.target.value);
                            }}
                        ></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Birthday</IonLabel>
                        <>
                            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                            <IonModal keepContentsMounted={true}>
                                <IonDatetime
                                    id="datetime"
                                    presentation="date"
                                    showDefaultButtons={true}
                                    onIonChange={(e) => {
                                        setBirthdayDate(e.detail.value);
                                    }}
                                    ref={inputRef}
                                ></IonDatetime>
                            </IonModal>
                        </>
                    </IonItem>
                </IonList>
                <IonButton
                    expand="block"
                    onClick={() => {
                        console.log("firstName", firstName);
                    }}
                >
                    Save
                </IonButton>
                <p>firstName: {firstName}</p>
                <p>lastName: {lastName}</p>
                <p>phoneNumber: {phoneNumber}</p>
                <p>mailAddress: {mailAddress}</p>
                <p>birthdayDate: {birthdayDate}</p>
            </IonContent>
        </IonPage>
    );
}

export default NewContactForm;
