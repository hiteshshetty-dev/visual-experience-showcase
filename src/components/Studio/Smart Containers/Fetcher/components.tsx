export enum FALLBACK_TYPE {
  NO_TYPE_SELECTED = "no_type_selected",
  NO_CONTENT_TYPE_UID = "no_content_type_uid",
  NO_ITEM = "no_item",
}

function NoTypeSelected() {
  return <div>No type selected</div>;
}

function NoContentTypeUid() {
  return <div>No content type uid added</div>;
}

function NoItemAdded() {
  return <div>No component added in slot</div>;
}

export const Fallback = {
  NoTypeSelected,
  NoContentTypeUid,
  NoItemAdded,
}