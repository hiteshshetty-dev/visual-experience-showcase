export async function getContentRecommendation(
  args: GetContentRecommendationArgs
) {
  const authToken = process.env.LYTICS_AUTHTOKEN;
  if (!authToken) {
    throw new Error("LYTICS_AUTHTOKEN is not set");
  }
  const { fieldName, fieldValue, query } = args;
  const queryString = new URLSearchParams(query).toString();

  return await fetch(
    `https://api.lytics.io/api/content/recommend/user/${fieldName}/${fieldValue}?${queryString}`,
    {
      method: "GET",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    }
  );
}
export interface GetContentRecommendationArgs {
  fieldName: "userId";
  fieldValue: string;
  query: {
    rank: "affinity";
    contentsegment: "activities";
  };
}
