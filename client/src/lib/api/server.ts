interface Body<TVariables> {
    query: string;
    variables?: TVariables;
}

interface Error {
    message: string;
}

export const server = {
    fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
        const result = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!result.ok) {
            throw new Error('failed to fetch data from server.')
        }

        return result.json() as Promise<{ data: TData; errors: Error[]; }>;
    }
};
