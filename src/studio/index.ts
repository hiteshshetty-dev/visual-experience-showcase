import { studioSdk } from "@contentstack/studio-react";
import stack from "@/src/livepreview";

export const studioClient = studioSdk.init({
    stackSdk: stack,
    cslp: {
        appendTags: true,
    }
});

export default stack;