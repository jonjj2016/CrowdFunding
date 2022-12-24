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

  const donate = async (pid, amount) => {
    const data = await contract.call('donateToCompaign', pid, {
      value: ethers.utils.parseEther(amount),
    })
    return data
  }
  const getDonations = async (pId) => {
    try {
      const donations = await contract.call('getDonators', pId)
      console.log(donations)
      const numberOfDonations = donations[0].length

      const parsedDonations = []

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        })
      }

      return parsedDonations
    } catch (error) {
      console.log(error.message)
    }
  }

  // const getDonations = async (pid) => {
  //   try {
  //     const donations = await contract.call('getDonators', pid)
  //     const parseDonations = []
  //     donations[0].forEach((_, index) => {
  //       parseDonations.push({
  //         donator: donations[0][index],
  //         donation: ethers.utils.formatEther(donations[0][index].toString),
  //       })
  //     })
  //     return parseDonations
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
  return (
    <StateContext.Provider
      value={{
        address,
        getDonations,
        contract,
        connect,
        cerateCompaign: publishCampaign,
        getCampaigns,
        donate,
        getUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext)
