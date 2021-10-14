export const expiredInDate = (): string => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  let month: string | number = newDate.getMonth() === 12 ? (1) : (newDate.getMonth()+1);
  let date:string | number = newDate.getDate();
  
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;

  return `${year}${month}${date}`;
}

