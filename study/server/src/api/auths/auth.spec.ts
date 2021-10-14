import supertest from 'supertest';
import routerPath from '../../common/router.path';
import testUtils from '../../../test/lib/utils';
import {JoinDto, LoginDto } from './auth.dto';
import { expect } from 'chai';
import { AuthTest } from '../../../test/lib/test-setup';
import { request } from 'express';

const loginDto : LoginDto = {
    email: 'zkfmapf123@naver.com',
    password: 'dl1ehd2rb3!'
};

const joinDto : JoinDto = {
    email: 'admin@admin',
    password: '1234',
    name: 'admin',
    sex : false,
    age : 0,
};

describe('auth test',()=>{

    describe('login test',()=>{

        it('no exists email (login fail)',(done)=>{
            supertest(testUtils.TEST_URL).post(`${routerPath.AUTH}${routerPath.LOGIN}`)
            .send({
                data : {
                    ...loginDto,
                    email : "akdsnfasdf@naver.comasf"
                }
            })
            .end((err, res)=>{
                expect(res.body.status).to.be.eql(204);
                expect(res.body.message).to.be.eql('존재하지 않은 이메일입니다');
                done();
            })
        });

        it('wrong password (login fail)',(done)=>{
            supertest(testUtils.TEST_URL).post(`${routerPath.AUTH}${routerPath.LOGIN}`)
            .send({
                data : {
                    ...loginDto,
                    password : "asdflasdf"
                }
            })
            .end((err, res)=>{
                expect(res.body.status).to.be.eql(204);
                expect(res.body.message).to.be.eql('비밀번호가 틀립니다');
                done();
            })
        });

        it('login pass (login success)',(done)=>{
            supertest(testUtils.TEST_URL).post(`${routerPath.AUTH}${routerPath.LOGIN}`)
            .send({
                data : loginDto
            })
            .end((err, res)=>{
                expect(res.body.token).to.be.a('string');
                expect(res.body.message).to.be.eql('로그인 성공');
                done();
            })
        });
    });

    describe('join test',()=>{
        
        it('is already email (join fail)',(done)=>{
            supertest(testUtils.TEST_URL).post(`${routerPath.AUTH}${routerPath.JOIN}`)
            .send({
                data : {
                    email : 'zkfmapf123@naver.com',
                    name : 'leedonggyu'
                }
            })
            .end((err ,res)=>{
                expect(res.body.status).to.be.eql(204);
                expect(res.body.message).to.be.eql('존재하는 이메일 입니다');
                done();
            });
        });

        it('create user (join success)',(done)=>{
            supertest(testUtils.TEST_URL).post(`${routerPath.AUTH}${routerPath.JOIN}`)
            .send({
                data: joinDto
            })
            .end((err, res)=>{
                expect(res.body.token).to.be.a('string');
                expect(res.body.message).to.be.eql('회원가입 성공');
                done();
            })
        });

        after(async()=>{
            try{
                AuthTest.deleteUsers('admin');
            }catch(e){
                console.error(e);
                process.exit(1);
            }
        });
    });

    describe('logout',()=>{
        it('logout test',(done)=>{
            supertest(testUtils.TEST_URL).delete(`${routerPath.AUTH}${routerPath.LOGOUT}`)
            .send({})
            .end((err, res)=>{
                expect(res.body.status).to.be.eql(200);
                expect(res.body.message).to.be.eql('로그아웃 하였습니다')
                done();
            })
        })
    })

    // describe('forget password test',()=>{

    //     it('send email with rename password',(done)=>{
    //         supertest(testUtils.TEST_URL).put(`${routerPath.AUTH}${routerPath.FORGET}`)
    //         .send({
    //             data: {
    //                 email : "zkfmapf123@naver.com"
    //             }
    //         })
    //         .end((err, res)=>{
    //             expect(res.body.status).to.be.eql(200);
    //             expect(res.body.message).to.be.eql('임시 비밀번호를 전송하였습니다')
    //             done();
    //         });
    //     });
    // });
});