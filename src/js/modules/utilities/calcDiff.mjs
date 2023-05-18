export function timeDiff(timeValue) {
    const today = Date.parse(new Date());
    const parsed = Date.parse(timeValue);
  
    const diff = parsed - today;
    const inSeconds = diff / 1000;
    const minutes = Math.floor(inSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const newHours = hours - days * 24 - 1; 
    const newMin = minutes - hours * 60;
  
    if(days < 0){
      return "Ended"
    };
  
    return `${days}D ${newHours}H ${newMin}M`;
  }