import { PushNotifications } from "@capacitor/push-notifications";

export const registerPushNotifications = async (
    onTokenReceived: (token: string) => Promise<void>
) => {
    try {
        // Check and request permissions
        let permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive === "prompt") {
            permStatus = await PushNotifications.requestPermissions();
        }
        if (permStatus.receive !== "granted") {
            //console.log("Push permissions denied");
            return;
        }

        // Register device
        await PushNotifications.register();

        // Handle token
        PushNotifications.addListener("registration", async (token) => {
            try {
                await onTokenReceived(token.value);
                //console.log("FCM token registered for user:", userId, token.value);
            } catch (error) {
                //console.error("Error handling registration token:", error);
            }
        });

        // Handle errors
        PushNotifications.addListener("registrationError", (error) => {
            //console.error("Registration error:", error);
        });

        // Handle foreground notifications
        PushNotifications.addListener("pushNotificationReceived", (notification) => {
            //console.log("Push received:", notification);
            // Optional: Add in-app notification handling here
        });

    } catch (error) {
        //console.error("Error registering push notifications:", error);
    }
};