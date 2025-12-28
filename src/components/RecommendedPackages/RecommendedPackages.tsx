import { type Cslptag } from "@contentstack/studio-react";
import PackageCard from "../PackageCard/PackageCard";
import stack from "@/src/studio";
import { EmbeddedItem } from "@contentstack/utils/dist/types/Models/embedded-object";

interface RecommendedPackagesProps {
  sectionTitle: string;
  $sectionTitle: Cslptag;
  locale: string;
  packages: Array<EmbeddedItem>;
}
const RecommendedPackages = (props: RecommendedPackagesProps) => {
  return (
    <section>
      <div className="cs-design-311-365 w-full max-w-[1440px] mx-auto px-8 py-8 box-border">
        <h1
          className="section-title text-[30px] font-normal leading-[1.2] uppercase text-[rgba(64,64,64,1)] text-left m-0 mb-6 tablet:text-[28px] tablet:mb-6 mobile:text-[24px] mobile:mb-5"
          composable-node-id="1ced088d-c0e4-42e8-9b61-38462f"
          {...props.$sectionTitle}
        >
          {props.sectionTitle}
        </h1>

        <div className="cards-container flex flex-row flex-wrap gap-5 items-stretch tablet:flex-row tablet:gap-6 tablet:flex-wrap mobile:flex-col mobile:gap-8">
          {props.packages.map((packageItem: EmbeddedItem, index: number) => (
            <div
              key={index}
              className="card flex flex-col w-[calc((100%-40px)/3)] relative shrink-0 tablet:w-[calc(50%-12px)] mobile:w-full"
            >
              <PackageCard
                backgroundImage={packageItem.image?.url}
                $backgroundImage={packageItem.$?.image?.url}
                title={packageItem.title}
                $title={packageItem.$?.title}
                description={packageItem.short_description}
                $description={packageItem.$?.short_description}
                price={packageItem.price}
                $price={packageItem.$?.price}
                cardTitle={packageItem.title}
                $cardTitle={packageItem.$?.title}
                cardPrice={packageItem.price}
                $cardPrice={packageItem.$?.price}
                url={`/${props.locale}` + packageItem.url}
                {...(packageItem.is_discounted && {
                  is_discounted: packageItem.is_discounted,
                  discounted_price: packageItem.discounted_price,
                  $discounted_price: packageItem.$?.discounted_price,
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const handleFetchRecommendedPackages = async ({
  userId,
}: {
  userId: string;
}) => {
  const fetchRecommendedPackages = async (): Promise<string[]> => {
    const authToken =
      process.env.NEXT_PUBLIC_LYTICS_AUTHTOKEN || process.env.LYTICS_AUTHTOKEN;

    if (!authToken) {
      console.warn("LYTICS_AUTHTOKEN is not set");
      return [];
    }

    try {
      const response = await fetch(
        `https://api.lytics.io/api/content/recommend/user/_uid/${userId}?rank=affinity&contentsegment=activities`,
        {
          method: "GET",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Lytics API error: ${response.status} ${response.statusText}`
        );
      }

      const lyticsData = (await response.json()).data;
      return lyticsData
        .map((item: { contentstack_uid: string }) => item.contentstack_uid)
        .filter((uid: string) => uid !== undefined)
        .slice(0, 3);
    } catch (error) {
      console.error("Error fetching recommended packages from Lytics:", error);
      return [];
    }
  };

  const entryUids = await fetchRecommendedPackages();
  const recommendedPackages = await stack
    .contentType("activity")
    .entry()
    .query()
    .containedIn("uid", entryUids)
    .find();

  const otherPackages = await stack
    .contentType("activity")
    .entry()
    .query()
    .notContainedIn("uid", entryUids)
    .find();

  return {
    recommendedPackages,
    otherPackages,
  };
};

export default RecommendedPackages;
