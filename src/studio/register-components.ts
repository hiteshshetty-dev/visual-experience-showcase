import { registerComponents, type RegisterComponentOptionsInput } from '@contentstack/studio-react';
import RoomDropdown from '../components/RoomDropdown/RoomDropdown';

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
}];

// registerComponents(components);