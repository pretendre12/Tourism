import clientInstance from 'client-instance'

interface IPayload {
    username: string
    password: string
}

export const login = (payload: IPayload) => {
    try {
        const res = clientInstance.post('/api/route', payload)
        return res
    } catch (error) {
        throw new Error(`Wrong Something: ${error}`)
    }
}