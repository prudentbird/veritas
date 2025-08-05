import { Auth } from "./auth";
import { MenuClient } from "./client";
import { auth } from "~/app/(auth)/auth";
import { thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
export const Menu = async () => {
  const session = await auth();

  if (!session) {
    return <Auth />;
  }

  const avatar = createAvatar(thumbs, {
    scale: 75,
    flip: true,
    seed: session?.address,
  }).toDataUri();

  return <MenuClient avatar={avatar} session={session} />;
};
