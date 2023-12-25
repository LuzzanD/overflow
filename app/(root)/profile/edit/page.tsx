import EditProfileForm from "@/components/forms/EditProfileForm";
import React from "react";

const EditProfile = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="h2-bold xl:h1-bold mb-2 dark:text-slate-100">
        Edit your profile
      </h1>
      <EditProfileForm />
    </div>
  );
};

export default EditProfile;
