import { describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContextWrapper from '@/ContextWrapper';
import FilterField from '@/components/FiltersWrapper/FilterField';

import type { DropDownOption } from '@/types/global';

describe('FilterField Component', () => {
  it('should render FilterField Component with title and SelectDropdown', async () => {
    const fieldName = 'Test Field';
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
        />
      </ContextWrapper>
    );

    const selectDropdown = await screen.getByRole('combobox');
    waitFor(() => {
      userEvent.click(selectDropdown);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Value')).toBeInTheDocument();
    });
  });
});
