import EditProfileForm from "@/components/forms/EditProfileForm";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const EditProfile = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const { _id, name, username, bio, locationString, portfolioLink } =
    await getUserById({ userId });
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
        Edit your profile
      </h1>
      <EditProfileForm
        userId={JSON.stringify(_id)}
        name={name}
        username={username}
        bio={bio}
        locationString={locationString}
        portfolioLink={portfolioLink}
      />
    </div>
  );
};

export default EditProfile;
