import React, { useContext, createContext } from 'react'
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react'
import { ethers } from 'ethers'

console.log(new Date())
const StateContext = createContext()
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x8bbEe31bc9b6eEB2A2A6a4B3813Ae4f412bb1256')
  const { mutateAsync } = useContractWrite(contract, 'cerateCompaign')

  const address = useAddress()
  const connect = useMetamask()

  const publishCampaign = async ({
    title,
    description,
    target,
    deadline,
    image,
  }) => {
    console.log(
      address,
      title,
      description,
      target,
      new Date(deadline).getTime(),
      image,
    )
    try {
      const data = await mutateAsync([
        address,
        title,
        description,
        target,
        Math.floor(new Date(deadline).getTime() / 1000),
        image,
      ])
      console.log('Contract Call Success', data)
    } catch (error) {
      console.log('Contract Call Failed ', error)
    }
  }
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCompaigns')

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString(),
      ),
      image: campaign.image,
      pId: i,
    }))

    return parsedCampaigns
  }
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns()
    return allCampaigns.filter((campaign) => campaign.owner == address)
  }
  // const getDonations = async () => {
  //   const donations= await connect.call()
  // }
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        cerateCompaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext)
