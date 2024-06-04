import {atom} from 'jotai';

// For form Data
export const expensesState = atom({
    exp_name :'',
    exp_amt : 0.0,
    category : '',
    note : ''
  });

export const currentDateState = atom('');
export const activatePromptState = atom(false);

export const expensesArrayState = atom([]);

export const categoryToggleState = atom(false);

// View Handler states
export const viewState = atom('day');//day
export const currentMonthState = atom('');

// Date object in format { "month" : "February","number":2, 'year':2024 }
export const currentDateObjState = atom({});
