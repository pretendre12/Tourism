import { useMutation } from "@tanstack/react-query";
import { login } from "../../../service/auth/auth";
import type { IPayload } from "../../../service/auth/auth";


const useMutationAuth = () => {
    const useMutationLogin = () => {
        return useMutation({
            mutationFn: (payload: IPayload) => login(payload),
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.error(error);
            }
        });
    };

    return { useMutationLogin };
};

export default useMutationAuth;
