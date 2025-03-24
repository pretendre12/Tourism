import clientInstance from '../middleware/client-instance';


export interface IPayload {
    username: string
    password: string
}

export const login = async (payload: IPayload) => {
    try {
        const res = await clientInstance.post('/api/route', payload)
        return res.data  // Return only the response data
    } catch (error) {
        throw new Error(`Something went wrong: ${error}`)
    }
}
