class FactoryController{

  static init(type: any, service : any) {
    return type.create(service);
  };
};

export default FactoryController;