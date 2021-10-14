import supertest from "supertest";
import { expect } from "chai";
import { SearchDto } from "../src/Apis/Services/search/search.dto";
import { TEST_API } from "./test.common";
import { routers } from "../src/Configs/routers";

let search: SearchDto = {
  private_id: 21,
  method : "hashtag",
  value: "카레",
  limit: 10,
  sort: "rand",
  offset: 0,
};

describe("10.search test", () => {

  // 인기검색을 가져온다.
  it("get popular data", (done) => {
    supertest(TEST_API).post(`${routers.SEARCH}/${routers.POPULAR_SEARCH}`)
      .send({
        data: {
          private_id: search.private_id
        }
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body.result).to.be.a.instanceOf(Array);
        done();
      })
  });

  it("검색이 진행된다.", (done) => {
    supertest(TEST_API).post(routers.SEARCH)
      .send({
        data: {
          private_id: search.private_id,
          method: search.method,
          value: search.value,
          limit: search.limit,
          offset: search.offset,
          sort : search.sort
        }
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body.result).to.be.instanceOf(Array);
        done();
      })
  });
});