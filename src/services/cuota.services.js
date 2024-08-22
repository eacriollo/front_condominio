import {funHttp} from "./Http"

export default {

    funListar() {
        return funHttp().get("/cuota");
    },

    funIngresar(datos) {
        return funHttp().post("/cuota", datos);
    },

    funMostrar(id) {
        return funHttp().get("/cuota/" + id);
    },

    funActualizar(datos, id) {
        return funHttp().put("/cuota/" + id, datos);
    },

    funEliminar(id) {
        return funHttp().delete("/cuota/" + id);
    }

}