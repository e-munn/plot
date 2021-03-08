import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class RECIPE {
  readonly id: string;
  readonly recipe: string;
  constructor(init: ModelInit<RECIPE>);
  static copyOf(source: RECIPE, mutator: (draft: MutableModel<RECIPE>) => MutableModel<RECIPE> | void): RECIPE;
}