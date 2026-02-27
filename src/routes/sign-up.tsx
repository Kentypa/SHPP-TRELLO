import { createFileRoute, Link } from "@tanstack/react-router";
import { useSignUp } from "../features/sign-up/hooks/use-sign-up";
import { Button } from "../shared/components/ui/Button";
import { InputPassword } from "../shared/components/ui/InputPassword";

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleChange, handleSubmit, isPending } = useSignUp();

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        <h2 className="text-center mb-4">
          <b>Create An Account</b>
        </h2>
        <form className="flex flex-col gap-4 p-12" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="p-1 border-2 rounded-md"
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <InputPassword
            type="password"
            id="password"
            name="password"
            required
            className="relative p-1 border-2 rounded-md w-full"
            iconClassName={"absolute size-6 right-2 top-1/2 -translate-y-1/2"}
            onChange={handleChange}
          />

          <Link to="/sign-in" search={{ redirect: "" }} className="text-right">
            Already have account?
          </Link>

          <Button
            type="submit"
            className="bg-black text-white p-2 rounded-md"
            disabled={isPending}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </main>
  );
}
