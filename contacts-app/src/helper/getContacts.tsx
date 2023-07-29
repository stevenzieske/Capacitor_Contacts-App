import { Contacts } from "@capacitor-community/contacts";

async function getContacts(projection: any) {
    const permissionStatus = await Contacts.checkPermissions();

    console.log("permissionStatus", permissionStatus);

    if (permissionStatus.contacts === "granted") {
        const { contacts } = await Contacts.getContacts({ projection });

        // Sort contacts by given name
        contacts.sort((a, b) => {
            const nameA = a.name?.given?.toLowerCase() || "";
            const nameB = b.name?.given?.toLowerCase() || "";
            return nameA.localeCompare(nameB);
        });

        console.log("Sorted contacts:", contacts);
        return contacts;
    } else {
        const permissionRequestResult = await Contacts.requestPermissions();
        console.log("permissionRequestResult", permissionRequestResult);
    }
}

export default getContacts;