import { funHttp } from "./Http"

export default {

    funListar() {
        return funHttp().get("/metodoPago");
    },

    funIngresar(datos) {
        return funHttp().post("/metodoPago", datos);
    },

    funMostrar(id) {
        return funHttp().get("/metodoPago/" + id);
    },

    funActualizar(datos, id) {
        return funHttp().put("/metodoPago/" + id, datos);
    },

    funEliminar(id) {
        return funHttp().delete("/metodoPago/" + id);
    }

}