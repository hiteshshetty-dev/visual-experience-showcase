import type { ReactNode } from "react";

interface IfTextProps {
  text: string | null | undefined;
  children?: ReactNode;
}

function isEmpty(text: string | null | undefined): boolean {
  if (text == null) return true;
  if (typeof text !== "string") return true;
  if (text.trim() === "") return true;
  return false;
}

/**
 * Renders children only when `text` is not empty (not null, undefined, empty string, or whitespace-only).
 */
export default function IfText(props: IfTextProps) {
  const { text, children } = props;

  if (isEmpty(text)) {
    return null;
  }

  return <>{children}</>;
}
