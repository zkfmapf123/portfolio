export default{
    
    numberToStringTime : (time : number) : string =>{
        let hour : number = parseInt(time/3600);
        let min : number = parseInt((time%3600)/60);
        let sec : number = time % 60;

        const stringHour : string = (hour < 10) ? `0${hour}` : `${hour}`;
        const stringMin : string = (min<10) ? `0${min}` : `${min}`;
        const stringSec : string = (sec<10) ? `0${sec}` : `${sec}`;

        return `${stringHour}:${stringMin}:${stringSec}`;
    },

    stringToNumberTime : (timeString : string) : number =>{
        const time : Array<string> = timeString.split(":");
        
        let hour : number = +time[0].trim();
        let min : number = +time[1].trim();
        let sec : number = +time[2].trim();

        hour = hour * 3600;
        min = min * 60;
        
        return (hour + min + sec);
    }
}