import { Injectable } from '@angular/core';
import { MovooDrawerComponent } from '@movoo/components/drawer/drawer.component';

@Injectable({
    providedIn: 'root'
})
export class MovooDrawerService
{
    private _componentRegistry: Map<string, MovooDrawerComponent> = new Map<string, MovooDrawerComponent>();

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: MovooDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): MovooDrawerComponent | undefined
    {
        return this._componentRegistry.get(name);
    }
}
