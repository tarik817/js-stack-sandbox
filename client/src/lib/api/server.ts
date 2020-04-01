interface Body<TVariables> {
    query: string;
    variables?: TVariables;
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

        return result.json() as Promise<{ data: TData }>;
    }
};
