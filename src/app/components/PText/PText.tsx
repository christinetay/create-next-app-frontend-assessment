'use client';

import { PTextModel } from '@/app/models/PTextModel';
import './PText.css';
import parse from 'html-react-parser';


function PText(props: PTextModel) {
  var keyword: string = props.keyword;
  var replaceText: string = keyword? props.text?.split(keyword).join("<b>"+ keyword +"</b>"):props.text;
  var processedText = parse(replaceText);

  return (
      <span className={props.className} id={props.id} onClick={props.onClick}>{processedText}</span>
  )
} 


export default PText;