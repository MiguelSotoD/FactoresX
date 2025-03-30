import API from "../Api";

export const getCuestionariosQ = async () => {
    try {
        const response = await API.get("/api/cuestionario/con-preguntas");
        return response.data;
    } catch (error) {
        console.error("Error fetching cuestionarios:", error);
        throw error;
    }
}

export const putCuestionario = async (data) => {
    try {
        const response = await API.put("/api/cuestionario/nuevoCuestionario", data);
        return response.data;
    } catch (error) {
        console.error("Error updating cuestionario:", error);
        throw error;
    }
}