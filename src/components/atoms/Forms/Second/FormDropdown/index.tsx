import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import 'rc-slider/assets/index.css'
import Dropdown, { Option } from 'react-dropdown'
import 'react-dropdown/style.css'

type Props = {
  width?: number
  options: Option[]
  selectReason: Option
  onChange: (arg: Option) => void
}

export const FormDropdown = ({ width, options, selectReason, onChange }: Props) => {
  const setReason = (arg: Option) => {
    if (typeof arg.label === 'string') {
      onChange({ value: arg.value, label: arg.label })
    }
  }

  return (
    <DropdownWrapper width={width}>
      <Dropdown
        options={options}
        value={selectReason}
        onChange={(arg) => setReason(arg)}
        placeholder='select reason ...'
      />
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.div<{ width?: number }>`
  width: ${({ width }) => `${width}px` ?? '100%'};

  .Dropdown-control {
    width: 100%;
    padding: 5px 12px;
    ${fontStyles['16px']};
    color: ${Color.BLACK};
    font-weight: 400;
    background-color: ${Color.WHITE};
    background-clip: padding-box;
    border: 1px solid ${Color.WHITE};
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(${Color.BLACK}, 0.075);
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  .Dropdown-menu {
    background-color: ${Color.WHITE};
    background-clip: padding-box;
    border: 1px solid ${Color.WHITE};
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(${Color.BLACK}, 0.075);
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
`
