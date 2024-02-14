import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { Provider, EnvironmentProviders } from "@angular/core";
import { tmdbApiInterceptor } from "./api.interceptor";

export const provideApi = (): Array<Provider | EnvironmentProviders> => [
    provideHttpClient(withInterceptors([tmdbApiInterceptor]))
];
