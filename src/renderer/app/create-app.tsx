import React from "react";
import { Router } from "mobx-react-routing";
import { RouterStoreImpl } from "../shared/routing";

import { routes } from "./routing";
import { container } from "tsyringe";

export function createApplication() {
  const routerStore = new RouterStoreImpl({
    routes,
    fallbackComponent: () => null,
    errorBoundaryComponent: () => null,
  });

  container.register<RouterStoreImpl>(RouterStoreImpl, {
    useValue: routerStore,
  });

  return App;
}

function App() {
  const routerStore = container.resolve(RouterStoreImpl);
  return <Router router={routerStore} />;
}
