import React from 'react'

const GroupInfo = ({groupDetails}) => {
  return (
    <div>
        <h4 className='text-primary fw-bold'>{groupDetails?.name}</h4>
        <p className='mt-5'><strong>التاريخ / &nbsp; </strong>{groupDetails?.day}  &nbsp; &nbsp; &nbsp; <strong>الساعة </strong> &nbsp; &nbsp;{groupDetails?.time}</p>
        <p><strong>عدد الطلاب  / &nbsp; </strong>{groupDetails?.studentsNumber}</p>
        <p><strong> الحد الاقصى لعدد الطلاب / &nbsp; </strong>{groupDetails?.maxStudent}</p>
    </div>
  )
}

export default GroupInfo