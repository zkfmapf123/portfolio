import {observable, computed, autorun, reaction, action} from "mobx";

const MyInfo = observable({
    nickName : " ",
    todayProverb : [
        "시작이 반이다",
        "오늘은 오늘의 해가 뜬다",
        "너는 가능성이 많아",
        "할 수 있 다",
        "천리길도 한걸음 부터"
    ],

    setNickname(name : string) : void{
        this.nickName = name;
    },

    getNickname() : string{
        return this.nickName;
    },

    getProverb() : string{
        const idx = this.getRandomNumber();
        return this.todayProverb[idx];
    },

    getRandomNumber() : number{
        let idx = Math.random() * ((this.todayProverb.length-1)-1);
        idx = Math.floor(idx);

        return idx;
    }
});

export {MyInfo};