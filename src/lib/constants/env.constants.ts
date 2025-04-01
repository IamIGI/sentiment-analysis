function getEnv(key: string, defaultValue?: string) {
	const value = import.meta.env[key] || defaultValue;
	if (!value) throw new Error(`Environment variable ${key} is not defined`);

	return value;
}

export default {
	VITE_API_HUGGINGFACE_ACCESS_TOKEN: getEnv('VITE_API_HUGGINGFACE_ACCESS_TOKEN')
};
