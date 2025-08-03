import Link from "next/link";
import { cache } from "react";
import { auth } from "../auth";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

const getSession = cache(() => auth());

export default async function AuthPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="absolute inset-0 min-h-screen bg-[#2a2a2a] text-white flex flex-col">
      <div className="mt-6 ml-6 pointer-events-auto">
        <Button
          variant="ghost"
          asChild
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
        <div className="w-full flex flex-col items-center justify-center gap-4 pointer-events-auto">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to <span className="text-gray-400">Veritas</span>
            </h1>
          </div>

          <div className="w-full max-w-sm flex items-center justify-center">
    
            <appkit-button />
          </div>

          <div className="text-center text-sm text-gray-400">
            By continuing you agree to our{" "}
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-sm text-gray-300 hover:text-white underline"
            >
              <Link href="/terms">Terms of Service</Link>
            </Button>{" "}
            and{" "}
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-sm text-gray-300 hover:text-white underline"
            >
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
