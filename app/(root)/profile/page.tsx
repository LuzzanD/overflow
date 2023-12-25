import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Profile = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <div className="flex">
        <div className="relative aspect-square w-[80px] rounded-full">
          <Image
            src={mongoUser.profilePictureUrl}
            alt="Profile picture"
            className="object-contain"
            fill={true}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2>{mongoUser.name}</h2>
            <Link href="/profile/edit">
              <Button className="btn">Edit profile</Button>
            </Link>
          </div>
          <span>@{mongoUser.username}</span>
          <div></div>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
