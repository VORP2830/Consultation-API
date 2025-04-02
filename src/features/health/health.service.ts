export class HealthService {
    constructor() { }

    async get(): Promise<string> {
        return "Bem vindo a API"
    }
}