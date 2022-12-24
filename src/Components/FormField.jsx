import React from 'react'

const FormField = ({
  labelName,
  placeholder,
  onChange,
  type,
  value,
  isTextArea,
  name,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          name={name}
          required
          rows={10}
          className="p-y-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5263] p-1 rounded-[10px] sm:min-w-[300px]"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          required
          step="0.1"
          className="py-[15px]  sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5263] p-1 rounded-[10px] sm:min-w-[300px]"
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          type={type}
          value={value}
        />
      )}
    </label>
  )
}

export default FormField
