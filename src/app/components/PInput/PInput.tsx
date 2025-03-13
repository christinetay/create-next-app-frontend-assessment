'use client';

import { PInputModel } from '@/app/models/PInputModel';
import './PInput.css'; 

function PInput(props: PInputModel) {
  return (
    <input 
    type={props.type}
      id={props.id}
      name={props.name}
      className={props.className}
      onChange={props.onChange}
      size={10}
      value={props.value}
      />
  )
}


export default PInput;