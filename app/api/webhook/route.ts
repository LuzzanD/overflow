/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    const { id, first_name, last_name, username, image_url } = evt.data;

    const newUser = await createUser({
      clerkId: id,
      username: username!,
      name: `${first_name} ${last_name && last_name}`,
      profilePictureUrl: image_url,
    });

    return NextResponse.json({ message: "Ok", user: newUser });
  }

  if (evt.type === "user.updated") {
    const { id, first_name, last_name, username, image_url } = evt.data;
    const updatedData = {
      username: username!,
      name: `${first_name} ${last_name && last_name}`,
      profilePictureUrl: image_url,
    };

    const updatedUser = await updateUser({ userId: id, updatedData });

    return NextResponse.json({ message: "Ok", user: updatedUser });
  }

  if (evt.type === "user.deleted") {
    const { id } = evt.data;
    const deletedUser = await deleteUser({ userId: id! });
    return NextResponse.json({ message: "Ok", user: deletedUser });
  }
  return NextResponse.json({ message: "OK" });
}
