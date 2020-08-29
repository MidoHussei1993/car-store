import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

export interface State {
    user:string;
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];