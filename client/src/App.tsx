import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import JeopardyPage from "./jeopardy/page";

// const TanStackRouterDevtools =
//   import.meta.env.NODE_ENV === "production"
//     ? () => null
//     : React.lazy(() =>
//         import("@tanstack/router-devtools").then((res) => ({
//           default: res.TanStackRouterDevtools,
//         }))
//       );

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools router={router} />
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <>
        <h1>Home</h1>
        <Link to="/jeopardy">Jeopardy</Link>
      </>
    );
  },
});

const jeopardyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/jeopardy",
  component: JeopardyPage,
});

const routeTree = rootRoute.addChildren([indexRoute, jeopardyRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
