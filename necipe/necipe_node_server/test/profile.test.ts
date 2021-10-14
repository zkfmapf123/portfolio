import { expect } from "chai";
import supertest from "supertest";
import { ProfileDto } from "../src/Apis/Services/profile/profile.dto";
import { routers } from "../src/Configs/routers";
import { TEST_API } from "./test.common";

const profileDto: ProfileDto = {
  private_id: 1,
  limit: 20,
  offset: 1,
  imageUrl: "123",
};

describe("profile test", () => {
  
  it("profile에서 피드를 불러온다", (done) => {
    supertest(TEST_API).post(`${routers.PROFILE}`)
      .send({
        data: profileDto
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body.result.myInfo).to.be.a.instanceOf(Array);
        expect(res.body.result.myHashtag).to.be.a.instanceOf(Array);
        expect(res.body.result.myPopularRecipes).to.be.a.instanceOf(Array);
        expect(res.body.result.myRecipes).to.be.a.instanceOf(Array);
        done();
    })
  });

  it("profile에서 사진을 바꾼다", (done) => {
    supertest(TEST_API).put(`${routers.PROFILE}`)
      .send({
      data: profileDto
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        done();
    })
  });

  it("profile에서 찜목록으로 바꾼다", (done) => {
    done();
  });

})