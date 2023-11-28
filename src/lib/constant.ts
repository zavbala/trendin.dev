export const REST_SERVICE =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5173/api'
		: 'https://trendin.dev/api';

export const PACKAGE_MANAGER = {
	"crates": "Rust",
	"brew": "MacOS",
}
