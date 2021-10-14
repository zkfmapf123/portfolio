import supertest from "supertest";
import { TEST_API } from "../test/test.common";
import { routers } from "../src/Configs/routers";
import { AlertDto } from "../src/Apis/Services/alerts/alert.dto";
import { expect } from "chai";
import dbConn from "../src/Utils/db/mysql.pool.connect";

const alertDto: AlertDto = {
  private_id: 21,
  user_id : 20
};

// api/user/request 도 사용하자.

describe("1. alert test", () => {

  it("get alert(friends + comment)", (done) => {
    supertest(TEST_API).post(routers.ALERT)
      .send({
        data: alertDto        
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.result.friends).to.be.a.instanceOf(Array);
        // expect(res.body.result.logs).to.be.a.instanceOf(Array); --> 댓글 다시 만들어야
        done();
      })
  });

  describe("친구신청 => 수락",()=> {

    it("친구 수락하기", (done) => {
      supertest(TEST_API).put(`${routers.ALERT}/${routers.ALERT_ACCEPT}`)
        .send({
        data :alertDto
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          done();
      })
    });
  });

  describe("친구 신청 => 거절", () => {
    
    it("친구 거절하기", (done) => {
      supertest(TEST_API).put(`${routers.ALERT}/${routers.ALERT_REJECT}`)
        .send({
          data: alertDto
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          done();
        })
    });
  });

  describe("댓글 삭제", () => {
    
    it("댓글 삭제하기", (done) => {
      done();
    })
  })

  after(async() => {
    try {
      await dbConn({
        dbQuery: `delete from user_friends where uid =? and fid = ?`,
        dbParams: `${alertDto.private_id},
                   ${alertDto.user_id}`
      });

      await dbConn({
        dbQuery: `delete from user_follows where uid = ? and fid = ?`,
        dbParams: `${alertDto.private_id},
                   ${alertDto.user_id}`
      });
    } catch (e) {
      console.error(e);
    }
  })
});
