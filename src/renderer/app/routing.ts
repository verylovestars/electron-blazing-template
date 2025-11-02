import { RouterStoreParams } from "mobx-react-routing";

export const routes: RouterStoreParams["routes"] = [
  {
    path: '/',
    async loader() {
      const { SignInPageView, SignInPageVM } = await import('@/renderer/pages/signin');

      return {
        Component: SignInPageView,
        Model: SignInPageVM,
      };
    },
  },
];

