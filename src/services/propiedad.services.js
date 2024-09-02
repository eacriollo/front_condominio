import { funHttp } from "./Http"

export default {
    funListar(page = 1, limit = 10, q = "") {
        return funHttp().get(`/propiedad?page=${page}&limit=${limit}&q=${q}`);
    },
    funGuardar(datos) {
        return funHttp().post("/propiedad", datos);
    },
    funMostrar(id) {
        return funHttp().get("/propiedad/" + id);
    },
    funModificar(datos, id) {
        return funHttp().put("/propiedad/" + id, datos);
    },
    funEliminar(id) {
        return funHttp().delete("/propiedad/" + id);
    }
}