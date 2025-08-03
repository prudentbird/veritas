import Logout from "./tmp";
import Link from "next/link";
import { cache } from "react";
import { auth } from "./(auth)/auth";
import { Button } from "~/components/ui/button";

const getSession = cache(() => auth());

export default async function Home() {
  const session = await getSession();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {session ? (
            <Logout />
          ) : (
            <Link href="/auth">
              <Button>Authenticate now</Button>
            </Link>
          )}
        </div>
        {session ? (
          <div>
            <p className="text-center">
              Authenticated With: <br /> {session?.address}
            </p>
          </div>
        ) : (
          <div>
            <p>Not authenticated</p>
          </div>
        )}
      </main>
    </div>
  );
}
