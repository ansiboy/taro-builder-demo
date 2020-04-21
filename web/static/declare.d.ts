type RequireConfig = {
    context: string,
    baseUrl?: string
};

type RequireContext = {
    config: RequireConfig
}

declare let requirejs: {
    (config: RequireConfig, modules: string[], callback?: Function, err?: Function);
    (modules: string[], callback?: Function, err?: Function);
    config: Function;
    exec(name);
};
