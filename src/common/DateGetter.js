// Common functions

// To get the current and nextday objects
const currentDayGetter = (currentDate) =>{
    const day = new Date(currentDate);
    const nextDay = new Date(day);
    return { day,nextDay };
};

// To update the date state accodingly
const dateUpdater = (nextDay,setCurrentDate) => {
    const paddedMonth = (nextDay.getMonth() + 1).toString().padStart(2, "0");
    const paddedDay = nextDay.getDate().toString().padStart(2, "0");
    const date = nextDay.getFullYear() + '-' + paddedMonth + '-' + paddedDay;
    
    setCurrentDate(date);
};

export { currentDayGetter, dateUpdater };