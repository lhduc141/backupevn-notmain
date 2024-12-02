import { Input, InputProps, InputRef } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
type InputSearchV2Props = Omit<InputProps, 'onChange'> & {
  loading?: boolean;
  onChange?: (value: string) => void;
  debounceTime?: number;
  value?: string;
  isDebounce?: boolean;
};
const InputSearchV2 = ({
  loading,
  onChange,
  debounceTime,
  value,
  placeholder,
  onFocus,
  onBlur,
  isDebounce,
  size = 'middle',
  onPressEnter,
  ...props
}: InputSearchV2Props) => {
  const [tempValue, setTempValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const debounceHandleChange = useCallback(
    debounce((nextValue: string) => {
      if (!loading) {
        if (onChange) onChange(nextValue.trim());
      }
    }, debounceTime || 1000),
    []
  );
  const handleChangeVal = (value: string) => {
    if (!loading) {
      if (onChange) onChange(value);
    }
  };
  const refInput = useRef<InputRef>(null);
  useEffect(() => {
    if (refInput.current && refInput.current.input && !isFocus) {
      setTempValue(value?.toString() || '');
      refInput.current.input.value = value || '';
    }
  }, [value]);
  return (
    <Input.Search
      prefixCls='input-search-v2'
      value={tempValue}
      size={size}
      placeholder={placeholder}
      ref={refInput}
      onFocus={(e) => {
        setIsFocus(true);
        if (onFocus) onFocus(e);
        e.target.select();
      }}
      onBlur={(e) => {
        setIsFocus(false);
        if (onBlur) onBlur(e);
      }}
      onChange={(e) => {
        setTempValue(e.target.value);
        if (isDebounce === false) {
          handleChangeVal(e.target.value);
        } else {
          debounceHandleChange(e.target.value);
        }
      }}
      onPressEnter={onPressEnter}
      {...props}
    />
  );
};
export default InputSearchV2;
