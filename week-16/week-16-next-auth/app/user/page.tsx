import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/next-config";

export default async function () {
  const session = await getServerSession(NEXT_AUTH);
  return (
    <>
      <div>user component</div>
      <div>{JSON.stringify(session)}</div>
    </>
  );
}
