import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { UserPanel } from "~/components/user-panel";
import { requireUserId } from "~/utils/auth.server";
import { getOtherUsers } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const users = await getOtherUsers(userId);
  return json({ users });
};

export default function Home() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div className="h-full flex">
      <UserPanel users={users} />
      <div className="flex-1"></div>
    </div>
  );
}
