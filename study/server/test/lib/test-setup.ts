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
}