import { registerComponents, type RegisterComponentOptionsInput } from '@contentstack/studio-react';
import RoomDropdown from '../components/RoomDropdown/RoomDropdown';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';

export const components: RegisterComponentOptionsInput<(props?: any) => React.ReactNode>[] = [{
  type: "RoomDropdown",
  displayName: "Room Dropdown Component",
  component: RoomDropdown,
  thumbnailUrl: "https://dev11-composo-image.csnonprod.com/4d3cdf1e-e249-4f38-b8b6-7e96bfb98e2f",
  props: {
    "roomOptions": {
      type: "array",
      displayName: "ROOMS",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string",
            displayName: "Room Title"
          },
          link: {
            type: "href",
            displayName: "Room Link"
          }
        }
      },
      defaultValue: [
        {
          title: "Deluxe Room",
          link: "/rooms/deluxe"
        },
        {
          title: "Suite Room",
          link: "/rooms/suite"
        }
      ]
    }
  }
}, {
  type: "LanguageSelector",
  displayName: "Language Selector Component",
  component: LanguageSelector,
  thumbnailUrl: "https://dev11-composo-image.csnonprod.com/0b6bfe14-b720-4502-b68d-c253a5cfc960",
  props: {
    "selectedLanguage": {
      type: "string",
      displayName: "Selected Language",
      defaultValue: "ENG"
    },
    "languageOptions": {
      type: "array",
      displayName: "Language Options",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
            displayName: "Language Label"
          },
          value: {
            type: "string",
            displayName: "Language Value"
          }
        }
      },
      defaultValue: [
        {
          label: "ENG",
          value: "ENG"
        },
        {
          label: "Spanish",
          value: "Spanish"
        },
        {
          label: "France",
          value: "France"
        },
        {
          label: "Germany",
          value: "Germany"
        }
      ]
    }
  }
}];

// registerComponents(components);