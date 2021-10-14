import {observable, computed, autorun, reaction, action} from "mobx";

const Proverb = observable({
    proverb : [
        ["할 수 있다, 잘될것이다 라고 결심하라 그리고 나서 방법을 찾아라","에이브러햄 링컨"],
    ["할 수 있다고 믿는 사람은 그렇게 되고 할 수 없다고 믿는 사람 역시 그렇게 된다.","샤를 드골"],
    ["절대 어제를 후회하지 마라 인생은 오늘의 나 안에 있고 내일은 스스로 만드는 것이다.","론허바드"],
    ["한 번의 실패와 영원한 실패를 혼동하지 마라.","스콧 핏 제랄드"],
    ["1퍼센트의 가능성, 그것이 나의 길이다.","나폴레옹"],
    ["꿈을 계속 간직하고 있으면 반드시 실현할 때가 온다.","괴테"],
    ["눈물과 더불어 빵을 먹어보지 않은 자는 인생의 참다운 맛을 모른다.","괴테"],
    ["고난의 시기에 동요하지 않는 것 이것은 진정 칭찬받을 만한 뛰어난 인물의 증거다","베토벤"],
    ["만족할 줄 아는 사람은 진정한 부자이고 탐욕스러운 사람은 진실로 가난한 사람이다.", "솔론"],
    ["자신의 본성이 어떤 것이든 그에 충실하라. 자신이 가진 재능의 끈을 놓아 버리지 마라 본성이 이끄는 대로 따르면 성공할 것이다.","시드니 스미스"],
    ["당신이 할 수 있다고 믿든 할 수 없다고 믿든 믿는 대로 될 것이다.","헨리 포드"],
    ["도저히 손댈 수 없는 곤란에 부딪혔다면 과감하게 그 속으로 뛰어들라. 그리하면 불가능 하다고 생각했던 일이 가능해진다.","키케로"],
    ],

    getRandomProverb(idx : number) : any {
        let title;
        let description;
        const pros = this.proverb[idx];

        title = pros[1];
        description = pros[0];
        return {title, description};
    },

    getRandomNumber() : any{
        const idx  = Math.random() * ((this.proverb.length-1)-1);
        return idx;
    }
});

export {Proverb};