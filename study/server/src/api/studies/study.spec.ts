import { expect } from "chai";
import { StudyTest } from "../../../test/lib/test-setup";
import { StudyService, StudyServiceBuilder } from "../../api/index";

const getStudyService =({
    cateogry, 
    title,
    date
}) : StudyService => {
    const sb = new StudyServiceBuilder();
    return sb.setCategory(cateogry).setDate(date).setTitle(title).create();
}

describe('study test',()=>{
    let userId = 28;
    let studyService : StudyService;
    let studyId : number;

    before(async()=>{
        try{
            studyId = await StudyTest.getStudyId(userId);
        }catch(e){ 
            console.error(e);
            process.exit(1);
        }
    })

    describe('get study',()=>{
        before(()=>{
           studyService = getStudyService({
               cateogry :undefined,
               title : undefined,
               date : '2021-10-14'
           });
        });

        it('get test',(done)=>{
            new Promise(function(resolve){
                resolve(studyService.get(userId))
            })
            .then(function(result){
                const [data] = result[0];

                expect(result[0]).to.be.a('array');
                expect(data).to.have.property('id');
                expect(data).to.have.property('user_id');
                expect(data).to.have.property('study_category');
                expect(data).to.have.property('study_title');
                expect(data).to.have.property('study_time');
                expect(data).to.have.property('created_datetime');
                expect(result[1]).to.be.a('undefined');
                done();
            })
        })
    });

    describe('add study',()=>{
        before(()=>{
            studyService = getStudyService({
                cateogry :"수학",
                title : "수학 테스트",
                date : '2021-10-14'
            });
         });

         it('add test',(done)=>{
            new Promise(function(resolve){
                resolve(studyService.create(userId))
            })
            .then(function(result){

                expect(result[0]).to.be.eql(true);
                expect(result[1]).to.be.a('undefined');
                done();
            })
        })
    });

    describe('delete study',()=>{
        before(()=>{
            studyService = getStudyService({
                cateogry : undefined,
                title : undefined,
                date : undefined
            });
         });

         it('delete test',(done)=>{
            new Promise(function(resolve){
                resolve(studyService.delete(studyId))
            })
            .then(function(result){

                expect(result[0]).to.be.eql(true);
                expect(result[1]).to.be.a('undefined');
                done();
            })
        })
    });
});