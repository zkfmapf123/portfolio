import { assert, expect } from "chai";
import {TodoService, TodoServiceBuilder} from "../../api/index";
import { TodoTest } from "../../../test/lib/test-setup";

const userId = 28;
const getTodoService = ({
    id, 
    title,
    date
}) : TodoService =>{
    const Tb = new TodoServiceBuilder();
    return Tb.setId(id).setTitle(title).setDate(date).create();
};

describe('todo unit test',()=>{
    let todoService : TodoService;
    let todoId : number;

    before(async()=>{
        try{    
            todoId = await TodoTest.getTodoId(userId);
        }catch(e){
            console.error(e);
            process.exit(1);
        }
    })

    describe('get test',()=>{
        before(()=>{
            todoService = getTodoService({
                id : undefined,
                title : undefined,
                date : '2021-10-14',
            });
        });

        it('todo get', function(done){
            new Promise(function(resolve){
                resolve(todoService.get(userId));   
            })
            .then(function(result){
                const [data ,err] = result[0];
                
                expect(data).to.be.a('array');
                expect(err).to.be.a('undefined');
                expect(data[0]).to.have.property('id');
                expect(data[0]).to.have.property('user_id');
                expect(data[0]).to.have.property('tood');
                expect(data[0]).to.have.property('isComplete');
                expect(data[0]).to.have.property('created_datetime');
                done();
            })

            done();
        });
    })

    describe('create test',()=>{
        before(()=>{
            todoService = getTodoService({
                id : undefined,
                title : 'todo test',
                date : undefined
            });
        });
        
        it('create test',(done)=>{
            new Promise(function(resolve){
                resolve(todoService.create(userId))
            })
            .then(function(result){
                expect(result[0]).to.be.eql(true);
                expect(result[1]).to.be.a('undefined');
                done();
            })
        });
    });

    describe('update test',()=>{
        before(()=>{
            todoService = getTodoService({
                id : undefined,
                title : 'update test',
                date : undefined
            });
        });

        it('update test',(done)=>{
            new Promise(function(resolve){
                resolve(todoService.update(todoId));
            })
            .then(function(result){
                expect(result[0]).to.be.eql(true);
                expect(result[1]).to.be.a('undefined');
                done();
            })
        });
    });

    
    describe('check test',()=>{
        
        before(()=>{
            todoService = getTodoService({
                id : undefined,
                title :undefined,
                date : undefined
            });
        });

        it('check test',(done)=>{
            new Promise(function(resolve){
                resolve(todoService.check(todoId))
            })
            .then(function(result){
                expect(result[0]).to.be.eql(true);
                expect(result[1]).to.be.a('undefined');
                done();
            })    
        });
    });

    describe('delete test',()=>{

        before(()=>{
            todoService = getTodoService({
                id : undefined,
                title :undefined,
                date : undefined
            });
        });

        it('delete test',(done)=>{
            new Promise(function(resolve){
                resolve(todoService.delete(todoId))
            })
            .then(function(result){
                expect(result[0]).to.be.eql(true);
                expect(result[1]).to.be.a('undefined');
                done();
            })    
        });
    });
});