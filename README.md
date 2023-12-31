# Capacitor Contacts App

This app has been tested on:

-   IOS emulator
-   IOS physical device
-   Android emulator

## Requirements

---

The task is to create an Android or iOS app with which the contacts on the device can be managed.

### General

-   [x] The app supports at least one of the two platforms Android or iOS.
-   [x] All required permissions must be requested from the app.

### Home screen

-   [x] There is a list view that lists all contacts already stored on the device.
-   [x] The contacts are sorted by first name in the list view.

### Detail view

-   [x] There is a detailed view that shows at least the following information of a contact: first name, last name, phone number, e-mail address and birthday.
-   [x] The detailed view has a button to return to the list view.
-   [x] Each phone number can be opened in the standard phone app or copied to the clipboard.
-   [x] Each e-mail address can be opened in the standard e-mail app or copied to the clipboard.
-   [x] Contacts can be deleted via the detail view.
-   [x] The deletion of a contact must be confirmed by the user via a dialogue.

### Insert View

-   [x] There is an insert view that is used to add new contacts.
-   [x] The insert view has at least the following input fields: First Name, surname, telephone number, e-mail address and birthday.
-   [x] The insert view has two buttons for cancelling and saving the entry.

## Functions

-   The **home screen** shows all contacts from the device. All contacts are grouped and sorted by the first name. If no contact can be found you will see an empty screen.
-   Use the **search bar** to search for a specific contact. The contacts will be searched by containing string.
-   Pull the screen down to fetch the data again.<br/>
    <img src="./docuAssets/home_empty.png" alt="home_empty" width="200"/>
    <img src="./docuAssets/search.png" alt="search" width="200"/><br/>
-   If the app has no permission to access the contacts you will be prompted with the following error message. By clicking the **Open Settings** button you will be directed to the app settings. Here you can grant access to the app.<br/>
    <img src="./docuAssets/home_missingPermission.png" alt="home_missingPermission" width="200"/>
    <img src="./docuAssets/settings.png" alt="settings" width="200"/><br/>
-   The **insert view** is used to add new contacts you can access it by clicking the button in the lower right corner of the home screen. The following fields are required: First Name, Last Name, Phone Number, Phone Number Type, E-Mail Address, E-Mail Address Type and Birthday. To save the new contact you have to fill all the fields. The back button will discard all changes and navigate back to the home screen.<br/>
    <img src="./docuAssets/newContact.png" alt="newContact" width="200"/><br/>
-   To access the **details page** select a contact on the home screen. Here you can see all the information available about this contact.
-   Pull the screen down to fetch the data again.<br/>
    <img src="./docuAssets/details.png" alt="details" width="200"/><br/>
-   Slide the Phone Number or E-Mail Address to the left to call the number/write an E-Mail<br/>
    <img src="./docuAssets/details_tel_call.png" alt="details_tel_call" width="200"/>
    <img src="./docuAssets/details_mail_write.png" alt="details_mail_write" width="200"/>
-   Slide the Phone Number or E-Mail Address to the right to copy the number/address to the clipboard<br/>
    <img src="./docuAssets/details_tel_copy.png" alt="details_tel_copy" width="200"/>
    <img src="./docuAssets/details_mail_copy.png" alt="details_mail_copy" width="200"/><br/>
-   To delete a contact click on the **Delete** button in the top right corner. You will be prompted with a confirmation dialog. Clicking **Confirm** will delete the contact and navigate back to the home screen. Clicking **Cancel** will close the dialog.<br/>
    <img src="./docuAssets/details_delete.png" alt="details_delete" width="200"/>
    <br/>

## Presentation

-   Welche Funktionen hat die App?
    -   Die App zeigt alle Kontakte des Geräts an
    -   Es können Kontakte gesucht werden
    -   Es können neue Kontakte hinzugefügt werden
    -   Bestehende Kontakte können angezeigt werden
    -   Telefonnummern/E-Mails können kopiert werden
    -   Telefonnummern/E-Mails können angerufen/in der standard Mail-App geöffnet werden
    -   Bestehende Kontakte können gelöscht werden
-   Welche Probleme traten auf/Wie wurden die Probleme gelöst?
    -   Wenn der App die Berechtigung genommmen wird auf die Kontakte zu zugreifen wird nicht erneut nach der Berechtigung gefragt -> Alert Fenster wird geöffnet um direkt in die Einstellungen der App zu kommen und die Berechtigung manuell zu vergeben
-   Gibt es Einschränkungen auf bestimmten Plattformen?
    -   keine bekannt (getestet virtuell auf IOS und Android, pyhsisch auf IOS)
-   Welche nativen Schnittstellen (Plugins) wurden benutzt?
    -   @capacitor-community/contacts
    -   @capacitor/clipboard
    -   capacitor-native-settings
-   Was gab es sonst zu beachten?
    -   einfache Implementierung der Telefonnummer/E-Mail "tel:0176XXXXXXXX", "mailto:XXXXXXXXX" -> React methode window.open
    ```javascript
    function openExternal(type: string, payload: string) {
        try {
            window.open(`${type}:${payload}`);
        } catch (error) {
            console.log(error);
        }
    }
    ```
