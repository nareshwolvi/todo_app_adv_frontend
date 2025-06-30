import React from 'react'
import { forwardRef } from 'react'
import moment from 'moment';
import clsx from 'clsx';
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"

export default function CustomDatePicker({
    name, 
    date,
    onDateChange,
    isClearable = true,
}) {

    const ExampleCustomInput = forwardRef(({value, onClick}, ref) => (
        <button className={clsx("datepicker-btn", value ? "data-input-value" : "date-input-placeholder")} onClick={onClick} ref={ref}>
        {value ? moment(new Date(value)).format("DD MMM YYYY") : "Due Date"}
        </button>
    ));

  return (
    <div className='input-field-datepicker'>
      <DatePicker name={name} selected={date} onChange={onDateChange} isClearable={isClearable} customInput={<ExampleCustomInput />} />

    </div>
  )
}
