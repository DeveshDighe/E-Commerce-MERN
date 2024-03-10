import React from 'react'

const AddressCard = ({itemData}) => {
  return (
    <div>
        <div className=' space-y-3'>
            <p className=' font-semibold'>{itemData?.shippAddress?.firstName} {itemData?.shippAddress?.lastName}</p>
            <p>{itemData?.shippAddress?.streetAddress} ,{itemData?.shippAddress?.city}, {itemData?.shippAddress?.state}, {itemData?.shippAddress?.zipCode}</p>

            <div className=' space-y-1'>
                <p className=' font-semibold'>Phone Number</p>
                <p>{itemData?.shippAddress?.mobile}</p>
            </div>
        </div>
    </div>
  )
}

export default AddressCard