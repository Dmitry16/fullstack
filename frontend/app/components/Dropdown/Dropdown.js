import React from 'react';
import Select from 'react-select';

class Dropdown extends React.PureComponent {
  render() {
    const customStyles = {
      control: styles => ({ ...styles, backgroundColor: 'white',
       width: '150px', textOverflow: 'ellipsis',
       whiteSpace: 'nowrap',
       overflow: 'hidden',
     }),
      input: styles => ({ ...styles }),
      placeholder: styles => ({ ...styles }),
      singleValue: (styles, { data }) => ({ ...styles, color: 'steelblue' })
    };

    const options = [
      { value: 'chocolate', label: 'Chocolate bla bla', color: 'brown' },
      { value: 'strawberry', label: 'Strawberry bla bla bla', color: 'red' },
      { value: 'vanilla', label: 'Vanilla bla bla bla', color: 'darkorange' }
    ]

    return (
      <Select
        defaultValue={options[2]}
        label="Single select"
        options={options}
        styles={customStyles}
      />
    )
  }
}

export default Dropdown;