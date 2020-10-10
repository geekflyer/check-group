/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application, Context } from "probot";
/* eslint-enable @typescript-eslint/no-unused-vars */
import { checkRunEventHandler, pullRequestEventHandler } from "./handlers";
import prettyjson from "prettyjson";

export = (app: Application): void => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  app.on("pull_request", async (context: Context<any>) => {
    try {
      await pullRequestEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
    }
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  /* eslint-disable @typescript-eslint/no-explicit-any */
  app.on("check_run", async (context: Context<any>) => {
    try {
      await checkRunEventHandler(context);
    } catch (err) {
      context.log.error(prettyjson.render(err));
    }
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */
};
