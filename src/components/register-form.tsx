/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { registerPatient } from "@/services/auth/registerPatient";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { toast } from "sonner";
import SingleImageUploader from "./singleImageFileUpload";
import { Loader2 } from "lucide-react";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, null);

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newData = new FormData(e.target);
  
    if (image) newData.append("file", image);
    startTransition(() => {
      formAction(newData);
    });
  };



  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      if (error) {
        return error.message;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
            {getFieldError("name") && (
              <FieldDescription className="text-red-600">
                {getFieldError("name")}
              </FieldDescription>
            )}
          </Field>
          {/* Profile Image  */}





          {/* Bio / About  */}
          <Field>
            <FieldLabel htmlFor="Bio">Bio / About </FieldLabel>
            <Input id="bio" name="bio" type="text" placeholder="bio" />
            {getFieldError("bio") && (
              <FieldDescription className="text-red-600">
                {getFieldError("bio")}
              </FieldDescription>
            )}
          </Field>
          {/* Travel Interests  */}
          <Field>
            <FieldLabel htmlFor="interests">Travel Interests </FieldLabel>
            <Input id="interests" name="interests" type="text" placeholder="interests" />
            {getFieldError("interests") && (
              <FieldDescription className="text-red-600">
                {getFieldError("interests")}
              </FieldDescription>
            )}
          </Field>
          {/* Visited Countries  */}
          <Field>
            <FieldLabel htmlFor="visit">Visited Countries </FieldLabel>
            <Input id="visit" name="visit" type="text" placeholder="visit" />
            {getFieldError("visit") && (
              <FieldDescription className="text-red-600">
                {getFieldError("visit")}
              </FieldDescription>
            )}
          </Field>
          {/* Current Location */}
          <Field>
            <FieldLabel htmlFor="location">Current Location</FieldLabel>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="Location"
            />

            {getFieldError("location") && (
              <FieldDescription className="text-red-600">
                {getFieldError("location")}
              </FieldDescription>
            )}
          </Field>
          {/* Address */}
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="dhaka"
            />

            {getFieldError("address") && (
              <FieldDescription className="text-red-600">
                {getFieldError("address")}
              </FieldDescription>
            )}
          </Field>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
            />

            {getFieldError("email") && (
              <FieldDescription className="text-red-600">
                {getFieldError("email")}
              </FieldDescription>
            )}
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />

            {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>
          {/* Confirm Password */}
          <Field >
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />

            {getFieldError("confirmPassword") && (
              <FieldDescription className="text-red-600">
                {getFieldError("confirmPassword")}
              </FieldDescription>
            )}
          </Field>
        </div>
        <h2 className="font-semibold">profile photo</h2>
        <SingleImageUploader onChange={setImage} />
        <FieldGroup className="mt-4">
          <Field>
            <Button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" /> Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already you have Register?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>

    </form>
  );
};

export default RegisterForm;
