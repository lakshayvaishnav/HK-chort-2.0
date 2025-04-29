import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton"

export const Appbar = () => {
    const router = useRouter();
  return (
    <div className="flex border-b justify-between">
      <div>zapier</div>
      <div>
        <LinkButton onClick={() => {}}>contact sales</LinkButton>
        <LinkButton onClick={() => {
            router.push("/login")
        }}>Login</LinkButton>
      </div>
    </div>
  );
};
