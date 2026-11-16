/** Adapt Axios success/error envelopes to the { data } or { error } contract expected by RTK Query. */
import { api } from "./axios";

export const axiosBaseQuery =
    () =>
    async ({ url, method, data, params }) => {
        try {
            const result = await api({ url, method, data, params });
            return { data: result.data };
        } catch (axiosError) {
            return {
                error: {
                    status: axiosError.response?.status,
                    data: axiosError.response?.data,
                },
            };
        }
    };
