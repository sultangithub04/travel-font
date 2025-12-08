/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod";
import { loginUser } from "./loginUser";

const registerValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    bio: z.string().optional(),
    travelInterests: z.string().optional(),
    visitedCountries: z.string().optional(),
    currentLocation: z.string().optional(),
    profilePhoto: z.string().optional(),
    email: z.email({ message: "Valid email is required" }),
    password: z.string().min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        error: "Confirm Password is required and must be at least 6 characters long",
    }),
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});


export const registerPatient = async (_currentState: any, formData: FormData): Promise<any> => {
    
    try {

        const validationData = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            bio: formData.get('bio'),
            travelInterests: formData.get('interests'),
            visitedCountries: formData.get('visit'),
            currentLocation: formData.get('location'),
        }

        const validatedFields = registerValidationZodSchema.safeParse(validationData);

       
        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    }
                }
                )
            }
        }

        const registerData = {
            password: formData.get('password'),
            travaller: {
                name: formData.get('name'),
                address: formData.get('address'),
                email: formData.get('email'),
                bio: formData.get('bio'),
                travelInterests: formData.get('interests'),
                visitedCountries: formData.get('visit'),
                currentLocation: formData.get('location'),

            }
        }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(registerData));
        const file = formData.get("file") as File | null;
        if (file) {
            newFormData.append("file", file);
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
            method: "POST",
            body: newFormData,
        })

        const result = await res.json();

       

        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;



    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}