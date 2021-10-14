import supertest from "supertest";
import { expect } from "chai";
import { TEST_API } from "./test.common";
import { routers } from "../src/Configs/routers";
import dbConn from "../src/Utils/db/mysql.pool.connect";
import { createCommentDto } from "../src/Apis/Services/comment/commen.dto";

// const commentDto : createCommentDto = {
//   recipe_id: 12,
//   user_id : 2,
//   refer_id: 0,
//   bgroup: 1,
//   sort: 1,
//   depth: 1,
//   limit: 20,
//   offset: 0,
//   comment : "돈까스 튀길 대 중불로 하세요 아니면 강불로 하세요?"
// };

// const childCommentDto = {
  
// }

// let recentlyId: number = 0;

// describe("3. comment test", () => {

//   it("get comment", (done) => {
//     supertest(TEST_API).post(routers.COMMENT)
//       .send({
//         data: {
//           recipe_id: commentDto.recipe_id,
//           limit: commentDto.limit,
//           offset: commentDto.offset
//         }
//       })
//       .end((err, res) => {
//         expect(res.status).to.be.eql(200);
//         expect(res.body.result).to.be.a.instanceOf(Object);
//         expect(res.body.result.comments).to.be.a.instanceOf(Array);
//         done();
//       })
//   });

//   it("해당 자식댓글들을 가져온다", (done) => {
//     supertest(TEST_API).post(`${routers.COMMENT}/${routers.COMMENT_CHILD}`)
//       .send({
//         data: childCommentDto
//       })
//       .end((err, res) => {
//         expect(res.status).to.be.eql(200);
//         expect(res.body.result).to.be.a.instanceOf(Object);
//         expect(res.body.result.comments).to.be.a.instanceOf(Array);
//     })
//   })

//   it("root 댓글 쓰기", (done) => {
//     supertest(TEST_API).put(`${routers.COMMENT}/${routers.CREATE_COMMENT}`)
//     .send({
//       data: commentDto
//     })
//     .end((err, res) => {
//       expect(res.status).to.be.eql(200);
//       done();
//     })
//   });

//   after(async () => {
//     try {
//       const [row] = await dbConn({
//         dbQuery: `select id from comments where rid =? and uid = ? order by created_datetime desc limit 1`,
//         dbParams: `${commentDto.recipe_id},
//                      ${commentDto.user_id}`
//       });
       
//       recentlyId = row[0].id
//     } catch (e) {
//       console.error(e);
//     }
//   });

//   afterEach(() => {
//     describe("댓글 삭제하기", () => {
//       it("내 댓글 삭제하기", (done) => {
//         supertest(TEST_API).delete(`${routers.COMMENT}`)
//           .send({
//             data: {
//               comment_private_id: recentlyId
//             }
//           })
//           .end((err, res) => {
//             expect(res.status).to.be.eql(200);
//             done();
//           })
//       })
//     })
//   });
// });
