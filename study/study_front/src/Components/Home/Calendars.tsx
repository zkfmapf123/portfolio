import React, { useState } from "react";
import st from "styled-components/native";
import DAY from "~/Library/Day";
import { Dimensions } from "react-native";
import { Color } from "~/Library/Color";
import { Calendar } from "react-native-calendars";

const DEVISE_WIDTH = Math.floor(Dimensions.get('window').width);

interface Props{
    onPress:(data : any)=>void
}

const Calendars = ({onPress} : Props)=>{
    const [today, setToday] = useState<string>(`${DAY.CURRENT_YEAR}-${DAY.ZERO_CURRENT_MONTH}-${DAY.ZERO_CURRENT_DATE}`);

    const mark : any ={
        [today] : {selected: true,
                   selectedColor:`${Color.CAL_TITLE_TEXT_COLOR}`
        }
    }

    return(
        <Calendar
            pastScrollRange={1}
            futureScrollRange={1}
            horizontal={true}
            pagingEnabled={false}
            onDayPress={onPress}
            markedDates={mark}
            //markedDates={}
            style={{
                backgroundColor : Color.ENTIRE_BOX_INNER_COLOR,
                width : DEVISE_WIDTH-50,
                marginBottom : 20,
            }}
            theme={{
                
                monthTextColor : `${Color.CAL_TEXT_NORMAL_COLOR}`,
                arrowColor : `${Color.CAL_TEXT_NORMAL_COLOR}`,
                selectedDayTextColor : `${Color.CAL_TEXT_NORMAL_COLOR}`,
                //indicatorColor : "blue",
                textSectionTitleColor : `${Color.CAL_TEXT_NORMAL_COLOR}`,
                //todayTextColor : "red",
                selectedDayBackgroundColor : `${Color.CAL_TEXT_NORMAL_COLOR}`,
                //backgroundColor : "red",
                //textDisabledColor : "red",
                dayTextColor : `${Color.CAL_TEXT_NORMAL_COLOR}`,
                //dotColor : "red",
                //selectedDotColor : "blue",
                calendarBackground : `${Color.ENTIRE_BOX_INNER_COLOR}`
            }}
        />
    );
};

export default Calendars;