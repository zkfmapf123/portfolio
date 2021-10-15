import { StatisticDto, StatisticStudyDto } from "./st.dto";

export interface IStatistic {
    getStatistic({prevDate, nextDate} : StatisticDto) : Promise<StatisticReturnType>;
    getStudyStatistic({date} : StatisticStudyDto) : Promise<StatisticReturnType>;
};

export type StatisticReturnType = [{} | undefined, Error | undefined]