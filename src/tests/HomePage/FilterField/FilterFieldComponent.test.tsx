import { describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContextWrapper from '@/ContextWrapper';
import FilterField from '@/components/FiltersWrapper/FilterField';

import type { DropDownOption } from '@/types/global';

describe('FilterField Component', () => {
  it('should render FilterField Component with title and SelectDropdown', async () => {
    const fieldName = 'TestField';
    const options: DropDownOption[] = [
      {
        value: 'Test Value',
        label: 'Test Label',
      },
    ];
    const onChange = (): void => {
      // console.log(value);
    };
    const changeOnSelect = true;
    render(
      <ContextWrapper>
        <FilterField
          fieldName={fieldName}
          options={options}
          onChange={onChange}
          changeOnSelect={changeOnSelect}
          customCascaderStyle=""
        />
      </ContextWrapper>
    );

    const selectDropdown = screen.getByTestId('dropdown-TestField')
      .firstChild as Element;
    await userEvent.click(selectDropdown);
    await waitFor(() => {
      expect(screen.queryByText('Test Label')).toBeInTheDocument();
    });
  });
});
