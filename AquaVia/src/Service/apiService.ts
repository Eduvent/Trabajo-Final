import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000'
})


export class ApiService {
    getProvinces() {
        return http.get('provinces');
    }

    getReservoirs() {
        return http.get('reservoirs');
    }

    getSectors(province: string) {
        const requestData = {
            Departamento: province
        }

        return http.post('sectors', requestData);
    }

    getDistance(data: any) {
        return http.post('distance', data);
    }
}
