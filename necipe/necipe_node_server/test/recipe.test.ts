import supertest from "supertest";
import { expect } from "chai";
import { routers } from "../src/Configs/routers";
import { TEST_API } from "./test.common";
import { CreateRecipeDto, RecipeReadAndDeleteType } from "../src/Apis/Services/recipe/recipe.dto";
import dbConn from "../src/Utils/db/mysql.pool.connect";
import { CREATE_MAIN, CREATE_SUB, DELETE_RECIPE, GET_RECENTLY_MAKE_CREATE_RECIPE } from "../src/Apis/Services/recipe/recipe.query";

let createDto: CreateRecipeDto = {
  private_id: 21,
  mainRecipe: {
    title: "맛있는 카레",
    category:"한식",
    time: "60 분",
    level: 3,
    imageUrl: "care.jpg",
    hashtag: ["카레", "맛있는", '버터', "가성비"],
    cost : 5000
  },
  subRecipe: [
    {
      shortDescription: "챕터 1",
      description: "물을 넣고 끓인다",
      stage: 1,
      stuffs: ["파", "분말", "카레"],
      thumnail: "물끓임.jgp",
      tips:"엄청 끓이자"
    },
    {
      shortDescription: "챕터 2",
      description: "야채를 썬다.",
      stage: 2,
      stuffs: ["파", "분말", "카레"],
      thumnail: "물끓임.jgp",
      tips:"엄청 끓이자"
    },
    {
      shortDescription: "챕터 3",
      description: "야채 넣는다.",
      stage: 3,
      stuffs: ["파", "분말", "카레"],
      thumnail: "물끓임.jgp",
      tips:"엄청 끓이자"
    },
    {
      shortDescription: "챕터 4",
      description: "먹는다.",
      stage: 4,
      stuffs: ["파", "분말", "카레"],
      thumnail: "물끓임.jgp",
      tips:"엄청 끓이자"
    }
  ]
};

let recipeId: number = 0;


// 레시피를 만든다.
describe("8. create test", () => {
  
  it("레시피를 만든다", (done) => {
    supertest(TEST_API).post(`${routers.RECIPE}/${routers.CREATE_RECIPE }`)
      .send({
        data: createDto
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.be.eql(200);
        done();
      })
  });

  // 최근에 만든 레시피 id를 가져온다.
  beforeEach(async() => {
    try {
      const [row] = await dbConn({
        dbQuery: `${GET_RECENTLY_MAKE_CREATE_RECIPE}`,
        dbParams: `${createDto.private_id}`
      }).catch((e) => { throw new Error(e) });
    
      recipeId = row[0].id;   
    } catch (e) {
      console.error(e);
    }
  })

  afterEach(() => {
    describe("recipe detail", () => {
      it("recipe detail로 들어간다", (done) => {
        supertest(TEST_API).post(routers.RECIPE)
          .send({
            data: {
              recipe_id: recipeId
            }
          })
          .end((err, res) => {
            expect(res.status).to.be.eql(200);
            expect(res.body.result.recipes).to.be.a.instanceOf(Object);
            expect(res.body.result.recipes.mainRecipe).to.be.a.instanceOf(Object);
            expect(res.body.result.recipes.subRecipe).to.be.a.instanceOf(Object);
            done();
          })
      });
    });

    // 만든 테스트 지우기
    after(async () => {
      try {

        await dbConn({
          dbQuery: `${DELETE_RECIPE}`,
          dbParams: `${recipeId}`
        }).catch((e) => { throw new Error(e) });
      } catch (e) {
        console.error(e);
      }
    });
  });
});