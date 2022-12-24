import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import { FundCampaign } from './'

const DisplayCamaigns = ({ loading, title, campaigns }) => {
  const navigate = useNavigate()
  const onFundClick = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  return (
    <div>
      <h1 className="text-white font-epilogue font-semibold text-[18px] text-left mb-2">
        {title}
      </h1>
      <div className="flex flex-wrap mt-[20ox] gap-[26px]">
        {loading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!loading && !campaigns.length && (
          <p className="font-epilogue font-semibold text-[#818183] text-left text-[14px] leading-[30px]">
            You have not created any campaigns yet
          </p>
        )}
        {!loading &&
          campaigns.length &&
          campaigns.map((campaign, index) => {
            return (
              <FundCampaign
                handleFundClick={() => onFundClick(campaign)}
                key={index + campaign.owner}
                {...campaign}
              />
            )
          })}
      </div>
    </div>
  )
}

export default DisplayCamaigns
