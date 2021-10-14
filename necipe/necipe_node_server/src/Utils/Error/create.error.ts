import logger from "../../Loaders/logger"

type errType = {
  err: "error" | "info";
  errTitle: string;
  errDescription: string;
  errDate: string;
  errUserId: number;
}

export default ({
  err,
  errTitle,
  errDescription,
  errDate,
  errUserId
}: errType) => {
  if (err === "error") {
    logger.error(
      `
      title : ${errTitle}
      date : ${errDate}
      user : ${errUserId}
      description : ${errDescription}
      `
    );
  } else {
    logger.info(
      `
      title : ${errTitle}
      date : ${errDate}
      user : ${errUserId}
      description : ${errDescription}
      `
    );
  };
};