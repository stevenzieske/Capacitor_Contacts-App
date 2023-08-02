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
    IonSelect,
    IonSelectOption,
    IonAlert,
} from "@ionic/react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Contacts, PhoneType, EmailType } from "@capacitor-community/contacts";

function NewContactForm() {
    const history = useHistory();
    const dateRef = useRef<any>(null);

    const [firstName, setFirstName] = useState<any>("");
    const [lastName, setLastName] = useState<any>("");
    const [phoneNumber, setPhoneNumber] = useState<any>("");
    const [phoneType, setPhoneType] = useState<PhoneType>(PhoneType.Home);
    const [mailAddress, setMailAddress] = useState<any>("");
    const [mailType, setMailType] = useState<EmailType>(EmailType.Home);

    const [alertIsOpen, setAlertIsOpen] = useState(false);

    interface SelectedDate {
        year: number;
        month: number;
        day: number;
    }

    function allFieldsFilled(): boolean {
        if (firstName && lastName && phoneNumber && mailAddress) {
            return true;
        } else {
            return false;
        }
    }

    const createNewContact = async () => {
        // Get the current date -> if date has not been changed, use "defaultParts" if it has been changed, use "activePartsClone"
        let selectedDate: SelectedDate = {
            year: dateRef.current?.activePartsClone.year,
            month: dateRef.current?.activePartsClone.month,
            day: dateRef.current?.activePartsClone.day,
        };

        if (Object.keys(dateRef.current?.activePartsClone).length > 0) {
            selectedDate = {
                year: dateRef.current?.activePartsClone.year,
                month: dateRef.current?.activePartsClone.month,
                day: dateRef.current?.activePartsClone.day,
            };
        } else {
            selectedDate = {
                year: dateRef.current?.defaultParts.year,
                month: dateRef.current?.defaultParts.month,
                day: dateRef.current?.defaultParts.day,
            };
        }

        // console.log(selectedDate);

        const res = await Contacts.createContact({
            contact: {
                name: {
                    given: `${firstName}`,
                    family: `${lastName}`,
                },
                birthday: {
                    year: selectedDate.year,
                    month: selectedDate.month,
                    day: selectedDate.day,
                },
                phones: [
                    {
                        type: phoneType,
                        label: phoneType,
                        number: `${phoneNumber}`,
                    },
                ],
                emails: [
                    {
                        type: mailType,
                        label: mailType,
                        address: `${mailAddress}`,
                    },
                ],
            },
        });
        history.push("/home");
        console.log(res.contactId);
    };

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
                            label="Phone number"
                            type="tel"
                            placeholder="888-888-8888"
                            onIonInput={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        ></IonInput>
                        <IonSelect
                            slot="end"
                            value={PhoneType.Home}
                            onIonChange={(e) => {
                                setPhoneType(e.detail.value);
                            }}
                        >
                            <IonSelectOption value={PhoneType.Home}>Home</IonSelectOption>
                            <IonSelectOption value={PhoneType.Work}>Work</IonSelectOption>
                            <IonSelectOption value={PhoneType.Other}>Other</IonSelectOption>
                            <IonSelectOption value={PhoneType.Custom}>Custom</IonSelectOption>
                            <IonSelectOption value={PhoneType.Mobile}>Mobile</IonSelectOption>
                            <IonSelectOption value={PhoneType.FaxWork}>FaxWork</IonSelectOption>
                            <IonSelectOption value={PhoneType.FaxHome}>FaxHome</IonSelectOption>
                            <IonSelectOption value={PhoneType.Pager}>Pager</IonSelectOption>
                            <IonSelectOption value={PhoneType.Callback}>Callback</IonSelectOption>
                            <IonSelectOption value={PhoneType.Car}>Car</IonSelectOption>
                            <IonSelectOption value={PhoneType.CompanyMain}>CompanyMain</IonSelectOption>
                            <IonSelectOption value={PhoneType.Isdn}>Isdn</IonSelectOption>
                            <IonSelectOption value={PhoneType.Main}>Main</IonSelectOption>
                            <IonSelectOption value={PhoneType.OtherFax}>OtherFax</IonSelectOption>
                            <IonSelectOption value={PhoneType.Radio}>Radio</IonSelectOption>
                            <IonSelectOption value={PhoneType.Telex}>Telex</IonSelectOption>
                            <IonSelectOption value={PhoneType.TtyTdd}>TtyTdd</IonSelectOption>
                            <IonSelectOption value={PhoneType.WorkMobile}>WorkMobile</IonSelectOption>
                            <IonSelectOption value={PhoneType.WorkPager}>WorkPager</IonSelectOption>
                            <IonSelectOption value={PhoneType.Assistant}>Assistant</IonSelectOption>
                            <IonSelectOption value={PhoneType.Mms}>Mms</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonInput
                            label="E-Mail"
                            type="email"
                            placeholder="email@domain.com"
                            onIonInput={(e) => {
                                setMailAddress(e.target.value);
                            }}
                        ></IonInput>
                        <IonSelect
                            slot="end"
                            value={EmailType.Home}
                            onIonChange={(e) => {
                                setPhoneType(e.detail.value);
                            }}
                        >
                            <IonSelectOption value={EmailType.Home}>Home</IonSelectOption>
                            <IonSelectOption value={EmailType.Work}>Work</IonSelectOption>
                            <IonSelectOption value={EmailType.Other}>Other</IonSelectOption>
                            <IonSelectOption value={EmailType.Custom}>Custom</IonSelectOption>
                            <IonSelectOption value={EmailType.Mobile}>Mobile</IonSelectOption>
                        </IonSelect>
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
                                    // onIonChange={(e) => {
                                    //     setBirthdayDate(e.detail.value);
                                    // }}
                                    ref={dateRef}
                                ></IonDatetime>
                            </IonModal>
                        </>
                    </IonItem>
                </IonList>
                <IonButton
                    expand="block"
                    onClick={() => {
                        if (allFieldsFilled()) {
                            createNewContact();
                        } else {
                            setAlertIsOpen(true);
                        }
                    }}
                >
                    Save
                </IonButton>
                <IonAlert
                    isOpen={alertIsOpen}
                    header="Missing fields"
                    message={`The following fields are missing to create a new contact: ${!firstName ? "First Name" : ""}${
                        !lastName ? ", Last Name" : ""
                    }${!phoneNumber ? ", Phone number" : ""}${!mailAddress ? ", E-Mail" : ""}`}
                    buttons={["OK"]}
                    onDidDismiss={() => setAlertIsOpen(false)}
                ></IonAlert>
            </IonContent>
        </IonPage>
    );
}

export default NewContactForm;
