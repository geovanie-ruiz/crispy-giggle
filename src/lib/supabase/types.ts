// import { MergeDeep } from "type-fest";

import { Database as DatabaseGenerated } from "./generated.types";

// export type Database = MergeDeep<
//   DatabaseGenerated,
//   {
//     public: {
//     };
//   }
// >;

export type Database = DatabaseGenerated;

export type User = Database["public"]["Tables"]["user"]["Row"];
