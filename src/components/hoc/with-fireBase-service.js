import React from 'react';
import FireBaseContext from '../fireBase-service-context';

const WithFireBaseService = () => (Wrapped) => {
    return (props) => {
        return(
            <FireBaseContext.Consumer>
                {
                    ({fireBase, renderTodoId, fireBaseStorage}) => {
                       return <Wrapped {...props} FireBase={fireBase} RenderId={renderTodoId} FireBaseStorage={fireBaseStorage}/>
                    }
                }
            </FireBaseContext.Consumer>
        )
    }
};

export default WithFireBaseService;