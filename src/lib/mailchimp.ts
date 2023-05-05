const ID = 'fe07d491ec';

const U = 'ed5a81cd62acb294f31556d38';

const URL = 'https://dev.us12.list-manage.com/subscribe/post';

const params = new URLSearchParams({
	u: U,
	id: ID
});

export const SUBSCRIBE_URL = URL + '?' + params.toString();
