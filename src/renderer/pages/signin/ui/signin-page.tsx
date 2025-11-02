import { ViewModelProps } from "mobx-view-model";
import { SignInPageVM } from "../model";
import { css } from "@/renderer/shared/styled-system/css";

export const SignInPageView = function SignInPageView({
  model,
}: ViewModelProps<SignInPageVM>) {
  return <div className={css({ bg: "red" })}>Blazing Electron Template 🔥</div>;
};
  