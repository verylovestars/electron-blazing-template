import {
  PageViewModelBase,
  RouteDeclaration,
  RouterStore,
} from "mobx-react-routing";
import { AnyViewModel, ViewModelParams } from "mobx-view-model";
import { AnyObject, EmptyObject } from "../types";
import { container } from "tsyringe";
import { RouterStoreImpl } from "./router-store-impl";


export class PageViewModelImpl<
  Params extends AnyObject = EmptyObject,
  ParentViewModel extends AnyViewModel = null,
> extends PageViewModelBase<Params, ParentViewModel> {
  constructor(
    routeDeclaration: RouteDeclaration,
    config: ViewModelParams<Params, ParentViewModel>
  ) {
    const router = container.resolve<RouterStore>(RouterStoreImpl);

    super(routeDeclaration, router, config);

    this.router = router;
  }
}
