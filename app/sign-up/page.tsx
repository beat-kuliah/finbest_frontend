"use client";

import Auth from "@/app/components/Auth";
import { errorHandler } from "@/utils/errorHandler";
import { authUrl } from "@/utils/network";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import withoutAuth from "../components/hocs/withoutAuth";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formRef: React.RefObject<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    const arg = {
      username: formRef.current?.username.value,
      password: formRef.current?.password.value,
    };
    const response = await axios
      .post(authUrl.register, arg)
      .catch((e: AxiosError) => {
        errorHandler(e);
      });
    setLoading(false);

    if (response) {
      toast("User created successfully", { type: "success" });
      Router.push("/login");
    }
  };

  return (
    <Auth
      onSubmit={onSubmit}
      title="Sign Up"
      loading={loading}
      buttonTitle="Register"
      accountInfoText={{
        initialText: "Have an account?",
        actionLink: "/login",
        actionText: "login",
      }}
    />
  );
};

export default withoutAuth(Register);
