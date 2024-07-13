// Expense Calculator

const dayWiseExpenseCalculator = (filteredExpenses) => {
    // For datewise addition
    let newArray = [];
    let pointer1 = ''; // To store date
    let total_amount = 0;
    const arrayLength = filteredExpenses.length;

    for (let index = 0; index < arrayLength; index++) {
        const element = filteredExpenses[index];
        const pointer2 = element.exp_created;
        
        if (pointer1 === '') { // For first element
            pointer1 = pointer2;
            total_amount = 0;
            total_amount += element.exp_amt;
            if (arrayLength === 1) 
                newArray.push({ exp_created:pointer1, exp_amt:total_amount});
        }
        else if(pointer1 !== pointer2){ // When the date changes
            newArray.push({ exp_created:pointer1, exp_amt:total_amount});
            pointer1 = pointer2
            total_amount = 0;
            total_amount += element.exp_amt;
            if (arrayLength === (index+1)) 
                newArray.push({ exp_created:pointer1, exp_amt:total_amount});
        }            
        else{ // For the last element
            total_amount += element.exp_amt;
            if (arrayLength === (index + 1)) 
                newArray.push({ exp_created:pointer1, exp_amt:total_amount});
        }
    }
    return newArray;
}

// For monthwise expense addition
const monthWiseExpenseCalculator = (filteredExpenses,calendar) =>{
    let newArray = [];
    let pointer1 = '';
    let total_amount = 0;
    const arrayLength = filteredExpenses.length;

    for (let index = 0; index < arrayLength; index++) {
      const element = filteredExpenses[index];
      const pointer2 = element.exp_created;

      if (pointer1 === '') {    // For first element
          pointer1 = pointer2;
          total_amount = 0;
          total_amount += element.exp_amt;
          if (arrayLength === 1){
              const currentMonthObj = new Date(pointer1);
              const object = calendar.find(months => months.number === (currentMonthObj.getMonth() + 1));
              newArray.push({ exp_created:object.month, exp_amt:total_amount});
          }
      }
      else if(pointer1 !== pointer2){   // When the date changes
          const currentMonthObj = new Date(pointer1);
          const object = calendar.find(months => months.number === (currentMonthObj.getMonth() + 1));
          newArray.push({ exp_created:object.month, exp_amt:total_amount});
          pointer1 = pointer2
          total_amount = 0;
          total_amount += element.exp_amt;
          if (arrayLength === index+1){
            const currentMonthObj = new Date(pointer1);
            const object = calendar.find(months => months.number === (currentMonthObj.getMonth() + 1));
            newArray.push({ exp_created:object.month, exp_amt:total_amount});
          }
      }            
      else{ // For the last element
          total_amount += element.exp_amt;
          if (arrayLength === index+1) {
            const currentMonthObj = new Date(pointer1);
            const object = calendar.find(months => months.number === (currentMonthObj.getMonth() + 1));
            newArray.push({ exp_created:object.month, exp_amt:total_amount});
          }
      }
    }

    let finalArray = [];
    calendar.map((month) =>{
        const array = [...newArray].filter(arr => arr.exp_created === month.month);
        let totalPrice = 0;
        array.forEach((elem) =>{
          totalPrice += elem.exp_amt
        });
        if (array.length) {
          finalArray.push({ exp_created:array[0].exp_created, exp_amt:totalPrice})
        }
    });
    return finalArray;
}

export { monthWiseExpenseCalculator , dayWiseExpenseCalculator }