import { funHttp } from "./Http"

export default {

    funListar() {
        return funHttp().get("/dato");
    },

    funIngresar(datos) {
        return funHttp().post("/dato", datos);
    },

    funMostrar(id) {
        return funHttp().get("/dato/" + id);
    },

    funActualizar(datos, id) {
        return funHttp().put("/dato/" + id, datos);
    },

    funEliminar(id) {
        return funHttp().delete("/dato/" + id);
    }

}