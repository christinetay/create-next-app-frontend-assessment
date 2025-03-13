
export type PSelectModel = {
  ref?: any;
  name?: string;
  id?: string;
  className?: string;
  classNamePrefix?: string;
  value?: string;
  defaultValue?: string;
  inputValue?: string;

  onInputChange?: (value: any, event: any) => void;
  onChange?: (value: any, event: any) => void;
  onKeyDown?: (event: any) => void;
  onBlur?: (event: any) => void;

  menuIsOpen?: boolean;
  options?: [];

  onClearClassName?: string;
  onClear?: () => void;
  onClearImgClassName?: string;
  clearIconSrc?: string;
  alt?: string;

  keyword?: string;

}