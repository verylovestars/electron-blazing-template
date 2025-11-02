import {
  RouterStoreBase,
  RouterStoreParams,
  RouteDeclaration,
  CreateRouteViewModelFactory,
  createRoute,
} from "mobx-react-routing";
import { RouteObject } from "react-router-dom";

import { PageViewModelImpl } from "./page-view-model";

export class RouterStoreImpl extends RouterStoreBase {
  constructor(params: RouterStoreParams) {
    super(params);
  }

  // override this method because we need to send rootStore to our view models
  // but default `RouterStoreBase` this method implementation don't know about RootStore
  createRoute(
    declaration: RouteDeclaration,
    index: number,
    parentPath: number[]
  ): RouteObject {
    const createViewModel: CreateRouteViewModelFactory = (
      config,
      declaration
    ) => {
      const VM = config.VM as unknown as typeof PageViewModelImpl;
      return new VM(declaration, config);
    };

    return createRoute({
      declaration,
      router: this,
      index,
      parentPath,
      factory: createViewModel,
    });
  }
}
