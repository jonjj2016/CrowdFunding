import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../Components'

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const { address, contract, getUserCampaigns } = useStateContext()
  const fetchCampaigns = async () => {
    setLoading(true)
    const data = await getUserCampaigns()
    setCampaigns(data)
    setLoading(false)
  }
  useEffect(() => {
    if (address) {
      fetchCampaigns()
    }
  }, [address, contract])
  return (
    <div>
      <DisplayCampaigns
        campaigns={campaigns}
        title={`All Campaigns (${campaigns.length})`}
        loading={loading}
      />
    </div>
  )
}
export default Profile
