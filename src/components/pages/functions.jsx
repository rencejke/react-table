import React from 'react'


export const DebouncedInputSearch = ({
    value: initialValue,
    onChange,
    debounce = 1000,
    ...props
  }) => {
    const [value, setValue] = React.useState(initialValue);
  
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
  
    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);
  
      return () => clearTimeout(timeout);
    }, [value]);
  
    return (
      <div className="relative w-full">
        <input
          {...props}
          value={value}
          type="search"
          onChange={(e) => setValue(e.target.value)}
          className="placeholder:text-gray-400 placeholder:font-normal "
        />
      </div>
    );
  };
  
  export const Filter = ({ column }) => {
    const columnFilterValue = column.getFilterValue();
  
    return (
      <>
        <DebouncedColumnFilter
          type="text"
          value={columnFilterValue ?? ""}
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Filter...`}
          className="w-[90%] border  rounded placeholder:text-gray-400 placeholder:font-normal"
          list={column.id + "list"}
        />
        <div className="h-1" />
      </>
    );
  };
  
  export const DebouncedColumnFilter = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }) => {
    const [value, setValue] = React.useState(initialValue);
  
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
  
    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);
  
      return () => clearTimeout(timeout);
    }, [value]);
  
    return (
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }