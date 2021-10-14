import supertest from "supertest";
import { expect } from "chai";
import { AuthDto } from "../src/Apis/Services/auth/auth.dto";
import { TEST_API } from "./test.common";
import { routers } from "../src/Configs/routers";
import dbConn from "../src/Utils/db/mysql.pool.connect";

let authDto : AuthDto= {
  private_id: "123",
  image_url: "asldfkjasdf",
  email: "",
  nickname: "이동규",
  method: "kakao",
  os:"android"
};

describe("2. auth test",()=> {

  it("auth test", (done) => {
    supertest(TEST_API).post(routers.AUTH)
      .send({
        data: {
          private_id: authDto.private_id,
          nickname: authDto.nickname,
          image_url: authDto.image_url,
          email: authDto.email,
          method: authDto.method,
          os : authDto.os
        }
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body.result.id).to.be.a.string;
        done();
      })
  });

  // afterEach(() => {
  //   console.log("after");
    
  //   describe("이미 존재하는 유저입니다", () => {
  //     it("이미 존재하는 유저입니다", (done) => {
  //       supertest(TEST_API).post(`${routers.AUTH}/${routers.AUTH_VALIDATION}`)
  //         .send({
  //           data: {
  //             private_id: authDto.private_id
  //           }
  //         })
  //         .end((err, res) => {
  //           expect(res.status).to.be.eql(200);
  //           expect(res.body.result.id).to.be.a.instanceOf(Number);
  //           done();
  //         })
  //     });
  //     it("이미 존재하는 닉네임 이다 status 202", (done) => {
  //       supertest(TEST_API).post(routers.AUTH)
  //         .send({
  //           data: {
  //             private_id: authDto.private_id,
  //             nickname: authDto.nickname,
  //             image_url: authDto.image_url,
  //             email: authDto.email,
  //             method: authDto.method,
  //             os: authDto.os
  //           }
  //         })
  //         .end((err, res) => {
  //           expect(res.status).to.be.eql(202);
  //           expect(res.body.result).to.be.a.eql("이미 중복된 닉네임이 존재합니다");
  //           done();
  //         });
  //     });
  //   });
  // })

  after(async () => {
    try {
      await dbConn({
        dbQuery: "delete from users where nickname = ?",
        dbParams: `${authDto.nickname}`
      });

      console.log("db 지우기 완료")
    } catch (e) {
      console.error(e);
    }
  });
})