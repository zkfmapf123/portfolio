export class AppServices{

  // 해당 value가 텅 비었다면 true를 반환한다.
  protected isDataEmpty = (value: unknown)=>{
    if(value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)){
      return true;
    }else{
      return false;
    }
  }
}