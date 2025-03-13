'use client';

import { useState, useEffect, useRef } from 'react';
import PButton from './components/PButton/PButton';
import PSelect from './components/PSelect/PSelect';
import PText from './components/PText/PText';
import PImage from './components/PImage/PImage';
import { RandomProps } from './testModel';


 
function Header({ title }: RandomProps) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function Home() {
  const selectRef = useRef(null);
  const [selectedOptionData, setSelectedOptionData]: any = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [fullOptionDataList, setFullOptionDataList] = useState<any>([]);
  const [currentOptionDataList, setCurrentOptionDataList] = useState<any>([]);
  const [resultDataList, setResultDataList] = useState<any>([]);
  const [countLabel, setCountLabel] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isEnterPress, setIsEnterPress] = useState(false);

  // NOTE: not working
  function onTextTyping(currentInputValue: any, event: any) {
    console.log("..............................");
    console.log("@@ onTextTyping - currentInputValue:", currentInputValue);
    console.log("@@ onTextTyping - event:", event);
    console.log("@@ onTextTyping - inputValue:", inputValue);

    if(inputValue.length < 2) {
      setCurrentOptionDataList([]); 
      setKeyword("");
    }
    
    //check for input field
    if (event.action && event.action === "input-change") {
      //reflect input text in field
      setInputValue(currentInputValue); 

      if(currentInputValue) {
        console.log("@@ onTextTyping - currentInputValue:", currentInputValue);
        if(currentInputValue.length >= 2) {
          setKeyword(currentInputValue);
          getOptionData(currentInputValue);
        }
          
      }
    }
    // type of event.action
    // 1. input-change = when input is key in ...
    // 2. set-value    = when option is chosen
    // 3. menu-close   = when menu div is closed
    // 4. input-blur   = when no more focus on input
  }

  function onOptionSelected(currentInputOption: any, event :any) {
    console.log("..............................");
    console.log("@@ onOptionSelected - event:", event);
    console.log("@@ onOptionSelected - inputValue:", inputValue);
    console.log("@@ onOptionSelected - currentInputOption:", currentInputOption);

    let currentRef: any = selectRef.current;
    console.log("@@ onOptionSelected - currentRef:", currentRef);
    
    setInputValue("");
    setSelectedOptionData(currentInputOption);
  }

  function onKeyDown(event: any) {
    console.log("..............................");
    console.log("@@ onKeyDown - event:", event);

    if (event.key === 'Enter') {
      console.log("@@ onKeyDown - Enter key is pressed...");
      onSubmit(event);
      setIsEnterPress(true);
    }
    else if (event.key === "Backspace") {
      console.log("@@ onKeyDown - Backspace key is pressed...");
      console.log("@@ onKeyDown - Keyword:", keyword);
      console.log("@@ onKeyDown - selectedOptionData:", selectedOptionData);
      console.log("@@ onKeyDown - inputValue:", inputValue);
    }
  }

  async function onSubmit(event: any) {
    console.log("..............................");
    console.log("@@ onSubmit - event:", event);
    console.log("@@ onSubmit - inputValue:", inputValue);
    console.log("@@ onSubmit - selectedOptionData:", selectedOptionData);

    await getSearchData(); 
  }

  function onClear() {
    console.log("@@onClear ...");
    setInputValue("");
    setSelectedOptionData(null);
    setKeyword("");
  }

  function getOptionData(keyword: string) {

    console.log("..............................");
    console.log("@@getOptionData - keyword:", keyword);
    console.log("@@getOptionData - fullOptionDataList:", fullOptionDataList);

    // select data from fullOptionDataList 
    // and insert it as list into currentOptionDataList
    var optionDataList: any = [];
    fullOptionDataList.forEach((optionData: any) => {
      if (optionData.value.includes(keyword.toLowerCase())){
        optionDataList.push(optionData);
      }
    });
    
    setCurrentOptionDataList(optionDataList);
  }

  async function getSearchData() {
    console.log("..............................");
    const temKeyword = selectedOptionData? selectedOptionData?.value: inputValue? inputValue: "";
    var countLabelMsg = "No result shown... ";
    var chosenDataList:any = [];
    setKeyword(temKeyword);

    console.log("@@ getSearchData - selectedOptionData:", selectedOptionData);
    console.log("@@ getSearchData - inputValue:", inputValue);
    console.log("@@ getSearchData - keyword:", temKeyword);

    var queryPath: string = process.env.NEXT_PUBLIC_QUERY_RESULT_URL? process.env.NEXT_PUBLIC_QUERY_RESULT_URL: "";

    if(temKeyword) { 
      await fetch(queryPath)
      .then((response)=>response.json())
      .then((data)=> {

        console.log("@@getSearchData - data:", data);
        
        data.ResultItems.forEach((result:any)=> {
          if(result.DocumentTitle.Text.toLowerCase().includes(temKeyword.toLowerCase()) ||
             result.DocumentExcerpt.Text.toLowerCase().includes(temKeyword.toLowerCase()))
          chosenDataList.push(result);
        });

        var initialPageLength = chosenDataList.length > 0 ?data.Page: 0;
        if(initialPageLength > 0)
          countLabelMsg = "Showing "+ initialPageLength +" - "+ chosenDataList.length
                +" of "+ data.TotalNumberOfResults +" results";
      })
      .catch((error)=>{
        console.error("xxx getSearchData - Error:", error);
      });
    }

    setResultDataList(chosenDataList);
    setCountLabel(countLabelMsg);
    setIsEnterPress(false);
  }

  function goToWebPage(uri: string) {
    console.log("..............................");
    console.log("@@ goToWebPage - uri:", uri);
    window.open(uri, '_blank');
  }

  useEffect(()=> {
      console.log("..............................");
      console.log("useEffect");
      
      var suggestionPath: string = process.env.NEXT_PUBLIC_SUGGESTION_URL? process.env.NEXT_PUBLIC_SUGGESTION_URL: "";
      
      if(fullOptionDataList.length === 0) {
        fetch(suggestionPath)
        .then(response => response.json())
        .then(data=> {
          console.log("@@useEffect data:", data);
          let optionDataList: any = [];
          for(var i=0; i < data.suggestions.length; i++) {
            optionDataList.push({id: i.toString(), value: data.suggestions[i], label: data.suggestions[i]});
          }
          setFullOptionDataList(optionDataList);
        })
        .catch(error=> {
          console.error("xxx getCompleteOptionDataList - Error:", error);
        });
      }
      
      if(isEnterPress) onSubmit("");

    },[isEnterPress, selectedOptionData]);

  return (
  <>
      <div className="App">
        <div className="banner adjust-padding-div">
          <PImage 
            className="icon-image" 
            src="/images/singapore-lion.png"
            alt="singapore-lion"
          /> 
          <PText 
            className="banner-text" 
            text="An Official Website of the Singapore Government" 
            keyword="Singapore Government"
          />
        </div>

        <div className="search-bar adjust-padding-div" data-testid="my-select-component">
            <PSelect 
              ref={selectRef}		
              name="search-input"
              id="search-input"
              className="search-input"
              classNamePrefix="search-input"
              options={currentOptionDataList}
              onInputChange={onTextTyping}
              inputValue={inputValue}
              onKeyDown={onKeyDown}
              onChange={onOptionSelected}
              value={selectedOptionData}
              onClearClassName="clear-select-button"
              onClearImgClassName="clear-icon"
              onClear={onClear}
              clearIconSrc="/images/clear.png"
              alt="clear-icon"
              keyword={keyword}
            />
            <PButton className="submit-button" 
              onClick={onSubmit}
              imageClassName="submit-search-icon"
              textClassName="submit-search-text"
              src="/images/search.png"
              alt="search-icon"
              text="Search"
            />
        </div>


        <hr className='hr-line' />

        <div className='search-result-div adjust-padding-div'>
          <PText 
            className="show-count-result" 
            text={countLabel}
          />

          {resultDataList.map((result: any, index: number) => (
            <div className='result-div' key={index}>
              <PText 
                className="result-title-text" 
                text={result.DocumentTitle.Text} 
                id={index.toString()} 
                />
              <PText 
                className="result-description-text" 
                text={result.DocumentExcerpt.Text} 
                keyword={keyword} 
                id={index.toString()} 
              />
              <PText 
                className="result-link-text" 
                text={result.DocumentURI} 
                id={index.toString()} 
                onClick={()=>goToWebPage(result.DocumentURI)} 
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}