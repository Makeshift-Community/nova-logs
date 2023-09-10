// Custom dependencies
import rename from "./activity/rename.js";
import join from "./activity/join.js";
import leave from "./activity/leave.js";
export default function (client) {
    join(client);
    leave(client);
    rename(client);
}
