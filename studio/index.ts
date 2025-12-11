import contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { studioSdk } from "@contentstack/studio-react";

const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
  live_preview: {
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
    enable: true,
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST,
  },
});

ContentstackLivePreview.init({
  stackSdk: stack.config as IStackSdk,
})

export const studioClient = studioSdk.init({
    stackSdk: stack,
    cslp: {
        appendTags: true,
    }
});

export default stack;