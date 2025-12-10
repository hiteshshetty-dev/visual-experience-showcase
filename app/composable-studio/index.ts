import stack from "@/studio";
import { studioSdk } from "@contentstack/studio-react";


export const studioClient = studioSdk.init({
    stackSdk: stack,
    cslp: {
        appendTags: true,
    }
});