import { useEffect, useRef } from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';

/** Return a reference mutable object of property of the store
 * @param onChanged Optinal callback function called when property change
 */
export function useStorePropChange<T, TRootState>(store: EnhancedStore, propSelector: (state: TRootState) => T, onChanged?: (propValue: T) => void): React.MutableRefObject<T | undefined> {
	const propertyValueRef: React.MutableRefObject<T | undefined> = useRef<T | undefined>(
		propSelector(store.getState())
	);

	// Subscribe to store changing when Component start
	// Handle unsubscribe when Component unload
	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const state: any = store.getState();
			// Read property state
			const nextState: T = propSelector(state);
			// When state change save value and call the callback
			if (propertyValueRef.current !== nextState) {
				propertyValueRef.current = nextState;
				onChanged?.(nextState);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return propertyValueRef;
}
