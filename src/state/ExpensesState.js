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