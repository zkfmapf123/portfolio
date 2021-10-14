import supertest from "supertest";
import { expect } from "chai";
import { TEST_API } from "./test.common";
import { UserDto } from "../src/Apis/Services/user/user.dto";
import { routers } from "../src/Configs/routers";
import dbConn from "../src/Utils/db/mysql.pool.connect";

const userdto: UserDto = {
  private_id: 21,
  user_id : 20,
  limit: 10,
  offset : 0
};

describe("11. user test", () => {

  // 유저 정보를 가져온다.
  it("유저 정보를 가져온다", (done) => {
    supertest(TEST_API).post(routers.USER)
      .send({
        data: userdto
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body.result).to.be.a.instanceOf(Object);
        expect(res.body.result.userInfo).to.be.a.instanceOf(Object);
        expect(res.body.result.popularRecipes).to.be.a.instanceOf(Array);
        expect(res.body.result.hashtags).to.be.a.instanceOf(Array);
        expect(res.body.result.createdRecipes).to.be.a.instanceOf(Array);
        done();
      })
  });

  it("유저의 대한 친구신청을 진행한다", (done) => {
    supertest(TEST_API).put(`${routers.USER}/${routers.USER_REQUEST}`)
      .send({
      data:userdto
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        done();
    })
  })

  it("페이지네이션을 진행한다", (done) => {
    supertest(TEST_API).post(`${routers.USER}/${routers.USER_RECIPES}`)
      .send({
        data:userdto
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body.result).to.be.a.instanceOf(Object);
        expect(res.body.result.createdRecipes).to.be.a.instanceOf(Array);
        done();
    })
  });

  after(async() => {
    try {
      await dbConn({
        dbQuery: "delete from user_follows where uid = ?",
        dbParams : `${userdto.private_id}`
      });
    } catch (e) {
      console.error(e);
    }
  })
  
});
