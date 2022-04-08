//	import { BaseSyntheticEvent, useState } from "react";
//	
//	export const useInput = (initialValue: any) => {
//		const [value, setValue] = useState(initialValue);
//	
//		return {
//			value,
//			setValue,
//			reset: () => setValue(""),
//			bind: {
//				value,
//				onChange: (event: BaseSyntheticEvent) => {
//				setValue(event.target.value);
//				}
//			}
//		};
//	};
