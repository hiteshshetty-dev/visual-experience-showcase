import contentstack from "@contentstack/delivery-sdk";

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

export default stack;