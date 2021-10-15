import moment from 'moment';
import {DBRepo} from '../../src/common/utils/index';

export namespace AuthTest {

    export const deleteUsers = async(name : string) =>{
        try{
            await DBRepo.getResult({
                query : 'delete from users where name = ?',
                params : `${name}`
            });
        }catch(e){
            throw e;
        }
    };
};

export namespace TodoTest {

    export const getTodoId = async(userId : number) =>{
        try{
            const [row] = await DBRepo.getResult({
                query : 'select id from user_todos where user_id = ? limit 1',
                params : `${userId}`
            });

            return row[0].id;
        }catch(e){
            throw e;
        }
    }
};

export namespace StudyTest {
    
    export const getStudyId = async(userId : number) => {
        try{
            const [row] = await DBRepo.getResult({
                query : 'select id from user_study where user_id = ? limit 1',
                params : `${userId}`
            });
            
            return row[0].id;
        }catch(e){
            throw e;
        }
    }
};

export namespace StatisticTest {

    export const getTodayString = () :string =>{
        const year = moment().year();
        const month = moment().month()+1;
        const date = moment().date();

        return `${year}${month}${date}`;
    };

    export const getPrevAndNextData = () : [string, string] =>{
        const year = moment().year();
        const month = moment().month()+1;
        const date = moment().date();

        const prevDate = `${year}${month-1}${date}`;
        const nextDate = `${year}${month}${date}`;

        return [prevDate, nextDate];
    }
}