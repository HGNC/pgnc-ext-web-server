type RuntimeConfig = {
    apiUser?: string;
    apiPassword?: string;
};

const readRuntimeConfig = (): RuntimeConfig => {
    const globalRef = globalThis as {
        process?: { env?: Record<string, string | undefined> };
        __PGNC_RUNTIME_CONFIG__?: RuntimeConfig;
    };

    const nodeEnv = globalRef.process?.env;
    if (nodeEnv && (nodeEnv['API_USER'] || nodeEnv['API_PASSWORD'])) {
        return {
            apiUser: nodeEnv['API_USER'],
            apiPassword: nodeEnv['API_PASSWORD'],
        };
    }

    if (globalRef.__PGNC_RUNTIME_CONFIG__) {
        return globalRef.__PGNC_RUNTIME_CONFIG__;
    }

    return {};
};

const runtimeConfig = readRuntimeConfig();

export const environment = {
    production: true,
    apiUser: runtimeConfig.apiUser ?? '',
    apiPassword: runtimeConfig.apiPassword ?? '',
};
