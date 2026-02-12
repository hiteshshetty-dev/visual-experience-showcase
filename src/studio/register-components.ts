import {
  registerComponents,
  type RegisterComponentOptionsInput,
} from "@contentstack/studio-react";
import RoomDropdown from "../components/RoomDropdown/RoomDropdown";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import CategoryGrid from "../components/CategoryGrid/CategoryGrid";
import EventsFaq from "../components/EventsFaq/EventsFaq";
import { FeatureSlider } from "../components/FeatureSlider";
import ImageIcon from "../components/ImageIcon/ImageIcon";
import ProfileDropdown from "../components/ProfileDropdown/ProfileDropdown";
import ProfileForm from "../components/ProfileForm/ProfileForm";
import ArticleCard from "../components/Studio/Cards/article";
import Fetcher from "../components/Studio/Smart Containers/Fetcher";
import AuthForm from "../components/AuthForm/AuthForm";
import RecommendedActivities from "../components/RecommendedActivities/RecommendedActivities";
import PriceDisplay from "../components/PriceDisplay/PriceDisplay";
import If from "../components/Studio/Smart Containers/If";
import Spinner from "../components/Spinner/Spinner";

export const components: RegisterComponentOptionsInput<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props?: any) => React.ReactNode
>[] = [
  {
    type: "RoomDropdown",
    displayName: "Room Dropdown Component",
    component: RoomDropdown,
    thumbnailUrl:
      "https://dev11-composo-image.csnonprod.com/4d3cdf1e-e249-4f38-b8b6-7e96bfb98e2f",
    props: {
      roomOptions: {
        type: "array",
        displayName: "ROOMS",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              displayName: "Room Title",
            },
            link: {
              type: "href",
              displayName: "Room Link",
            },
          },
        },
        defaultValue: [
          {
            title: "Deluxe Room",
            link: "/rooms/deluxe",
          },
          {
            title: "Suite Room",
            link: "/rooms/suite",
          },
        ],
      },
    },
  },
  {
    type: "LanguageSelector",
    displayName: "Language Selector Component",
    component: LanguageSelector,
    thumbnailUrl:
      "https://dev11-composo-image.csnonprod.com/0b6bfe14-b720-4502-b68d-c253a5cfc960",
    props: {
      languageOptions: {
        type: "array",
        displayName: "Language Options",
        items: {
          type: "object",
          properties: {
            label: {
              type: "string",
              displayName: "Language Label",
            },
            code: {
              type: "string",
              displayName: "Language Code",
            },
          },
        },
        defaultValue: [
          {
            label: "English",
            code: "en-us",
          },
          {
            label: "Spanish",
            code: "es-es",
          },
          {
            label: "France",
            code: "fr-fr",
          },
          {
            label: "Germany",
            code: "de-de",
          },
        ],
      },
    },
  },
  {
    type: "CategoryGrid",
    displayName: "Category Grid Component",
    component: CategoryGrid,
    thumbnailUrl:
      "https://composo-image.contentstack.com/c5f06a68-976b-40f6-8d98-98516d287628",
    props: {
      categories: {
        type: "array",
        displayName: "Categories",
        items: {
          type: "object",
          properties: {
            text: {
              type: "string",
              displayName: "Category Text",
            },
            uid: {
              type: "string",
              displayName: "Category UID",
            },
          },
        },
        defaultValue: [
          {
            text: "Accomodations",
            uid: "fd587033-c1da-4f7e-9a11-3800ea050dab",
          },
          {
            text: "Dinning",
            uid: "6da3f9cd-5d82-4ee8-9cf8-eb0e0fb3c198",
          },
          {
            text: "Activities",
            uid: "318e6aba-1024-4966-b16c-d043b3ad89cb",
          },
          {
            text: "SPA and Wellness",
            uid: "6f285023-ac3b-4148-beb2-448c1461e68b",
          },
          {
            text: "Transportation",
            uid: "77fa5779-2c37-458e-8916-12ac9ff46393",
          },
          {
            text: "Booking",
            uid: "a5575a0d-424d-4c2a-8bf2-8420ef1f1cb5",
          },
          {
            text: "Payment and cancellation",
            uid: "e793b7a2-1e1a-43ee-bbd6-1782db7513e7",
          },
          {
            text: "Special Events",
            uid: "eea0b99f-7503-45ba-90b5-9a6b55921cbc",
          },
          {
            text: "Sustainability",
            uid: "8063d4f6-94aa-4635-a023-79e9d3d5a613",
          },
          {
            text: "Safety and Security",
            uid: "91b0db07-ed2e-4a8d-9fad-6eb4622cfd48",
          },
          {
            text: "Packing and What to Bring",
            uid: "ca214da0-4fab-493a-bb5a-63d566e51abc",
          },
          {
            text: "Climate",
            uid: "e7ff6f65-0df0-4289-98a1-0d6fa4a8c6fd",
          },
          {
            text: "Local Customs",
            uid: "cfe7d18d-1f47-4672-bec1-9b1ff34098f9",
          },
          {
            text: "Contact Information",
            uid: "0e5f0c63-7b3d-4ab2-88c5-741f4f70b8aa",
          },
        ],
      },
    },
  },
  {
    type: "EventsFaq",
    displayName: "Events FAQ Component",
    component: EventsFaq,
    thumbnailUrl:
      "https://composo-image.contentstack.com/491bc2e1-0a38-4a14-8f93-759b7a19cdad",
    props: {
      breadcrumbText1: {
        type: "string",
        displayName: "Breadcrumb Text 1",
        defaultValue: "Red Panda Maldives",
      },
      breadcrumbText2: {
        type: "string",
        displayName: "Breadcrumb Text 2",
        defaultValue: "Special Events",
      },
      title: {
        type: "string",
        displayName: "Title",
        defaultValue: "Special Events",
      },
      faqItems: {
        type: "array",
        displayName: "FAQ Items",
        items: {
          type: "object",
          properties: {
            question: {
              type: "string",
              displayName: "Question",
            },
            answer: {
              type: "string",
              displayName: "Answer",
            },
            uid: {
              type: "string",
              displayName: "UID",
            },
          },
        },
        defaultValue: [
          {
            question: "Do you offer any special event or celebration packages?",
            answer:
              "Yes, we offer customized packages for weddings, anniversaries, birthdays, and other special occasions. Our event planning team will work with you to create a memorable experience tailored to your needs.",
            uid: "a6b84d93-91b4-4545-bfdc-bf69755b2053",
          },
          {
            question:
              "Do you offer any amenities such as complimentary breakfast or WiFi?",
            answer:
              "Yes, we provide complimentary high-speed WiFi throughout the property and a delicious breakfast buffet is included with most room bookings. Additional amenities vary by room type.",
            uid: "07e41ce1-71dc-494d-9220-d4fd89b01793",
          },
          {
            question: "Can I request a specific room location or view?",
            answer:
              "Absolutely! We'll do our best to accommodate your preferences for room location and view. Please mention your requirements during booking or contact our reservations team in advance.",
            uid: "b02e336a-5b49-4db6-9d91-9d48a7186f25",
          },
          {
            question: "Can I book a private event or celebration at the hotel?",
            answer:
              "Yes, we have dedicated event spaces available for private celebrations, corporate events, and gatherings. Our events team can help you plan everything from intimate dinners to large receptions.",
            uid: "e7ca6b15-abcf-41e0-ad99-195a77fedd9e",
          },
          {
            question:
              "Are there any seasonal events or festivals hosted by the hotel?",
            answer:
              "We host various seasonal events and cultural celebrations throughout the year, including holiday festivities, local festivals, and special themed nights. Check our events calendar for upcoming activities during your stay.",
            uid: "a828088a-2625-4aa5-b653-22838a5bff9f",
          },
        ],
      },
    },
  },
  {
    type: "FeatureSlider",
    displayName: "Feature Slider Component",
    component: FeatureSlider,
    thumbnailUrl:
      "https://dev11-composo-image.csnonprod.com/0b6bfe14-b720-4502-b68d-c253a5cfc960",
    props: {
      tabs: {
        type: "object",
        displayName: "Tabs (Contentstack Binding)",
        properties: {
          tabs: {
            type: "array",
            displayName: "Tabs Array",
            items: {
              type: "object",
              properties: {
                group: {
                  type: "object",
                  displayName: "Tab Group",
                  properties: {
                    title: {
                      type: "string",
                      displayName: "Title",
                    },
                    tab_text: {
                      type: "string",
                      displayName: "Tab Text",
                    },
                    body: {
                      type: "string",
                      displayName: "Body/Description",
                      control: "large",
                    },
                    file: {
                      type: "object",
                      displayName: "Image File",
                      properties: {
                        url: {
                          type: "imageurl",
                          displayName: "Image URL",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    styles: {
      categoryMenu: {},
    },
  },
  {
    type: "ImageIcon",
    displayName: "Image Icon Component",
    component: ImageIcon,
    thumbnailUrl:
      "https://images.contentstack.io/v3/assets/bltfa1bb059f148657d/blt60628f9edb4081a6/693a922cfe6501cbda3ecf22/logo_1_(1).png",
    props: {
      iconType: {
        type: "string",
        displayName: "Icon Type",
        defaultValue: "logo",
      },
      homepageSrc: {
        type: "imageurl",
        displayName: "Homepage Logo Image URL",
        defaultValue:
          "https://images.contentstack.io/v3/assets/bltfa1bb059f148657d/bltf8ec948ceb48d770/693fdb67b9ac8a05f2cbb23e/white-logo.png",
      },
      defaultSrc: {
        type: "imageurl",
        displayName: "Default Logo Image URL",
        defaultValue:
          "https://images.contentstack.io/v3/assets/bltfa1bb059f148657d/blt60628f9edb4081a6/693a922cfe6501cbda3ecf22/logo_1_(1).png",
      },
      homepageProfileSrc: {
        type: "imageurl",
        displayName: "Homepage Profile Image URL",
        defaultValue:
          "https://images.contentstack.io/v3/assets/bltfa1bb059f148657d/bltb512a040c33864e5/693ff5891308b8c5bd0b0393/light-profile.png",
      },
      defaultProfileSrc: {
        type: "imageurl",
        displayName: "Default Profile Image URL",
        defaultValue:
          "https://images.contentstack.io/v3/assets/bltfa1bb059f148657d/blt2c0e15dec2824ac9/693ff589019baa4c57a80d2a/dark-profile.png",
      },
      alt: {
        type: "string",
        displayName: "Alt Text",
        defaultValue: "Logo",
      },
    },
  },
  {
    type: "ProfileDropdown",
    displayName: "Profile Dropdown Component",
    component: ProfileDropdown,
    thumbnailUrl:
      "https://images.contentstack.io/v3/assets/bltfa1bb059f148657d/blt2c0e15dec2824ac9/693ff589019baa4c57a80d2a/dark-profile.png",
    props: {
      homepageIconSrc: {
        type: "imageurl",
        displayName: "Homepage Icon Image URL",
        defaultValue:
          "https://images.contentstack.io/v3/assets/bltfa1bb059f148657d/bltb512a040c33864e5/693ff5891308b8c5bd0b0393/light-profile.png",
      },
      defaultIconSrc: {
        type: "imageurl",
        displayName: "Default Icon Image URL",
        defaultValue:
          "https://images.contentstack.io/v3/assets/bltfa1bb059f148657d/blt2c0e15dec2824ac9/693ff589019baa4c57a80d2a/dark-profile.png",
      },
      iconAlt: {
        type: "string",
        displayName: "Icon Alt Text",
        defaultValue: "Profile",
      },
      profileOptions: {
        type: "array",
        displayName: "Profile Menu Options",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              displayName: "Option Title",
            },
            link: {
              type: "href",
              displayName: "Option Link",
            },
          },
        },
        defaultValue: [
          {
            title: 'My Profile',
            link: '/profile',
          },
          {
            title: 'My Bookings',
            link: '/bookings',
          },
          {
            title: 'Settings',
            link: '/settings',
          },
          {
            title: 'Sign Out',
            link: '/logout',
          },
        ],
      },
    },
  },
  {
    type: 'ProfileForm',
    displayName: 'Profile Form Component',
    component: ProfileForm,
    thumbnailUrl:
      'https://dev11-composo-image.csnonprod.com/0b6bfe14-b720-4502-b68d-c253a5cfc960',
  },
  {
    type: 'container',
    component: Fetcher,
    displayName: 'Fetcher',
    description: 'Fetcher component',
    wrap: false,
    sections: ['Smart Containers'],
    props: {
      type: {
        type: 'choice',
        displayName: 'Fetch',
        options: [
          {
            value: 'entries',
            label: 'All Entries',
          },
          {
            value: 'entries-of-taxonomy',
            label: 'All Entries of a Taxonomy',
          }
        ],
        control: 'dropdown',
        multiSelect: false,
        defaultValue: ['entries'],
      },
      contentTypeUid: {
        type: 'string',
        displayName: 'Content Type UID',
        defaultValue: 'article',
        placeholder: 'Enter content type uid here',
      },
      taxonomyUid: {
        type: 'string',
        displayName: 'Taxonomy UID',
        defaultValue: 'editorial_staff',
        placeholder: 'Enter taxonomy uid here',
      },
      termUid: {
        type: 'string',
        displayName: 'Term UID',
        defaultValue: 'amenities',
        placeholder: 'Enter term uid here',
      },
      variant: {
        type: 'string',
        displayName: 'Variant',
      },
      item: {
        type: 'slot',
        displayName: 'Item',
      },
      loader: {
        type: 'slot',
        displayName: 'Loader',
      },
      error: {
        type: 'slot',
        displayName: 'Error',
      },
      empty: {
        type: 'slot',
        displayName: 'Empty',
      },
    },
  },
  {
    type: "card",
    component: ArticleCard,
    displayName: "Article Card",
    description: "Article card component",
    wrap: false,
    sections: ["Cards"],
    props: {
      exclude: {
        type: "array",
        items: {
          type: "any",
        },
        displayName: "Exclude",
        defaultValue: [],
      },
      articleData: {
        type: "object",
        properties: {
          title: {
            type: "string",
            displayName: "Title",
            defaultValue: "",
          }
        },
        displayName: "Article",
        defaultValue: {},
      }
    },
  },
  {
    type: "AuthForm",
    displayName: "Authentication Form Component",
    component: AuthForm,
    thumbnailUrl:
      "https://composo-image.contentstack.com/530cb5bb-9667-4120-8e47-2d494dde3e6c",
    props: {
      loginTitle: {
        type: "string",
        displayName: "Login Title",
        defaultValue: "Welcome Back",
      },
      loginAccountQuestion: {
        type: "string",
        displayName: "Login Account Question",
        defaultValue: "Don't have an account?",
      },
      loginAccountAction: {
        type: "string",
        displayName: "Login Account Action",
        defaultValue: "Create and account",
      },
      loginEmailLabel: {
        type: "string",
        displayName: "Login Email Label",
        defaultValue: "Email Address",
      },
      loginPasswordLabel: {
        type: "string",
        displayName: "Login Password Label",
        defaultValue: "Password",
      },
      loginForgotPassword: {
        type: "string",
        displayName: "Login Forgot Password",
        defaultValue: "Forgot password?",
      },
      loginButtonText: {
        type: "string",
        displayName: "Login Button Text",
        defaultValue: "Login",
      },
      resetTitle: {
        type: "string",
        displayName: "Reset Title",
        defaultValue: "Reset Password",
      },
      resetEmailLabel: {
        type: "string",
        displayName: "Reset Email Label",
        defaultValue: "Email Address",
      },
      resetButtonText: {
        type: "string",
        displayName: "Reset Button Text",
        defaultValue: "Reset Password",
      },
      newPasswordTitle: {
        type: "string",
        displayName: "New Password Title",
        defaultValue: "New Password",
      },
      newPasswordLabel: {
        type: "string",
        displayName: "New Password Label",
        defaultValue: "Password",
      },
      newPasswordConfirmLabel: {
        type: "string",
        displayName: "New Password Confirm Label",
        defaultValue: "Confirm Password",
      },
      newPasswordButtonText: {
        type: "string",
        displayName: "New Password Button Text",
        defaultValue: "Change Password",
      },
      registerTitle: {
        type: "string",
        displayName: "Register Title",
        defaultValue: "Begin Your Journey",
      },
      registerBackText: {
        type: "string",
        displayName: "Register Back Text",
        defaultValue: "Back to login",
      },
      registerEmailLabel: {
        type: "string",
        displayName: "Register Email Label",
        defaultValue: "Email Address",
      },
      registerPasswordLabel: {
        type: "string",
        displayName: "Register Password Label",
        defaultValue: "Password",
      },
      registerButtonText: {
        type: "string",
        displayName: "Register Button Text",
        defaultValue: "Register",
      },
    },
  },
  {
    type: "RecommendedPackages",
    displayName: "Recommended Packages Component",
    component: RecommendedActivities,
    thumbnailUrl:
      "https://composo-image.contentstack.com/c8b23840-84cf-47af-b34a-2f5133f3eb88",
    props: {
      sectionTitle: {
        type: "string",
        displayName: "Section Title",
        defaultValue: "Recommended for you",
      },
      locale: {
        type: "string",
        displayName: "Locale",
        defaultValue: "en-us",
      },
      packages: {
        type: "array",
        displayName: "Packages",
        items: {
          type: "object",
          properties: {
            backgroundImage: {
              type: "imageurl",
              displayName: "Background Image",
            },
            title: {
              type: "string",
              displayName: "Title",
            },
            description: {
              type: "string",
              displayName: "Description",
            },
            price: {
              type: "string",
              displayName: "Price",
            },
            cardTitle: {
              type: "string",
              displayName: "Card Title",
            },
            cardPrice: {
              type: "string",
              displayName: "Card Price",
            },
          },
        },
        defaultValue: [
          {
            backgroundImage:
              "https://composo-image.contentstack.com/c16cafb3-d8dc-4e46-b207-bbf76844ef81",
            title: "Beach Villa",
            description:
              "Relax in luxury with stunning ocean views and private beach access. Perfect for a romantic getaway.",
            price: "$200 / night",
            cardTitle: "Beach Villa",
            cardPrice: "$200 / night",
          },
          {
            backgroundImage:
              "https://composo-image.contentstack.com/84398e36-e046-49f1-b1f7-2f6df4b57926",
            title: "Overwater Villas",
            description:
              "Experience paradise in our exclusive overwater bungalows with direct lagoon access and panoramic views.",
            price: "$299 / night",
            cardTitle: "Overwater Villas",
            cardPrice: "$299 / night",
          },
          {
            backgroundImage: "",
            title: "Cultural Tour",
            description:
              "Experience the traditions, flavors, and spirit of island life on our guided cultural tour.",
            price: "$99 / person",
            cardTitle: "Cultural Tour",
            cardPrice: "$99 / person",
          },
        ],
      },
    },
  },
  {
    type: "PriceDisplay",
    displayName: "Price Display Component",
    component: PriceDisplay,
    thumbnailUrl: "https://composo-image.contentstack.com/5bb3f6ce-a61f-4ec0-8e11-5b833d7301e8",
    props: {
      price: {
        type: "string",
        displayName: "Price",
        defaultValue: "$99 / person",
      },
      isDiscounted: {
        type: "boolean",
        displayName: "Is Discounted",
        defaultValue: false,
      },
      discountedPrice: {
        type: "string",
        displayName: "Discounted Price",
        defaultValue: "$79 / person",
      },
    },
  },
  {
    type: "if",
    component: If,
    displayName: "If",
    description: "If component",
    wrap: false,
    sections: ["Smart Containers"],
    props: {
      operand: {
        type: "any",
        displayName: "Operand",
        defaultValue: "",
      },
      operator: {
        type: "choice",
        displayName: "Operator",
        options: [
          {
            value: "==",
            label: "(==) Equal",
          },
          {
            value: ">",
            label: "(>) Greater Than",
          },
          {
            value: "<",
            label: "(<) Less Than",
          },
          {
            value: ">=",
            label: "(>=) Greater Than or Equal To",
          },
          {
            value: "<=",
            label: "(<=) Less Than or Equal To",
          },
          {
            value: "contains",
            label: "(contains) Contains",
          },
        ],
        control: "dropdown",
        multiSelect: false,
        defaultValue: ["=="],
      },
      value: {
        type: "string",
        displayName: "Value",
        defaultValue: "",
      },
      negate: {
        type: "boolean",
        displayName: "Negate",
        defaultValue: false,
      },
      children: {
        type: "slot",
        displayName: "Children",
      },
    },
  },
  {
    type: "Spinner",
    displayName: "Spinner",
    component: Spinner,
    sections: ["Animated Components"],
    props: {
      color: {
        type: "string",
        displayName: "Fill Color",
        defaultValue: "#3b82f6",
      },
      size: {
        type: "number",
        displayName: "Size (px)",
        defaultValue: 40,
      },
      thickness: {
        type: "number",
        displayName: "Thickness",
        defaultValue: 3,
      },
    },
  },
];

registerComponents(components);