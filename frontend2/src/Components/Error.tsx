import React from 'react';

const Error = (props: { status: any; info: string }) => {
	return (
	   <div>
		{!props.status && (
            <p style={{ color: "#FF7F7F", fontWeight: "bold" }}>
                {props.info}
            </p>
    )}  
	   </div>
	);
};
 
export default Error;