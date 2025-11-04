export const generateOtp =()=>{
    return Math.ceil(Math.random()*9999 + 10000)as unknown as string;

}

export const generateExpiryDate =(time : number)=>{
  return Date.now() + time as unknown as Date;
}