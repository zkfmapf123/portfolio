import {IHomeBuilder} from "./home.interface";
import { Recipe } from "../../../Utils/Packages/Recipe";
import { HomeDto } from "./home.dto";
import log from "../../../Utils/Error/create.error";
import date from "../../../Utils/date";
import dbConn from "../../../Utils/db/mysql.pool.connect";
import { GET_RECIPES } from "./home.query";
class HomeService extends Recipe{    
    private readonly privateId: number;
    private readonly limit: number;
    private readonly offset: number;
    private readonly orderMethod: "rand" | "created";
    
    constructor({private_id, limit, offset, orderMethod} : HomeDto) {
        super();
        this.privateId = private_id;
        this.limit = limit;
        this.offset = offset;
        this.orderMethod = orderMethod;
    };

    public getAllRecipes = async (): Promise<[]> => {
        try {
            const [row] = await dbConn({
                dbQuery: GET_RECIPES,
                dbParams: `${this.privateId},
                           ${this.orderMethod},
                           ${this.offset},
                           ${this.limit}`
            });

            return row[0];
        } catch (e) {
            log({
                err: "error",
                errTitle: "getRecipes",
                errDescription: e,
                errDate: date.errDate,
                errUserId: this.privateId
            });
            throw new Error(e);
        }
    };
};

class HomeServiceBuilder implements IHomeBuilder{
    private privateId: number;
    private offset: number;
    private limit: number;
    private orderMethod: string;
    
    setPrivateId(privateId: number): this {
        this.privateId = privateId;
        return this;
    };

    setOffset(offset: number): this{
        this.offset = offset;
        return this;
    };

    setLimit(limit: number): this{
        this.limit = limit;
        return this;
    };

    setOrderMethod(orderMethod: "rand" | "created"): this{
        this.orderMethod = orderMethod
        return this;
    };
    
    create() {
        return new HomeService({
            private_id: this.privateId,
            limit: this.limit,
            offset: this.offset,
            orderMethod: this.orderMethod as ("rand" | "created")
        })
    }
};

export default HomeServiceBuilder;
