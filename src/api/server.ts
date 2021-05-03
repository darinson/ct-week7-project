let token = `1cf73d4bece85e7fc901858557af15fee21c443b0f6c210e`

export const server_calls = {
    get: async () => {
        const response = await fetch(`https://ds-marvel-collection.herokuapp.com/api/characters`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async (data: any = {}) => {
        const response = await fetch(`https://ds-marvel-collection.herokuapp.com/api/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (id: string, data: any = {}) => {
        const response = await fetch(`https://ds-marvel-collection.herokuapp.com/api/characters/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async (id: string) => {
        const response = await fetch(`https://ds-marvel-collection.herokuapp.com/api/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}