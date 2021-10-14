import storage from "@react-native-firebase/storage";

type uploadImageType = [string | undefined, Error | undefined];
type deleteImageType = [boolean, Error | undefined];

// 이미지 업로드 하기
export const uploadImage = async (folderName : "recipes" | "users", { fileName, fileUrl }): Promise<uploadImageType> => {
  try {

    const formatFileUrl = fileUrl.replace("file://", "");
  
    storage()
      .ref(`${folderName}/${fileName}`)
      .putFile(formatFileUrl)
      .catch((e) => {
        throw new Error(`${e}`);
      })
    
    return [fileName, undefined];
  } catch (e) {
    return [undefined, e];
  } 
};

export const getDownloadImageUrl = async (folderName: "recipes" | "user", { fileName }) => {
  try {
    const ref = storage()
      .ref(`${folderName}/${fileName}`);
    
    const url = await ref.getDownloadURL()
      .catch((e) => {
        throw e;
      });
    
    return url;

  } catch (e) {
    return "~/assets/no_image.PNG"
  }
}

// 이미지 삭제하기 & 변경
export const deleteImage = async (folderName : "recipes" | "users", { fileName}) : Promise<deleteImageType> => {
  try {
    storage()
      .ref(`${folderName}/${fileName}`)
      .delete()
      .catch((e) => {
        throw new Error(e);
      });
    
    return [true, undefined];
  } catch(e){
    return [false, e];
  } 
};