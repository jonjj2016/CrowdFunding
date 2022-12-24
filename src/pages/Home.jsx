import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../Components'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const { address, contract, getCampaigns } = useStateContext()
  const fetchCampaigns = async () => {
    setLoading(true)
    const data = await getCampaigns()
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

export default Home
