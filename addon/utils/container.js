export function lookup(instance, ...args) {
	if (instance.lookup) {
		return instance.lookup(...args);
	}

	return instance.container.lookup.apply(instance.container, args);
}


export function register(instance, ...args) {
	if (instance.register) {
		return instance.register(...args);
	}

	return instance.registry.register.apply(instance.registry, args);
}
