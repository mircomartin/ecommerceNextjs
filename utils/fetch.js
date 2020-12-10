export async function authFetch (url, params) {

	const token = localStorage.getItem('token');
	if (token) {
		const paramsTemp = {
			...params,
			headers: {
				...params?.headers,
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await fetch(url, paramsTemp);
			const result = await response.json();
			return result;
		} catch (error) {
			console.log(error);
		}
	}
};
