import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
    
    return (
        <div>
            <FontAwesomeIcon className='spinner-icon' icon={faSpinner}/>
        </div>
    )
}

export default Spinner