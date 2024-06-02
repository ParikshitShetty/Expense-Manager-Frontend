// API call function resuable across app
const expensesGetter = async(setExpensesArray,navigator) => {
    try {
      const url = import.meta.env.VITE_EXPENSES_GETTER_URL;
      const options = {
        method: "GET", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      };
      const response = await fetch(url,options);
      if (!response.ok) {
        if (navigator && response.status === 401) navigator('/login');
        throw new Error("Error while fetching expense");
      }
      const respJson = await response.json();
      // console.log("respJson",respJson)
      setExpensesArray(respJson.data);
    } catch (error) {
        console.error("Error while making api request",error);
    }  
}

export { expensesGetter };