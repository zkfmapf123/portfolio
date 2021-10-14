export interface IHomeBuilder{
    setPrivateId(privateId: number): this;
    setLimit(limit: number): this;
    setOffset(offset: number): this;
    create(): any;
}