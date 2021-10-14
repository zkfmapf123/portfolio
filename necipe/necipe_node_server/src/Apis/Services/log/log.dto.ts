export type logType = {
  private_user_id: number;
  request_user_id: number;
};

export type commentLogType = logType & {
  recipe_id: number;
};

