import { type Cslptag } from "@contentstack/studio-react";

interface PriceDisplayProps {
  price: string;
  $price: Cslptag;
  isDiscounted: boolean;
  discountedPrice: string;
  $discountedPrice: Cslptag;
}

const PriceDisplay = (props: PriceDisplayProps) => {
  return (
    <div className="flex items-center justify-center w-full h-[65px] pt-5">
      {props.isDiscounted ? (
        <div className="flex items-center gap-2">
          <p
            className="text-[30px] font-light text-[rgba(64,64,64,1)] line-through opacity-60 md:text-[28px] sm:text-[24px]"
            {...props.$price}
          >
            {props.price}
          </p>
          <p
            className="text-[30px] font-light text-[rgba(64,64,64,1)] md:text-[28px] sm:text-[24px]"
            {...props.$discountedPrice}
          >
            {props.discountedPrice}
          </p>
        </div>
      ) : (
        <p
          className="text-[30px] font-light text-[rgba(64,64,64,1)] md:text-[28px] sm:text-[24px]"
          {...props.$price}
        >
          {props.price}
        </p>
      )}
    </div>
  );
};

export default PriceDisplay;
