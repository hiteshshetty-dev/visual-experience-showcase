import { type Cslptag } from "@contentstack/studio-react";
import Link from "next/link";

export interface ActivityCardProps {
  backgroundImage: string;
  title: string;
  description: string;
  price: string;
  cardTitle: string;
  cardPrice: string;
  url: string;
  $backgroundImage?: Cslptag;
  $title?: Cslptag;
  $description?: Cslptag;
  $price?: Cslptag;
  $cardTitle?: Cslptag;
  $cardPrice?: Cslptag;
  is_discounted?: boolean;
  discounted_price?: string;
  $discounted_price?: Cslptag;
}

const ActivityCard = (props: ActivityCardProps) => {
  return (
    <section>
      <div className="cs-design-311-373">
        <Link href={props.url} className="block">
          <div
            className="card-container w-full max-w-[445.33px] h-[684px] flex flex-col relative overflow-hidden tablet:max-w-full tablet:h-auto mobile:max-w-full mobile:h-auto cursor-pointer"
            data-figma-id="311:373"
          >
            {/* Card Image */}
            <div
              className="card-image w-full h-[600px] bg-black/20 bg-cover bg-center relative tablet:h-[500px] mobile:h-[400px]"
              style={{ backgroundImage: `url('${props.backgroundImage}')` }}
              data-figma-id="311:374"
              {...props.$backgroundImage}
            />

            {/* Hover Overlay */}
            <div
              className="hover-overlay absolute top-0 right-[-100%] w-full h-[600px] bg-[rgba(229,231,235,1)] flex flex-col items-start justify-center p-10 transition-all duration-[400ms] ease-in-out z-10 tablet:h-[500px] tablet:p-8 mobile:h-[400px] mobile:p-6"
              data-figma-id="311:379"
            >
              <h3
                className="hover-title text-[30px] font-light leading-[1.2] text-left text-[rgba(64,64,64,1)] m-0 mb-5 max-w-[365.33px] tablet:text-[28px] tablet:mb-[18px] mobile:text-[24px] mobile:mb-4"
                data-figma-id="311:380"
                {...props.$title}
              >
                {props.title}
              </h3>

              <p
                className="hover-description text-[14px] font-light leading-6 text-left text-[rgba(64,64,64,1)] m-0 mb-5 max-w-[365.33px] tablet:text-[13px] tablet:leading-[22px] tablet:mb-[18px] mobile:text-[13px] mobile:leading-5 mobile:mb-4"
                data-figma-id="311:381"
                {...props.$description}
              >
                {props.description}
              </p>

              <div
                className="mt-5 tablet:mt-[18px] mobile:mt-4"
                data-figma-id="311:382"
              >
                <p
                  className="hover-price text-[30px] font-light leading-[1.2] text-left text-[rgba(64,64,64,1)] m-0 mb-[10px] pt-5 tablet:text-[28px] tablet:pt-[18px] mobile:text-[24px] mobile:pt-4"
                  data-figma-id="311:383"
                  {...props.$price}
                >
                  {props.is_discounted ? (
                    <>
                      <span className="line-through opacity-60 block">
                        {props.price}
                      </span>
                      <span {...props.$discounted_price} className="block">
                        {props.discounted_price}
                      </span>
                    </>
                  ) : (
                    props.price
                  )}
                </p>
              </div>
            </div>

            {/* Card Details */}
            <div
              className="card-details w-full max-w-[320px] pt-5 flex flex-col gap-0 tablet:py-[18px] mobile:py-4"
              data-figma-id="311:375"
            >
              <p
                className="card-title w-full max-w-[320px] h-8 text-[18px] font-normal leading-8 text-left text-[rgba(64,64,64,1)] m-0"
                data-figma-id="311:386"
                {...props.$cardTitle}
              >
                {props.cardTitle}
              </p>
              <p
                className="card-price w-full max-w-[320px] h-8 text-[18px] font-normal leading-8 text-left text-[rgba(64,64,64,1)] m-0"
                data-figma-id="311:387"
                {...props.$cardPrice}
              >
                {props.is_discounted ? (
                  <>
                    <span className="line-through opacity-60 block">
                      {props.cardPrice}
                    </span>
                    <span {...props.$discounted_price} className="block">
                      {props.discounted_price}
                    </span>
                  </>
                ) : (
                  props.cardPrice
                )}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ActivityCard;
