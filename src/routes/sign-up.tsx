import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../shared/components/ui/Button";
import { useSignUp } from "../features/sign-up/hooks/useSignUp";

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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <input
            type="password"
            id="password"
            name="password"
            required
            className="p-1 border-2 rounded-md"
            onChange={handleChange}
          />

          <Link to="/sign-in" className="text-right">
            Already have account?
          </Link>

          <Button
            type="submit"
            className="bg-black text-white p-2 rounded-md disabled:opacity-50"
            disabled={isPending}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </main>
  );
}
