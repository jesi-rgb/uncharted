
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.ts';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJibG9ncmFzb0BnbWFpbC5jb20iLCJqdGkiOiIxNDNkNzQyMC1kNWRkLTRhOTktYmJlZi05NmMzNzBmZDQ5MzkiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxMTg3Mjk2OSwidXNlcklkIjoiMTQzZDc0MjAtZDVkZC00YTk5LWJiZWYtOTZjMzcwZmQ0OTM5Iiwicm9sZSI6IiJ9.rgpDB0kQeCbsN14-gKk7aPN-6dPFcFInJ7wiSoWDX9o';

export const GET: RequestHandler = async () => {
	try {
		// First, get the endpoint URL
		const endpointResponse = await fetch(
			`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/14021/?api_key=${API_KEY}`
		);

		if (!endpointResponse.ok) {
			return json({ error: 'Failed to fetch endpoint' }, { status: endpointResponse.status });
		}

		const endpoint = await endpointResponse.json();

		// Then, get the actual data
		const dataResponse = await fetch(endpoint.datos);

		if (!dataResponse.ok) {
			return json({ error: 'Failed to fetch data' }, { status: dataResponse.status });
		}

		const data = await dataResponse.json();

		return json(data);
	} catch (error) {
		console.error('Error fetching weather data:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

