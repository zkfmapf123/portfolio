import { DBRepo } from './common/utils/index';


(async()=>{
    try{
        const [row] = await DBRepo.getResult({
            query : 'select id from user_todos where user_id = ? limit 1',
            params : `${28}`
        });

        console.log(row);

        
    }catch(e){
        throw e;
    }
})();
export const getTodoId = async(userId : number) =>{

};