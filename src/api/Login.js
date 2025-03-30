import API from "../Api";

export const login = async (data) => {
    try {
        const response = await API.post("/api/user/login", {
            email: data.email,
            password: data.password
        });
        // Asegúrate de que la respuesta contenga la propiedad success
        return { success: true, ...response.data };
    } catch (error) {
        return error.response.data;
    }
}