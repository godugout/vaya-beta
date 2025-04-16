
import { MainNavDemo } from "./MainNavDemo";
import { BreadcrumbDemo } from "./BreadcrumbDemo";
import { ViewSwitcherDemo } from "./ViewSwitcherDemo";

export const NavigationShowcase = () => {
  return (
    <div className="space-y-10">
      <MainNavDemo />
      <BreadcrumbDemo />
      <ViewSwitcherDemo />
    </div>
  );
};
