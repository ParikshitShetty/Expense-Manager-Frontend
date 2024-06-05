
const editExpense = 
    async(expenseData,currentDate,expenseId,setExpenseId,setExpenseData,setActivatePrompt,setCategoryToggle,toast,navigator) =>{
    const form_validator = expenseData.exp_name !== "" && expenseData.exp_amt !== "" && expenseData.category !== "" && currentDate !== "";

    if (!form_validator) {
        (async function notify(){
            toast.info("Please select the expense to be added", {
              position: "top-right"
            });
        })();
        return
    } 
    try {
      const url = import.meta.env.VITE_EXPENSES_EDITOR_URL;
      const options = {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
        body: JSON.stringify({...expenseData,"date":currentDate,"exp_id":expenseId})
      };
      const response = await fetch(url,options);
      if (!response.ok) {
        if (response.status === 401) navigator('/login');
        throw new Error("Error while adding expense");
      }

      const respJson = await response.json();
      console.log("respJson",respJson);

      toast.success("Expense Added", {
        position: "top-right"
      });
      setExpenseData({
        exp_name :'',
        exp_amt : 0.0,
        category : '',
        note : ''
      });
      setActivatePrompt(false);
      setCategoryToggle(false);
      // Call getter function to update the latest expenses
    //   expensesGetter(setExpensesArray,navigator);
    } catch (error) {
      toast.error("Error while adding expense", {
        position: "top-right"
      });
      console.error("Error while making api request",error);
    }finally{
        setExpenseId(null);
    }
}

export { editExpense };