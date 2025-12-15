import { type RegisterComponentOptionsInput } from '@contentstack/studio-react';
import RoomDropdown from '../components/RoomDropdown/RoomDropdown';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import EventsFaq from '../components/EventsFaq/EventsFaq';
import { FeatureSlider } from '../components/FeatureSlider';
import ProfileForm from '../components/ProfileForm/ProfileForm';

export const components: RegisterComponentOptionsInput<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props?: any) => React.ReactNode
>[] = [
  {
    type: 'RoomDropdown',
    displayName: 'Room Dropdown Component',
    component: RoomDropdown,
    thumbnailUrl:
      'https://dev11-composo-image.csnonprod.com/4d3cdf1e-e249-4f38-b8b6-7e96bfb98e2f',
    props: {
      roomOptions: {
        type: 'array',
        displayName: 'ROOMS',
        items: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              displayName: 'Room Title',
            },
            link: {
              type: 'href',
              displayName: 'Room Link',
            },
          },
        },
        defaultValue: [
          {
            title: 'Deluxe Room',
            link: '/rooms/deluxe',
          },
          {
            title: 'Suite Room',
            link: '/rooms/suite',
          },
        ],
      },
    },
  },
  {
    type: 'LanguageSelector',
    displayName: 'Language Selector Component',
    component: LanguageSelector,
    thumbnailUrl:
      'https://dev11-composo-image.csnonprod.com/0b6bfe14-b720-4502-b68d-c253a5cfc960',
    props: {
      selectedLanguage: {
        type: 'string',
        displayName: 'Selected Language',
        defaultValue: 'ENG',
      },
      languageOptions: {
        type: 'array',
        displayName: 'Language Options',
        items: {
          type: 'object',
          properties: {
            label: {
              type: 'string',
              displayName: 'Language Label',
            },
            value: {
              type: 'string',
              displayName: 'Language Value',
            },
          },
        },
        defaultValue: [
          {
            label: 'ENG',
            value: 'ENG',
          },
          {
            label: 'Spanish',
            value: 'Spanish',
          },
          {
            label: 'France',
            value: 'France',
          },
          {
            label: 'Germany',
            value: 'Germany',
          },
        ],
      },
    },
  },
  {
    type: 'CategoryGrid',
    displayName: 'Category Grid Component',
    component: CategoryGrid,
    thumbnailUrl:
      'https://composo-image.contentstack.com/c5f06a68-976b-40f6-8d98-98516d287628',
    props: {
      categories: {
        type: 'array',
        displayName: 'Categories',
        items: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              displayName: 'Category Text',
            },
            uid: {
              type: 'string',
              displayName: 'Category UID',
            },
          },
        },
        defaultValue: [
          {
            text: 'Accomodations',
            uid: 'fd587033-c1da-4f7e-9a11-3800ea050dab',
          },
          {
            text: 'Dinning',
            uid: '6da3f9cd-5d82-4ee8-9cf8-eb0e0fb3c198',
          },
          {
            text: 'Activities',
            uid: '318e6aba-1024-4966-b16c-d043b3ad89cb',
          },
          {
            text: 'SPA and Wellness',
            uid: '6f285023-ac3b-4148-beb2-448c1461e68b',
          },
          {
            text: 'Transportation',
            uid: '77fa5779-2c37-458e-8916-12ac9ff46393',
          },
          {
            text: 'Booking',
            uid: 'a5575a0d-424d-4c2a-8bf2-8420ef1f1cb5',
          },
          {
            text: 'Payment and cancellation',
            uid: 'e793b7a2-1e1a-43ee-bbd6-1782db7513e7',
          },
          {
            text: 'Special Events',
            uid: 'eea0b99f-7503-45ba-90b5-9a6b55921cbc',
          },
          {
            text: 'Sustainability',
            uid: '8063d4f6-94aa-4635-a023-79e9d3d5a613',
          },
          {
            text: 'Safety and Security',
            uid: '91b0db07-ed2e-4a8d-9fad-6eb4622cfd48',
          },
          {
            text: 'Packing and What to Bring',
            uid: 'ca214da0-4fab-493a-bb5a-63d566e51abc',
          },
          {
            text: 'Climate',
            uid: 'e7ff6f65-0df0-4289-98a1-0d6fa4a8c6fd',
          },
          {
            text: 'Local Customs',
            uid: 'cfe7d18d-1f47-4672-bec1-9b1ff34098f9',
          },
          {
            text: 'Contact Information',
            uid: '0e5f0c63-7b3d-4ab2-88c5-741f4f70b8aa',
          },
        ],
      },
    },
  },
  {
    type: 'EventsFaq',
    displayName: 'Events FAQ Component',
    component: EventsFaq,
    thumbnailUrl:
      'https://composo-image.contentstack.com/491bc2e1-0a38-4a14-8f93-759b7a19cdad',
    props: {
      breadcrumbText1: {
        type: 'string',
        displayName: 'Breadcrumb Text 1',
        defaultValue: 'Red Panda Maldives',
      },
      breadcrumbText2: {
        type: 'string',
        displayName: 'Breadcrumb Text 2',
        defaultValue: 'Special Events',
      },
      title: {
        type: 'string',
        displayName: 'Title',
        defaultValue: 'Special Events',
      },
      faqItems: {
        type: 'array',
        displayName: 'FAQ Items',
        items: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              displayName: 'Question',
            },
            reply: {
              type: 'string',
              displayName: 'Answer',
            },
            uid: {
              type: 'string',
              displayName: 'UID',
            },
          },
        },
        defaultValue: [
          {
            question: 'Do you offer any special event or celebration packages?',
            reply:
              'Yes, we offer customized packages for weddings, anniversaries, birthdays, and other special occasions. Our event planning team will work with you to create a memorable experience tailored to your needs.',
            uid: 'a6b84d93-91b4-4545-bfdc-bf69755b2053',
          },
          {
            question:
              'Do you offer any amenities such as complimentary breakfast or WiFi?',
            answer:
              'Yes, we provide complimentary high-speed WiFi throughout the property and a delicious breakfast buffet is included with most room bookings. Additional amenities vary by room type.',
            uid: '07e41ce1-71dc-494d-9220-d4fd89b01793',
          },
          {
            question: 'Can I request a specific room location or view?',
            answer:
              "Absolutely! We'll do our best to accommodate your preferences for room location and view. Please mention your requirements during booking or contact our reservations team in advance.",
            uid: 'b02e336a-5b49-4db6-9d91-9d48a7186f25',
          },
          {
            question: 'Can I book a private event or celebration at the hotel?',
            answer:
              'Yes, we have dedicated event spaces available for private celebrations, corporate events, and gatherings. Our events team can help you plan everything from intimate dinners to large receptions.',
            uid: 'e7ca6b15-abcf-41e0-ad99-195a77fedd9e',
          },
          {
            question:
              'Are there any seasonal events or festivals hosted by the hotel?',
            answer:
              'We host various seasonal events and cultural celebrations throughout the year, including holiday festivities, local festivals, and special themed nights. Check our events calendar for upcoming activities during your stay.',
            uid: 'a828088a-2625-4aa5-b653-22838a5bff9f',
          },
        ],
      },
    },
  },
  {
    type: 'FeatureSlider',
    displayName: 'Feature Slider Component',
    component: FeatureSlider,
    thumbnailUrl:
      'https://dev11-composo-image.csnonprod.com/0b6bfe14-b720-4502-b68d-c253a5cfc960',
    props: {
      tabs: {
        type: 'object',
        displayName: 'Tabs (Contentstack Binding)',
        properties: {
          tabs: {
            type: 'array',
            displayName: 'Tabs Array',
            items: {
              type: 'object',
              properties: {
                group: {
                  type: 'object',
                  displayName: 'Tab Group',
                  properties: {
                    title: {
                      type: 'string',
                      displayName: 'Title',
                    },
                    tab_text: {
                      type: 'string',
                      displayName: 'Tab Text',
                    },
                    body: {
                      type: 'string',
                      displayName: 'Body/Description',
                      control: 'large',
                    },
                    file: {
                      type: 'object',
                      displayName: 'Image File',
                      properties: {
                        url: {
                          type: 'imageurl',
                          displayName: 'Image URL',
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
    type: 'ProfileForm',
    displayName: 'Profile Form Component',
    component: ProfileForm,
    thumbnailUrl:
      'https://dev11-composo-image.csnonprod.com/0b6bfe14-b720-4502-b68d-c253a5cfc960',
  },
];
