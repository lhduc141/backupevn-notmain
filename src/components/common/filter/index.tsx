import FilterCheckboxRadio from './CheckRadio';
import FilterCheckbox from './Checkbox';
import FilterCheckboxSearch from './CheckboxSearch';
import FilterOrigin from './Filter';
import FilterRadio from './Radio';

export type FilterProps = typeof FilterOrigin & {
  Checkbox: typeof FilterCheckbox;
  Radio: typeof FilterRadio;
  CheckRadio: typeof FilterCheckboxRadio;
  CheckboxSearch: typeof FilterCheckboxSearch;
};
const Filter = FilterOrigin as FilterProps;

Filter.Checkbox = FilterCheckbox;
Filter.Radio = FilterRadio;
Filter.CheckRadio = FilterCheckboxRadio;
Filter.CheckboxSearch = FilterCheckboxSearch;

export { Filter };
