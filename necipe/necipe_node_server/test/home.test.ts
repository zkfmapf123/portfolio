import supertest from "supertest";
import { expect } from "chai";
import { HomeDto } from "../src/Apis/Services/Home/home.dto";
import { TEST_API } from "./test.common";
import { routers } from "../src/Configs/routers";

const homeDto: HomeDto = {
  private_id: 21,
  orderMethod : "rand",
  limit: 10,
  offset:0
};

describe("6. home test", () => {
  
  it("home에서 친구들 글 포함 내가 쓴글 제외해서 가져온다", (done) => {
    supertest(TEST_API).post(routers.HOME)
      .send({
        data: {
          private_id: homeDto.private_id,
          orderMethod : homeDto.orderMethod,
          limit: homeDto.limit,
          offset: homeDto.offset
        }
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body.result.recieps).to.be.a.instanceOf(Array);
        expect(res.body.result.recieps).to.be.length.lessThan(11);
        done();
      })
  })
});



