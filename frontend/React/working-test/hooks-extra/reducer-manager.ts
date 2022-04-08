//	import { AnyAction, combineReducers, createStore, Store, StoreEnhancer } from '@reduxjs/toolkit';
//	import { Reducer } from 'react';
//	
//	/** Type of generic reducer array  */
//	export type ReducerArray = {
//		[key: string]: Reducer<any, AnyAction>
//	};
//	
//	/** Type pf ReduceManager */
//	export type ReducerManager = {
//		/** Reducers list */
//		getReducerMap(): ReducerArray;
//		/** Next state tree, given the current state tree and an action to handle */
//		reduce(state: any, action: AnyAction): Reducer<any, AnyAction>;
//		/** Adds a new reducer with the specified key of the state */
//		add(key: string, reducer: Reducer<any, AnyAction>): void;
//		/** Adds a list or reducers */
//		addReducers(reducers: ReducerArray): void;
//		/** Removes a reducer with the specified key */
//		remove(key: string): void;
//		/** Removes a list or reducers */
//		removeReducers(reducers: ReducerArray): void;
//	};
//	
//	export type ReducerManagerProperty = {
//		reducerManager: ReducerManager;
//	};
//	
//	/** Create an instance of ReduxManager */
//	const createReducerManager = (initialReducers: ReducerArray): ReducerManager => {
//		// Create an object which maps keys to reducers
//		const reducers: ReducerArray = { ...initialReducers };
//	
//		// Create the initial combinedReducer
//		let combinedReducer: Reducer<any, AnyAction> = combineReducers(reducers);
//	
//		// An array which is used to delete state keys when reducers are removed
//		let keysToRemove: Array<string> = [];
//	
//		// Function to add single reducer to reducers
//		const addSingleReducer = (key: string, reducer: Reducer<any, AnyAction>): void => {
//			if (!key || reducers[key]) {
//				return ;
//			}
//	
//			// Add the reducer to the reducer mapping
//			reducers[key] = reducer;
//	
//			// Generate a new combined reducer
//			combinedReducer = combineReducers(reducers);
//		};
//	
//		// Function to remove single reducer to reducers
//		const removeSingleReducer = (key: string): void => {
//			if (!key || !reducers[key]) {
//				return ;
//			}
//	
//			// Remove it from the reducer mapping
//			delete reducers[key];
//	
//			// Add the key to the list of keys to clean up
//			keysToRemove.push(key);
//	
//			// Generate a new combined reducer
//			combinedReducer = combineReducers(reducers);
//		};
//	
//		return <ReducerManager>{
//			getReducerMap: () => reducers,
//	
//			// The root reducer function exposed by this object
//			// This will be passed to the store
//			reduce: (state: any, action: AnyAction): Reducer<any, AnyAction> => {
//				// If any reducers have been removed, clean up their state first
//				if (keysToRemove.length > 0) {
//					state = { ...state };
//					for (let key of keysToRemove) {
//						delete state[key];
//					}
//					keysToRemove = [];
//				}
//	
//				// Delegate to the combined reducer
//				return combinedReducer(state, action);
//			},
//	
//			// Adds a new reducer with the specified key
//			add: (key: string, reducer: Reducer<any, AnyAction>): void => {
//				addSingleReducer(key, reducer);
//			},
//	
//			// Adds a list or reducers
//			addReducers: (reducers: ReducerArray): void => {
//				for (let reducerKey in reducers) {
//					addSingleReducer(reducerKey, reducers[reducerKey]);
//				}
//			},
//	
//			// Removes a reducer with the specified key
//			remove: (key: string): void => {
//				removeSingleReducer(key);
//			},
//	
//			// Removes a list or reducers
//			removeReducers: (reducers: ReducerArray): void => {
//				for (let reducerKey in reducers) {
//					removeSingleReducer(reducerKey);
//				}
//			},
//		}
//	};
//	
//	/** Configure store with a ReduxManager */
//	export const configureStore = (initialRducers: any, initialState?: any, enhancer?: StoreEnhancer<Store<any, AnyAction> & ReducerManagerProperty, {}>): Store & ReducerManagerProperty => {
//		const reducerManager = createReducerManager(initialRducers);
//	
//		// Create a store with the root reducer function being the one exposed by the manager.
//		const store: Store & ReducerManagerProperty = createStore(reducerManager.reduce, initialState, enhancer)
//	
//		// Optional: Put the reducer manager on the store so it is easily accessible
//		store.reducerManager = reducerManager
//	
//		// Return the modified store
//		return store
//	};
