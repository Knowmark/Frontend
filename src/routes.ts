import { wrap } from "svelte-spa-router/wrap";
import type { WrappedComponent } from "svelte-spa-router";

import Dashboard from "./routes/Dashboard.svelte";
import IconAbout from "svelte-icons/md/MdInfo.svelte";
import IconDashboard from "svelte-icons/md/MdDashboard.svelte";
import IconQuiz from "svelte-icons/md/MdClass.svelte";
import IconClass from "svelte-icons/io/IoIosJournal.svelte";
import { user, type User } from "./lib/user";
import { Role } from "./lib/api";
import { derived } from "svelte/store";
import Home from "./routes/Home.svelte";

type SCC = SvelteComponentConstructor<any, any>;

interface Route {
  path: string;
  name?: string;
  icon?: SCC;
  roles?: Role[];
  view: SCC | WrappedComponent;
}

function wrapAsyncComponent(path: string): WrappedComponent {
  return wrap({
    asyncComponent: () =>
      import(/* @vite-ignore */ path) as Promise<{ default: SCC }>,
  });
}

export const ROUTE_CONFIG = [
  {
    path: "/",
    roles: [Role.None],
    view: Home,
  },
  {
    path: "/",
    name: "nav.dashboard",
    icon: IconDashboard,
    roles: [Role.Normal, Role.Author, Role.Admin],
    view: Dashboard,
  },
  {
    path: "/class",
    name: "nav.classes",
    icon: IconClass,
    roles: [Role.Normal, Role.Author, Role.Admin],
    view: wrapAsyncComponent("./routes/SelectClass.svelte"),
  },
  {
    path: "/class/new",
    roles: [Role.Author, Role.Admin],
    view: wrapAsyncComponent("./routes/CreateClass.svelte"),
  },
  {
    path: "/class/:id",
    roles: [Role.Normal, Role.Author, Role.Admin],
    view: wrapAsyncComponent("./routes/Class.svelte"),
  },
  {
    path: "/quiz",
    name: "nav.quizzes",
    icon: IconQuiz,
    roles: [Role.Normal, Role.Author, Role.Admin],
    view: wrapAsyncComponent("./routes/SelectQuiz.svelte"),
  },
  {
    path: "/quiz/new",
    roles: [Role.Author, Role.Admin],
    view: wrapAsyncComponent("./routes/CreateQuiz.svelte"),
  },
  {
    path: "/quiz/:id",
    roles: [Role.Normal, Role.Author, Role.Admin],
    view: wrapAsyncComponent("./routes/Quiz.svelte"),
  },
  {
    path: "/login",
    view: wrapAsyncComponent("./routes/Login.svelte"),
  },
  {
    path: "/signup",
    view: wrapAsyncComponent("./routes/Signup.svelte"),
  },
] as Route[];

function navFilter(data: Route, user: User) {
  if (!("name" in data && "icon" in data)) return false;
  if (!user && (!data.roles || data.roles.includes(Role.None))) return true;
  if (!user) return false;
  if (data.roles && !data.roles.includes(user.user_role)) return false;
  return true;
}

export const nav_items = derived(user, (user) =>
  ROUTE_CONFIG.filter((data) => navFilter(data, user)).map(
    ({ path, name, icon }) => ({ path, name, icon })
  )
);

function routeFilter(data: Route, user: User) {
  if (!user && (!data.roles || data.roles.includes(Role.None))) return true;
  if (!user) return false;
  if (data.roles && !data.roles.includes(user.user_role)) return false;
  return true;
}

export const routes = derived(user, (user) =>
  Object.fromEntries(
    ROUTE_CONFIG.filter((data) => routeFilter(data, user)).map(
      ({ path, view }) => [path, view]
    )
  )
);

export default routes;
