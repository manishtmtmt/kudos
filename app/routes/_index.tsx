import { redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return redirect("/home");
};
