import { type Cslptag } from "@contentstack/studio-react";
import ActivityCard from "../ActivityCard/ActivityCard";
import { EmbeddedItem } from "@contentstack/utils/dist/types/Models/embedded-object";

interface RecommendedActivitiesProps {
  sectionTitle: string;
  $sectionTitle: Cslptag;
  locale: string;
  packages: Array<EmbeddedItem>;
}
const RecommendedActivities = (props: RecommendedActivitiesProps) => {
  if (!props.packages?.length) {
    return null;
  };

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
              <ActivityCard
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

export default RecommendedActivities;
