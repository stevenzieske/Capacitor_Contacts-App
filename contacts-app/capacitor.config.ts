import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.stevenzieske.mycontacts",
    appName: "MyContacts",
    webDir: "dist",
    server: {
        androidScheme: "https",
    },
};

export default config;
