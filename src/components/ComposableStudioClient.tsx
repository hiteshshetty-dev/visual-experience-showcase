import { StudioComponent, StudioComponentSpecOptions } from "@contentstack/studio-react";
import "../studio/index"


export default function ComposableStudioClient({
  initialData,
}: {
  initialData: StudioComponentSpecOptions;
  url: string;
}) {

  return (
    <>
      <StudioComponent specOptions={initialData} />
    </>
  );
}

