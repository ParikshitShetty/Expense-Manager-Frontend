import {atom} from 'jotai';

export const expensesState = atom({
    exp_name :'',
    exp_amt : 0.0,
    category : '',
    note : ''
  });