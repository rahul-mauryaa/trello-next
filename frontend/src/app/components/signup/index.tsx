"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Flex,
  Box,
  FormControl,
  Input,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRegisteruserMutation } from "@/app/redux/api/authApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const SignUp = (): JSX.Element => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [registeruser, { data: registerData, isLoading, error, isSuccess }] =
    useRegisteruserMutation();

  const onSubmit = async (data: any) => {
    const { email, password, username } = data;
    if (data) {
      await registeruser({ email, password, username });

      reset({ username: "", email: "", password: "", confirmPassword: "" });
    }
  };

  useEffect(() => {
    if (registerData && !isLoading) {
      toast.success(registerData?.message);
      router.push("/login");
    }
    if (error) {
      toast.error((error as any)?.data?.message);
    }
  }, [registerData, error]);

  return (
    <>
      <Box display="flex">
        <Image
          height="30px"
          ml="auto"
          mr="auto"
          my="40px"
          src="/trello-logo.svg"
          display="inline-block"
          alt="brand logo"
        />
      </Box>
      <Flex
        alignItems="center"
        flexDirection={["column", "column", "row", "row"]}
        justifyContent="center"
      >
        <Image
          position="absolute"
          bottom="5%"
          left="5%"
          src="/signup/sign-up-left.svg"
          alt=" team work illustration"
          width={[0, "25%"]}
        />
        <Image
          position="absolute"
          bottom="5%"
          right="5%"
          src="/signup/sign-up-right.svg"
          alt="work together illustration"
          width={[0, "25%"]}
          borderRadius="3px"
        />
        <Box
          p="25px 40px"
          width={["80%", "60%", "45%", "25%"]}
          borderRadius="3px"
          bg="white"
          boxShadow="rgb(0 0 0 / 10%) 0 0 10px"
        >
          <Box
            textAlign="center"
            color="#5E6C84"
            mt="5"
            mb="25"
            fontSize={["10px", "10px", "15px", "15px"]}
            fontWeight="semibold"
            lineHeight="normal"
          >
            <h1>Sign up for your account</h1>
          </Box>
          <Box my={4} textAlign="left">
            <FormControl isRequired my="4">
              <Input
                type="email"
                {...register("email")}
                placeholder="Enter Email"
                autoComplete="off"
              />
              {errors.email && <p color="red">{errors.email.message}</p>}
            </FormControl>
            <FormControl isRequired my="4">
              <Input
                type="text"
                {...register("username")}
                placeholder="User name"
                autoComplete="off"
              />
              {errors.username && <p color="red">{errors.username.message}</p>}
            </FormControl>
            <FormControl isRequired my="4">
              <Input
                type="password"
                {...register("password")}
                placeholder="Create password"
              />
              {errors.password && <p color="red">{errors.password.message}</p>}
            </FormControl>
            <FormControl isRequired my="4">
              <Input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p color="red">{errors.confirmPassword.message}</p>
              )}
            </FormControl>
            <Button
              fontWeight="semibold"
              width="full"
              mt={4}
              bg="black"
              color="white"
              onClick={handleSubmit(onSubmit)}
            >
              Sign up
            </Button>
            <Box m="5" textAlign="center">
              <Link href="/login" color="brand" p="2">
                Already have an account? Log in.
              </Link>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;
