import { Request, Router, Response } from 'express';
import { NoContentException } from '../../common/exceptions';
import {Controller} from '../../common/interfaces/controller';
import {Decode} from '../../common/interfaces/decode';
import routePath from '../../common/router.path';
import {JwtRepo} from '../../lib/jwt';
import { StatisticService } from './st.services';

class StatisticController implements Controller, Decode {
    path: string = routePath.STATISTIC;
    router: Router = Router();

    initialRoutes(): void {
        const router = Router();

        router.post('/',this.getStatistic);
        router.post(routePath.STATISTIC_STUDY,this.getStudyStatistic);

        this.router.use(this.path, router);
    }

    getDecodeTokenUserId = (token: string): number => { 
        const [decode, err] = JwtRepo.verify(token);
        const {id} = decode;
        return id;
    };

    getStatistic = async (req: Request, res :Response) =>{
        const stService = new StatisticService(this.getDecodeTokenUserId(req.cookies['access-token']));
        const {prevDate, nextDate} = req.body.data;
        const [statistic, err] = await stService.getStatistic({
            prevDate: prevDate,
            nextDate : nextDate
        });

        if(err != undefined){
            return res.json(new NoContentException('관리자 문의 (통계)'))
        };
        
        return res.json({status: 200, statistic});
    };

    getStudyStatistic= async(req: Request, res:Response) =>{
        const stService = new StatisticService(this.getDecodeTokenUserId(req.cookies['access-token']));
        const {date} = req.body.data;
        const [statistic, err] = await stService.getStudyStatistic({date: date});

        if(err != undefined){
            return res.json(new NoContentException('관리자 문의 (공부 통계)'))
        };
        
        return res.json({status: 200, statistic});
    };
}   