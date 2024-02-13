import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { EnvironmentProviders, Provider } from "@angular/core";
import { tmdbAuthInterceptor } from "./auth.interceptor";

export const provideAuth = (): Array<Provider | EnvironmentProviders> => [
    provideHttpClient(withInterceptors([tmdbAuthInterceptor]))
]
