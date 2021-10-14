import {Router} from "express";
import authRouter from "./Routers/auth.router";
import recipeRouter from "./Routers/recipe.router";
import homeRouter from "./Routers/home.router";
import commentRouter from "./Routers/comment.router";
import goodAndFavoriteRouter from "./Routers/goodAndFavorite";
import searchRouter from "./Routers/search.router";
import userRouter from "./Routers/user.router";
import alertRouter from "./Routers/alert.router";
import profileRouter from "./Routers/profile.router";

export default ()=>{
    const app = Router();
    authRouter(app);
    homeRouter(app);
    recipeRouter(app);
    commentRouter(app);
    goodAndFavoriteRouter(app);
    searchRouter(app);
    userRouter(app);
    alertRouter(app);
    profileRouter(app);

    return app;
}