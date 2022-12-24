import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import { money } from '../assets'
import { CustomBtn, FormField } from '../Components'
import { checkIfImage } from '../utils'
import { ContractRoles } from '@thirdweb-dev/sdk'
import { useStateContext } from '../context'
import { loader } from '../assets'

const initState = {
  name: '',
  title: '',
  description: '',
  target: '',
  deadline: '',
  image: '',
}
const CreateCampaign = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { cerateCompaign } = useStateContext()
  const [form, setForm] = useState(() => initState)
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(form)
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        await cerateCompaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        })
        setIsLoading(false)
        navigate('/')
      } else {
        alert('Provide Valid image URL!')
        setForm({ ...form, image: '' })
      }
    })
  }
  const onFieldChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-4">
      <div className="flex flex-wrap mt-[20ox] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
      </div>
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        className="w-full mt-[65px] flex flex-col gap-[30px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            name="name"
            type="text"
            value={form.name}
            onChange={onFieldChange}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a Title"
            type="text"
            name="title"
            value={form.title}
            onChange={onFieldChange}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write your Story"
          name="description"
          isTextArea
          value={form.description}
          onChange={onFieldChange}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] rounded-[10px] h-[120px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-bold font-epilogue text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.5"
            type="number"
            name="target"
            value={form.target}
            onChange={onFieldChange}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={onFieldChange}
          />
        </div>

        <FormField
          labelName="Campaign Image *"
          placeholder="Place Image Url of your Campaign"
          type="text"
          name="image"
          value={form.image}
          onChange={onFieldChange}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomBtn
            disabled={isLoading}
            title={'Submit new campaign'}
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign
