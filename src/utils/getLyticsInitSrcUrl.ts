export function getLyticsInitSrcUrl({ projectId }: { projectId: string }) {
  return `https://c.lytics.io/api/tag/${projectId}/latest.min.js`;
}
