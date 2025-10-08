import { axiosClient } from "@/lib/axiosClient";
import { API_ENDPOINTS } from "@/lib/constants";

export interface LoginFormData {
    email: string;
    password: string;
    keepLoggedIn?: boolean;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name?: string;
    };
    message: string;
}

export const Post_loginUser = async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>(
        API_ENDPOINTS.LOGIN,
        data
    );

    return response.data;
};