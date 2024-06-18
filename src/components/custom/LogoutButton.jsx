import { logoutAction } from "@/data/actions/auth-actions";


export function LogoutButton() {
  return (
    <form className="flex" action={logoutAction}>
      <button type="submit">
        <p className="text-base leading-6">Log out</p>
      </button>
    </form>
  );
}