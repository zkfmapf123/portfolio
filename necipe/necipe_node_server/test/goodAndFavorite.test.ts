import supertest from "supertest";
import { expect } from "chai";
import { routers } from "../src/Configs/routers";
import { TEST_API } from "./test.common";
import dbConn from "../src/Utils/db/mysql.pool.connect";
import { gafType } from "../src/Apis/Services/goodAndFavorite/gaf.dto";

const dto : gafType ={
  private_id: 21,
  recipe_id: 15
};

describe("5. good and favorite test", () => {
  
  it("좋아요를 실행한다", (done) => {
    supertest(TEST_API).put(routers.GOOD)
      .send({
        data: dto
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        done();
      });
  });

  it("찜하기를 실행한다", (done) => {
    supertest(TEST_API).put(routers.FAVORITE)
      .send({
      data : dto
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        done();
      })
  });

  after(async() => {
    try {
      await dbConn({
        dbQuery: `delete from recipe_good where uid = ?`,
        dbParams : `${dto.private_id}`
      });

      await dbConn({
        dbQuery: `delete from recipe_favorite where uid = ?`,
        dbParams: `${dto.private_id}`
      });
    } catch (e) {
      console.error(e);
    }
  })
});
