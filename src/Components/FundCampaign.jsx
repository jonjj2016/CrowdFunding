import React from 'react'
import { tagType, thirdweb } from '../assets'
import { daysLeft } from '../utils'

const FundCampaign = ({
  deadline,
  owner,
  handleFundClick,
  description,
  amountCollected,
  image,
  target,
  title,
}) => {
  const remainingDays = daysLeft(new Date(deadline))
  return (
    <div
      onClick={handleFundClick}
      className="text-white sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
    >
      <img
        src={image}
        alt="campaign image"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col m-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Category
          </p>
        </div>
        <div className="block">
          <h3 className="«font-epilogue font-semibold text-[16px] text-white text-left truncate leading-[26px]">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[12px] text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap justify-between mt-[15px] gap-2">
          <div className="flex flex-col ">
            <h4 className="font font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mr-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#b2b3bd] sm:w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col ">
            <h4 className="font font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays} days left
            </h4>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] flex rounded-full justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-normal font-epilogue text-[12px] text-[#808191] truncate">
            By <span className="text-[#b2b3bd] ">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default FundCampaign
