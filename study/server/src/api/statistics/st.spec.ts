import { expect } from "chai";
import { StatisticTest } from "../../../test/lib/test-setup";
import { StatisticService } from "./st.services";

let userId = 28;

describe('statistic test',()=>{

    it('statistic test',(done)=>{
        const [prevDate, nextDate] = StatisticTest.getPrevAndNextData();
        const stService = new StatisticService(userId);

        new Promise(function(resolve){
            resolve(stService.getStatistic({
                prevDate : prevDate,
                nextDate : nextDate
            }))
        })
        .then(function(result){
            const {weekGraph, weekTotal} = result[0];
            expect(weekGraph).to.have.property('sum');
            expect(weekGraph).to.have.property('date');
            expect(weekTotal[0]).to.have.property('study_category');
            expect(weekTotal[0]).to.have.property('study_title');
            expect(weekTotal[0]).to.have.property('study_time');
            expect(result[1]).to.be.a('undefined');
            done();
        })
    });

    it('statistic study test',(done)=>{
        const date = StatisticTest.getTodayString();
        const stService = new StatisticService(userId);

        new Promise(function(resolve){
            resolve(stService.getStudyStatistic({date : date}))
        })
        .then(function(result){
            const {myStudyTime, otherStudyTime} = result[0];

            expect(myStudyTime).to.be.a('number');
            expect(otherStudyTime).to.be.a('number');
            expect(result[1]).to.be.a('undefined');
            done();
        });
    })

});
