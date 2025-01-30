import React, { memo, useMemo, lazy, Suspense } from "react";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
  const { authenticated } = useAuth();
  const AppLayout = useMemo(() => {
    if (authenticated) {
      return lazy(() => import("./modernLayout"));
    }
    return lazy(() => import("./authLayout"));
  }, [authenticated]);

  return (
    <Suspense>
      <AppLayout />
    </Suspense>
  );
};

export default memo(Layout);
