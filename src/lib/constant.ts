export const REST_SERVICE =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5173/api'
		: 'https://trendin.vercel.app/api';
