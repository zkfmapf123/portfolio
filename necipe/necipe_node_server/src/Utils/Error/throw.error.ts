export default ({ position, message}) => {
  
  ALREADY_EXISTS_NAME_ERROR: {
    return {
      position: position,
      message : message
    }  
  };

  
}