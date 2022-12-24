import React from 'react'

const CustomBtn = ({ btnType, title, handleClick, styles, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={btnType}
      onClick={handleClick}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]  ${styles}`}
    >
      {title}
    </button>
  )
}

export default CustomBtn
