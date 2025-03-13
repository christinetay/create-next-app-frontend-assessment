import { vi, expect, test, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import PText from '../components/PText/PText';
import PInput from '../components/PInput/PInput';
import PButton from '../components/PButton/PButton';
import PImage from '../components/PImage/PImage';
import PSelect from '../components/PSelect/PSelect';
 
// =========================================
// UNIT TEST - INDIVIDUAL COMPONENT TESTING
// =========================================

// Manually call cleanup after each test
afterEach(() => {
  cleanup();
});

test('is PText Component working? [UNIT TEST]', () => {
  const text = "The testing is good";
  const keyword = "testing";
  const handleClick = vi.fn();

  // render the element of PText
  render(<PText text={text} keyword={keyword} 
                onClick={handleClick} 
        />);

  // get the element which contains keyword
  const keywordElement = screen.getByText(keyword);
  
  // click keyword element and 
  // expect to call it handleClick function once
  fireEvent.click(keywordElement); 
  expect(handleClick).toHaveBeenCalledTimes(1);

  // expect keyword is in bold form
  expect(keywordElement.tagName).toBe('B');
  
});


test('is PInput Component working? [UNIT TEST]', () => {
  const type = "text";
  const id = "test-input";
  const name = "test-input";
  const className = "input-class";
  const keyInValue = "This is testing";
  const handleChange = vi.fn();

  // render the element of PInput
  render(<PInput type={type} id={id} name={name} 
                  className={className} 
                  onChange={handleChange}
        />);

  // get the element of input text 
  // expect the element is present
  const element = screen.getByRole('textbox');
  expect(element).toBeInTheDocument();

  // key in value
  // expect handleChange once
  // expect to have keyInValue
  fireEvent.change(element, { target: { value: keyInValue } });
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(element).toHaveValue(keyInValue);
});

test('is PImage Component working? [UNIT TEST]', () => {
  const imgClassName = "button-class";
  const altText = 'Example Image';
  const imageUrl = 'https://example.com/image.jpg';


  // render the element of PImage
  render(<PImage imageClassName={imgClassName} 
                 alt={altText} src={imageUrl} 
        />);

  // get the image element
  // expect image element is present
  // expect image element have the attribute of alt [value: altText]
  // expect image element have the attribute of src [value: imageUrl]
  const imageElement = screen.getByRole("img");
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute("alt", altText);
  expect(imageElement).toHaveAttribute("src", imageUrl);
});

test('is PButton Component working? [UNIT TEST]', () => {
  const text = "Test";
  const className = "button-class";
  const imgClassName = "button-class";
  const altText = 'Example Image';
  const imageUrl = 'https://example.com/image.jpg';
  const handleClick = vi.fn();

  // render the element of PButton
  render(<PButton className={className} onClick={handleClick}
          imageClassName={imgClassName} alt={altText} src={imageUrl}
          text={text} 
        />);

  // get the element of button, mainElement
  // expect mainElement is present
  // click mainElement
  // expect handleClick have been called for 1 times
  const mainBtnElement = screen.getByRole("button");
  expect(mainBtnElement).toBeInTheDocument();
  fireEvent.click(mainBtnElement);
  expect(handleClick).toHaveBeenCalledTimes(1);

  // get the element of image, imageElement
  // expect imageElement to be in the document
  // expect imageElement have the attribute of alt [value: altText]
  // expect imageElement have the attribute of src [value: imageUrl]
  const imageElement = screen.getByRole("img");
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute("alt", altText);
  expect(imageElement).toHaveAttribute("src", imageUrl);

  // get the element of text, textElement
  // expect textElement is present
  const textElement = screen.getByText(text);
  expect(textElement).toBeInTheDocument();
});

test('is PSelect Component working? [UNIT TEST]', async() => {
  const className = "select-class";
  const selectAction = "select-option";
  const escape = "Escape";
  const keyInValue = "This is testing";
  const options: any = [
    { value: "chocolate", label: "Chocolate" },
    { value: "vanilla", label: "Vanilla" },
    { value: "strawberry", label: "Strawberry" }
  ];
  const handleChange = vi.fn();
  const handleInputChange = vi.fn();
  const handleBtnClick = vi.fn();

  // render the element of PSelect
  render(<PSelect className={className} onChange={handleChange}
                  onInputChange={handleInputChange} options={options} 
                  value="" keyword={keyInValue} onClear={handleBtnClick}
          />);

  // get the element of combobox, mainElement
  // expect mainElement is present
  const mainElement = await screen.findByRole("combobox");
  expect(mainElement).toBeInTheDocument();

  // click the mainElement
  // get the element of 1st label, optionElement1
  // get the element of 2nd label, optionElement2
  // get the element of 3rd label, optionElement3
  // expect optionElement1 is present
  // expect optionElement2 is present
  // expect optionElement3 is present
  fireEvent.mouseDown(mainElement);
  const optionElement1 = screen.getByText(options[0].label);
  const optionElement2 = screen.getByText(options[1].label);
  const optionElement3 = screen.getByText(options[2].label);
  expect(optionElement1).toBeInTheDocument();
  expect(optionElement2).toBeInTheDocument();
  expect(optionElement3).toBeInTheDocument();

  // click optionElement1
  // expect handleChange have been called for 1 times
  // expect handleChange is called and return selected value
  // wait and expect menu close and optionElement1 is not present
  fireEvent.click(optionElement1);
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledWith(
    expect.objectContaining(options[0]),
    expect.objectContaining({ action: selectAction })
  );
  await waitFor(() => {
    expect(optionElement1).not.toBeInTheDocument();
  });

  // press esc
  // expect mainElement have empty value
  fireEvent.keyDown(mainElement, { key: escape, code: escape });
  expect(mainElement).toHaveValue('');

  // key in value
  // expect handleInputChange is called
  // expect mainElement have same value of keyInValue
  fireEvent.change(mainElement, { target: { value: keyInValue }});
  expect(handleInputChange.mock.calls.length).toBeGreaterThan(1);
  expect(mainElement).toHaveValue(keyInValue);

  // press x icon button
  // expect mainElement have empty value
  const xBtnElement = screen.getByRole("button");
  expect(xBtnElement).toBeInTheDocument();
  fireEvent.click(xBtnElement);
  expect(handleBtnClick).toHaveBeenCalledTimes(1);
  
  // press esc
  // expect mainElement have empty value
  fireEvent.keyDown(mainElement, { key: escape, code: escape });
  expect(mainElement).toHaveValue('');
});

