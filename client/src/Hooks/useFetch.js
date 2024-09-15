
const useFetch = () => {
    
    const makeFetch = async (url, object) => {
        if(!object) {
            const response = await fetch(url, {
                credentials: 'include'
            })
            return response
        }
        
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })

        return response
    }

    return {
        makeFetch
    }
}

export default useFetch